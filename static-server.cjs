#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5000;
const HOST = '0.0.0.0';

// MIME types for static files
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  try {
    let pathname = url.parse(req.url).pathname;
    
    // Default to index.html for root
    if (pathname === '/') {
      pathname = '/index.html';
    }

    const filePath = path.join(process.cwd(), pathname);
    
    // Security check - prevent directory traversal
    if (!filePath.startsWith(process.cwd())) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    // Check if it's a directory
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      res.writeHead(403);
      res.end('Directory listing not allowed');
      return;
    }

    // Read and serve file
    const data = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': data.length,
      'Cache-Control': 'public, max-age=3600'
    });
    res.end(data);

    console.log(`✅ Served: ${pathname} (${mimeType})`);

  } catch (error) {
    console.error('❌ Server error:', error.message);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

// Handle server errors gracefully
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

// Handle process signals
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

// Start server
server.listen(PORT, HOST, () => {
  console.log(`🚀 Static server running on http://${HOST}:${PORT}`);
  console.log(`📁 Serving files from: ${process.cwd()}`);
  console.log(`🔗 Visit: http://localhost:${PORT}`);
});

// Keep alive heartbeat
setInterval(() => {
  console.log(`💓 Server alive - ${new Date().toISOString()}`);
}, 30000);