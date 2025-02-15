export class HeroComponent {
    constructor() {
        this.heroHTML = `
            <section class="hero-section" id="hero">
                <div class="hero-container">
                    <div class="hero-content">
                        <h1 class="glitch" data-text="Zeynep Yavuz">Zeynep Yavuz</h1>
                        <p class="hero-subtitle" data-lang="hero.role">Frontend Developer</p>
                        <div class="terminal-hint">Click anywhere to open terminal</div>
                    </div>
                    <div class="hero-background">
                        <div class="cube-container">
                            ${this.generateCubes(5)}
                        </div>
                        <div class="particles"></div>
                    </div>
                </div>
            </section>
        `;
    }

    generateCubes(count) {
        let cubes = '';
        const positions = this.generateRandomPositions(count);
        
        positions.forEach((pos, i) => {
            cubes += `
                <div class="cube" style="
                    top: ${pos.y}%; 
                    left: ${pos.x}%; 
                    animation-delay: ${i * 0.2}s;
                    transform: scale(${0.3 + Math.random() * 0.7});">
                    <div class="face front"></div>
                    <div class="face back"></div>
                    <div class="face right"></div>
                    <div class="face left"></div>
                    <div class="face top"></div>
                    <div class="face bottom"></div>
                </div>
            `;
        });
        return cubes;
    }

    generateRandomPositions(count) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            positions.push({
                x: Math.random() * 100,
                y: Math.random() * 200
            });
        }
        return positions;
    }

    init() {
        const main = document.querySelector('main');
        main.insertAdjacentHTML('afterbegin', this.heroHTML);
        this.setupParallax();
        this.setupGlitchEffect();
        this.setupTerminalTrigger();
    }

    setupParallax() {
        const hero = document.querySelector('.hero-section');
        const cubes = document.querySelectorAll('.cube');
        
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX - window.innerWidth / 2) / 20;
            const y = (clientY - window.innerHeight / 2) / 20;

            cubes.forEach((cube, index) => {
                const speed = (index + 1) * 0.2;
                cube.style.transform = `
                    rotateX(${y * speed}deg) 
                    rotateY(${x * speed}deg)
                    translateZ(${50 * speed}px)
                `;
            });
        });
    }

    setupGlitchEffect() {
        const glitchText = document.querySelector('.glitch');
        setInterval(() => {
            glitchText.classList.add('glitch-effect');
            setTimeout(() => {
                glitchText.classList.remove('glitch-effect');
            }, 200);
        }, 3000);
    }

    setupTerminalTrigger() {
        const hero = document.querySelector('.hero-section');
        const terminal = document.querySelector('.terminal-container');
        const hint = document.querySelector('.terminal-hint');
        
        if (hero && terminal && hint) {
            hero.addEventListener('click', () => {
                if (terminal.classList.contains('visible')) {
                    terminal.classList.remove('visible');
                    hero.classList.remove('terminal-open');
                    hint.style.display = 'block';
                } else {
                    terminal.classList.add('visible');
                    hero.classList.add('terminal-open');
                    hint.style.display = 'none';
                }
            });

            // ESC tuşu ile terminal'i kapatma
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && terminal.classList.contains('visible')) {
                    terminal.classList.remove('visible');
                    hero.classList.remove('terminal-open');
                    hint.style.display = 'block';
                }
            });
        }
    }
} 