// Data loader and renderer
class PortfolioLoader {
    constructor() {
        this.data = {
            profile: null,
            skills: null,
            experience: null,
            projects: null
        };
    }

    async loadAllData() {
        try {
            const [profile, skills, experience, projects] = await Promise.all([
                fetch('data/profile.json').then(r => r.json()),
                fetch('data/skills.json').then(r => r.json()),
                fetch('data/experience.json').then(r => r.json()),
                fetch('data/projects.json').then(r => r.json())
            ]);

            this.data = { profile, skills, experience, projects };
            this.renderAll();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    renderAll() {
        this.renderHero();
        this.renderAbout();
        this.renderSkillsGrid();
        this.renderExperience();
        this.renderProjects();
        this.renderSkillsProgress();
        this.renderSocialLinks();
        this.updateMetaTags();
    }

    renderHero() {
        const { profile } = this.data;
        if (!profile) return;

        // Update hero image initials
        const heroImage = document.querySelector('.hero-image');
        const initials = profile.name.split(' ').map(n => n[0]).join('');
        heroImage.textContent = initials;
        heroImage.setAttribute('aria-label', `${profile.name} profile picture`);

        // Update hero text
        document.querySelector('.hero h1').textContent = profile.name;
        document.querySelector('.hero .role').textContent = profile.role;
        document.querySelector('.hero .tagline').textContent = profile.tagline;
    }

    renderAbout() {
        const { profile } = this.data;
        if (!profile) return;

        const bioContainer = document.querySelector('.bio');
        bioContainer.innerHTML = profile.bio.map(paragraph => `<p>${paragraph}</p>`).join('');
    }

    renderSkillsGrid() {
        const { skills } = this.data;
        if (!skills) return;

        const skillsGrid = document.querySelector('.skills-grid');
        skillsGrid.innerHTML = skills.technical.map(skill => `
            <div class="skill-card">
                <div class="icon">${skill.icon}</div>
                <h3>${skill.name}</h3>
            </div>
        `).join('');
    }

    renderExperience() {
        const { experience } = this.data;
        if (!experience) return;

        const timeline = document.querySelector('.timeline');
        timeline.innerHTML = experience.map(job => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3>${job.title}</h3>
                    <p class="company">${job.company}</p>
                    <p class="period">${job.period}</p>
                    <ul>
                        ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    renderProjects() {
        const { projects } = this.data;
        if (!projects) return;

        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-project="${project.id}">
                <div class="project-image">${project.icon}</div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.summary}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Re-attach click handlers
        this.attachProjectClickHandlers();
    }

    renderSkillsProgress() {
        const { skills } = this.data;
        if (!skills) return;

        const skillsProgress = document.querySelector('.skills-progress');
        skillsProgress.innerHTML = skills.progress.map(skill => `
            <div class="skill-item">
                <div class="skill-header">
                    <span>${skill.name}</span>
                    <span>${skill.percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="--width: ${skill.percentage}%"></div>
                </div>
            </div>
        `).join('');
    }

    renderSocialLinks() {
        const { profile } = this.data;
        if (!profile) return;

        const socialLinks = document.querySelector('.social-links');
        socialLinks.innerHTML = `
            <a href="${profile.social.linkedin}" target="_blank" rel="noopener noreferrer" 
               class="social-link" aria-label="LinkedIn">
                💼
            </a>
            <a href="${profile.social.github}" target="_blank" rel="noopener noreferrer" 
               class="social-link" aria-label="GitHub">
                💻
            </a>
            <a href="mailto:${profile.social.email}" class="social-link" aria-label="Email">
                ✉️
            </a>
        `;
    }

    updateMetaTags() {
        const { profile } = this.data;
        if (!profile) return;

        document.title = `${profile.name} - ${profile.role} | ${profile.location.split(',')[0]}`;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 
                `Portfolio profesional de ${profile.role} en ${profile.location}. Especializado en ${profile.tagline}.`
            );
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', `${profile.name} - ${profile.role}`);
        }
    }

    attachProjectClickHandlers() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const project = this.data.projects.find(p => p.id === projectId);
                
                if (project) {
                    modalBody.innerHTML = `
                        <h2>${project.title}</h2>
                        <p style="color: var(--gray-700); margin: 1rem 0 2rem;">${project.description}</p>
                        
                        <h3 style="margin-bottom: 1rem;">Características clave</h3>
                        <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                            ${project.details.map(detail => `
                                <li style="padding: 0.5rem 0 0.5rem 1.5rem; position: relative; color: var(--gray-700);">
                                    <span style="position: absolute; left: 0; color: var(--primary); font-weight: 700;">✓</span>
                                    ${detail}
                                </li>
                            `).join('')}
                        </ul>
                        
                        <h3 style="margin-bottom: 1rem;">Tecnologías</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                            ${project.tech.map(tech => `
                                <span style="padding: 0.25rem 0.75rem; background: var(--primary); color: white; border-radius: 20px; font-size: 0.85rem;">
                                    ${tech}
                                </span>
                            `).join('')}
                        </div>
                        
                        <h3 style="margin-bottom: 1rem;">Impacto</h3>
                        <p style="color: var(--gray-700); background: var(--gray-100); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary);">
                            ${project.impact}
                        </p>
                    `;
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
}

// Initialize loader
const portfolioLoader = new PortfolioLoader();

// Load data when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => portfolioLoader.loadAllData());
} else {
    portfolioLoader.loadAllData();
}
