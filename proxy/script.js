document.getElementById('fetchProxiesBtn').addEventListener('click', function() {
    fetch('/get-proxies')
        .then(response => response.json())
        .then(data => {
            if (data && data.proxies) {
                displayProxies(data.proxies);
            } else {
                throw new Error('Unexpected data format');
            }
        })
        .catch(error => {
            console.error('Error fetching proxies:', error);
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = `<p>Error fetching proxies: ${error.message}</p>`;
        });
});

function displayProxies(proxies) {
    const resultsContainer = document.getElementById('results');
    const uniqueProxies = [...new Set(proxies)]; // Remove duplicates
    resultsContainer.innerHTML = '<h2>Proxies:</h2><ul>' +
        uniqueProxies.map(proxy => `<li>${proxy}</li>`).join('') +
        '</ul>';
}
