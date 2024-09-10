document.getElementById('fetchVideoBtn').addEventListener('click', function() {
    fetch('https://api.sumiproject.net/video/videoanime')
        .then(response => response.json())
        .then(data => {
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `
                <video controls>
                    <source src="${data.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div id="video-info">View Count: ${data.count}</div>
            `;
        })
        .catch(error => console.error('Error fetching the video:', error));
});
