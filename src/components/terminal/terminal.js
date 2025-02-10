export class TerminalComponent {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'tr';
        this.translations = {
            tr: {},
            en: {}
        };

        this.terminalHTML = `
            <div class="terminal-container">
                <div class="terminal-content"></div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt"></span>
                    <input type="text" class="terminal-input" autofocus>
                </div>
            </div>
        `;

        this.commands = {
            "help": () => this.translations[this.currentLang].terminal.commands.help,
            "whoami": () => this.translations[this.currentLang].terminal.commands.whoami,
            "ls": () => this.translations[this.currentLang].terminal.commands.ls,
            "clear": () => "",
            "exit": () => this.translations[this.currentLang].terminal.commands.exitPrompt
        };

        // Üzgün surat ASCII art
        this.sadFace = `
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⡟⠁⠀⢸⣿⡇⠀⠈⢻
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⠘⢿⣿⣿⣿⣿⣿⣿⣿⡿⠃
    ⠀⠀⠉⠛⠛⠛⠛⠛⠋⠀⠀
`;

        // Terminal geçmişini tutmak için yeni bir array
        this.commandHistory = [];
    }

    async loadTranslations() {
        const trModule = await import('../../locales/tr.js');
        const enModule = await import('../../locales/en.js');
        this.translations.tr = trModule.default;
        this.translations.en = enModule.default;
    }

    async init(headerElement) {
        await this.loadTranslations();
        
        // Mobil kontrol için
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobilde navbar'ın hemen altına ekle
            headerElement.insertAdjacentHTML('afterend', this.terminalHTML);
        } else {
            // Desktop'ta header içine ekle
            headerElement.insertAdjacentHTML('beforeend', this.terminalHTML);
        }

        // Pencere boyutu değiştiğinde kontrol et
        window.addEventListener('resize', () => {
            const terminal = document.querySelector('.terminal-container');
            if (window.innerWidth <= 768) {
                if (terminal.parentElement === headerElement) {
                    headerElement.after(terminal);
                }
            } else {
                if (terminal.parentElement !== headerElement) {
                    headerElement.appendChild(terminal);
                }
            }
        });

        const terminal = document.querySelector('.terminal-container');
        const terminalContent = terminal.querySelector('.terminal-content');
        const terminalInput = terminal.querySelector('.terminal-input');
        const prompt = terminal.querySelector('.terminal-prompt');

        // Prompt ve hoşgeldin mesajını ayarla
        prompt.textContent = this.translations[this.currentLang].terminal.prompt;
        terminalContent.innerHTML = this.translations[this.currentLang].terminal.welcome;

        let waitingForExitConfirm = false;

        terminalInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const command = event.target.value.trim().toLowerCase();
                
                // Komut geçmişine ekle
                this.commandHistory.push({
                    command: command,
                    type: waitingForExitConfirm ? 'exitResponse' : 'command',
                    isExit: command === 'exit',
                    isExitResponse: waitingForExitConfirm
                });

                if (waitingForExitConfirm) {
                    if (command === 'n' || command === 'no') {
                        terminalContent.innerHTML += `\n${prompt.textContent} ${command}\n${this.translations[this.currentLang].terminal.commands.exitThanks}\n`;
                        waitingForExitConfirm = false;
                    } else if (command === 'y' || command === 'yes') {
                        terminalContent.innerHTML = this.sadFace;
                        waitingForExitConfirm = false;
                    } else {
                        terminalContent.innerHTML += `\n${prompt.textContent} ${command}\n${this.translations[this.currentLang].terminal.commands.notFound}\n`;
                    }
                } else {
                    if (command === 'clear') {
                        terminalContent.innerHTML = "";
                        this.commandHistory = []; // Geçmişi temizle
                        waitingForExitConfirm = false;
                    } else {
                        terminalContent.innerHTML += `\n${prompt.textContent} ${command}\n`;
                        terminalContent.innerHTML += (this.commands[command] ? this.commands[command]() : this.translations[this.currentLang].terminal.commands.notFound) + '\n';
                        
                        if (command === 'exit') {
                            waitingForExitConfirm = true;
                        }
                    }
                }
                
                event.target.value = "";
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }
        });

        // Dil değişikliğini dinle
        window.addEventListener('languageChange', (e) => {
            this.currentLang = e.detail.language;
            const prompt = document.querySelector('.terminal-prompt');
            const terminalContent = document.querySelector('.terminal-content');
            
            // Prompt'u güncelle
            prompt.textContent = this.translations[this.currentLang].terminal.prompt;

            // Terminal içeriğini yeni dilde yeniden oluştur
            if (this.commandHistory.length === 0) {
                // Sadece hoşgeldin mesajını göster
                terminalContent.innerHTML = this.translations[this.currentLang].terminal.welcome;
            } else {
                // Geçmiş komutları yeni dilde yeniden oluştur
                let newContent = this.translations[this.currentLang].terminal.welcome + '\n';
                
                this.commandHistory.forEach(entry => {
                    const promptText = this.translations[this.currentLang].terminal.prompt;
                    
                    if (entry.type === 'exitResponse') {
                        if (entry.command === 'n' || entry.command === 'no') {
                            newContent += `\n${promptText} ${entry.command}\n${this.translations[this.currentLang].terminal.commands.exitThanks}\n`;
                        } else if (entry.command === 'y' || entry.command === 'yes') {
                            newContent += `\n${promptText} ${entry.command}\n${this.sadFace}\n`;
                        } else {
                            newContent += `\n${promptText} ${entry.command}\n${this.translations[this.currentLang].terminal.commands.notFound}\n`;
                        }
                    } else {
                        newContent += `\n${promptText} ${entry.command}\n`;
                        if (entry.command in this.commands) {
                            newContent += this.commands[entry.command]() + '\n';
                        } else if (entry.command !== 'clear') {
                            newContent += this.translations[this.currentLang].terminal.commands.notFound + '\n';
                        }
                    }
                });
                
                terminalContent.innerHTML = newContent;
            }
            
            // Scroll'u en alta getir
            terminalContent.scrollTop = terminalContent.scrollHeight;
        });
    }
} 