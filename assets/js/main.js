// Aethel Konsept - Ana JavaScript Dosyası

// Hero Carousel
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    function showSlide(index) {
        // Tüm slide'ları gizle
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            // Z-index ayarla - önceki slide'lar arkada kalsın
            if (i < index) {
                slide.style.zIndex = '0';
            }
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Yeni slide'ı göster
        if (slides[index]) {
            slides[index].classList.add('active');
            slides[index].style.zIndex = '2';
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    function startAutoSlide() {
        // İlk slide'ı göster
        showSlide(0);
        // 5 saniyede bir otomatik geçiş
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Buton event'leri
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    // Dot event'leri
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // Otomatik geçiş başlat
    startAutoSlide();
    
    // Mouse hover'da durdur
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
}

// Bilgi Formu Modal
function initInfoForm() {
    const modal = document.getElementById('infoFormModal');
    const openButtons = document.querySelectorAll('#seferihisar-cta, #sidebar-info-form, .hero-cta-button');
    const closeButton = document.getElementById('closeInfoForm');
    const overlay = document.querySelector('.info-form-overlay');
    const form = document.getElementById('infoForm');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Açma butonları
    openButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        }
    });

    // Kapatma butonları
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // ESC tuşu ile kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form gönderimi
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form gönderimi burada yapılabilir
            alert('Form gönderimi şu anda aktif değil. Lütfen telefon veya e-posta ile iletişime geçin.');
            closeModal();
        });
    }
}

// Hamburger Menü Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Hero carousel'i başlat
    initHeroCarousel();
    
    // Bilgi formu modal'ını başlat
    initInfoForm();
    
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

