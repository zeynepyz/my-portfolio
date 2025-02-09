export class ProjectsManager {
    constructor() {
        this.projects = [
            {
                title: 'Proje 1',
                description: 'Açıklama',
                technologies: ['HTML', 'CSS', 'JavaScript'],
                github: 'https://github.com/...',
                live: 'https://...'
            },
            // Diğer projeler...
        ];
        
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupFilters();
    }

    renderProjects() {
        const container = document.querySelector('.projects-container');
        this.projects.forEach(project => {
            const card = this.createProjectCard(project);
            container.appendChild(card);
        });
    }

    createProjectCard(project) {
        // Proje kartı oluşturma
    }

    setupFilters() {
        // Proje filtreleme sistemi
    }
} 