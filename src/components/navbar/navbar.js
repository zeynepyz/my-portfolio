import { ThemeManager } from '../../js/theme.js';
import { LanguageManager } from '../../js/language.js';

export class NavbarComponent {
    constructor() {
        this.navbarContainer = document.getElementById('navbar-container');
        this.navbarHTML = `
            <nav class="navbar">
                <div class="navbar-logo"></div>
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
            this.setupLogoEffect();
            
            // Tema ve dil yöneticilerini başlat
            this.themeManager = new ThemeManager();
            this.languageManager = new LanguageManager();
        } catch (error) {
            console.error('Navbar yüklenirken hata oluştu:', error);
        }
    }

    setupLogoEffect() {
        const logoContainer = document.querySelector('.navbar-logo');
        const logoText = document.createElement('span');
        
        // Başlangıçta sadece yanıp sönen alt tire
        logoText.textContent = '_';
        logoText.classList.add('cursor-blink');
        logoContainer.appendChild(logoText);

        let isTyping = false;
        const text = 'zeynep@dev:~$';

        logoContainer.addEventListener('mouseenter', () => {
            if (isTyping) return;
            isTyping = true;
            
            logoText.classList.remove('cursor-blink');
            logoText.classList.add('typing-effect');
            logoText.textContent = '';
            
            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < text.length) {
                    logoText.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 100);
                } else {
                    logoText.textContent += '_';
                    logoText.classList.add('cursor-blink');
                }
            };
            
            typeChar();
        });

        logoContainer.addEventListener('mouseleave', () => {
            if (!isTyping) return;
            
            setTimeout(() => {
                logoText.classList.remove('typing-effect');
                logoText.classList.add('cursor-blink');
                logoText.textContent = '_';
                isTyping = false;
            }, 1000);
        });
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