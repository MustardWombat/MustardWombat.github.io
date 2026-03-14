// Resume Generator JavaScript
// Uses data from resume-data.js

document.addEventListener('DOMContentLoaded', function() {
    const focusButtons = document.querySelectorAll('.focus-btn');
    const detailButtons = document.querySelectorAll('.detail-btn');
    const downloadBtn = document.getElementById('download-pdf');

    // Current state
    let currentFocus = 'all';
    let currentDetail = 'technical'; // 'technical' or 'compact'

    // ── AI Tailor State ──────────────────────────────────────────
    let aiTailoredData = null; // null = normal mode; object = AI mode

    // Restore saved API key from localStorage
    const apiKeyInput = document.getElementById('ai-api-key');
    if (apiKeyInput && localStorage.getItem('xai_api_key')) {
        apiKeyInput.value = localStorage.getItem('xai_api_key');
    }
    if (apiKeyInput) {
        apiKeyInput.addEventListener('change', function() {
            if (this.value.trim()) {
                localStorage.setItem('xai_api_key', this.value.trim());
            } else {
                localStorage.removeItem('xai_api_key');
            }
        });
    }

    // Toggle manual JD textarea
    const jdToggleBtn = document.getElementById('ai-jd-toggle');
    const jdTextarea  = document.getElementById('ai-job-desc');
    let jdExpanded = false;
    if (jdToggleBtn) {
        jdToggleBtn.addEventListener('click', function() {
            jdExpanded = !jdExpanded;
            jdTextarea.style.display = jdExpanded ? 'block' : 'none';
            jdToggleBtn.textContent  = jdExpanded
                ? '− Hide job description'
                : '+ Paste job description manually instead';
        });
    }

    document.getElementById('ai-generate-btn').addEventListener('click', generateAiResume);
    document.getElementById('ai-clear-btn').addEventListener('click', clearAiMode);

    // ── Build the prompt sent to Grok ────────────────────────────
    function buildPrompt(jobTitle, company, jobInfo) {
        // Flatten all bullet content so the model can choose the best ones
        const expFlat = resumeData.experience.map(exp => ({
            role: exp.title + ' – ' + exp.organization,
            projects: exp.researchProjects.map(rp => ({
                title: rp.title,
                bullets: Object.values(rp.bullets).flat()
                    .filter((b, i, a) => b && a.indexOf(b) === i) // unique
            }))
        }));

        const projFlat = resumeData.projects.map(p => ({
            title: p.title,
            date: p.date,
            bullets: Object.values(p.bullets).flat()
                .filter((b, i, a) => b && a.indexOf(b) === i)
        }));

        const skillsRaw = resumeData.skills;

        // Build a flat list of every tool/technology explicitly mentioned in the source data
        // so the model can reference it for fact-checking
        const allSourceText = [
            JSON.stringify(skillsRaw),
            ...expFlat.map(e => JSON.stringify(e)),
            ...projFlat.map(p => JSON.stringify(p))
        ].join(' ');

        const jdBlock = jobInfo.found
            ? `ACTUAL JOB POSTING (scraped from the web):
Title: ${jobInfo.title || jobTitle}
Required Skills: ${(jobInfo.requiredSkills || []).join(', ')}
Preferred Skills: ${(jobInfo.preferredSkills || []).join(', ')}
Key Responsibilities: ${(jobInfo.keyResponsibilities || []).join(' | ')}
ATS Keywords to target: ${(jobInfo.atsKeywords || []).join(', ')}
Full description excerpt: ${jobInfo.jobDescription || ''}`
            : `No live posting found — use general knowledge of "${jobTitle}" roles at companies like "${company}".`;

        return `You are an expert resume writer and ATS optimization specialist.
Your ONLY job is to SELECT and lightly REWORD the candidate's existing bullets to better match the job posting language.
You are NOT a creative writer. You cannot add any fact, tool, language, framework, or metric that does not already appear in the SOURCE BULLETS below.

TARGET ROLE: ${jobTitle} at ${company}

${jdBlock}

════════════════════════════════════════════════════
CANDIDATE SOURCE DATA — THE ONLY FACTS YOU MAY USE
════════════════════════════════════════════════════

SKILLS:
${JSON.stringify(skillsRaw, null, 2)}

EXPERIENCE SOURCE BULLETS:
${JSON.stringify(expFlat, null, 2)}

PROJECT SOURCE BULLETS:
${JSON.stringify(projFlat, null, 2)}

════════════════════════════════════════════════════
STRICT RULES — VIOLATIONS ARE NOT ACCEPTABLE
════════════════════════════════════════════════════
1. NEVER mention a tool, language, library, framework, metric, or technology that does not appear word-for-word in the source data above. If "Java" is not in the source data, do not write "Java". If "ROS" is not in a source bullet for a project, do not add it.
2. You MAY rephrase a bullet to use a synonym or the job posting's terminology ONLY if the underlying fact is already in the source — e.g. if source says "cross-track error" and JD says "lateral positioning error", that rephrasing is fine. But do NOT add new technical claims.
3. Every number, percentage, and measurement in your output must come verbatim from a source bullet.
4. skillsSummary must only list skills that appear in the SKILLS section above.
5. Only include projects genuinely relevant to this role.
6. Order projects by relevance to this specific posting (most relevant first).
7. Return 2-4 projects total in the projects array.

Return ONLY valid JSON (no markdown, no extra text) matching this exact schema:
{
  "subtitle": "A 1-line tailored headline using only the candidate's actual experience areas",
  "skillsSummary": "Comma-separated string of the most ATS-relevant skills — ONLY from the SKILLS section above, using job posting terminology where exact equivalents exist",
  "experience": [
    {
      "role": "exact role string from input",
      "projects": [
        {
          "title": "exact project title from input",
          "primaryBullets": ["2-3 must-show bullets — the single most ATS-critical facts, reworded to match JD language"],
          "additionalBullets": ["up to 4 more bullets ordered by descending relevance — used to fill page space, same factual rules apply"]
        }
      ]
    }
  ],
  "projects": [
    {
      "title": "exact project title from input",
      "date": "exact date from input",
      "primaryBullets": ["2 must-show bullets"],
      "additionalBullets": ["up to 3 more bullets ordered by descending relevance"]
    }
  ]
}`;
    }

    // ── Phase 1: Resolve the job posting (3-tier) ────────────────
    // Tier 1: User pasted JD text → parse it directly (no API call needed for search)
    // Tier 2: User provided URL  → Grok fetches that URL
    // Tier 3: No URL/JD          → Grok web-searches (best effort)
    async function searchJobPosting(jobTitle, company, apiKey) {
        const pastedJD  = document.getElementById('ai-job-desc').value.trim();
        const jobUrl    = document.getElementById('ai-job-url').value.trim();

        // ── Tier 1: pasted JD ──────────────────────────────────────
        if (pastedJD) {
            const response = await fetch('https://api.x.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({
                    model: 'grok-3',
                    messages: [{
                        role: 'user',
                        content: `Extract structured data from this job description.\n\nJOB DESCRIPTION:\n${pastedJD}\n\n` +
                            `Return ONLY valid JSON (no markdown): ` +
                            `{ "found": true, "title": "job title", "jobDescription": "full text", ` +
                            `"requiredSkills": [...], "preferredSkills": [...], ` +
                            `"keyResponsibilities": [...], "atsKeywords": [...] }`
                    }],
                    temperature: 0.1
                })
            });
            if (!response.ok) throw new Error('Parse API error ' + response.status);
            const data = await response.json();
            const raw  = data.choices[0].message.content.trim()
                .replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
            const result = JSON.parse(raw);
            result._source = 'pasted';
            return result;
        }

        // ── Tier 2: URL provided → Grok fetches it ─────────────────
        if (jobUrl) {
            const response = await fetch('https://api.x.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({
                    model: 'grok-3',
                    search_parameters: { mode: 'on' },
                    messages: [{
                        role: 'user',
                        content: `Fetch and read the job posting at this URL: ${jobUrl}\n\n` +
                            `Extract structured data from it. ` +
                            `Return ONLY valid JSON (no markdown): ` +
                            `{ "found": true, "title": "job title", "jobDescription": "full text or detailed summary", ` +
                            `"requiredSkills": [...], "preferredSkills": [...], ` +
                            `"keyResponsibilities": [...], "atsKeywords": [...] }. ` +
                            `If the page cannot be accessed, return { "found": false }.`
                    }],
                    temperature: 0.1
                })
            });
            if (!response.ok) throw new Error('Fetch API error ' + response.status);
            const data = await response.json();
            const raw  = data.choices[0].message.content.trim()
                .replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
            const result = JSON.parse(raw);
            result._source = 'url';
            return result;
        }

        // ── Tier 3: Search (best effort) ───────────────────────────
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'grok-3',
                search_parameters: { mode: 'on' },
                messages: [{
                    role: 'user',
                    content: `Search the web right now for a current open job posting for "${jobTitle}" at "${company}". ` +
                        `Try these searches in order: ` +
                        `1) site:${company.toLowerCase().replace(/\s+/g, '')}.com/careers "${jobTitle}" ` +
                        `2) "${company}" "${jobTitle}" job posting site:careers.* OR site:jobs.* ` +
                        `3) "${company}" "${jobTitle}" -site:linkedin.com -site:indeed.com ` +
                        `4) "${company}" "${jobTitle}" job description requirements ` +
                        `If you find a real posting, return ONLY valid JSON (no markdown): ` +
                        `{ "found": true, "title": "exact job title", ` +
                        `"jobDescription": "full text or summary (500+ words)", ` +
                        `"requiredSkills": [...], "preferredSkills": [...], ` +
                        `"keyResponsibilities": [...], "atsKeywords": [...] }. ` +
                        `If no real posting is found, return { "found": false }.`
                }],
                temperature: 0.1
            })
        });
        if (!response.ok) throw new Error('Search API error ' + response.status);
        const data = await response.json();
        const raw  = data.choices[0].message.content.trim()
            .replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
        const result = JSON.parse(raw);
        result._source = 'search';
        return result;
    }

    // ── Phase 2: Tailor resume using the found JD ─────────────────────────
    async function tailorResume(jobTitle, company, jobInfo, apiKey) {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'grok-3',
                messages: [{ role: 'user', content: buildPrompt(jobTitle, company, jobInfo) }],
                temperature: 0.4
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || 'Tailor API error ' + response.status);
        }

        const data = await response.json();
        const raw  = data.choices[0].message.content.trim();
        const jsonStr = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
        return JSON.parse(jsonStr);
    }

    // ── Main entry point ──────────────────────────────────────────────────
    async function generateAiResume() {
        const jobTitle = document.getElementById('ai-job-title').value.trim();
        const company  = document.getElementById('ai-company').value.trim();
        const apiKey   = document.getElementById('ai-api-key').value.trim();
        const genBtn   = document.getElementById('ai-generate-btn');

        if (!jobTitle || !company) {
            setAiStatus('⚠ Please enter both a job title and company.', 'error');
            return;
        }
        if (!apiKey) {
            setAiStatus('⚠ Please enter your xAI API key.', 'error');
            return;
        }

        localStorage.setItem('xai_api_key', apiKey);
        genBtn.disabled = true;

        try {
            // Phase 1 — resolve JD
            const pastedJD = document.getElementById('ai-job-desc').value.trim();
            const jobUrl   = document.getElementById('ai-job-url').value.trim();
            const phase1Msg = pastedJD ? '📋 Parsing pasted job description…'
                            : jobUrl   ? '🔗 Fetching job posting from URL…'
                            :            '🔍 Searching for live job posting…';
            setAiStatus(phase1Msg, 'loading');

            let jobInfo = { found: false };
            try {
                jobInfo = await searchJobPosting(jobTitle, company, apiKey);
            } catch (searchErr) {
                console.warn('[AI Resume] Search phase failed, continuing without JD:', searchErr);
            }

            const sourceLabel = jobInfo._source === 'pasted' ? 'parsed from paste'
                              : jobInfo._source === 'url'    ? 'fetched from URL'
                              :                                'web search';
            const foundMsg = jobInfo.found
                ? `📄 JD found (${sourceLabel}) — tailoring resume…`
                : '⚠ No live posting found — using role knowledge to tailor…';
            setAiStatus(foundMsg, 'loading');

            // Phase 2 — tailor
            aiTailoredData = await tailorResume(jobTitle, company, jobInfo, apiKey);
            aiTailoredData._jobTitle    = jobTitle;
            aiTailoredData._company     = company;
            aiTailoredData._jdFound     = jobInfo.found;
            aiTailoredData._jdSource    = jobInfo._source || 'search';
            aiTailoredData._atsKeywords = jobInfo.atsKeywords || [];

            applyAiResume();
            document.getElementById('ai-clear-btn').style.display = '';

            const atsNote = aiTailoredData._atsKeywords.length
                ? ' · ATS keywords: ' + aiTailoredData._atsKeywords.slice(0, 5).join(', ')
                : '';
            setAiStatus('✅ Tailored for ' + jobTitle + ' at ' + company + atsNote, 'success');

        } catch (e) {
            console.error('[AI Resume]', e);
            setAiStatus('❌ ' + e.message, 'error');
        } finally {
            genBtn.disabled = false;
        }
    }

    function setAiStatus(msg, type) {
        const el = document.getElementById('ai-status');
        el.textContent = msg;
        el.className = 'ai-status ai-status-' + type;
    }

    // ── Render the AI-tailored resume ────────────────────────────
    function applyAiResume() {
        if (!aiTailoredData) return;

        // Subtitle
        const subtitleEl = document.getElementById('resume-subtitle');
        if (subtitleEl) subtitleEl.textContent = aiTailoredData.subtitle;

        updateContactInfo();
        updateEducation(currentDetail);

        // Skills — replace with AI-curated summary
        const skillsContainer = document.getElementById('resume-skills');
        if (skillsContainer) {
            skillsContainer.innerHTML =
                '<ul><li><strong>Relevant Skills:</strong> ' +
                aiTailoredData.skillsSummary + '</li></ul>';
        }

        // fillQueue: [{ulEl, bullets:[...remaining additionalBullets]}, ...]
        // Ordered so experience projects come before standalone projects (higher weight)
        const fillQueue = [];

        // Experience
        const expContainer = document.getElementById('resume-experience');
        if (expContainer) {
            expContainer.innerHTML = '';
            resumeData.experience.forEach(function(exp) {
                const aiExp = aiTailoredData.experience.find(e => e.role === exp.title + ' – ' + exp.organization);
                if (!aiExp) return;

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

                aiExp.projects.forEach(function(aiProj) {
                    const primary    = (aiProj.primaryBullets    || aiProj.bullets || []).filter(Boolean);
                    const additional = (aiProj.additionalBullets || []).filter(Boolean);
                    if (primary.length === 0 && additional.length === 0) return;

                    const subDiv = document.createElement('div');
                    subDiv.className = 'resume-subproject';
                    subDiv.innerHTML = '<div class="resume-subproject-title"><em>' + aiProj.title + '</em></div>';

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
            aiTailoredData.projects.forEach(function(aiProj) {
                const primary    = (aiProj.primaryBullets    || aiProj.bullets || []).filter(Boolean);
                const additional = (aiProj.additionalBullets || []).filter(Boolean);
                if (primary.length === 0 && additional.length === 0) return;

                const orig = resumeData.projects.find(p => p.title === aiProj.title) || aiProj;

                const projEl = document.createElement('div');
                projEl.className = 'resume-project';

                let header = '<div class="resume-project-line"><strong>' + orig.title + '</strong></div>';
                if (aiProj.date) header += '<div class="resume-project-date">' + aiProj.date + '</div>';
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

        // Add AI banner to resume
        const resume = document.getElementById('resume');
        let banner = document.getElementById('ai-mode-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'ai-mode-banner';
            banner.className = 'ai-mode-banner';
            resume.insertBefore(banner, resume.firstChild);
        }
        const sourceLabel = aiTailoredData._jdFound
            ? ({ pasted: '· JD parsed', url: '· fetched from URL', search: '· live posting scraped' }[aiTailoredData._jdSource] || '· JD found')
            : '· using role knowledge';
        banner.textContent = '✨ AI-Tailored for: ' + aiTailoredData._jobTitle + ' @ ' + aiTailoredData._company
            + ' ' + sourceLabel;

        // Fill to at least one page after layout settles
        if (fillQueue.length > 0) {
            requestAnimationFrame(() => fillAiToOnePage(fillQueue));
        }
    }

    // ── Fill AI resume to at least one page ──────────────────────
    // Round-robins through additional bullets (weighted: experience > projects)
    // until scrollHeight >= one page height, or all bullets used
    function fillAiToOnePage(fillQueue) {
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

    function clearAiMode() {
        aiTailoredData = null;
        const banner = document.getElementById('ai-mode-banner');
        if (banner) banner.remove();
        document.getElementById('ai-clear-btn').style.display = 'none';
        setAiStatus('', '');
        updateResume(currentFocus, currentDetail);
    }
    // ── End AI Tailor ────────────────────────────────────────────
    
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

    // Focus button click handlers
    focusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            focusButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFocus = this.dataset.focus;
            if (aiTailoredData) {
                applyAiResume(); // re-render AI resume (focus doesn't change AI output)
            } else {
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
            if (aiTailoredData) {
                applyAiResume();
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
        const activeFocus = document.querySelector('.focus-btn.active').dataset.focus;
        const activeDetail = document.querySelector('.detail-btn.active').dataset.detail;
        const focusName  = activeFocus === 'all' ? 'Full' : activeFocus.replace('-', '_');
        const detailName = activeDetail === 'compact' ? '_Compact' : '';
        const aiSuffix   = aiTailoredData
            ? '_AI_' + aiTailoredData._jobTitle.replace(/\s+/g, '_') + '_' + aiTailoredData._company.replace(/\s+/g, '_')
            : '';
        const filename = 'James_Williams_Resume_' + focusName + detailName + aiSuffix + '.pdf';

        // Temporarily hide on-screen-only elements so they don't appear in PDF
        const banner = document.getElementById('ai-mode-banner');
        if (banner) banner.style.display = 'none';

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
            if (banner) banner.style.display = '';
            downloadBtn.innerHTML = origHTML;
            downloadBtn.disabled = false;
        }).catch(function(err) {
            console.error('[PDF]', err);
            if (banner) banner.style.display = '';
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
