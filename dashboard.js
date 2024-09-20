document.addEventListener('DOMContentLoaded', function () {
    const username = document.getElementById('username').innerText.trim();
    document.getElementById('usernameInput').value = username;

    fetchDocuments(username);
    setupReminder();

    const uploadForm = document.getElementById('uploadForm');
    let isSubmitting = false;

    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (isSubmitting) return;
        isSubmitting = true;

        const formData = new FormData(uploadForm);
        const submitButton = uploadForm.querySelector('.btn-submit');
        submitButton.disabled = true;

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/dashboard.html';
                } else {
                    console.error('Upload failed:', response.statusText);
                }
            })
            .catch(err => console.error('Error uploading document:', err))
            .finally(() => {
                submitButton.disabled = false;
                isSubmitting = false;
            });
    });

    function fetchDocuments(username) {
        fetch(`/documents?username=${encodeURIComponent(username)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }
                return response.json();
            })
            .then(documents => {
                const tableBody = document.getElementById('documentTableBody');
                tableBody.innerHTML = '';

                documents.forEach(doc => {
                    const row = document.createElement('tr');
                    row.dataset.id = doc.id;

                    const documentCell = document.createElement('td');
                    const documentLink = document.createElement('a');
                    documentLink.href = `/uploads/${encodeURIComponent(doc.document_name)}`;
                    documentLink.textContent = doc.document_name;
                    documentLink.target = '_blank';
                    documentCell.appendChild(documentLink);
                    row.appendChild(documentCell);

                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = doc.document_description;
                    row.appendChild(descriptionCell);

                    const uploadDateCell = document.createElement('td');
                    const date = new Date(doc.upload_date);
                    uploadDateCell.textContent = formatDate(date);
                    row.appendChild(uploadDateCell);

                    const actionsCell = document.createElement('td');
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'btn-delete';
                    deleteButton.onclick = () => deleteDocument(doc.id);
                    actionsCell.appendChild(deleteButton);
                    row.appendChild(actionsCell);

                    tableBody.appendChild(row);
                });
            })
            .catch(err => console.error('Error fetching documents:', err));
    }

    function deleteDocument(id) {
        fetch(`/delete-document/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    document.querySelector(`tr[data-id="${id}"]`).remove();
                } else {
                    console.error('Failed to delete document:', response.statusText);
                }
            })
            .catch(err => console.error('Error deleting document:', err));
    }

    function setupReminder() {
        const reminderForm = document.getElementById('reminderForm');
        reminderForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const reminderDate = document.getElementById('reminder_date').value;
            const reminderMessage = document.getElementById('reminder_message').value;

            if (!reminderDate || !reminderMessage) {
                alert('Please fill out all fields.');
                return;
            }

            const now = new Date();
            const reminderTime = new Date(reminderDate);

            if (reminderTime <= now) {
                alert('Reminder date must be in the future.');
                return;
            }

            const timeDifference = reminderTime - now;

            setTimeout(() => {
                new Notification('Reminder', {
                    body: reminderMessage,
                    icon: 'icon.png'
                });
            }, timeDifference);

            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            }
        });
    }

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleString();
        document.getElementById('currentTime').textContent = timeString;
    }

    function formatDate(date) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit', 
            second: '2-digit',
            hour12: true
        };
        return date.toLocaleDateString(undefined, options).replace(',', ' at');
    }

    setInterval(updateTime, 1000);
    updateTime();

    document.querySelector('#uploadForm input[type="file"]').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('docPreview').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('submitFeedback').addEventListener('click', function() {
        const feedback = document.getElementById('feedback').value;
        if (feedback.trim() === '') {
            alert('Please provide feedback before submitting.');
            return;
        }

        fetch('/submit-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedback })
        })
        .then(response => {
            if (response.ok) {
                alert('Feedback submitted successfully!');
                document.getElementById('feedback').value = '';
            } else {
                console.error('Failed to submit feedback:', response.statusText);
            }
        })
        .catch(err => console.error('Error submitting feedback:', err));
    });

    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;

        if (!name || !email) {
            alert('Please fill out all fields.');
            return;
        }

        fetch('/update-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(response => {
            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                console.error('Failed to update profile:', response.statusText);
            }
        })
        .catch(err => console.error('Error updating profile:', err));
    });

    const socket = new WebSocket('ws://your-websocket-url');
    socket.onmessage = function(event) {
        const notification = JSON.parse(event.data);
        if (notification.type === 'documentUpdate') {
            alert(`Document ${notification.documentName} has been updated.`);
        }
    };

    document.getElementById('searchInput').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('#documentTableBody tr').forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
});
