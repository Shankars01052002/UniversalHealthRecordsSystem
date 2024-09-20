document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch('/login', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    if (result.includes('Login Failed')) {
      document.getElementById('message').innerText = result;
    } else {
      window.location.href = 'dashboard.html';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('message').innerText = 'An error occurred. Please try again.';
  });
});