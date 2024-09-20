document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch('process_contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('responseMessage').innerText = data; // Display thank you message
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'An error occurred. Please try again.';
    });
});
