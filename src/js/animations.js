export class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.animate').forEach(el => observer.observe(el));
    }

    setupHoverEffects() {
        // Hover animasyonları
    }
} 