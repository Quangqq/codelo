const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const target = parsedUrl.query.target;

  if (!target) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('No target URL provided.');
    return;
  }

  // Proxy the request to the target URL
  proxy.web(req, res, { target: target }, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('An error occurred while proxying the request.');
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Proxy server is running on http://localhost:8080');
});
