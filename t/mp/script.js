const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://api.sumiproject.net/video/videoanime';

fetch(proxyUrl + apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
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
    .catch(error => {
        console.error('Error fetching the video:', error);
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = `<p>Error fetching video: ${error.message}</p>`;
    });
