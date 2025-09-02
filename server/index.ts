import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

async function startServer() {
  // Create Vite dev server for React app
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: path.join(__dirname, '..', 'client'),
  });
  
  // Use Vite's connect middleware
  app.use(vite.ssrFixStacktrace);
  
  // Serve static assets from images folder
  app.use('/images', express.static(path.join(__dirname, '..', 'images')));
  
  // Original Webflow template available at /original
  app.get('/original', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
  
  // Use Vite middleware for all other routes (React app)
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 React + GSAP app running on http://localhost:${PORT}`);
    console.log(`⚛️  SoleGrithm hero section ready!`);
    console.log(`📁 Original Webflow at /original`);
  });
}

startServer().catch(console.error);