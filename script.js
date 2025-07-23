// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Animation Observer with improved timing
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

// Initialize animations with immediate trigger for hero section
function initAnimations() {
    // First, handle hero section animations immediately
    const heroElements = document.querySelectorAll('#hero .fade-up, #hero .fade-in, #hero .slide-in-left, #hero .slide-in-right, #hero .scale-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200); // Stagger the animations
    });

    // Then handle all other animated elements with intersection observer
    const animatedElements = document.querySelectorAll('section:not(#hero) .fade-up, section:not(#hero) .fade-in, section:not(#hero) .slide-in-left, section:not(#hero) .slide-in-right, section:not(#hero) .scale-up');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
}

// Call animation initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    createCalendarGrid();

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const phone = this.querySelector('input[placeholder="Phone Number"]').value;
            const message = this.querySelector('textarea[placeholder="Message"]').value;
            
            const telegramMessage = `${name}+${email}+${phone}+${message}`;
            const encodedMessage = encodeURIComponent(telegramMessage);
            const apiUrl = `https://api.telegram.org/bot7907445906:AAFwVn6RdWXkMADDekhB0uldLw6TyKIkCeA/sendmessage?chat_id=150152224&text=${encodedMessage}`;
            
            console.log('API URL:', apiUrl);
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('API Response:', data);
                    if (data.ok) {
                        // Create and show notification
                        const notification = document.createElement('div');
                        notification.className = 'notification';
                        notification.textContent = 'Message sent successfully!';
                        document.body.appendChild(notification);
                        
                        // Remove notification after 2 seconds
                        setTimeout(() => {
                            notification.remove();
                        }, 2000);
                        
                        // Reset form
                        this.reset();
                    } else {
                        alert('Failed to send message. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to send message. Please try again.');
                });
        });
    }

    // Partner Form Submission
    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const phone = this.querySelector('input[placeholder="Phone Number"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const city = this.querySelector('input[placeholder="City"]').value;
            const state = this.querySelector('input[placeholder="State"]').value;
            const business = this.querySelector('input[placeholder="Current Business"]').value;
            
            const telegramMessage = `New Channel Partner Application:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nState: ${state}\nCurrent Business: ${business}`;
            const encodedMessage = encodeURIComponent(telegramMessage);
            const apiUrl = `https://api.telegram.org/bot7907445906:AAFwVn6RdWXkMADDekhB0uldLw6TyKIkCeA/sendmessage?chat_id=150152224&text=${encodedMessage}`;
            
            console.log('API URL:', apiUrl);
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('API Response:', data);
                    if (data.ok) {
                        // Create and show notification
                        const notification = document.createElement('div');
                        notification.className = 'notification';
                        notification.textContent = 'Application submitted successfully!';
                        document.body.appendChild(notification);
                        
                        // Remove notification after 2 seconds
                        setTimeout(() => {
                            notification.remove();
                        }, 2000);
                        
                        // Reset form
                        this.reset();
                    } else {
                        alert('Failed to submit application. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to submit application. Please try again.');
                });
        });
    }
});

// Create Calendar Grid
function createCalendarGrid() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const highlightDays = [12, 13, 14, 15, 16]; // Days to highlight

    // Add day headers
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Add calendar days (1-30)
    for (let i = 1; i <= 30; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        if (highlightDays.includes(i)) {
            dayElement.className += ' highlight';
        }
        dayElement.textContent = i;
        calendarGrid.appendChild(dayElement);
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background color based on scroll position
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// Testimonials Slider (if needed)
// Add slider functionality here when testimonials are added 