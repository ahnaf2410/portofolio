/**
 * ==============================================================================
 * MAIN INTERACTION & DYNAMIC RENDERING SCRIPT
 * Ahnaf Musyaffa — Video Editor & Motion Designer Portfolio
 * Language: English
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PORTFOLIO_DATA === "undefined") {
    console.error("PORTFOLIO_DATA is not defined. Please check data.js.");
    return;
  }

  initProfile();
  initStats();
  initCategories();
  renderPortfolio("all");
  initExperiences();
  initSkills();
  initContact();
  initNavigation();
  initModal();
  initQuickContactForm();

  // Set current year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * 1. Initialize Profile & Hero Info
 */
function initProfile() {
  const { profile, contact } = PORTFOLIO_DATA;
  if (!profile) return;

  const heroTitle = document.getElementById("heroTitle");
  const heroRole = document.getElementById("heroRole");
  const heroDesc = document.getElementById("heroDesc");
  const btnHeroWhatsapp = document.getElementById("btnHeroWhatsapp");

  if (heroTitle) {
    heroTitle.textContent = profile.name;
  }
  if (heroRole) heroRole.textContent = profile.role;
  if (heroDesc) heroDesc.textContent = profile.about;

  if (btnHeroWhatsapp && contact) {
    btnHeroWhatsapp.href = contact.whatsappLink;
  }
}

/**
 * 2. Initialize Key Stats Counters
 */
function initStats() {
  const container = document.getElementById("statsGrid");
  if (!container || !PORTFOLIO_DATA.profile.stats) return;

  container.innerHTML = PORTFOLIO_DATA.profile.stats
    .map(
      (stat) => `
      <div class="stat-item">
        <div class="stat-number">${stat.number}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `
    )
    .join("");
}

/**
 * 3. Initialize Category Filter Tabs
 */
function initCategories() {
  const tabsContainer = document.getElementById("filterTabs");
  if (!tabsContainer || !PORTFOLIO_DATA.categories) return;

  tabsContainer.innerHTML = PORTFOLIO_DATA.categories
    .map(
      (cat, index) => `
      <button class="filter-btn ${index === 0 ? "active" : ""}" data-category="${cat.id}">
        ${cat.label}
      </button>
    `
    )
    .join("");

  tabsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    tabsContainer.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const categoryId = btn.getAttribute("data-category");
    renderPortfolio(categoryId);
  });
}

/**
 * Format seconds into MM:SS (e.g. 35 -> 0:35, 125 -> 2:05)
 */
function formatDuration(seconds) {
  if (isNaN(seconds) || !isFinite(seconds) || seconds <= 0) return "";
  const totalSecs = Math.round(seconds);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/**
 * Updates duration badge when <video> metadata loads in the thumbnail
 */
window.handleVideoMetadata = function (videoEl, videoId) {
  if (!videoEl) return;
  try {
    videoEl.currentTime = 0.5;
  } catch (e) {}

  if (videoEl.duration && isFinite(videoEl.duration)) {
    const formatted = formatDuration(videoEl.duration);
    const badge = document.getElementById(`duration-${videoId}`);
    if (badge && formatted) {
      badge.textContent = formatted;
      badge.style.display = "inline-block";
    }
  }
};

/**
 * Background duration probe for videos with custom thumbnails or non-inline videos
 */
function autoDetectVideoDuration(url, videoId, fallbackDuration) {
  const badge = document.getElementById(`duration-${videoId}`);
  if (!badge) return;

  // Duration already set in data.js → no need to hit the network for metadata.
  if (fallbackDuration && fallbackDuration.trim() !== "") {
    badge.textContent = fallbackDuration;
    badge.style.display = "inline-block";
    return;
  }

  const cleanUrl = (url || "").trim();
  const isDirect =
    /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(cleanUrl) ||
    cleanUrl.includes("mir-s3-cdn-cf.behance.net") ||
    cleanUrl.includes(".mp4");

  if (!isDirect) {
    if (fallbackDuration && fallbackDuration.trim() !== "") {
      badge.textContent = fallbackDuration;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
    return;
  }

  // Probe duration in background using hidden video element
  const probe = document.createElement("video");
  probe.preload = "metadata";
  probe.src = cleanUrl;
  probe.onloadedmetadata = () => {
    if (probe.duration && isFinite(probe.duration)) {
      const formatted = formatDuration(probe.duration);
      if (formatted) {
        badge.textContent = formatted;
        badge.style.display = "inline-block";
      }
    }
  };
  probe.onerror = () => {
    if (fallbackDuration && fallbackDuration.trim() !== "") {
      badge.textContent = fallbackDuration;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  };
}

/**
 * Automatically resolves video thumbnail:
 * 1. If user provided a custom thumbnail URL, use it.
 * 2. If it's a YouTube / Shorts video, automatically fetch YouTube's high-res thumbnail.
 * 3. If it's a direct MP4 or local video file (e.g. videos/ugc-18.mp4), capture the video frame
 *    at 0.5s AND enable an interactive hover preview!
 */
function renderVideoThumbnail(item) {
  const url = (item.videoUrl || "").trim();
  const customThumb = (item.thumbnail || "").trim();

  const isLocalOrDirectVideo =
    /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url) || url.includes(".mp4");

  // 1a. Direct video WITH a poster image: show the poster instantly and only
  //     stream the video when the user hovers (preload="none" = 0 bytes on page load).
  if (customThumb !== "" && isLocalOrDirectVideo) {
    return `
      <video
        src="${url}"
        poster="${customThumb}"
        class="video-thumb"
        preload="none"
        muted
        loop
        playsinline
        onmouseenter="this.play().catch(function(){})"
        onmouseleave="this.pause()"
      ></video>
    `;
  }

  // 1b. Explicit custom thumbnail provided
  if (customThumb !== "") {
    return `<img src="${customThumb}" alt="${item.title}" class="video-thumb" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80'">`;
  }

  // 2. YouTube / YouTube Shorts auto-extracted thumbnail
  const youtubeMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    return `
      <img 
        src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
        onerror="this.onerror=null; this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'" 
        alt="${item.title}" 
        class="video-thumb" 
        loading="lazy"
      >
    `;
  }

  // 3. Direct MP4 / WebM / Local video file auto thumbnail + hover motion preview!
  const isDirectVideo =
    /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url) ||
    url.includes("mir-s3-cdn-cf.behance.net") ||
    url.includes(".mp4");

  if (isDirectVideo) {
    return `
      <video 
        src="${url}#t=0.5" 
        class="video-thumb" 
        preload="metadata" 
        muted 
        playsinline 
        onloadedmetadata="handleVideoMetadata(this, ${item.id})"
        onmouseenter="try{this.play();}catch(e){}"
        onmouseleave="try{this.pause();this.currentTime=0.5;}catch(e){}"
      ></video>
    `;
  }

  // Fallback placeholder image
  return `<img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80" alt="${item.title}" class="video-thumb" loading="lazy">`;
}

/**
 * 4. Render Portfolio Video Cards
 */
function renderPortfolio(categoryFilter = "all") {
  const grid = document.getElementById("portfolioGrid");
  if (!grid || !PORTFOLIO_DATA.videos) return;

  const filteredVideos =
    categoryFilter === "all"
      ? PORTFOLIO_DATA.videos
      : PORTFOLIO_DATA.videos.filter((v) => v.category === categoryFilter);

  if (filteredVideos.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p>No projects found in this category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredVideos
    .map((item) => {
      const isVertical = item.aspectRatio === "vertical";
      const ratioClass = isVertical ? "vertical" : "horizontal";
      const ratioBadge = isVertical ? "9:16 Vertical" : "16:9 Landscape";

      const tagsHtml = item.tags
        ? item.tags.map((t) => `<span class="tag-item">#${t}</span>`).join("")
        : "";

      return `
      <article class="video-card" data-id="${item.id}">
        <div class="video-thumb-wrap ${ratioClass}" onclick="openVideoModal(${item.id})">
          ${renderVideoThumbnail(item)}
          <div class="video-overlay">
            <div class="play-button" title="Watch Video">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          <span class="badge-ratio">${ratioBadge}</span>
          <span class="badge-duration" id="duration-${item.id}">${item.duration || ""}</span>
        </div>

        <div class="video-card-body">
          <span class="video-client">${item.client || "Client Work"}</span>
          <h3 class="video-title">${item.title}</h3>
          <div class="video-tags">${tagsHtml}</div>
          <button class="btn-watch" onclick="openVideoModal(${item.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Watch Video
          </button>
        </div>
      </article>
    `;
    })
    .join("");

  // Auto-detect and sync real durations for all direct video items
  filteredVideos.forEach((item) => {
    autoDetectVideoDuration(item.videoUrl, item.id, item.duration);
  });
}

/**
 * 5. Initialize Work Experiences & Education
 */
function initExperiences() {
  const timeline = document.getElementById("experienceTimeline");
  const educationCard = document.getElementById("educationCard");

  if (timeline && PORTFOLIO_DATA.experiences) {
    timeline.innerHTML = PORTFOLIO_DATA.experiences
      .map(
        (exp) => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <div>
                <h3 class="timeline-role">${exp.role}</h3>
                <div class="timeline-company">
                  <span>${exp.company}</span> &bull; <span>${exp.location}</span>
                </div>
              </div>
              <span class="timeline-badge">${exp.period}</span>
            </div>
            <ul class="timeline-list">
              ${exp.highlights.map((h) => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        </div>
      `
      )
      .join("");
  }

  if (educationCard && PORTFOLIO_DATA.education) {
    const edu = PORTFOLIO_DATA.education;
    educationCard.innerHTML = `
      <div class="edu-info">
        <span class="section-tag" style="margin-bottom: 0.5rem; font-size: 0.7rem;">Education</span>
        <h4>${edu.degree}</h4>
        <p>${edu.institution} &bull; ${edu.country} (${edu.period})</p>
      </div>
      <div class="edu-gpa">
        <div>Cumulative GPA</div>
        <div style="font-size: 1.05rem; font-weight: 600; color: #ffffff;">${edu.gpa}</div>
      </div>
    `;
  }
}

/**
 * 6. Initialize Skills & Tools
 */
function initSkills() {
  const skillsGrid = document.getElementById("skillsGrid");
  const toolsList = document.getElementById("toolsList");

  if (skillsGrid && PORTFOLIO_DATA.skills) {
    skillsGrid.innerHTML = PORTFOLIO_DATA.skills
      .map(
        (skill) => `
        <div class="skill-pill">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-level">${skill.level}</span>
        </div>
      `
      )
      .join("");
  }

  if (toolsList && PORTFOLIO_DATA.tools) {
    toolsList.innerHTML = PORTFOLIO_DATA.tools
      .map(
        (tool) => `
        <span class="tool-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ${tool}
        </span>
      `
      )
      .join("");
  }
}

/**
 * 7. Initialize Contact Links
 */
function initContact() {
  const { contact } = PORTFOLIO_DATA;
  if (!contact) return;

  const cardWhatsapp = document.getElementById("cardWhatsapp");
  const textWhatsapp = document.getElementById("textWhatsapp");
  const cardEmail = document.getElementById("cardEmail");
  const textEmail = document.getElementById("textEmail");
  const linkLinkedin = document.getElementById("linkLinkedin");
  const linkWebsite = document.getElementById("linkWebsite") || document.getElementById("linkBehance");
  const floatingWa = document.getElementById("floatingWa");
  const navCta = document.getElementById("navCta");
  const navCtaMobile = document.getElementById("navCtaMobile");

  if (cardWhatsapp) cardWhatsapp.href = contact.whatsappLink;
  if (textWhatsapp) textWhatsapp.textContent = contact.whatsapp;
  if (floatingWa) floatingWa.href = contact.whatsappLink;

  if (cardEmail) cardEmail.href = `mailto:${contact.email}`;
  if (textEmail) textEmail.textContent = contact.email;

  if (linkLinkedin) linkLinkedin.href = contact.linkedin;
  if (linkWebsite) linkWebsite.href = contact.website || "https://ahnaf-musyaffa-portofolio.netlify.app/";

  if (navCta) navCta.href = contact.whatsappLink;
  if (navCtaMobile) navCtaMobile.href = contact.whatsappLink;
}

/**
 * 8. Quick Contact Form Handler (Direct to WhatsApp)
 */
function initQuickContactForm() {
  const form = document.getElementById("quickContactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName").value.trim();
    const project = document.getElementById("projectType").value;
    const message = document.getElementById("senderMessage").value.trim();

    const text = `Hi Ahnaf!%0A%0AName / Company: ${encodeURIComponent(name)}%0AProject Scope: ${encodeURIComponent(
      project
    )}%0ADetails: ${encodeURIComponent(message)}`;

    const waNumber = PORTFOLIO_DATA.contact.whatsapp.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${text}`;

    window.open(waUrl, "_blank");
  });
}

/**
 * 9. Navbar & Mobile Menu Interaction
 */
function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll("header, section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.pageYOffset >= top) {
        current = sec.getAttribute("id");
      }
    });

    links.forEach((l) => {
      l.classList.remove("active");
      if (l.getAttribute("href") === `#${current}`) {
        l.classList.add("active");
      }
    });
  });
}

/**
 * 10. Video Popup Modal Player
 */
function initModal() {
  const modal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("modalClose");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeVideoModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeVideoModal();
    }
  });
}

/**
 * Helper to convert video URLs (Direct MP4, Behance CDN, YouTube, Shorts, Vimeo, Streamable, Drive)
 */
function createVideoEmbedHtml(url) {
  if (!url) return "<p style='color:#fff;padding:2rem;'>Video URL not found.</p>";

  const cleanUrl = url.trim();

  // 1. Direct Video files (MP4, WebM, MOV, Behance CDN, CloudFront, etc.)
  // This plays DIRECTLY inside the custom HTML5 player with zero redirects!
  const isDirectVideo =
    /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(cleanUrl) ||
    cleanUrl.includes("mir-s3-cdn-cf.behance.net") ||
    cleanUrl.includes("video.behance.net") ||
    cleanUrl.includes(".mp4");

  if (isDirectVideo) {
    return `
      <video controls autoplay playsinline preload="auto" controlsList="nodownload" style="width:100%;height:100%;max-height:80vh;object-fit:contain;background:#000;">
        <source src="${cleanUrl}" type="video/mp4">
        Your browser does not support HTML5 video playback.
      </video>
    `;
  }

  // 2. YouTube / YouTube Shorts detection (plays directly in modal with autoplay)
  let youtubeMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    return `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>`;
  }

  // 3. Vimeo detection (plays directly in modal)
  let vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>`;
  }

  // 4. Streamable detection (plays directly in modal)
  let streamableMatch = cleanUrl.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/);
  if (streamableMatch && streamableMatch[1]) {
    return `<iframe src="https://streamable.com/e/${streamableMatch[1]}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>`;
  }

  // 5. Google Drive preview (plays directly in modal)
  if (cleanUrl.includes("drive.google.com")) {
    const previewUrl = cleanUrl.replace(/\/view(\?usp=.*)?$/, "/preview");
    return `<iframe src="${previewUrl}" allow="autoplay" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>`;
  }

  // 6. Behance project / gallery embed fallback
  const behanceMatch = cleanUrl.match(/behance\.net\/(?:gallery\/|embed\/project\/)(\d+)/);
  if (behanceMatch && behanceMatch[1]) {
    const projectId = behanceMatch[1];
    return `<iframe src="https://www.behance.net/embed/project/${projectId}?isa=1" allowfullscreen frameborder="0" style="width:100%;height:100%;min-height:480px;border:none;"></iframe>`;
  }

  // Fallback iframe
  return `<iframe src="${cleanUrl}" allow="autoplay; fullscreen" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>`;
}

/**
 * Global function called when user clicks a video card
 */
window.openVideoModal = function (videoId) {
  const video = PORTFOLIO_DATA.videos.find((v) => v.id === videoId);
  if (!video) return;

  const modal = document.getElementById("videoModal");
  const container = document.getElementById("modalVideoContainer");
  const title = document.getElementById("modalTitle");
  const desc = document.getElementById("modalDesc");
  const category = document.getElementById("modalCategory");
  const client = document.getElementById("modalClient");
  const tagsContainer = document.getElementById("modalTags");

  if (video.aspectRatio === "vertical") {
    container.className = "modal-video-wrapper ratio-vertical";
  } else {
    container.className = "modal-video-wrapper ratio-horizontal";
  }

  container.innerHTML = createVideoEmbedHtml(video.videoUrl);
  if (title) title.textContent = video.title;
  if (desc) {
    if (video.description) {
      desc.textContent = video.description;
      desc.style.display = "block";
    } else {
      desc.textContent = "";
      desc.style.display = "none";
    }
  }
  if (category) category.textContent = video.category.toUpperCase();
  if (client) client.textContent = video.client || "";

  if (tagsContainer) {
    tagsContainer.innerHTML = (video.tags || [])
      .map((t) => `<span class="tag-item">#${t}</span>`)
      .join("");
  }

  // Optional external link button (Behance / YouTube / etc.)
  const extContainer = document.getElementById("modalExternalLinkContainer");
  if (extContainer) {
    if (video.videoUrl.includes("behance.net")) {
      extContainer.innerHTML = `
        <a href="${video.videoUrl}" target="_blank" rel="noopener" class="btn-external-modal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8.2 11.8c.8 0 1.5-.2 2-.7.4-.4.6-1 .6-1.7 0-.7-.2-1.2-.6-1.6-.4-.4-1.1-.6-2-.6H3.6v4.6h4.6zm.3 6.3c.9 0 1.6-.3 2.1-.8.5-.5.7-1.2.7-2 0-.8-.2-1.5-.7-2-.5-.5-1.2-.8-2.2-.8H3.6v5.6h4.9zM0 4.5h8.8c1.6 0 2.9.4 3.9 1.3 1 .9 1.5 2 1.5 3.3 0 1-.3 1.8-.8 2.5-.5.7-1.3 1.2-2.3 1.5 1.3.3 2.2.8 2.8 1.6.6.8.9 1.8.9 2.9 0 1.5-.6 2.7-1.7 3.7-1.1 1-2.6 1.5-4.5 1.5H0V4.5zm19.3 7.8c-.8 0-1.5.3-2 .8-.5.5-.8 1.3-.8 2.2h5.5c0-.9-.3-1.6-.7-2.1-.5-.6-1.1-.9-2-.9zm-.1-2.4c2 0 3.6.6 4.7 1.8 1.1 1.2 1.7 2.8 1.7 4.8 0 .3 0 .7-.1 1.1h-9.1c.1 1 .5 1.8 1.2 2.4.7.6 1.7.9 2.8.9 1.1 0 2.1-.3 2.8-.8.4-.3.7-.7.9-1.2h2.7c-.4 1.2-1.1 2.2-2.1 3-1.1.8-2.5 1.2-4.3 1.2-2.1 0-3.8-.7-5.1-2s-1.9-3.1-1.9-5.2.7-3.9 2-5.1c1.3-1.5 3-2.1 5.1-2.1zm-3.6-4.5h7.3v1.9h-7.3V5.4z"></path></svg>
          View Full Project on Behance
        </a>
      `;
    } else {
      extContainer.innerHTML = "";
    }
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeVideoModal = function () {
  const modal = document.getElementById("videoModal");
  const container = document.getElementById("modalVideoContainer");

  if (modal) {
    modal.classList.remove("active");
  }
  if (container) {
    container.innerHTML = "";
  }
  document.body.style.overflow = "";
};
