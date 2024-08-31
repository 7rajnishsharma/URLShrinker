document.getElementById('shortenButton').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput').value;
    if (urlInput) {
        try {
            const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: urlInput })
            });
            const data = await response.json();
            const shortenedUrl = `${window.location.origin}/${data.id}`;
            const shortenedUrlElement = document.getElementById('shortenedUrl');
            shortenedUrlElement.innerHTML = `<a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a>`;

            // Show the result container
            const resultContainer = document.getElementById('result');
            resultContainer.style.display = 'flex'; // Display as flex to keep elements in line

            document.getElementById('copyButton').addEventListener('click', () => {
                navigator.clipboard.writeText(shortenedUrl).then(() => {
                    alert('URL copied to clipboard');
                }).catch(err => {
                    console.error('Error copying to clipboard:', err);
                });
            });
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please enter a URL');
    }
});
