import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from project root (where Webflow template is)
const staticPath = path.join(__dirname, '..');
app.use(express.static(staticPath));

// Route all requests to index.html (SPA-style routing for Webflow)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Webflow template server running on http://localhost:${PORT}`);
  console.log(`📁 Serving from: ${staticPath}`);
});