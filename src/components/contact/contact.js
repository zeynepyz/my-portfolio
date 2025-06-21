export class ContactComponent {
    constructor() {
        this.contactHTML = `
            <section class="contact-section">
            <h2 class="section-title">İletişim</h2>
                <div class="contact-container">
                    <!-- Sol taraf - Sosyal medya ve CV -->
                    <div class="contact-info">
                        <div class="background-grid">
                            ${this.generateGrid()}
                        </div>
                        <div class="contact-content">
                            <div class="social-links">
                                <a href="https://github.com/zeynepyz" class="social-link" target="_blank">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="https://linkedin.com/in/zeynepyz" class="social-link" target="_blank">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a href="mailto:zeynepyavuz2001@hotmail.com" class="social-link">
                                    <i class="fas fa-envelope"></i>
                                </a>
                            </div>
                            <a href="assets/cv.pdf" class="cv-download" download>
                                <i class="fas fa-download"></i>
                                CV'mi İndir
                            </a>
                        </div>
                    </div>

                    <!-- Sağ taraf - Form -->
                    <div class="contact-form">
                        <form id="contactForm" onsubmit="return false;">
                            <div class="form-group">
                                <label for="name">İsim</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">E-posta</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="subject">Konu</label>
                                <input type="text" id="subject" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Mesaj</label>
                                <textarea id="message" name="message" required></textarea>
                            </div>
                            <button type="submit" class="submit-btn">Gönder</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }

    generateGrid() {
        let grid = '';
        for (let i = 0; i < 16; i++) {
            grid += `<div class="grid-cell" style="animation-delay: ${i * 0.1}s"></div>`;
        }
        return grid;
    }

    init() {
        const mainContent = document.getElementById('main-content');
        mainContent.insertAdjacentHTML('beforeend', this.contactHTML);
        this.setupForm();
    }

    setupForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Form submitted');
            });
        }
    }
} 