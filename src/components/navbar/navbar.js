import { ThemeManager } from '../../js/theme.js';
import { LanguageManager } from '../../js/language.js';

export class NavbarComponent {
    constructor() {
        this.navbarContainer = document.getElementById('navbar-container');
        this.navbarHTML = `
            <nav class="navbar">
                <div class="navbar-logo">Logo</div>
                <ul class="navbar-links">
                    <li><a href="#home" data-lang="nav.home">Ana Sayfa</a></li>
                    <li><a href="#about" data-lang="nav.about">Hakkımda</a></li>
                    <li><a href="#projects" data-lang="nav.projects">Projeler</a></li>
                    <li><a href="#contact" data-lang="nav.contact">İletişim</a></li>
                </ul>
                <div class="navbar-controls">
                    <button id="themeToggle">🌙</button>
                    <select id="languageSelect">
                        <option value="tr">TR</option>
                        <option value="en">EN</option>
                    </select>
                </div>
            </nav>
        `;
    }

    async loadNavbar() {
        try {
            this.navbarContainer.innerHTML = this.navbarHTML;
            this.setupMobileMenu();
            
            // Tema ve dil yöneticilerini başlat
            this.themeManager = new ThemeManager();
            this.languageManager = new LanguageManager();
        } catch (error) {
            console.error('Navbar yüklenirken hata oluştu:', error);
        }
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;

        const nav = document.querySelector('.navbar');
        nav.insertBefore(mobileMenuBtn, nav.firstChild);

        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.navbar-links');
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
} 