// Resume Generator JavaScript
// Uses data from resume-data.js

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-pdf');

    // Current state
    let currentFocus = 'all';
    let currentDetail = 'technical'; // 'technical' or 'compact'

    // ── Tailored Preset State ──────────────────────────────────────
    // Presets are hand-written in js/resume-presets.js — added periodically
    // when James wants a resume pre-tailored for a specific role. No live
    // API calls; nothing here depends on visitors having any credentials.
    //
    // Preset buttons are injected as plain .focus-btn elements into the same
    // group as All Skills/Robotics/etc. — one shared row, one mutually
    // exclusive selection, same click handler. Not a separate control.
    let activePreset = null; // null = normal mode; object from resumePresets = preset mode

    const tailorSelector = document.getElementById('tailor-selector');
    if (tailorSelector) {
        Object.keys(resumePresets).forEach(function(key) {
            const btn = document.createElement('button');
            btn.className = 'focus-btn';
            btn.dataset.preset = key;
            btn.textContent = resumePresets[key].label;
            tailorSelector.appendChild(btn);
        });
    }

    // Captured after preset buttons are injected so they're included in the group.
    const focusButtons = document.querySelectorAll('.focus-btn');
    const detailButtons = document.querySelectorAll('.detail-btn');

    // ── Render the active tailored preset ─────────────────────────
    function applyPreset() {
        if (!activePreset) return;

        // Subtitle
        const subtitleEl = document.getElementById('resume-subtitle');
        if (subtitleEl) subtitleEl.textContent = activePreset.subtitle;

        updateContactInfo();
        updateEducation(currentDetail);

        // Skills — replace with the preset's curated summary
        const skillsContainer = document.getElementById('resume-skills');
        if (skillsContainer) {
            skillsContainer.innerHTML =
                '<ul><li><strong>Relevant Skills:</strong> ' +
                activePreset.skillsSummary + '</li></ul>';
        }

        // fillQueue: [{ulEl, bullets:[...remaining additionalBullets]}, ...]
        // Ordered so experience projects come before standalone projects (higher weight)
        const fillQueue = [];

        // Experience
        const expContainer = document.getElementById('resume-experience');
        if (expContainer) {
            expContainer.innerHTML = '';
            resumeData.experience.forEach(function(exp) {
                const presetExp = activePreset.experience.find(e => e.role === exp.title + ' – ' + exp.organization);
                if (!presetExp) return;

                const expEl = document.createElement('div');
                expEl.className = 'resume-item';

                let html = '<div class="resume-item-line">' +
                    '<strong>' + exp.title + ' – ' + exp.organization + '</strong>' +
                    '<span class="location">' + exp.location + '</span>' +
                    '</div>' +
                    '<div class="resume-item-italic">' +
                    '<span>' + exp.department + '</span>' +
                    '<span class="date">' + exp.date + '</span>' +
                    '</div>';

                expEl.innerHTML = html;
                expContainer.appendChild(expEl);

                presetExp.projects.forEach(function(presetProj) {
                    const primary    = (presetProj.primaryBullets    || presetProj.bullets || []).filter(Boolean);
                    const additional = (presetProj.additionalBullets || []).filter(Boolean);
                    if (primary.length === 0 && additional.length === 0) return;

                    const subDiv = document.createElement('div');
                    subDiv.className = 'resume-subproject';
                    subDiv.innerHTML = '<div class="resume-subproject-title"><em>' + presetProj.title + '</em></div>';

                    const ul = document.createElement('ul');
                    primary.forEach(b => {
                        const li = document.createElement('li');
                        li.textContent = b;
                        ul.appendChild(li);
                    });
                    subDiv.appendChild(ul);
                    expEl.appendChild(subDiv);

                    if (additional.length > 0) {
                        // Weight: experience bullets are higher priority (push to front later)
                        fillQueue.push({ ulEl: ul, bullets: additional.slice(), weight: 2 });
                    }
                });
            });
        }

        // Projects
        const projContainer = document.getElementById('resume-projects');
        if (projContainer) {
            projContainer.innerHTML = '';
            activePreset.projects.forEach(function(presetProj) {
                const primary    = (presetProj.primaryBullets    || presetProj.bullets || []).filter(Boolean);
                const additional = (presetProj.additionalBullets || []).filter(Boolean);
                if (primary.length === 0 && additional.length === 0) return;

                const orig = resumeData.projects.find(p => p.title === presetProj.title) || presetProj;

                const projEl = document.createElement('div');
                projEl.className = 'resume-project';

                let header = '<div class="resume-project-line"><strong>' + orig.title + '</strong></div>';
                if (presetProj.date) header += '<div class="resume-project-date">' + presetProj.date + '</div>';
                projEl.innerHTML = header;

                const ul = document.createElement('ul');
                primary.forEach(b => {
                    const li = document.createElement('li');
                    li.textContent = b;
                    ul.appendChild(li);
                });
                projEl.appendChild(ul);
                projContainer.appendChild(projEl);

                if (additional.length > 0) {
                    fillQueue.push({ ulEl: ul, bullets: additional.slice(), weight: 1 });
                }
            });
        }


        // Fill to at least one page after layout settles
        if (fillQueue.length > 0) {
            requestAnimationFrame(() => fillPresetToOnePage(fillQueue));
        }
    }

    // ── Fill preset resume to at least one page ───────────────────
    // Round-robins through additional bullets (weighted: experience > projects)
    // until scrollHeight >= one page height, or all bullets used
    function fillPresetToOnePage(fillQueue) {
        const resume = document.getElementById('resume');
        // One page = letter width / 0.7727 (8.5" wide, 11" tall → 11/8.5 ≈ 1.294)
        // but we use the resume's own rendered width for accuracy
        const targetHeight = Math.max((resume.offsetWidth / 8.5) * 11, 900);

        if (resume.scrollHeight >= targetHeight) return; // already fills a page

        // Sort fill queue: higher weight (experience) goes first in each pass
        fillQueue.sort((a, b) => b.weight - a.weight);

        let progress = true;
        while (progress && resume.scrollHeight < targetHeight) {
            progress = false;
            for (const entry of fillQueue) {
                if (entry.bullets.length === 0) continue;
                if (resume.scrollHeight >= targetHeight) break;
                const bullet = entry.bullets.shift();
                if (!bullet || !bullet.trim()) continue;
                const li = document.createElement('li');
                li.textContent = bullet;
                entry.ulEl.appendChild(li);
                progress = true;
            }
        }
    }

    // Page height calculation:
    // Letter paper = 11 inches, margins = 0.5in top + 0.5in bottom = 1 inch total
    // Usable height = 10 inches
    // At typical screen rendering with resume container width of 850px max,
    // we need to calculate based on actual rendered size
    // Approximate: 10 inches * 72 points/inch * 1.33 (px/pt) ≈ 960px
    // But this varies - we'll use the resume container's computed style
    const TARGET_PAGE_HEIGHT = 1000; // Slightly generous to maximize content

    // Initialize with default settings
    updateResume(currentFocus, currentDetail);

    function updateSubtitle() {
        const subtitleEl = document.getElementById('resume-subtitle');
        if (subtitleEl) {
            subtitleEl.textContent = resumeData.subtitle;
        }
    }

    // Focus / preset button click handlers — one mutually exclusive group
    focusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            focusButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const presetKey = this.dataset.preset;
            if (presetKey) {
                activePreset = resumePresets[presetKey];
                applyPreset();
            } else {
                currentFocus = this.dataset.focus;
                activePreset = null;
                updateResume(currentFocus, currentDetail);
            }
        });
    });

    // Detail level button click handlers
    detailButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            detailButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDetail = this.dataset.detail;
            if (activePreset) {
                applyPreset();
            } else {
                updateResume(currentFocus, currentDetail);
                if (currentDetail === 'compact') {
                    setTimeout(() => {
                        console.log('[DEBUG] Calling fitToOnePage after detail switch');
                        fitToOnePage(currentFocus);
                    }, 100);
                }
            }
        });
    });
    
    // Dynamic fitting for compact mode
    function fitToOnePage(focus) {
        const resume = document.getElementById('resume');
        const resumeWidth = resume.offsetWidth;
        const targetHeight = resumeWidth / 0.75; // Standard letter aspect ratio
        // --- Recruiter-style bullet selection ---
        // Hardcoded value scores for experience and project bullets
        // (In a real system, this would be dynamic or data-driven)
        const expBulletScores = [
            10, // Most valuable
            9,
            8,
            7,
            6,
            5,
            4,
            3,
            2,
            1  // Least valuable
        ];
        const projBulletScores = [
            10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ];
        // Helper to get top N unique bullets by score
        function getTopBullets(bullets, scores, n) {
            const seen = new Set();
            return bullets
                .map((b, i) => ({ b, score: scores[i] || 0 }))
                .sort((a, b) => b.score - a.score)
                .filter(x => {
                    if (!x.b || seen.has(x.b)) return false;
                    seen.add(x.b);
                    return true;
                })
                .slice(0, n)
                .map(x => x.b);
        }
        // Try all combinations of exp/proj bullet counts that fit
        let bestExp = 1, bestProj = 1, bestTotal = 0;
        let maxExp = expBulletScores.length, maxProj = projBulletScores.length;
        for (let e = 1; e <= maxExp; e++) {
            for (let p = 1; p <= maxProj; p++) {
                // Get top bullets for each
                let expBulletsArr = getTopBullets(resumeData.experience[0].researchProjects.map(rp => (rp.bullets.compact||[])[0]).filter(Boolean), expBulletScores, e);
                let projBulletsArr = getTopBullets((resumeData.projects[0]?.bullets?.compact||[]), projBulletScores, p);
                // Render
                updateContactInfo();
                updateEducation('compact');
                updateSkills(focus);
                updateExperienceWithLimit(focus, 'compact', expBulletsArr.length);
                updateProjectsWithLimit(focus, 'compact', projBulletsArr.length);
                let h = resume.scrollHeight;
                let totalBullets = expBulletsArr.length + projBulletsArr.length;
                // Prioritize more experience bullets, then total bullets
                if (h <= targetHeight && (expBulletsArr.length > bestExp || (expBulletsArr.length === bestExp && totalBullets > bestTotal))) {
                    bestExp = expBulletsArr.length;
                    bestProj = projBulletsArr.length;
                    bestTotal = totalBullets;
                }
            }
        }
        // Final render with best fit
        updateContactInfo();
        updateEducation('compact');
        updateSkills(focus);
        updateExperienceWithLimit(focus, 'compact', bestExp);
        updateProjectsWithLimit(focus, 'compact', bestProj);
        let h = resume.scrollHeight;
        updatePageIndicator(h, targetHeight, Math.max(bestExp, bestProj));
    }
    
    function updatePageIndicator(height, targetHeight, bullets) {
        let indicator = document.getElementById('page-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'page-indicator';
            indicator.style.cssText = 'text-align: center; padding: 0.5rem; margin-bottom: 1rem; border-radius: 5px; font-size: 0.9rem;';
            const controls = document.querySelector('.resume-controls');
            controls.appendChild(indicator);
        }
        
        const fits = height <= targetHeight;
        indicator.style.background = fits ? '#d4edda' : '#f8d7da';
        indicator.style.color = fits ? '#155724' : '#721c24';
        indicator.textContent = fits 
            ? '✓ Fits on 1 page (' + bullets + ' bullets per section)' 
            : '⚠ Exceeds 1 page (' + Math.round(height) + 'px / ' + Math.round(targetHeight) + 'px target)';
    }
    
    function updateExperienceWithLimit(focus, detail, maxBullets) {
        const expContainer = document.getElementById('resume-experience');
        if (!expContainer) return;
        
        expContainer.innerHTML = '';
        resumeData.experience.forEach(function(exp) {
            const expEl = document.createElement('div');
            expEl.className = 'resume-item';
            
            let html = '<div class="resume-item-line">' +
                    '<strong>' + exp.title + ' – ' + exp.organization + '</strong>' +
                    '<span class="location">' + exp.location + '</span>' +
                '</div>' +
                '<div class="resume-item-italic">' +
                    '<span>' + exp.department + '</span>' +
                    '<span class="date">' + exp.date + '</span>' +
                '</div>';
            
            if (exp.researchProjects && exp.researchProjects.length > 0) {
                exp.researchProjects.forEach(function(project) {
                    let bulletKey = detail === 'compact' ? 'compact' : focus;
                    let bulletList = project.bullets[bulletKey] || project.bullets['all'] || [];
                    
                    // Limit bullets dynamically
                    if (bulletList.length > maxBullets) {
                        bulletList = bulletList.slice(0, maxBullets);
                    }
                    
                    if (bulletList.length === 0) return;
                    
                    let bullets = '';
                    bulletList.forEach(function(b) {
                        if (b && b.trim()) {
                            bullets += '<li>' + b + '</li>';
                        }
                    });
                    
                    if (bullets) {
                        html += '<div class="resume-subproject">' +
                            '<div class="resume-subproject-title"><em>' + project.title + '</em></div>' +
                            '<ul>' + bullets + '</ul>' +
                        '</div>';
                    }
                });
            }
            
            expEl.innerHTML = html;
            expContainer.appendChild(expEl);
        });
    }
    
    function updateProjectsWithLimit(focus, detail, maxBullets) {
        const projectsContainer = document.getElementById('resume-projects');
        if (!projectsContainer) return;
        
        projectsContainer.innerHTML = '';
        
        resumeData.projects.forEach(function(project) {
            let bulletKey = detail === 'compact' ? 'compact' : focus;
            let bulletList = project.bullets[bulletKey] || project.bullets['all'] || [];
            
            // Limit bullets dynamically
            if (bulletList.length > maxBullets) {
                bulletList = bulletList.slice(0, maxBullets);
            }
            
            if (bulletList.length === 0) return;
            
            let bullets = '';
            bulletList.forEach(function(b) {
                if (b && b.trim()) {
                    bullets += '<li>' + b + '</li>';
                }
            });
            
            if (!bullets) return;
            
            const projEl = document.createElement('div');
            projEl.className = 'resume-project';
            
            let html = '<div class="resume-project-line">' +
                '<strong>' + project.title + '</strong>';
            if (project.location && project.location.trim()) {
                html += '<span class="location">' + project.location + '</span>';
            }
            html += '</div>';
            
            if (project.date && project.date.trim()) {
                html += '<div class="resume-project-date">' + project.date + '</div>';
            }
            
            html += '<ul>' + bullets + '</ul>';
            
            projEl.innerHTML = html;
            projectsContainer.appendChild(projEl);
        });
    }

    // Download PDF — uses html2pdf.js for a clean PDF with no browser chrome
    downloadBtn.addEventListener('click', function() {
        const resume = document.getElementById('resume');
        const activeDetail = document.querySelector('.detail-btn.active').dataset.detail;
        const detailName = activeDetail === 'compact' ? '_Compact' : '';

        // Active .focus-btn may be a plain focus button or an injected preset
        // button (no dataset.focus) — name the file accordingly either way.
        let focusName;
        if (activePreset) {
            focusName = activePreset.label.replace(/\s+/g, '_');
        } else {
            const activeFocus = document.querySelector('.focus-btn.active').dataset.focus;
            focusName = activeFocus === 'all' ? 'Full' : activeFocus.replace('-', '_');
        }
        const filename = 'James_Williams_Resume_' + focusName + detailName + '.pdf';

        const opt = {
            margin:      0,
            filename:    filename,
            image:       { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
            jsPDF:       { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak:   { mode: ['avoid-all', 'css'] }
        };

        const origHTML = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⏳ Generating PDF…';
        downloadBtn.disabled = true;

        html2pdf().set(opt).from(resume).save().then(function() {
            downloadBtn.innerHTML = origHTML;
            downloadBtn.disabled = false;
        }).catch(function(err) {
            console.error('[PDF]', err);
            downloadBtn.innerHTML = origHTML;
            downloadBtn.disabled = false;
        });
    });

    function updateResume(focus, detail) {
        // Hide page indicator in technical mode
        const indicator = document.getElementById('page-indicator');
        if (indicator) {
            indicator.style.display = detail === 'compact' ? 'block' : 'none';
        }
        
        updateSubtitle();
        updateContactInfo();
        updateEducation(detail);
        updateSkills(focus);
        
        if (detail === 'compact') {
            // For compact mode, dynamically fit to one page
            // Start with all bullets and reduce until it fits
            updateExperienceWithLimit(focus, detail, 10);
            updateProjectsWithLimit(focus, detail, 10);
            setTimeout(() => {
                console.log('[DEBUG] Calling fitToOnePage from updateResume');
                fitToOnePage(focus);
            }, 100);
        } else {
            // Technical mode - show all bullets
            updateExperience(focus, detail);
            updateProjects(focus, detail);
        }
    }

    function updateContactInfo() {
        const contactLine = document.getElementById('resume-contact-line');
        if (contactLine) {
            const c = resumeData.contact;
            contactLine.textContent = resumeData.location + ' | ' + c.email + ' | ' + c.phone + ' | ' + c.website + ' | ' + c.github;
        }
    }

    function updateEducation(detail) {
        const eduContainer = document.getElementById('resume-education');
        if (!eduContainer) return;
        
        eduContainer.innerHTML = '';
        resumeData.education.forEach(function(edu) {
            const eduEl = document.createElement('div');
            eduEl.className = 'resume-item';
            
            let html = '<div class="resume-item-line">' +
                    '<strong>' + edu.school + '</strong>' +
                    '<span class="location">' + edu.location + '</span>' +
                '</div>' +
                '<div class="resume-item-italic">' +
                    '<span>' + edu.degree + ', GPA: ' + edu.gpa + '</span>' +
                    '<span class="date">' + edu.date + '</span>' +
                '</div>';
            
            // Only show coursework in technical mode and if defined
            if (detail === 'technical' && typeof edu.coursework !== 'undefined' && edu.coursework) {
                html += '<div class="resume-coursework">' + edu.coursework + '</div>';
            }
            
            eduEl.innerHTML = html;
            eduContainer.appendChild(eduEl);
        });
    }

    function updateSkills(focus) {
        const skillsContainer = document.getElementById('resume-skills');
        if (!skillsContainer) return;

        const skills = resumeData.skills;
        let html = '<ul>';
        html += '<li><strong>Programming:</strong> ' + skills.programming + '</li>';
        html += '<li><strong>Robotics/Perception:</strong> ' + skills.robotics_perception + '</li>';
        html += '<li><strong>Data/ML:</strong> ' + skills.data_ml + '</li>';
        html += '<li><strong>Hardware:</strong> ' + skills.hardware + '</li>';
        html += '<li><strong>Tools & Frameworks:</strong> ' + skills.tools + '</li>';
        html += '</ul>';

        skillsContainer.innerHTML = html;
    }

    function updateExperience(focus, detail) {
        const expContainer = document.getElementById('resume-experience');
        if (!expContainer) return;
        
        expContainer.innerHTML = '';
        resumeData.experience.forEach(function(exp) {
            const expEl = document.createElement('div');
            expEl.className = 'resume-item';
            
            // Build header for the experience
            let html = '<div class="resume-item-line">' +
                    '<strong>' + exp.title + ' – ' + exp.organization + '</strong>' +
                    '<span class="location">' + exp.location + '</span>' +
                '</div>' +
                '<div class="resume-item-italic">' +
                    '<span>' + exp.department + '</span>' +
                    '<span class="date">' + exp.date + '</span>' +
                '</div>';
            
            // Add research projects under this experience
            if (exp.researchProjects && exp.researchProjects.length > 0) {
                exp.researchProjects.forEach(function(project) {
                    // For compact mode, use 'compact' bullets if available, else 'all'
                    // For technical mode, use focus-specific bullets
                    let bulletKey = detail === 'compact' ? 'compact' : focus;
                    let bulletList = project.bullets[bulletKey] || project.bullets['all'] || [];
                    
                    // In compact mode, limit to 3 bullets per project
                    if (detail === 'compact' && bulletList.length > 3) {
                        bulletList = bulletList.slice(0, 3);
                    }
                    
                    // Skip if no bullets
                    if (bulletList.length === 0) return;
                    
                    let bullets = '';
                    bulletList.forEach(function(b) {
                        if (b && b.trim()) {
                            bullets += '<li>' + b + '</li>';
                        }
                    });
                    
                    // Only add subproject if there are bullets
                    if (bullets) {
                        html += '<div class="resume-subproject">' +
                            '<div class="resume-subproject-title"><em>' + project.title + '</em></div>' +
                            '<ul>' + bullets + '</ul>' +
                        '</div>';
                    }
                });
            }
            
            expEl.innerHTML = html;
            expContainer.appendChild(expEl);
        });
    }

    function updateProjects(focus, detail) {
        const projectsContainer = document.getElementById('resume-projects');
        if (!projectsContainer) return;
        
        projectsContainer.innerHTML = '';
        
        // Always show ALL projects, but with focus-specific bullets
        resumeData.projects.forEach(function(project) {
            // For compact mode, use 'compact' bullets if available, else 'all'
            // For technical mode, use focus-specific bullets
            let bulletKey = detail === 'compact' ? 'compact' : focus;
            let bulletList = project.bullets[bulletKey] || project.bullets['all'] || [];
            
            // In compact mode, limit to 3 bullets per project
            if (detail === 'compact' && bulletList.length > 3) {
                bulletList = bulletList.slice(0, 3);
            }
            
            // Skip if no bullets
            if (bulletList.length === 0) return;
            
            let bullets = '';
            bulletList.forEach(function(b) {
                if (b && b.trim()) {
                    bullets += '<li>' + b + '</li>';
                }
            });
            
            // Skip project if no valid bullets
            if (!bullets) return;
            
            const projEl = document.createElement('div');
            projEl.className = 'resume-project';
            
            let html = '<div class="resume-project-line">' +
                '<strong>' + project.title + '</strong>';
            if (project.location && project.location.trim()) {
                html += '<span class="location">' + project.location + '</span>';
            }
            html += '</div>';
            
            if (project.date && project.date.trim()) {
                html += '<div class="resume-project-date">' + project.date + '</div>';
            }
            
            html += '<ul>' + bullets + '</ul>';
            
            projEl.innerHTML = html;
            projectsContainer.appendChild(projEl);
        });
    }
});
