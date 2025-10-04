// Animações e interatividade para a página memorial
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para o indicador de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('.biography-section');
            if (firstSection) {
                firstSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Intersection Observer para animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(
        '.section-header, .biography-text, .biography-image, .project-card, .feature, .timeline-item, .award-card, .gallery-item'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Efeito parallax sutil no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroOverlay = document.querySelector('.hero-overlay');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroOverlay.style.opacity = 0.8 + (scrolled / window.innerHeight) * 0.2;
        }
    });

    // Contador animado para estatísticas (se houver)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Efeito de digitação para o título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Galeria com lightbox simples
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });

    function createLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Fechar lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
        
        // Fechar com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // Efeito de hover nas features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animação de entrada para timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });

    // Efeito de brilho no award card
    const awardCard = document.querySelector('.award-card');
    if (awardCard) {
        awardCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        awardCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Scroll suave para navegação interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adicionar classe de animação quando elementos entram na viewport
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    // Observar elementos que devem ser animados
    document.querySelectorAll('.biography-text p, .project-card, .timeline-content, .feature').forEach(el => {
        animationObserver.observe(el);
    });
});

// CSS adicional para animações via JavaScript
const additionalStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
    }

    .lightbox-close {
        position: absolute;
        top: -40px;
        right: -40px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transition: background 0.3s ease;
    }

    .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }

    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Transições suaves para todos os elementos interativos */
    .feature, .gallery-item, .award-card, .timeline-content {
        transition: all 0.3s ease;
    }

    /* Efeito de hover melhorado para galeria */
    .gallery-item {
        cursor: pointer;
    }

    .gallery-item::after {
        content: '🔍';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2;
    }

    .gallery-item:hover::after {
        opacity: 1;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);