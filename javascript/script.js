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

// Form submission handling with reCAPTCHA
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = document.querySelector('input[placeholder="Your email"]').value.trim();
        const subject = document.querySelector('input[placeholder="Subject"]').value.trim();
        const message = document.querySelector('textarea').value.trim();
        
        // Validate inputs
        if (!validateInputs(name, email, message)) {
            return;
        }
        
        // Check reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showNotification('Please complete the CAPTCHA verification', 'error');
            return;
        }
        
        // Disable button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            subject: sanitizeInput(subject),
            message: sanitizeInput(message),
            recaptcha: recaptchaResponse
        };
        
        try {
            // Here you would send to your backend
            console.log('Form submitted:', sanitizedData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Thank you! I will get back to you soon.', 'success');
            contactForm.reset();
            grecaptcha.reset(); // Reset reCAPTCHA after submission
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Validation function
function validateInputs(name, email, message) {
    if (!name || name.length < 2) {
        showNotification('Please enter a valid name', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return false;
    }
    
    if (!message || message.length < 10) {
        showNotification('Message must be at least 10 characters', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sanitize input (remove HTML tags)
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Notification function
function showNotification(message, type = 'success') {
    // Check if notification container exists
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
        cursor: pointer;
    `;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => notification.remove());
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
// Animate skill bars on scroll
const skillSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.style.width;
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = value;
        }, 100);
    });
}

function hideProgress() {
    progressBars.forEach(p => p.style.width = 0);
}

window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 2;
    
    if (sectionPos < screenPos) {
        showProgress();
    } else {
        hideProgress();
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