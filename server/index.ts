import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Development mode: Use Vite dev server for React app
if (process.env.NODE_ENV === 'development') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: path.join(__dirname, '..', 'client'),
  });
  
  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
  
  console.log(`🚀 React app with GSAP running on http://localhost:${PORT}`);
  console.log(`⚡ Vite dev server enabled for hot reloading`);
} else {
  // Production mode: Serve built React app
  const clientPath = path.join(__dirname, '..', 'dist', 'client');
  app.use(express.static(clientPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
  
  console.log(`🚀 React production app running on http://localhost:${PORT}`);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📁 Server ready on port ${PORT}`);
});