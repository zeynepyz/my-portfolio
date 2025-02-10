export class TerminalComponent {
    constructor() {
        this.terminalHTML = `
            <div class="terminal-container">
                <div class="terminal-content">Welcome to Zeynep's Terminal Portfolio
Type 'help' to see available commands</div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">zeynep@dev:~$</span>
                    <input type="text" class="terminal-input" autofocus>
                </div>
            </div>
        `;

        this.commands = {
            "help": "Available commands: whoami, ls, clear, exit",
            "whoami": "Zeynep Yavuz, Frontend Developer",
            "ls": "projects/  about_me.txt  contact.txt",
            "clear": "",
            "exit": "You really want to quit? (y/n)"
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
    }

    init(headerElement) {
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

        let waitingForExitConfirm = false;

        terminalInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const command = event.target.value.trim().toLowerCase();
                
                if (waitingForExitConfirm) {
                    if (command === 'n' || command === 'no') {
                        terminalContent.innerHTML += `\n$ zeynep@dev:~$ ${command}\nThanks for not leaving me! ❤️\n`;
                        waitingForExitConfirm = false;
                    } else if (command === 'y' || command === 'yes') {
                        terminalContent.innerHTML = this.sadFace;
                        waitingForExitConfirm = false;
                    } else {
                        terminalContent.innerHTML += `\n$ zeynep@dev:~$ ${command}\nPlease answer with 'y' or 'n'\n`;
                    }
                } else {
                    if (command === 'clear') {
                        terminalContent.innerHTML = "";
                        waitingForExitConfirm = false;
                    } else if (command === 'exit') {
                        terminalContent.innerHTML += `\n$ zeynep@dev:~$ ${command}\n${this.commands.exit}\n`;
                        waitingForExitConfirm = true;
                    } else {
                        terminalContent.innerHTML += `\n$ zeynep@dev:~$ ${command}\n`;
                        terminalContent.innerHTML += this.commands[command] 
                            ? this.commands[command] + '\n' 
                            : 'Command not found\n';
                    }
                }
                
                event.target.value = "";
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }
        });
    }
} 