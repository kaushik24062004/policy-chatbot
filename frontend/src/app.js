document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('policy', document.querySelector('input[type="file"]').files[0]);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const message = await response.text()
            alert(message);
        } else {
            alert('Failed to upload file.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred during the file upload.');
    }
});

document.getElementById('ask-button').addEventListener('click', async () => {
    const question = document.getElementById('question').value;
    const chatHistory = document.getElementById('chat-history');

    if (!question.trim()) return;

    chatHistory.innerHTML += `<div class="message user-message"><div class="message-content">${question}</div></div>`;

    const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
    });

    const data = await response.json();
    chatHistory.innerHTML += `<div class="message bot-message"><div class="message-content">${data.answer}</div></div>`;
    document.getElementById('question').value = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;
});
