// Resume Generator JavaScript
// Uses data from resume-data.js

document.addEventListener('DOMContentLoaded', function() {
    const focusButtons = document.querySelectorAll('.focus-btn');
    const detailButtons = document.querySelectorAll('.detail-btn');
    const downloadBtn = document.getElementById('download-pdf');

    // Current state
    let currentFocus = 'all';
    let currentDetail = 'technical'; // 'technical' or 'compact'
    
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

    // Focus button click handlers
    focusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            focusButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFocus = this.dataset.focus;
            updateResume(currentFocus, currentDetail);
        });
    });

    // Detail level button click handlers
    detailButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            detailButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDetail = this.dataset.detail;
            updateResume(currentFocus, currentDetail);
        });
    });
    
    // Dynamic fitting for compact mode
    function fitToOnePage(focus) {
        const resume = document.getElementById('resume');
        
        // Calculate target height based on resume container width
        // Letter paper aspect ratio: 8.5 x 11 = 0.773
        // With 0.5in margins on each side, usable = 7.5 x 10 = 0.75
        const resumeWidth = resume.offsetWidth;
        const targetHeight = resumeWidth / 0.75; // Maintain letter paper aspect ratio
        
        let maxBullets = 10; // Start with max bullets
        let iterations = 0;
        const maxIterations = 9;
        
        // Check current height
        let currentHeight = resume.scrollHeight;
        
        console.log('Target height: ' + targetHeight + 'px, Current: ' + currentHeight + 'px, Width: ' + resumeWidth + 'px');
        
        while (currentHeight > targetHeight && maxBullets > 1 && iterations < maxIterations) {
            maxBullets--;
            iterations++;
            
            // Rebuild with fewer bullets
            updateContactInfo();
            updateEducation('compact');
            updateSkills(focus);
            updateExperienceWithLimit(focus, 'compact', maxBullets);
            updateProjectsWithLimit(focus, 'compact', maxBullets);
            
            // Re-measure
            currentHeight = resume.scrollHeight;
            console.log('Iteration ' + iterations + ': ' + maxBullets + ' bullets, height: ' + currentHeight + 'px');
        }
        
        // Update page indicator
        updatePageIndicator(currentHeight, targetHeight, maxBullets);
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

    // Download PDF - using browser print for better page break handling
    downloadBtn.addEventListener('click', function() {
        // Create a new window with just the resume content
        const resume = document.getElementById('resume');
        const activeFocus = document.querySelector('.focus-btn.active').dataset.focus;
        const activeDetail = document.querySelector('.detail-btn.active').dataset.detail;
        const focusName = activeFocus === 'all' ? 'Full' : activeFocus.replace('-', '_');
        const detailName = activeDetail === 'compact' ? '_Compact' : '';
        
        // Clone resume for printing
        const printContent = resume.cloneNode(true);
        
        // Create print window
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>James_Williams_Resume_${focusName}${detailName}</title>
                <style>
                    @page {
                        size: letter;
                        margin: 0.5in;
                    }
                    body {
                        font-family: 'Times New Roman', Times, serif;
                        font-size: 11pt;
                        line-height: 1.3;
                        color: #000;
                        margin: 0;
                        padding: 0;
                    }
                    .resume-header {
                        text-align: center;
                        margin-bottom: 0.5rem;
                    }
                    .resume-header h1 {
                        font-size: 18pt;
                        font-weight: normal;
                        font-style: italic;
                        margin: 0 0 0.25rem 0;
                    }
                    .resume-contact-line {
                        font-size: 10pt;
                        margin: 0;
                    }
                    .resume-section {
                        margin-bottom: 0.75rem;
                    }
                    .resume-section h2 {
                        font-size: 11pt;
                        font-weight: bold;
                        text-transform: uppercase;
                        border-bottom: 1px solid #000;
                        padding-bottom: 2px;
                        margin: 0 0 0.4rem 0;
                        page-break-after: avoid;
                    }
                    .resume-item, .resume-project {
                        margin-bottom: 0.6rem;
                    }
                    .resume-item-line, .resume-project-line {
                        display: flex;
                        justify-content: space-between;
                    }
                    .resume-item-italic {
                        font-style: italic;
                        font-size: 10pt;
                    }
                    .resume-item-italic .date {
                        float: right;
                    }
                    .resume-coursework {
                        font-size: 10pt;
                    }
                    .resume-subproject {
                        margin-top: 0.3rem;
                    }
                    .resume-subproject-title {
                        font-size: 10pt;
                    }
                    .resume-project-date {
                        font-style: italic;
                        font-size: 10pt;
                    }
                    ul {
                        margin: 0.2rem 0 0 1.5rem;
                        padding: 0;
                        list-style-type: disc;
                        list-style-position: outside;
                    }
                    li {
                        font-size: 10pt;
                        margin-bottom: 0.15rem;
                        padding-left: 0.2rem;
                        page-break-inside: avoid;
                    }
                    li::marker {
                        color: #000;
                    }
                    .location {
                        font-size: 10pt;
                    }
                    strong {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        
        // Wait for content to load then print
        printWindow.onload = function() {
            printWindow.print();
        };
    });

    function updateResume(focus, detail) {
        // Hide page indicator in technical mode
        const indicator = document.getElementById('page-indicator');
        if (indicator) {
            indicator.style.display = detail === 'compact' ? 'block' : 'none';
        }
        
        updateContactInfo();
        updateEducation(detail);
        updateSkills(focus);
        
        if (detail === 'compact') {
            // For compact mode, dynamically fit to one page
            // Start with all bullets and reduce until it fits
            updateExperienceWithLimit(focus, detail, 10);
            updateProjectsWithLimit(focus, detail, 10);
            
            // Use requestAnimationFrame to measure after render
            requestAnimationFrame(function() {
                fitToOnePage(focus);
            });
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
            
            // Only show coursework in technical mode
            if (detail === 'technical') {
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
        html += '<li><strong>Hardware:</strong> ' + skills.hardware + '</li>';
        html += '<li><strong>Programming:</strong> ' + skills.programming + '</li>';
        html += '<li><strong>Robotics & Controls:</strong> ' + skills.robotics + '</li>';
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
