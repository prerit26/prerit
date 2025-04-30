document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
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
    
    // Highlight active navigation item on scroll
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
    
    // Header hide/show on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    const scrollThreshold = 100; // How far to scroll before hiding
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // If scrolling down and past threshold, hide header
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-out';
        } 
        // If scrolling up, show header
        else if (currentScroll < lastScroll) {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        updateActiveNav();
    }
    
    // Initial call and scroll event listener
    updateActiveNav();
    window.addEventListener('scroll', handleScroll);
    
    // Certificate hover effect
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.certificate-overlay');
            const img = this.querySelector('.certificate-preview img');
            if (overlay) overlay.style.opacity = '1';
            if (img) img.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.certificate-overlay');
            const img = this.querySelector('.certificate-preview img');
            if (overlay) overlay.style.opacity = '0';
            if (img) img.style.transform = 'scale(1)';
        });
    });
});
