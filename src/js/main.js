import { ThemeManager } from './theme.js';
import { LanguageManager } from './language.js';
import { ProjectsManager } from './projects.js';
import { AnimationManager } from './animations.js';
import { NavbarComponent } from './components/navbar.js';

class App {
    constructor() {
        this.navbar = new NavbarComponent();
        this.theme = new ThemeManager();
        this.lang = new LanguageManager();
        this.projects = new ProjectsManager();
        this.animations = new AnimationManager();
    }

    async init() {
        await this.navbar.loadNavbar();
        // Diğer başlatma kodları
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
}); 