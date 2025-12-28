document.addEventListener('DOMContentLoaded', () => {
    // Service Data Configuration
    const serviceData = {
        kra: {
            title: "KRA Services",
            icon: "fa-file-invoice-dollar",
            items: [
                "Nil Returns Filing",
                "Employment Returns (T9)",
                "VAT Returns (Monthly)",
                "Amended Returns",
                "Rental Income Returns",
                "KRA Waiver Applications",
                "New Individual PIN Registration",
                "Company/Business PIN Registration",
                "Group/Chama PIN Registration",
                "PIN Retrieval & Updates",
                "Email Address Update on iTax"
            ]
        },
        helb: {
            title: "HELB & KUCCPS",
            icon: "fa-graduation-cap",
            items: [
                "HELB First Time Application",
                "HELB Subsequent Application",
                "Loan Appeal & Review",
                "Compliance Certificate",
                "KUCCPS Course Application",
                "KUCCPS Inter-Institutional Transfer"
            ]
        },
        police: {
            title: "Police Clearance",
            icon: "fa-shield-alt",
            items: [
                "Good Conduct Application",
                "Certificate Printing",
                "Good Conduct Renewal"
            ]
        },
        ntsa: {
            title: "NTSA Services",
            icon: "fa-car",
            items: [
                "Driving License (DL) Renewal",
                "Interim DL Application",
                "TIMS Account Opening",
                "Logbook Search/Transfer",
                "PSV Badge Application",
                "Booking of Driving Test"
            ]
        },
        mpesa: {
            title: "M-PESA Services",
            icon: "fa-mobile-alt",
            items: [
                "Cash Deposits",
                "Cash Withdrawals"
            ]
        },
        passport: {
            title: "Passport & Visa",
            icon: "fa-passport",
            items: [
                "New Passport Application",
                "Passport Replacement/Renewal",
                "Lost Passport Replacement",
                "Visa Application Assistance",
                "Green Card Application"
            ]
        },
        sha: {
            title: "SHA Services",
            icon: "fa-heartbeat",
            items: [
                "SHA Registration",
                "Add Dependents (Spouse/Children)",
                "Check Vital Status",
                "Replace Lost Card",
                "Contribution Payment"
            ]
        },
        design: {
            title: "Typesetting & Design",
            icon: "fa-laptop-code",
            items: [
                "Attachment Reports",
                "Business Plans",
                "School Projects",
                "Professional CVs/Resumes",
                "Posters & Flyers",
                "Graphic Design/Editing"
            ]
        }
    };

    // Modal Elements
    const modal = document.getElementById('service-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalList = document.getElementById('modal-list');
    const serviceCards = document.querySelectorAll('.service-card[data-service]');

    // Open Modal Function
    function openModal(serviceId) {
        const data = serviceData[serviceId];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;

        // Clear and populate list
        modalList.innerHTML = '';
        data.items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${item}`;

            // Add click listener to select this service
            li.style.cursor = 'pointer';
            li.title = "Click to inquire about this service";

            li.addEventListener('click', () => {
                closeModal();

                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                contactSection.scrollIntoView({ behavior: 'smooth' });

                // Pre-fill message
                const messageField = document.getElementById('message');
                if (messageField) {
                    messageField.value = `Hello, I would like to inquire about: ${item} (${data.title})`;
                }

                // Focus on Name field
                document.getElementById('user_name').focus();
            });

            modalList.appendChild(li);
        });

        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    // Close Modal Function
    function closeModal() {
        if (!modal) return; // Guard clause
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Event Listeners for Cards
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.getAttribute('data-service');
            openModal(serviceId);
        });
    });

    // Close Modal Events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(2, 6, 23, 0.95)';
            header.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(2, 6, 23, 0.8)';
            header.style.boxShadow = 'none';
        }
    });



    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for animation
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Generate a random 5-digit number for the ID
            this.contact_number.value = Math.random() * 100000 | 0;

            // Send form using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual IDs from EmailJS dashboard
            emailjs.sendForm('service_x1lpjxb', 'template_is5rl7y', this)
                .then(function () {
                    console.log('SUCCESS!');
                    formStatus.style.color = '#4ade80'; // Green color
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                    contactForm.reset();

                    setTimeout(() => {
                        formStatus.innerHTML = '';
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 5000);
                }, function (error) {
                    console.log('FAILED...', error);
                    formStatus.style.color = '#f87171'; // Red color
                    // Show specific error for debugging
                    const errorMessage = error.text || (error.message ? error.message : JSON.stringify(error));
                    formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> Error: ${errorMessage}`;

                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    document.head.appendChild(styleSheet);
});
