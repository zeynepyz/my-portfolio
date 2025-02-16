export class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'tr';
        this.translations = {
            tr: {
                'nav.home': 'Ana Sayfa',
                'nav.about': 'Hakkımda',
                'nav.projects': 'Projeler',
                'nav.contact': 'İletişim',
                'hero.role': 'Frontend Developer',
                'about.title': 'Hakkımda',
                'about.description': 'Frontend geliştirme konusunda tutkulu, kullanıcı deneyimini önemseyen ve modern web teknolojilerini yakından takip eden bir geliştiriciyim.'
            },
            en: {
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact',
                'hero.role': 'Frontend Developer',
                'about.title': 'About Me',
                'about.description': 'A passionate frontend developer focused on creating user-friendly experiences and keeping up with modern web technologies.'
            }
        };
    }

    init() {
        // Navbar yüklendikten sonra dil seçiciyi bul
        setTimeout(() => {
            this.languageSelect = document.getElementById('languageSelect');
            if (this.languageSelect) {
                this.languageSelect.value = this.currentLang;
                
                this.languageSelect.addEventListener('change', (e) => {
                    this.currentLang = e.target.value;
                    localStorage.setItem('language', this.currentLang);
                    this.updateContent();
                    
                    // Dil değişikliği eventi
                    const event = new CustomEvent('languageChange', {
                        detail: { language: this.currentLang }
                    });
                    window.dispatchEvent(event);
                });

                this.updateContent();
            }
        }, 100);
    }

    updateContent() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
    }
} 