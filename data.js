/**
 * ==============================================================================
 * PORTFOLIO DATA - AHNAF MUSYAFFA
 * ==============================================================================
 * Clean, minimalist, data-driven structure.
 * Update your videos, experiences, skills, and contact information here.
 * ==============================================================================
 */

const PORTFOLIO_DATA = {
  // PROFILE & BIO
  profile: {
    name: "Ahnaf Musyaffa",
    role: "Video Editor & Motion Designer",
    tagline: "High-Retention Short-Form Content, Digital Ads & Visual Storytelling",
    about: `Video Editor experienced in producing short-form content, social media videos, and digital advertisements. Strong in transforming raw footage and creative concepts into clear, engaging, and visually appealing videos. Skilled in pacing, motion graphics, seamless transitions, subtitles, color grading, and sound design with a rigorous focus on viewer retention and conversion.`,
    stats: [
      { number: "30K+", label: "Avg. Views / Video" },
      { number: "4+", label: "Years Experience" },
      { number: "100+", label: "Videos Produced" },
      { number: "100%", label: "On-Time Turnaround" }
    ]
  },

  // CONTACT INFORMATION
  contact: {
    whatsapp: "+62 851-5775-8606",
    whatsappLink: "https://wa.me/6285157758606?text=Hi%20Ahnaf,%20I'd%20like%20to%20discuss%20a%20video%20editing%20project.",
    email: "musyaffaahnaf1@gmail.com",
    linkedin: "https://www.linkedin.com/in/ahnafmusyaffa",
    website: "https://ahnaf-musyaffa-portofolio.netlify.app/",
    location: "Bandung, Indonesia (Available for Global Remote Work)"
  },

  // PORTFOLIO FILTER CATEGORIES
  categories: [
    { id: "all", label: "All Works" },
    { id: "shortform", label: "Shorts & Reels" },
    { id: "ads", label: "UGC & Digital Ads" },
    { id: "commercial", label: "Commercial & YouTube" },
    { id: "motion", label: "Motion Graphics" }
  ],

  /**
   * ============================================================================
   * VIDEO PORTFOLIO LIST
   * ============================================================================
   * TO ADD A NEW VIDEO:
   * Copy one of the objects below and paste it at the top or bottom of the array.
   * - title: Video title
   * - category: "shortform" | "ads" | "commercial" | "motion"
   * - client: Client or brand name
   * - duration: Video duration (e.g., "0:30" or "2:15")
   * - aspectRatio: "vertical" (for 9:16 Reels/TikTok/Shorts) or "horizontal" (for 16:9)
   * - videoUrl: YouTube, Shorts, Vimeo, Behance (e.g. https://www.behance.net/gallery/12345/Title), Google Drive, or .mp4 link
   * - thumbnail: Image URL for cover
   * - description: Editing highlights and storytelling approach
   * ============================================================================
   */
  videos: [
    {
      id: 1,
      title: "Video Editing Competition",
      category: "ads",
      client: "Fullfind x Sribu",
      duration: "1:26",
      aspectRatio: "horizontal", // 9:16 Vertical
      videoUrl: "videos/porto1.mp4",
      thumbnail: "thumbs/porto1.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id: 2,
      title: "EKIDO - UGC 1",
      category: "ads",
      client: "EKIDO Creative Agency",
      duration: "0:42",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto2.mp4",
      thumbnail: "thumbs/porto2.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id: 3,
      title: "EKIDO - UGC 2",
      category: "ads",
      client: "EKIDO Creative Agency",
      duration: "0:45",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto3.mp4",
      thumbnail: "thumbs/porto3.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id: 4,
      title: "EKIDO - UGC 3",
      category: "ads",
      client: "EKIDO Creative Agency",
      duration: "0:45",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto4.mp4",
      thumbnail: "thumbs/porto4.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id:   5,
      title: "EKIDO - UGC 4",
      category: "ads",
      client: "EKIDO Creative Agency",
      duration: "1:06",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto5.mp4",
      thumbnail: "thumbs/porto5.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id:   6,
      title: "ICON - UGC 1",
      category: "ads",
      client: "ICON - United States",
      duration: "0:35",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto6.mp4",
      thumbnail: "thumbs/porto6.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id: 7,
      title: "HomeSavvy - UGC 12",
      category: "ads",
      client: "ICON - United States",
      duration: "0:52",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto7.mp4",
      thumbnail: "thumbs/porto7.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id:   8,
      title: "HomeSavvy - UGC 12",
      category: "ads",
      client: "ICON - United States",
      duration: "0:49",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto8.mp4",
      thumbnail: "thumbs/porto8.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id: 9,
      title: "HomeSavvy - UGC 12",
      category: "ads",
      client: "ICON - United States",
      duration: "2:26",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto9.mp4",
      thumbnail: "thumbs/porto9.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    {
      id: 10,
      title: "HomeSavvy - UGC 12",
      category: "ads",
      client: "ICON - United States",
      duration: "0:58",
      aspectRatio: "vertical", // 9:16 Vertical
      videoUrl: "videos/porto10.mp4",
      thumbnail: "thumbs/porto10.jpg", // Otomatis diambil dari Behance / video!
      tags: ["UGC", "Fast Cuts", "Sound Design", "Kinetic Captions"]
    },
    
  ],

  // WORK EXPERIENCES (FROM RESUME)
  experiences: [
    {
      role: "Video Editor",
      company: "Solar on Steroids",
      location: "Remote",
      period: "Sep 2026 - Present",
      type: "Current",
      highlights: [
        "Producing and editing high-converting video creatives, advertisements, and social media content.",
        "Transforming raw footage into dynamic, high-retention video assets optimized for digital campaigns.",
        "Applying advanced post-production techniques including fast-paced cuts, sound design, motion graphics, and engaging subtitles to maximize audience engagement."
      ]
    },
    {
      role: "Video Editor & AI Admaker",
      company: "ICON",
      location: "United States (Remote)",
      period: "Feb 2026 - Aug 2026",
      type: "Recent",
      highlights: [
        "Edited user-generated content (UGC) videos for brand campaigns, ensuring alignment with platform trends and audience preferences.",
        "Collaborated with content creators to refine raw footage into polished, high-performing video assets.",
        "Applied editing techniques (cuts, pacing, captions, sound design) to maximize authenticity and viewer engagement typical of UGC-style content."
      ]
    },
    {
      role: "Video Editor",
      company: "Ekido Creative Agency",
      location: "Indonesia",
      period: "Mar 2024 - Mar 2025",
      type: "Agency",
      highlights: [
        "Managed end-to-end video production (planning, editing, and optimization) to support brand awareness and audience engagement goals.",
        "Enhanced storytelling and viewer retention through custom animations, transitions, and subtitles.",
        "Adapted video format and duration to meet platform-specific requirements (e.g., Instagram, TikTok, YouTube).",
        "Achieved up to 30,000 views per video through consistent, trend-relevant content strategy."
      ]
    }
  ],

  // EDUCATION (FROM RESUME)
  education: {
    institution: "University of Muhammadiyah Bandung",
    country: "Indonesia",
    degree: "Bachelor of Informatics Engineering",
    period: "Oct 2023 - Jul 2027 (Expected)",
    gpa: "3.80 / 4.00"
  },

  // SKILLS & COMPETENCIES
  skills: [
    { name: "Video Editing", level: "Expert" },
    { name: "Short-Form / Reels / TikTok", level: "Expert" },
    { name: "Storytelling & Pacing", level: "Advanced" },
    { name: "Motion Graphics", level: "Advanced" },
    { name: "2D Animation", level: "Advanced" },
    { name: "Kinetic Subtitles & Captions", level: "Expert" },
    { name: "Color Grading & LUTs", level: "Advanced" },
    { name: "Sound Design & Audio Mixing", level: "Advanced" },
    { name: "AI Ad & UGC Workflows", level: "Advanced" }
  ],

  // TOOLS & SOFTWARE
  tools: [
    "Adobe Premiere Pro",
    "Adobe After Effects",
    "CapCut Pro",
    "DaVinci Resolve",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "AI Creative Tools"
  ]
};
