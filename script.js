document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    // Smooth scrolling for anchor links with offset
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                scrollToSection(targetId);
            });
        });
    }
    
    function scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.replaceState(null, null, targetId);
    }
    
    // Highlight active navigation item on scroll
    function setupScrollSpy() {
        function updateActiveNav() {
            let currentSection = '';
            const scrollPosition = window.scrollY + header.offsetHeight + 50;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Throttle scroll events for better performance
        let isScrolling;
        window.addEventListener('scroll', function() {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(updateActiveNav, 50);
        }, false);
        
        // Initial call
        updateActiveNav();
    }
    
    // Header hide/show on scroll with debounce
    function setupHeaderBehavior() {
        let lastScroll = 0;
        const scrollThreshold = 100;
        let ticking = false;
        
        function updateHeader() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.style.transform = 'translateY(0)';
                return;
            }
            
            // If scrolling down and past threshold, hide header
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                header.style.transform = 'translateY(-100%)';
            } 
            // If scrolling up, show header
            else if (currentScroll < lastScroll) {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
        
        // Reset header when reaching top
        window.addEventListener('scroll', function() {
            if (window.pageYOffset === 0) {
                header.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Certificate hover effects
    function setupCertificateHover() {
        certificateItems.forEach(item => {
            const overlay = item.querySelector('.certificate-overlay');
            const img = item.querySelector('.certificate-preview img');
            
            if (!overlay || !img) return;
            
            item.addEventListener('mouseenter', function() {
                overlay.style.opacity = '1';
                img.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                overlay.style.opacity = '0';
                img.style.transform = 'scale(1)';
            });
            
            // Touch support for mobile devices
            item.addEventListener('touchstart', function() {
                overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
                img.style.transform = img.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
            });
        });
    }
    
    // Initialize all functionality
    function init() {
        setupSmoothScrolling();
        setupScrollSpy();
        setupHeaderBehavior();
        setupCertificateHover();
        
        // Scroll to section if URL has hash
        if (window.location.hash) {
            setTimeout(() => {
                scrollToSection(window.location.hash);
            }, 100);
        }
    }
    
    init();
});