import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from the root (Webflow template) for /original route
app.use('/original', express.static(path.join(__dirname, '..')));

// Serve images and other assets
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));

// Serve React client build files
app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));

// React app routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'public', 'index.html'));
});

// SoleGrithm routes
app.get(['/live-market', '/women-in-sneakers', '/ar-tryon', '/solebot', '/soleradar', '/style-quiz', '/sneaker-map'], (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'public', 'index.html'));
});

// Fallback for React Router
app.get('*', (req, res) => {
  if (req.path.startsWith('/original')) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '..', 'dist', 'public', 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`⚛️  React SoleGrithm app at /`);
  console.log(`📁 Original Webflow template at /original`);
});

export default app;