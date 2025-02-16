export class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
    }

    init() {
        // Önce tema sınıfını ekle
        document.body.classList.add(this.currentTheme);
        
        // Navbar yüklendikten sonra toggle butonunu bul
        setTimeout(() => {
            this.themeToggle = document.getElementById('themeToggle');
            if (this.themeToggle) {
                this.updateToggleButton();
                // Tema değiştirme butonuna tıklama olayı ekle
                this.themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        }, 100);
    }

    toggleTheme() {
        document.body.classList.remove(this.currentTheme);
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.classList.add(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        if (this.themeToggle) {
            this.themeToggle.textContent = this.currentTheme === 'light' ? '࣪ ִֶָ☾.' : '☼';
        }
    }
} 