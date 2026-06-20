const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  // Parse request URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`[Dev-Server] ${req.method} ${pathname}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Map path to api handler file
  let handlerPath = '';
  req.query = parsedUrl.query || {}; // compatibility for req.query

  if (pathname === '/api/admin-login') {
    handlerPath = './api/admin-login.js';
  } else if (pathname === '/api/signup') {
    handlerPath = './api/signup.js';
  } else if (pathname === '/api/google-login') {
    handlerPath = './api/google-login.js';
  } else if (pathname === '/api/admin-orders') {
    handlerPath = './api/admin-orders.js';
  } else if (pathname.startsWith('/api/admin/orders/')) {
    handlerPath = './api/admin/orders/[orderId].js';
    const parts = pathname.split('/');
    req.query.orderId = parts[parts.length - 1];
  } else if (pathname === '/api/custom-orders') {
    handlerPath = './api/custom-orders.js';
  } else if (pathname === '/api/health') {
    handlerPath = './api/health.js';
  }

  if (handlerPath && fs.existsSync(handlerPath)) {
    try {
      // Helper function for sending JSON response
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.json = (data) => {
        res.writeHead(res.statusCode || 200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      };

      // Parse body if not multipart
      const contentType = req.headers['content-type'] || '';
      if (req.method === 'POST' || req.method === 'PUT') {
        if (!contentType.includes('multipart/form-data')) {
          const bodyBuffer = [];
          for await (const chunk of req) {
            bodyBuffer.push(chunk);
          }
          const bodyString = Buffer.concat(bodyBuffer).toString();
          try {
            req.body = JSON.parse(bodyString);
          } catch (e) {
            req.body = {};
          }
        }
      }

      // Load handler
      // Delete cache to reload on changes
      delete require.cache[require.resolve(handlerPath)];
      const handler = require(handlerPath);

      // Run Vercel handler
      await handler(req, res);
    } catch (err) {
      console.error('[Dev-Server] Handler error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal server error', error: err.message }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`[Dev-Server] Local development API server running on http://localhost:${PORT}`);
});
