// Booking Form Validation and Handling

(function() {
    'use strict';

    const form = document.getElementById('booking-form');
    const successMessage = document.getElementById('success-message');

    if (!form) return;

    // Form field elements
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        serviceType: document.getElementById('service-type'),
        date: document.getElementById('date'),
        time: document.getElementById('time'),
        location: document.getElementById('location'),
        guardsNeeded: document.getElementById('guards-needed'),
        duration: document.getElementById('duration')
    };

    // Validation functions
    const validators = {
        name: (value) => {
            if (value.trim().length < 2) {
                return 'Please enter a valid name';
            }
            return '';
        },

        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Please enter a valid email address';
            }
            return '';
        },

        phone: (value) => {
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (value.length < 10 || !phoneRegex.test(value)) {
                return 'Please enter a valid phone number';
            }
            return '';
        },

        serviceType: (value) => {
            if (!value) {
                return 'Please select a service type';
            }
            return '';
        },

        date: (value) => {
            if (!value) {
                return 'Please select a date';
            }
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                return 'Please select a future date';
            }
            return '';
        },

        time: (value) => {
            if (!value) {
                return 'Please select a time';
            }
            return '';
        },

        location: (value) => {
            if (value.trim().length < 5) {
                return 'Please enter a valid location';
            }
            return '';
        },

        guardsNeeded: (value) => {
            if (!value || parseInt(value) < 1) {
                return 'Please enter at least 1 guard';
            }
            return '';
        },

        duration: (value) => {
            if (!value || parseFloat(value) < 1) {
                return 'Please enter a valid duration';
            }
            return '';
        }
    };

    // Show error message
    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const field = fields[fieldName];

        if (errorElement) {
            errorElement.textContent = message;
        }

        if (field) {
            field.style.borderColor = message ? '#d32f2f' : '#e0e0e0';
        }
    }

    // Clear error message
    function clearError(fieldName) {
        showError(fieldName, '');
    }

    // Validate single field
    function validateField(fieldName) {
        const field = fields[fieldName];
        if (!field) return true;

        const validator = validators[fieldName];
        if (!validator) return true;

        const error = validator(field.value);
        showError(fieldName, error);

        return error === '';
    }

    // Add real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (!field) return;

        // Validate on blur
        field.addEventListener('blur', () => {
            validateField(fieldName);
        });

        // Clear error on input
        field.addEventListener('input', () => {
            if (field.style.borderColor === 'rgb(211, 47, 47)') {
                clearError(fieldName);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Scroll to first error
            const firstError = form.querySelector('[style*="rgb(211, 47, 47)"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;

        try {
            // Submit form (Netlify Forms handles this automatically)
            const formData = new FormData(form);

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                // Show success message
                form.style.display = 'none';
                successMessage.classList.remove('hidden');

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting your request. Please try again or contact us directly.');

            // Reset button state
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });

    // Set minimum date to today
    if (fields.date) {
        const today = new Date().toISOString().split('T')[0];
        fields.date.min = today;
    }

})();
