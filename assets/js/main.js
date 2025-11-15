// Seferihisar Kıyı Villaları - Ana JavaScript Dosyası

// Hamburger Menü Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // İkon değişimi (basit)
            if (mainNav.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }
        });
        
        // Menü dışına tıklanınca kapat
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    }
    
    // Smooth Scroll için anchor linkler
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Sadece # ile başlayan ve boş olmayan linkler için
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Mobil menüyü kapat
                    if (mainNav) {
                        mainNav.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.innerHTML = '☰';
                        }
                    }
                }
            }
        });
    });
    
    // Scroll animasyonları (hafif fade-in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animasyon için elementleri gözlemle
    const animateElements = document.querySelectorAll('.villa-card, .feature-item, .section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

