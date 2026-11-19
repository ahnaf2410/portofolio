/**
 * Cloudflare Worker: adds HTTP Range support (206 Partial Content) for videos.
 *
 * Workers Static Assets always answers with the full file (200), which makes
 * Safari/iOS refuse or stall on <video>, and makes seeking slow everywhere.
 * Only /videos/* goes through this Worker (see run_worker_first in
 * wrangler.jsonc); everything else is served directly as static assets.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/videos/")) {
      return env.ASSETS.fetch(request);
    }

    // Always fetch the full asset (without Range/conditional headers) and slice it ourselves.
    const assetReq = new Request(url.toString(), { method: "GET" });
    const asset = await env.ASSETS.fetch(assetReq);
    if (!asset.ok || !asset.body) return asset;

    const headers = new Headers(asset.headers);
    let body = asset.body;
    let size = Number(asset.headers.get("content-length") || NaN);
    if (!Number.isFinite(size) || size <= 0) {
      // Size unknown (e.g. chunked response): buffer it. Videos are < 25 MB (asset limit).
      const buf = await asset.arrayBuffer();
      size = buf.byteLength;
      body = new Response(buf).body;
    }
    headers.set("Content-Length", String(size));
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=604800");

    const range = parseRange(request.headers.get("range"), size);

    if (range === null) {
      // No (usable) Range header: full file.
      return new Response(request.method === "HEAD" ? null : body, {
        status: 200,
        headers,
      });
    }

    if (range === "unsatisfiable") {
      body.cancel();
      headers.set("Content-Range", `bytes */${size}`);
      headers.delete("content-length");
      return new Response(null, { status: 416, headers });
    }

    const { start, end } = range;
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));

    if (request.method === "HEAD") {
      body.cancel();
      return new Response(null, { status: 206, headers });
    }

    // FixedLengthStream makes the runtime send a real Content-Length instead of chunked encoding.
    const fixed = new FixedLengthStream(end - start + 1);
    sliceStream(body, start, end).pipeTo(fixed.writable).catch(() => {});
    return new Response(fixed.readable, {
      status: 206,
      headers,
    });
  },
};

/** Parses a single "bytes=start-end" range. Returns null to fall back to a full response. */
function parseRange(header, size) {
  if (!header || !Number.isFinite(size)) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m) return null; // multiple ranges or unknown unit → full file
  let [, s, e] = m;
  let start, end;
  if (s === "" && e === "") return null;
  if (s === "") {
    // suffix range: last N bytes
    const n = Number(e);
    if (n === 0) return "unsatisfiable";
    start = Math.max(0, size - n);
    end = size - 1;
  } else {
    start = Number(s);
    end = e === "" ? size - 1 : Math.min(Number(e), size - 1);
  }
  if (start >= size || start > end) return "unsatisfiable";
  return { start, end };
}

/** Streams only bytes [start, end] of `body` without buffering the whole file. */
function sliceStream(body, start, end) {
  let pos = 0;
  const reader = body.getReader();
  return new ReadableStream({
    async pull(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        const chunkStart = pos;
        const chunkEnd = pos + value.byteLength; // exclusive
        pos = chunkEnd;
        if (chunkEnd <= start) continue; // before the range
        const from = Math.max(0, start - chunkStart);
        const to = Math.min(value.byteLength, end + 1 - chunkStart);
        if (to > from) controller.enqueue(value.subarray(from, to));
        if (chunkEnd > end) {
          reader.cancel();
          controller.close();
        }
        return;
      }
    },
    cancel(reason) {
      reader.cancel(reason);
    },
  });
}
