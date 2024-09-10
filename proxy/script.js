const apiUrls = [
    "https://api.proxyscrape.com/?request=displayproxies&proxytype=http",
    "https://www.proxy-list.download/api/v1/get?type=http",
    "https://api.openproxylist.xyz/http.txt",
    "http://alexa.lr2b.com/proxylist.txt",
    "https://multiproxy.org/txt_all/proxy.txt",
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http",
    "https://openproxylist.xyz/http.txt",
    "https://proxyspace.pro/http.txt",
    "https://proxyspace.pro/https.txt",
    "https://rootjazz.com/proxies/proxies.txt",
    "https://www.proxy-list.download/api/v1/get?type=https",
];

document.getElementById('fetchProxiesBtn').addEventListener('click', function() {
    fetchProxies();
});

function fetchProxies() {
    const fetchPromises = apiUrls.map(url => fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
        }
        return response.text();
    }));

    Promise.all(fetchPromises)
        .then(responses => {
            const allProxies = responses.flatMap(response => response.split('\n').map(proxy => proxy.trim()).filter(proxy => proxy.length > 0));
            displayProxies(allProxies);
        })
        .catch(error => {
            console.error('Error fetching proxies:', error);
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = `<p>Error fetching proxies: ${error.message}</p>`;
        });
}

function displayProxies(proxies) {
    const resultsContainer = document.getElementById('results');
    const uniqueProxies = [...new Set(proxies)]; // Remove duplicates
    resultsContainer.innerHTML = '<h2>Proxies:</h2><ul>' +
        uniqueProxies.map(proxy => `<li>${proxy}</li>`).join('') +
        '</ul>';
}
