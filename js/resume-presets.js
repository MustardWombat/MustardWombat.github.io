// Hand-written tailored resume presets — no live API, no per-visitor key.
// James adds/updates an entry here whenever he's targeting a specific role;
// the "Tailored For" dropdown on resume.html reads its options from this file.
//
// Every bullet must be copied or reworded from the source content already in
// js/resume-data.js — never invent a fact, tool, or metric that isn't already
// there. Shape consumed by applyPreset() in js/resume-generator.js:
//
// const resumePresets = {
//     'some-role-slug': {
//         label: 'Robotics Software Engineer @ Company',   // shown in the dropdown + PDF filename + banner
//         subtitle: 'A 1-line tailored headline',
//         skillsSummary: 'Comma-separated skills, most relevant first',
//         experience: [
//             {
//                 role: 'Undergraduate Research Assistant – Michigan State University', // must match "title – organization" in resumeData.experience
//                 projects: [
//                     {
//                         title: 'Autosteer Tractor Guidance System', // must match a researchProjects title
//                         primaryBullets: ['...', '...'],
//                         additionalBullets: ['...']
//                     }
//                 ]
//             }
//         ],
//         projects: [
//             {
//                 title: 'Road-Rater – ...', // must match a resumeData.projects title
//                 date: 'January 2026',
//                 primaryBullets: ['...'],
//                 additionalBullets: ['...']
//             }
//         ]
//     }
// };

const resumePresets = {};
