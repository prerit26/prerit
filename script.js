document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // Debug confirmation
    
    // 1. Set current year in footer (fixed)
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    } else {
        console.warn('Element with ID "year" not found');
    }
    
    // 2. Smooth scrolling for anchor links (improved)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // 3. Highlight active navigation item on scroll (optimized)
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Adjust offset
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Initial call and scroll event listener
    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);
    
    // 4. Form submission handler (if form exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // 5. Certificate hover effect (added for better UX)
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.certificate-overlay').style.opacity = '1';
            this.querySelector('.certificate-preview img').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.certificate-overlay').style.opacity = '0';
            this.querySelector('.certificate-preview img').style.transform = 'scale(1)';
        });
    });
});
