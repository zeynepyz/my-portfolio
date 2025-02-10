export class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'tr';
        this.languageSelect = document.getElementById('languageSelect');
        this.translations = {
            tr: {
                'nav.home': 'Ana Sayfa',
                'nav.about': 'Hakkımda',
                'nav.projects': 'Projeler',
                'nav.contact': 'İletişim'
            },
            en: {
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact'
            }
        };

        this.init();
    }

    init() {
        this.languageSelect.value = this.currentLang;
        this.updateContent();

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
    }

    updateContent() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            element.textContent = this.translations[this.currentLang][key];
        });
    }
} 