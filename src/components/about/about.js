export class AboutComponent {
    experiences = [
        {
            title: "Junior Frontend Developer",
            company: "mfatech",
            period: "2024 - Present",
            description: "Developed the mobile interface of Mira, an AI application, using React Native. Collaborated with a Scrum team, ensuring timelydelivery of tasks via Jira. Translated Figma designs into pixel-perfectimplementations. Created responsive designs optimized for variousdevices, including mobile, tablet, and desktop. Adapted to diverse codebases and effectively collaborated with team members"
        },
        {
            title: "Intern",
            company: "Drupart",
            period: "2023",
            description: "Adding styles and scripts to themes, configuring them, and using Twig for logical preprocessing and dynamic rendering. Gained proficiency in Drupal by building structured content displays using Views and the Views JSON API. Developed custom themes and modules, applying responsive design principles. Integrated Flutter with Drupal to enhance user interaction."
        }
        // Diğer deneyimler buraya eklenebilir
    ];

    technologies = [
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "React", icon: "fab fa-react" },
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "Node.js", icon: "fab fa-node-js" },
        { name: "Git", icon: "fab fa-git-alt" },
        {name: "Ubuntu", icon: "fab fa-ubuntu"},
        { name: "Sass", icon: "fab fa-sass" },
        { name: "Bootstrap", icon: "fab fa-bootstrap" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "TypeScript", icon: "devicon-typescript-plain" },
        { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
        { name: "Next.js", icon: "devicon-nextjs-plain" },
        
    ];

    constructor() {
        this.aboutHTML = `
            <div class="about-container">
                <h2 class="section-title" data-lang="about.title">Hakkımda</h2>
                
                <div class="about-content">
                    <!-- Sol taraf - Deneyim Timeline -->
                    <div class="experience-timeline">
                        <h3>Deneyimler</h3>
                        <div class="timeline">
                            ${this.generateExperiences()}
                        </div>
                    </div>

                    <!-- Sağ taraf - Hakkımda ve Teknolojiler -->
                    <div class="about-info">
                        <div class="about-text">
                            <p>
                                Frontend geliştirme konusunda tutkulu, kullanıcı deneyimini önemseyen 
                                ve modern web teknolojilerini yakından takip eden bir geliştiriciyim. 
                                Temiz ve sürdürülebilir kod yazmaya özen gösteriyorum.
                            </p>
                            <p>
                                Yeni teknolojileri öğrenmeye açık, takım çalışmasına yatkın ve 
                                problem çözme becerileri güçlü bir yazılımcıyım.
                            </p>
                        </div>

                        <div class="technologies">
                            <h3>Teknolojiler</h3>
                            <div class="tech-grid">
                                ${this.generateTechnologies()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateExperiences() {
        return this.experiences.map(exp => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h4>${exp.title}</h4>
                    <h5>${exp.company}</h5>
                    <span class="period">${exp.period}</span>
                    <p>${exp.description}</p>
                </div>
            </div>
        `).join('');
    }

    generateTechnologies() {
        return this.technologies.map(tech => `
            <div class="tech-item">
                <i class="${tech.icon}"></i>
                <span>${tech.name}</span>
            </div>
        `).join('');
    }

    init() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.innerHTML = this.aboutHTML;
            this.setupAnimations();
        }
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.timeline-item, .tech-item').forEach(el => {
            observer.observe(el);
        });
    }
} 