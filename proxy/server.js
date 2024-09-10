const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// List of proxy APIs
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

app.use(express.static('public'));

app.get('/get-proxies', async (req, res) => {
    try {
        const fetchPromises = apiUrls.map(url => fetch(url).then(response => response.text()));
        const responses = await Promise.all(fetchPromises);
        const allProxies = responses.flatMap(response => response.split('\n').map(proxy => proxy.trim()).filter(proxy => proxy.length > 0));
        const uniqueProxies = [...new Set(allProxies)]; // Remove duplicates
        res.json({ proxies: uniqueProxies });
    } catch (error) {
        console.error('Error fetching proxies:', error);
        res.status(500).json({ error: 'Failed to fetch proxies' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
