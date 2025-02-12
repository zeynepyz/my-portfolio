export class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Sayfa yüklendiğinde kaydedilmiş temayı uygula
        document.body.classList.add(this.currentTheme);
        this.updateToggleButton();

        // Tema değiştirme butonuna tıklama olayı ekle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        document.body.classList.remove(this.currentTheme);
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.classList.add(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        this.themeToggle.textContent = this.currentTheme === 'light' ? '࣪ ִֶָ☾.' : '☼';
    }
} 