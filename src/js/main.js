import { ThemeManager } from './theme.js';
import { LanguageManager } from './language.js';
import { ProjectsManager } from './projects.js';
import { AnimationManager } from './animations.js';
import { NavbarComponent } from '../components/navbar/navbar.js';
import { TerminalComponent } from '../components/terminal/terminal.js';
import { HeroComponent } from '../components/hero/hero.js';

class App {
    constructor() {
        this.navbar = new NavbarComponent();
        this.terminal = new TerminalComponent();
        this.theme = new ThemeManager();
        this.lang = new LanguageManager();
        this.projects = new ProjectsManager();
        this.animations = new AnimationManager();
        this.hero = new HeroComponent();
    }

    async init() {
        await this.navbar.loadNavbar();
        this.terminal.init(document.getElementById('navbar-container'));
        this.hero.init();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
}); 