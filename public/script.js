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
            shortenedUrlElement.innerText = `Shortened URL: ${shortenedUrl}`;
            document.getElementById('copyButton').style.display = 'block';

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
