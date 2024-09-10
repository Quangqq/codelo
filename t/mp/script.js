document.getElementById('fetchVideoBtn').addEventListener('click', function() {
    fetch('https://api.sumiproject.net/video/videoanime')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Ensure the API returns the expected data format
            if (data && data.url) {
                const videoContainer = document.getElementById('video-container');
                videoContainer.innerHTML = `
                    <video controls>
                        <source src="${data.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            } else {
                throw new Error('Unexpected data format');
            }
        })
        .catch(error => {
            console.error('Error fetching the video:', error);
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `<p>Error fetching video: ${error.message}</p>`;
        });
});
