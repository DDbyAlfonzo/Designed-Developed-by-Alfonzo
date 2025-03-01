// JavaScript to handle the hamburger menu toggle
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle menu visibility on click
});

// Form validation and submission handling
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Check if any fields are empty
    if (!name || !email || !subject || !message) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    // Send the form data via AJAX or just submit the form (below)
    this.submit();
});

// JavaScript to open and close modals
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = "block"; // Show modal
    });
});

// Close modal when clicking the close button
document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        const modal = document.getElementById(closeButton.getAttribute('data-modal'));
        modal.style.display = "none"; // Hide modal
    });
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// Next button logic
document.querySelectorAll('.next').forEach(nextButton => {
    nextButton.addEventListener('click', () => {
        const currentModalId = nextButton.closest('.modal').id;
        const nextModalId = nextButton.getAttribute('data-next');
        
        // Hide the current modal
        document.getElementById(currentModalId).style.display = "none";
        
        // Show the next modal
        document.getElementById(nextModalId).style.display = "block";
    });
});

// Optional: Add more interactivity or animations here
document.querySelector('.cta-button').addEventListener('click', () => {
    alert("We're so excited to have you with us!");
});



// Pricing cards

// This script adds the "visible" class to the cards when they are scrolled into view
document.addEventListener("DOMContentLoaded", function () {
    const pricingCards = document.querySelectorAll(".pricing-card");

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        pricingCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                card.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Initial check to show the cards when page loads
});


// Optional: You can trigger the animation on page load using JavaScript if you want more control.
// In this case, the CSS animation works without JS, but you can also add JS for more complex behaviors.
document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('.animated-heading');
    heading.style.animation = 'fadeInGrow 2s ease-out forwards';
  });
  