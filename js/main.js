// Main JavaScript file for LearnEverything Academy

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to course cards
    const courseCards = document.querySelectorAll('.bg-gray-700.rounded-lg');
    courseCards.forEach(card => {
        card.classList.add('course-card-hover');
    });

    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('animate-fade-in');
    }

    // Handle purchase button clicks
    const purchaseButtons = document.querySelectorAll('button:contains("Purchase Course")');
    if (purchaseButtons.length > 0) {
        purchaseButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Thank you for your interest! This is a demo site. In a real application, this would take you to a checkout page.');
            });
        });
    }

    // Handle chapter start buttons
    const chapterButtons = document.querySelectorAll('button:contains("Start Chapter")');
    if (chapterButtons.length > 0) {
        chapterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert('This is a demo site. In a real application, this would start the chapter content.');
            });
        });
    }

    console.log('LearnEverything Academy site initialized');
});
