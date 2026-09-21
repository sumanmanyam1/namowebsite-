// NAMO Hospital - Mobile Menu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get mobile menu elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle contact form submission (static site - just show alert)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            
            if (name && phone) {
                alert(`Thank you ${name}! Your message has been received. Please call us directly at:\n\nAppointments: +91 87654 32109\nEmergency: +91 98765 43210\n\nWe will get back to you as soon as possible.`);
                contactForm.reset();
            } else {
                alert('Please fill in all required fields (Name and Phone Number).');
            }
        });
    }

    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading state to emergency and appointment buttons
    const emergencyButtons = document.querySelectorAll('a[href^="tel:+919876543210"]');
    const appointmentButtons = document.querySelectorAll('a[href^="tel:+918765432109"]');

    emergencyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Optional: Add click tracking or analytics here
            console.log('Emergency number clicked');
        });
    });

    appointmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Optional: Add click tracking or analytics here
            console.log('Appointment number clicked');
        });
    });
});

// Additional utility functions for hospital website

// Function to highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', highlightCurrentPage);

// Simple accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus management for mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navToggle.click();
            }
        });
    }

    // Add aria-expanded attribute for screen readers
    navToggle?.addEventListener('click', function() {
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
});