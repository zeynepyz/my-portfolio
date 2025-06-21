import { ThemeManager } from './theme.js';
import { LanguageManager } from './language.js';
import { NavbarComponent } from '../components/navbar/navbar.js';
import { TerminalComponent } from '../components/terminal/terminal.js';
import { HeroComponent } from '../components/hero/hero.js';
import { AboutComponent } from '../components/about/about.js';
import { ProjectsComponent } from '../components/projects/projects.js';
import { ContactComponent } from '../components/contact/contact.js';

class App {
    constructor() {
        this.navbar = new NavbarComponent();
        this.terminal = new TerminalComponent();
        this.hero = new HeroComponent();
        this.about = new AboutComponent();
        this.projects = new ProjectsComponent();
        this.theme = new ThemeManager();
        this.lang = new LanguageManager();
        this.contact = new ContactComponent();
    }

    async init() {
            await this.navbar.loadNavbar();
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            this.theme.init();
            this.lang.init();
            
            this.hero.init();
            this.about.init();
            this.projects.init();
            this.terminal.init(document.getElementById('terminal-container'));
            this.contact.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
}); 