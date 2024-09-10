document.getElementById('fetchVideoBtn').addEventListener('click', function() {
    fetch('https://api.sumiproject.net/video/videoanime')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (!data.url || !data.count) {
                throw new Error('Invalid data format');
            }
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `
                <video controls>
                    <source src="${data.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div id="video-info">View Count: ${data.count}</div>
            `;
        })
        .catch(error => {
            console.error('Error fetching the video:', error);
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `<p>Error fetching video: ${error.message}</p>`;
        });
});
