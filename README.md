# Ahnaf Musyaffa — Video Editor & Motion Designer Portfolio

A clean, modern, minimalist, and elegant portfolio website tailored for **Ahnaf Musyaffa** (Video Editor & Motion Designer). Built using pure semantic HTML5, modern modular CSS3, and lightweight Vanilla JavaScript. Designed for high performance, zero build-step overhead, and 100% free hosting.

---

## 📁 Project Architecture

```
Port/
├── index.html     # Semantic structure (English, Minimalist layout)
├── style.css      # Helvetica typography, matte obsidian palette, subtle borders
├── data.js        # CENTRAL DATA REPOSITORY (Easily update videos, bio, contacts)
├── main.js        # Dynamic video modal player, category filters, navigation
└── README.md      # Documentation & 100% free hosting guide
```

---

## 🎬 How to Update Videos & Content

You **do not** need to edit HTML code to update your videos or work experience. Everything is configured inside **[`data.js`](file:///Users/ahnafmusyaffa/Documents/Port/data.js)**.

### Adding a New Video
Open **`data.js`**, locate the `videos: [ ... ]` array, and paste a new entry:

```javascript
{
  id: 7, // Unique ID number
  title: "Title of Your Video",
  category: "shortform", // Choose: "shortform" | "ads" | "commercial" | "motion"
  client: "Client / Brand Name",
  duration: "0:45",
  aspectRatio: "vertical", // "vertical" for 9:16 (Shorts/Reels/TikTok) or "horizontal" for 16:9
  videoUrl: "https://www.youtube.com/shorts/YOUR_VIDEO_ID", // YouTube, Shorts, Vimeo, Google Drive, or .mp4
  thumbnail: "https://images.unsplash.com/... (or your own cover image link)",
  description: "Brief summary of the creative direction, pacing, and post-production techniques.",
  tags: ["Short-Form", "Retention", "Sound Design"]
},
```

---

## 🚀 Free Hosting Instructions (100% Free Forever)

Because this website uses pure static web standards without databases or backend runtimes, it can be hosted on fast global CDNs at zero cost:

### Option 1: Netlify Drop *(Easiest — Online in 30 Seconds)*
1. Open your browser and go to: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Sign in or create a free account.
3. Open Finder on your Mac and find the **`Port`** folder.
4. **Drag and drop the entire `Port` folder** directly onto the Netlify Drop screen.
5. Your site is deployed immediately with a free SSL domain (e.g. `https://ahnaf-portfolio.netlify.app`).
6. You can rename the subdomain for free under **Site Configuration -> Change site name**.

### Option 2: Vercel *(Fast & Popular)*
1. Visit **[https://vercel.com](https://vercel.com)** and create a free account.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository or use the Vercel CLI (`npx vercel`).
4. Click **Deploy**. Your site goes live at `https://ahnaf-musyaffa.vercel.app`.

### Option 3: GitHub Pages *(Free Forever)*
1. Create a repository on **[https://github.com](https://github.com)** named `portfolio`.
2. Push or upload the files from this folder.
3. Go to **Settings** -> **Pages** in the repo.
4. Set source branch to `main` and folder to `/(root)`.
5. Click **Save**. Your site will be available at `https://<username>.github.io/portfolio`.

---

## 🎨 Design Philosophy
- **Typography**: Strict Helvetica Neue / Helvetica font stack for timeless Swiss minimalism.
- **Palette**: Deep matte obsidian `#0c0d0f`, refined zinc `#18191e`, and crisp monochrome accents. No distracting neon glows.
- **Responsive Aspect Ratios**: Clean handling of vertical (9:16) reels/shorts and widescreen (16:9) commercial spots.
- **Instant Local Preview**: Double-click `index.html` to view the website directly in any browser.
# portofolio
