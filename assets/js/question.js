  // FAQ toggle functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const wasActive = item.classList.contains('active');

        // Close all items first
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Toggle the clicked item
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// Category filter functionality
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Filter functionality would go here
        // For now, it's just for UI demonstration
    });
});


// WhatsApp Integration
document.getElementById('whatsapp-button').addEventListener('click', function (e) {
    e.preventDefault();

    // Phone number - change this to your actual WhatsApp number
    const phoneNumber = '+6289519301487'; // Example number (replace with actual)

    // Message text - formatted as requested
    const message = encodeURIComponent(
        "[Customer Service]\nTunggu admin menjawab pesanmu untuk melanjutkan percakapan"
    );

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${+6289519301487}?text=${message}`;

    // Open WhatsApp in new tab/window
    window.open(whatsappUrl, '_blank');
});