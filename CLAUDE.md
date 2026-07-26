# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

James Williams' personal portfolio site (wewantwilliams.com), served as plain static HTML/CSS/JS from GitHub Pages — no framework, no bundler, no `package.json`. `.github/workflows/static.yml` deploys the entire repo root to Pages on every push to `main`.

## Running locally

There is no dev server or build step. Serve the folder with any static file server and open it, e.g.:

```
python3 -m http.server 8000
```

Then visit `index.html`, `resume.html`, or `projects/<name>.html` directly. There is no lint/test/build command — none exist in this repo.

## Page inventory

- `index.html` — the single-page portfolio (About, Projects, Education, Skills, CAD, AI Models, Experience, Contact sections by `id`).
- `resume.html` — a separate interactive resume builder/exporter.
- `projects/*.html` — standalone project detail pages, one per project.
- `resume.css`, `projects/project-detail.css` — page-specific stylesheets layered on top of the shared `style.css`.

**`components/header.html` and `components/footer.html` are empty and unused** — nothing includes them. Every page (`index.html`, `resume.html`, each `projects/*.html`) hand-duplicates its own `<header>`/nav and `<footer>` markup inline. If you're editing nav or footer content, you must edit it in every page separately; there is no shared include.

## Project content is NOT single-sourced — verify before describing a project

This is the main trap in this repo. There are three independent places project info lives, and they can (and do) disagree:

1. **`js/projects-data.js`** — a `projectsData` object keyed by slug (`autosteer-tractor`, `piglet-vision`, `agri-robotics-club`, `autonomous-farming-tool`). This is only actually consumed for two things:
   - `index.html` calls `getAllSkills()` to build the aggregated Skills section.
   - Each `projects/<slug>.html` page calls `getProjectData(slug)` in an inline `<script>` to populate its tech-icon strip — currently only `piglet-vision.html` and `autosteer-tractor.html` do this.
   It does **not** drive the project card text on `index.html`, nor the prose/hero content on the detail pages — those are hand-written HTML. Note the `agri-robotics-club` key has no corresponding `projects/*.html` page (see below) — it only feeds the skills aggregation now.
2. **`index.html` `.ps-item` cards** — hardcoded HTML per project (title, description, tags, links), spread across the `#projects`, `#education`, `#cad`, `#ai-models`, `#experience`, and `#student-orgs` showcase sections. Edited independently of `projects-data.js`.
3. **`projects/*.html`** — hand-written detail pages with their own hero text/tags, separate again from both of the above.

Don't assume the data file, the index cards, and the detail pages agree — when asked about a specific project's facts, check the actual detail page and/or `index.html` card, not just `projects-data.js`.

**Resolved 2026-07-26:** `projects/asabe-robot.html` (the real, detailed ASABE robot writeup — competition results, video, design report PDF) and `projects/agri-robotics-club.html` (a stale draft of the same robot with different, inaccurate specs — LiDAR, 4G/LTE, ROS Noetic, none of which the real robot has) used to both exist and be linked from two different `index.html` sections (`#projects` and `#student-orgs`). The `#student-orgs` card's `onclick="navigateTo(...)"` also called a function that didn't exist anywhere in the codebase, silently breaking the card body click. Fixed: the `#student-orgs` card now points at `asabe-robot.html` via `window.location.href` like every other card, and `agri-robotics-club.html` was deleted. `projects/annotation-workflow.html` (a complete page about the MMPose/HPCC pipeline, cross-linking to `piglet-vision.html`) is still intentionally unlinked from `index.html` — that's a known gap, not a bug, per the site owner's call.

## Resume builder (`resume.html`)

- `js/resume-data.js` — `resumeData`: the actual source of truth for resume content. Experience/project bullets are pre-written in multiple variants, keyed by focus area (`all`/`robotics`/`software`/`computer-vision`/`mechatronics`) and by `compact` vs full detail level — these are static hand-written alternate phrasings, not generated.
- `js/resume-generator.js` — renders `resumeData` into `#resume`, handles the focus/detail toggle buttons, the compact-mode "shrink to fit one page" bullet-trimming logic (`fitToOnePage`), and PDF export via `html2pdf.js` (loaded from a CDN `<script>` tag, not npm).
- **Tailored presets (replaced the old live AI Tailor feature on 2026-07-26)**: `js/resume-presets.js` holds a hand-written `resumePresets` object, empty by default. The "Tailored For" `<select>` on `resume.html` is populated from its keys at load time; picking one calls `applyPreset()` in `resume-generator.js`, which renders that preset's curated `subtitle`/`skillsSummary`/bullet selections instead of the default `resumeData` view — entirely static, no API calls, no key required from visitors. The old version called xAI's Grok API directly from the browser using a visitor-supplied key stored in `localStorage`; that only ever worked for James himself (recruiters won't have an xAI key) and was removed. New presets are meant to be added periodically by hand in `js/resume-presets.js` — every bullet in a preset must be copied/reworded from `resumeData`, never invented, per the comment at the top of that file.

## Shared client-side behavior

- `script.js` — index.html-only interactions: smooth-scroll nav, mobile menu toggle, hero background slideshow, scroll-triggered reveal animations, and the education section's randomized "sticker field" placement/shockwave effect.
- `js/transitions.js` — the page-transition curtain (wipe animation) shown when navigating from `index.html` into a project page or back; coordinated via a `sessionStorage.pageTransition` flag and a `#page-curtain` element injected on both ends of the navigation.
