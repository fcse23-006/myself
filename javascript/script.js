// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        //  send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animate skill bars on scroll 
const skillSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.progress');
let animationDone = false; // ensures animation runs only once

function showProgress() {
    if (animationDone) return; // Don't animate again if already done
    
    progressBars.forEach(progressBar => {
        // Store the original width from the style attribute
        const originalWidth = progressBar.style.width;
        
        // Start from 0
        progressBar.style.width = '0';
        progressBar.style.transition = 'width 1s ease';
        
        // Force a reflow
        progressBar.offsetHeight;
        
        // Animate to original width
        setTimeout(() => {
            progressBar.style.width = originalWidth;
        }, 100);
    });
    
    animationDone = true; // Mark animation as done
}


// Use a more efficient scroll listener with throttling
let scrolling = false;
window.addEventListener('scroll', () => {
    if (!scrolling) {
        window.requestAnimationFrame(() => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight * 0.8; // Trigger when section is 80% in view
            
            if (sectionPos < screenPos && !animationDone) {
                showProgress();
            }
            
            scrolling = false;
        });
        
        scrolling = true;
    }
});

// Also trigger on page load in case skills are already visible
window.addEventListener('load', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight * 0.8;
    
    if (sectionPos < screenPos) {
        showProgress();
    }
});


// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});