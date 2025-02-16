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
        logoText.classList.add('typewriter');
        
        const text = 'zeynep@dev:~$';
        let isHovering = false;
        let animationTimeout;
        let isTyping = true; // Yazma/silme durumunu takip etmek için
        
        logoContainer.appendChild(logoText);
        logoText.textContent = '_';

        function typeWriter(text, i = 0) {
            if (!isHovering) return;
            
            if (i === 0) {
                logoText.textContent = '';
            }
            
            if (i < text.length) {
                logoText.textContent += text.charAt(i);
                animationTimeout = setTimeout(() => typeWriter(text, i + 1), 100);
            } else {
                // Yazma bittikten sonra bekle ve sil
                animationTimeout = setTimeout(() => {
                    isTyping = false;
                    eraseText(text);
                }, 400);
            }
        }

        function eraseText(text, i = text.length) {
            if (!isHovering) return;
            
            if (i > 0) {
                logoText.textContent = text.substring(0, i - 1) + '_';
                animationTimeout = setTimeout(() => eraseText(text, i - 1), 50);
            } else {
                // Silme bittikten sonra bekle ve tekrar yaz
                animationTimeout = setTimeout(() => {
                    isTyping = true;
                    if (isHovering) {
                        typeWriter(text);
                    }
                }, 1500);
            }
        }

        function startAnimation() {
            isHovering = true;
            isTyping = true;
            if (logoText.textContent === '_') {
                typeWriter(text);
            }
        }

        function stopAnimation() {
            isHovering = false;
            clearTimeout(animationTimeout);
            logoText.textContent = '_';
        }
        
        logoContainer.addEventListener('mouseenter', startAnimation);
        logoContainer.addEventListener('mouseleave', stopAnimation);
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

    setupNavLinks() {
        const navLinks = document.querySelectorAll('.navbar-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 60,
                        behavior: 'smooth'
                    });
                    
                    // Mobil menüyü kapat
                    const navLinks = document.querySelector('.navbar-links');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (navLinks) navLinks.classList.remove('active');
                    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                }
            });
        });
    }
} 