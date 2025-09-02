import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from the root (Webflow template for now)
app.use(express.static(path.join(__dirname, '..')));

// Serve React files when they're ready
app.use('/client', express.static(path.join(__dirname, '..', 'client')));

// Default route serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// React routes (when ready)
app.get('/react', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Webflow template available at /`);
  console.log(`⚛️  React app will be available at /react`);
});