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


/* ============================================================= */
/* Login + Patient Status Lookup (static demo)                   */
/* ============================================================= */

// Demo staff credentials (static site — for demo only, not secure)
const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'namo123'
};

// Sample patient records.
// Match key = firstname|surname|appointmentDate (all lowercase).
const PATIENT_RECORDS = [
    {
        firstName: 'Ravi',
        surname: 'Kumar',
        appointmentDate: '2026-09-20',
        status: 'In Hospital',
        doctor: 'Dr. Rahul Sharma (Cardiologist)',
        room: 'ICU-204'
    },
    {
        firstName: 'Anita',
        surname: 'Sharma',
        appointmentDate: '2026-09-18',
        status: 'Discharged',
        doctor: 'Dr. Priya Reddy (Pediatrician)',
        room: 'Ward B-12'
    },
    {
        firstName: 'Suresh',
        surname: 'Patel',
        appointmentDate: '2026-09-22',
        status: 'In Hospital',
        doctor: 'Dr. Vikram Singh (Orthopedic Specialist)',
        room: 'Room 305'
    },
    {
        firstName: 'Meena',
        surname: 'Nair',
        appointmentDate: '2026-09-15',
        status: 'Discharged',
        doctor: 'Dr. Sneha Rao (Gynecologist)',
        room: 'Ward A-07'
    },
    {
        firstName: 'Arjun',
        surname: 'Reddy',
        appointmentDate: '2026-09-23',
        status: 'In Hospital',
        doctor: 'Dr. Arjun Kumar (Neurologist)',
        room: 'Room 118'
    },
    {
        firstName: 'Arjun',
        surname: 'Reddy',
        appointmentDate: '2026-09-23',
        status:'In Hospital',
        doctor:'Dr Siva Mohan Yadav Yerasi',
        room: 'Room 205'
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const modalClose = document.getElementById('modalClose');
    const loginStep = document.getElementById('loginStep');
    const choiceStep = document.getElementById('choiceStep');
    const searchStep = document.getElementById('searchStep');
    const appointmentStep = document.getElementById('appointmentStep');
    const loginForm = document.getElementById('loginForm');
    const patientLoginForm = document.getElementById('patientLoginForm');
    const tabPatient = document.getElementById('tabPatient');
    const tabStaff = document.getElementById('tabStaff');
    const patientForm = document.getElementById('patientForm');
    const appointmentForm = document.getElementById('appointmentForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const patientResult = document.getElementById('patientResult');
    const appointmentResult = document.getElementById('appointmentResult');
    const choicePatient = document.getElementById('choicePatient');
    const choiceAppointment = document.getElementById('choiceAppointment');
    const backFromSearch = document.getElementById('backFromSearch');
    const backFromAppointment = document.getElementById('backFromAppointment');

    // If the modal isn't on this page, do nothing.
    if (!loginBtn || !modal) {
        return;
    }

    function openModal() {
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    // Show a single step and hide the others
    function showStep(stepToShow) {
        [loginStep, choiceStep, searchStep, appointmentStep].forEach(function (step) {
            if (step) step.style.display = (step === stepToShow) ? 'block' : 'none';
        });
    }

    // Switch between the Patient/Visitor and Staff login forms
    function showLoginTab(role) {
        const isStaff = role === 'staff';
        if (loginForm) loginForm.style.display = isStaff ? 'block' : 'none';
        if (patientLoginForm) patientLoginForm.style.display = isStaff ? 'none' : 'block';
        if (tabStaff) tabStaff.classList.toggle('active', isStaff);
        if (tabPatient) tabPatient.classList.toggle('active', !isStaff);
    }

    if (tabPatient) {
        tabPatient.addEventListener('click', function () { showLoginTab('patient'); });
    }
    if (tabStaff) {
        tabStaff.addEventListener('click', function () { showLoginTab('staff'); });
    }

    // Reset back to the login step (used on close/logout)
    function resetToLogin() {
        if (loginForm) loginForm.reset();
        if (patientLoginForm) patientLoginForm.reset();
        if (patientForm) patientForm.reset();
        if (appointmentForm) appointmentForm.reset();
        if (patientResult) {
            patientResult.style.display = 'none';
            patientResult.innerHTML = '';
        }
        if (appointmentResult) {
            appointmentResult.style.display = 'none';
            appointmentResult.innerHTML = '';
        }
        // Remove any previous login errors
        [loginForm, patientLoginForm].forEach(function (form) {
            const err = form ? form.querySelector('.modal-error') : null;
            if (err) err.remove();
        });

        showLoginTab('patient');
        showStep(loginStep);
    }

    // Open modal from navbar button
    loginBtn.addEventListener('click', function () {
        resetToLogin();
        openModal();
    });

    // Close via X button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close by clicking the dark overlay (but not the box)
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Tracks who is logged in: { role: 'staff'|'patient', name, phone }
    let currentUser = null;

    // Update the choice-step greeting to reflect the logged-in user
    function updateGreeting() {
        const heading = choiceStep ? choiceStep.querySelector('h2') : null;
        if (!heading) return;
        if (currentUser && currentUser.name) {
            heading.textContent = 'Welcome, ' + currentUser.name;
        } else {
            heading.textContent = 'Welcome';
        }
    }

    // Handle patient / visitor login (no password)
    if (patientLoginForm) {
        patientLoginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('visitorName').value.trim();
            const phone = document.getElementById('visitorPhone').value.trim();

            const oldError = patientLoginForm.querySelector('.modal-error');
            if (oldError) oldError.remove();

            if (!name || !phone) {
                const error = document.createElement('p');
                error.className = 'modal-error';
                error.textContent = 'Please enter your name and phone number.';
                patientLoginForm.appendChild(error);
                return;
            }

            currentUser = { role: 'patient', name: name, phone: phone };
            updateGreeting();
            showStep(choiceStep);
        });
    }

    // Handle staff login submit
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('loginUser').value.trim();
            const password = document.getElementById('loginPass').value;

            // Remove old error if present
            const oldError = loginForm.querySelector('.modal-error');
            if (oldError) oldError.remove();

            if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
                // Success -> show the choice step (Patient Details / Appointments)
                currentUser = { role: 'staff', name: 'Staff', phone: '' };
                updateGreeting();
                showStep(choiceStep);
            } else {
                // Show inline error
                const error = document.createElement('p');
                error.className = 'modal-error';
                error.textContent = 'Invalid username or password. Please try again.';
                loginForm.appendChild(error);
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            currentUser = null;
            resetToLogin();
        });
    }

    // Choice step: go to Patient Details
    if (choicePatient) {
        choicePatient.addEventListener('click', function () {
            if (patientResult) {
                patientResult.style.display = 'none';
                patientResult.innerHTML = '';
            }
            if (patientForm) patientForm.reset();
            showStep(searchStep);
        });
    }

    // Choice step: go to Appointments
    if (choiceAppointment) {
        choiceAppointment.addEventListener('click', function () {
            if (appointmentResult) {
                appointmentResult.style.display = 'none';
                appointmentResult.innerHTML = '';
            }
            if (appointmentForm) appointmentForm.reset();

            // Prefill name/phone when a patient/visitor is logged in
            if (currentUser && currentUser.role === 'patient') {
                const parts = currentUser.name.split(' ');
                const aName = document.getElementById('aName');
                const aSurname = document.getElementById('aSurname');
                const aPhone = document.getElementById('aPhone');
                if (aName) aName.value = parts[0] || '';
                if (aSurname) aSurname.value = parts.slice(1).join(' ');
                if (aPhone) aPhone.value = currentUser.phone || '';
            }

            showStep(appointmentStep);
        });
    }

    // Back buttons -> return to the choice step
    if (backFromSearch) {
        backFromSearch.addEventListener('click', function () {
            showStep(choiceStep);
        });
    }
    if (backFromAppointment) {
        backFromAppointment.addEventListener('click', function () {
            showStep(choiceStep);
        });
    }

    // Handle appointment booking submit
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const first = document.getElementById('aName').value.trim();
            const surname = document.getElementById('aSurname').value.trim();
            const phone = document.getElementById('aPhone').value.trim();
            const doctor = document.getElementById('aDoctor').value;
            const date = document.getElementById('aDate').value;
            const time = document.getElementById('aTime').value;

            if (!first || !surname || !phone || !doctor || !date || !time) {
                return;
            }

             // Create a unique patient ID
        const patientId = 'P' + Date.now();

        // Data to send to DynamoDB
        const patientData = {
            "patient.id": patientId,
            "admission_date": date,
            "name": first + ' ' + surname,
            "phone": phone,
            "doctor": doctor,
            "appointment_time": time
        };

        try {
            const response = await fetch(
                'https://v3zad59huh.execute-api.ap-south-1.amazonaws.com/patients',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(patientData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to save appointment');
            }

            if (appointmentResult) {
                appointmentResult.innerHTML =
                    '<div class="patient-card">' +
                        '<h3>Appointment Confirmed \u2705</h3>' +
                        '<div class="patient-detail">' +
                            '<span class="label">Patient</span>' +
                            '<span class="value">' + escapeHtml(first + ' ' + surname) + '</span>' +
                        '</div>' +
                        '<div class="patient-detail">' +
                            '<span class="label">Phone</span>' +
                            '<span class="value">' + escapeHtml(phone) + '</span>' +
                        '</div>' +
                        '<div class="patient-detail">' +
                            '<span class="label">Doctor</span>' +
                            '<span class="value">' + escapeHtml(doctor) + '</span>' +
                        '</div>' +
                        '<div class="patient-detail">' +
                            '<span class="label">Date</span>' +
                            '<span class="value">' + escapeHtml(date) + '</span>' +
                        '</div>' +
                        '<div class="patient-detail">' +
                            '<span class="label">Time</span>' +
                            '<span class="value">' + escapeHtml(time) + '</span>' +
                        '</div>' +
                    '</div>';
                appointmentResult.style.display = 'block';
            }

        } catch (error) {
            if (appointmentResult) {
                appointmentResult.innerHTML =
                    '<div class="patient-not-found">' +
                        'Sorry, we could not save your appointment right now. ' +
                        escapeHtml(error.message || 'Please try again later.') +
                    '</div>';
                appointmentResult.style.display = 'block';
            }
        }
        });
    }

    // Handle patient search submit
    if (patientForm) {
        patientForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const first = document.getElementById('pName').value.trim().toLowerCase();
            const surname = document.getElementById('pSurname').value.trim().toLowerCase();
            const date = document.getElementById('pDate').value; // yyyy-mm-dd (optional)

            // Collect ALL matching patients (there can be more than one
            // person with the same name / date, treated by different doctors).
            const matches = PATIENT_RECORDS.filter(function (p) {
                const nameMatches = p.firstName.toLowerCase() === first &&
                                    p.surname.toLowerCase() === surname;
                // Date is optional: only require it to match when the user entered one.
                const dateMatches = !date || p.appointmentDate === date;
                return nameMatches && dateMatches;
            });

            renderResult(matches, first, surname);
        });
    }

    function renderResult(patients, first, surname) {
        if (!patientResult) return;

        if (patients && patients.length > 0) {
            // If more than one match, show a small heading first.
            let html = '';
            if (patients.length > 1) {
                html += '<p class="result-count">Found ' + patients.length +
                        ' patients matching that name. Showing all:</p>';
            }

            html += patients.map(function (patient) {
                const badgeClass = patient.status === 'In Hospital'
                    ? 'status-in-hospital'
                    : 'status-discharged';

                return '<div class="patient-card">' +
                    '<h3>' + escapeHtml(patient.firstName + ' ' + patient.surname) + '</h3>' +
                    '<div class="patient-detail">' +
                        '<span class="label">Status</span>' +
                        '<span class="value"><span class="status-badge ' + badgeClass + '">' +
                        escapeHtml(patient.status) + '</span></span>' +
                    '</div>' +
                    '<div class="patient-detail">' +
                        '<span class="label">Treating Doctor</span>' +
                        '<span class="value">' + escapeHtml(patient.doctor) + '</span>' +
                    '</div>' +
                    '<div class="patient-detail">' +
                        '<span class="label">Room No.</span>' +
                        '<span class="value">' + escapeHtml(patient.room) + '</span>' +
                    '</div>' +
                    '<div class="patient-detail">' +
                        '<span class="label">Appointment Date</span>' +
                        '<span class="value">' + escapeHtml(patient.appointmentDate) + '</span>' +
                    '</div>' +
                '</div>';
            }).join('');

            patientResult.innerHTML = html;
        } else {
            patientResult.innerHTML =
                '<div class="patient-not-found">' +
                    'No patient record found for "' + escapeHtml(first + ' ' + surname) +
                    '". Please check the details and try again.' +
                '</div>';
        }

        patientResult.style.display = 'block';
    }

    // Basic HTML escaping to avoid injecting raw user input
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
});
