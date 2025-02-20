export class ProjectsComponent {
    projects = [
        {
            id: 1,
            title: "Portfolio Website",
            description: "You are looking at it right now. This is my portfolio website. I designed and developed it myself. I used HTML, CSS and JavaScript to create this website. I used some libraries like Font Awesome and some other libraries. I also used some other libraries like jQuery and some other libraries.",
            image: "assets/images/portfolio.jpg",
            sourceCode: "https://github.com/zeynepyz/my-portfolio",
            technologies: ["JavaScript", "CSS3", "HTML5"],
        },
        {
            id: 2,
            title: "Dinosaur Facts Web App",
            description: "Bu proje, nesne yönelimli JavaScript ve DOM manipülasyonu kullanarak veri odaklı bir arayüz oluşturma yeteneğimi gösteriyor. Kullanıcıdan alınan bilgileri işleyerek dinamik olarak bir infografik üretiyor ve form verilerini API'siz bir şekilde yönetiyorum. Projede sınıflar, veri işleme yöntemleri ve rastgele bilgi üretme algoritmaları kullanarak frontend ve backend entegrasyonu sağladım. Bu sayede hem veri yapılarıyla çalışabilme becerimi hem de etkileşimli kullanıcı arayüzleri geliştirme yeteneğimi sergileyebilirim.",
            image: "assets/images/dashboard.jpg",
            sourceCode: "https://github.com/zeynepyz/dino-project",
            technologies: ["JavaScript (OOP, DOM Manipülasyonu)", "HTML5", "CSS3", "JSON Data "],
        },
        {
            id: 3,
            title: "Travel Planner App",
            description: "Bu uygulama, kullanıcıların seyahatlerini planlamalarına yardımcı olmak için çeşitli API'lerden hava durumu tahmini ve destinasyon görselleri çekiyor. Kullanıcının girdiği konum bilgisi üzerinden koordinatlar alınarak, hava durumu tahmini ve ilgili bir görsel sağlanıyor. Kullanıcı deneyimini geliştirmek için verileri işleyerek gerçek zamanlı hava durumu ve tahmini bilgileri sunuyorum.",
            image: "assets/images/weather.jpg",
            sourceCode: "https://github.com/zeynepyz/travel-app",
            technologies: ["Async JavaScript", "Node.js", "Express.js", "Weatherbit API", "Geonames API", "Pixabay API"],
        },
        {
            id: 4,
            title: "Landing Section Page",
            description: "Bu proje, tamamen Vanilla JavaScript kullanılarak oluşturulmuş dinamik bir sayfa yapısını içeriyor. HTML dosyasında yalnızca temel bir yapı bulunurken, sayfadaki tüm bölümler ve navigasyon menüsü JavaScript ile dinamik olarak oluşturuluyor.",
            image: "assets/images/tasks.jpg",
            sourceCode: "https://github.com/zeynepyz/landing-section",
            technologies: ["Vanilla JavaScript", "CSS3", "HTML5"],
            demoLink: null
        },
        {
            id: 5,
            title: "Website Tools",
            description: "Website Tools, web geliştiricileri için çeşitli hazır ve özelleştirilebilir araçlar sunan bir depodur. Projede, kullanıcı deneyimini geliştirecek ve geliştirme sürecini hızlandıracak bileşenler bulunmaktadır.",
            image: "assets/images/chat.jpg",
            sourceCode: "https://github.com/zeynepyz/website-tools",
            technologies: ["Vanilla JavaScript", "CSS3", "HTML5", "Keyframes.js"],
        },
        /*
        {
            id: 6,
            title: "Wolfloyee",
            description: "Bu proje, tamamen Vanilla JavaScript kullanılarak oluşturulmuş dinamik bir sayfa yapısını içeriyor. HTML dosyasında yalnızca temel bir yapı bulunurken, sayfadaki tüm bölümler ve navigasyon menüsü JavaScript ile dinamik olarak oluşturuluyor.",
            image: "assets/images/tasks.jpg",
            sourceCode: "https://github.com/zeynepyz/landing-section",
            technologies: ["Vanilla JavaScript", "CSS3", "HTML5"],
            demoLink: null
        }
        */
    ];

    constructor() {
        this.visibleProjects = 3;
        this.isExpanded = false;
        this.projectsHTML = `
            <section id="projects" class="projects-section">
                <div class="projects-container">
                    <h2 class="section-title" data-lang="projects.title">Projeler</h2>
                    <div class="projects-grid">
                        ${this.generateProjects()}
                    </div>
                    ${this.projects.length > this.visibleProjects ? 
                        `<button class="toggle-projects-btn">
                            <span class="btn-text">Show More</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>` : ''}
                </div>
                <div class="popups-container">
                    ${this.generatePopups()}
                </div>
            </section>
        `;
    }

    generateProjects() {
        const projectsToShow = this.isExpanded ? this.projects : this.projects.slice(0, this.visibleProjects);
        return projectsToShow.map(project => this.createProjectCard(project)).join('');
    }

    generatePopups() {
        return this.projects.map(project => `
            <div class="project-popup" id="popup-${project.id}">
                <div class="popup-content">
                    <button class="close-popup">&times;</button>
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-details">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-technologies">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${project.sourceCode}" target="_blank" class="source-code-btn">
                                <i class="fab fa-github"></i> Source Code
                            </a>
                            ${project.demoLink ? `
                                <a href="${project.demoLink}" target="_blank" class="demo-btn">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    createProjectCard(project) {
        const shortDescription = project.description.length > 150 
            ? project.description.substring(0, 150) + '...' 
            : project.description;

        return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p class="project-description">${shortDescription}</p>
                    <button class="read-more-btn">Devamını Oku</button>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.sourceCode}" target="_blank" class="source-code-btn">
                            <i class="fab fa-github"></i> Source Code
                        </a>
                        ${project.demoLink ? `
                            <a href="${project.demoLink}" target="_blank" class="demo-btn">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        const mainContent = document.getElementById('main-content');
        mainContent.insertAdjacentHTML('beforeend', this.projectsHTML);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const toggleBtn = document.querySelector('.toggle-projects-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.isExpanded = !this.isExpanded;
                const projectsGrid = document.querySelector('.projects-grid');
                projectsGrid.innerHTML = this.generateProjects();
                
                // Button text ve icon'u güncelle
                const btnText = toggleBtn.querySelector('.btn-text');
                const btnIcon = toggleBtn.querySelector('i');
                btnText.textContent = this.isExpanded ? 'Show Less' : 'Show More';
                btnIcon.className = this.isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';

                // Animasyon için class ekle
                toggleBtn.classList.add('clicked');
                setTimeout(() => toggleBtn.classList.remove('clicked'), 300);

                // Yeni eklenen kartların animasyonu için
                if (this.isExpanded) {
                    const newCards = document.querySelectorAll('.project-card');
                    newCards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                    });
                }

                // Yeni kartlar için event listener'ları tekrar ekle
                this.setupPopupListeners();
            });
        }

        // İlk yükleme için popup listener'larını ekle
        this.setupPopupListeners();
    }

    // Popup ile ilgili event listener'ları ayrı bir metoda taşıyalım
    setupPopupListeners() {
        // Popup için event listener'ları ekle
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.project-card');
                const projectId = card.getAttribute('data-project-id');
                const popup = document.getElementById(`popup-${projectId}`);
                if (popup) {
                    popup.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        document.querySelectorAll('.close-popup').forEach(button => {
            button.addEventListener('click', (e) => {
                const popup = e.target.closest('.project-popup');
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        document.querySelectorAll('.project-popup').forEach(popup => {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
} 