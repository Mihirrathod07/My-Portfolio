# Mihir Rathod — Portfolio Website
## VS Code Edit Guide

---

### 📁 Folder Structure

```
mihir-portfolio/
├── index.html        ← Main HTML (sections & content)
├── css/
│   └── style.css     ← All styles (colors, layout, fonts)
├── js/
│   └── main.js       ← Animations & interactions
└── assets/           ← Put your images here
```

---

### ✏️ Common Edits

#### Change Your Name / Info
→ Open `index.html`
→ Search for the text you want to change (Ctrl+F)

#### Change Colors
→ Open `css/style.css`
→ Go to Section 1 — CSS VARIABLES (top of file)
→ Change `--green`, `--bg`, `--text` etc.

#### Add a New Project
→ Open `index.html`
→ Find `<!-- PROJECTS SECTION -->`
→ Copy one `<div class="project-card">` block and paste it
→ Change the text inside

#### Add a New Skill Tag
→ Open `index.html`
→ Find the skill card you want to edit
→ Add `<span class="tag">Your Skill</span>` inside `.skill-tags`

#### Change Typed Text Phrases
→ Open `js/main.js`
→ Find Section 2 — TYPED TEXT EFFECT
→ Add/remove items from the `phrases` array

#### Add Your Photo
→ Put your image in the `assets/` folder
→ You can add it in the hero section in `index.html`

---

### 🚀 How to Run Locally

Option 1 — VS Code Live Server (Recommended):
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

Option 2 — Just open the file:
1. Double-click `index.html` to open in browser

---

### 📤 Deploy to GitHub Pages

1. Push all files to your GitHub repo
2. Go to repo Settings → Pages
3. Set source to `main` branch → `/ (root)`
4. Your site will be live at: https://Mihirrathod07.github.io/repo-name/
