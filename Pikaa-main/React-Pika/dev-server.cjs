const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5175; // Run on port 5175 to avoid port conflicts with Vite

const server = http.createServer((req, res) => {
  // Only serve the onboarding page on / or general paths
  if (req.url === '/' || req.url === '/index.html' || req.url.startsWith('/?')) {
    const bladePath = path.join(__dirname, 'resources', 'views', 'app.blade.php');
    fs.readFile(bladePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading app.blade.php: ' + err.message);
        return;
      }

      // Read the current Vite dev server URL from public/hot
      const hotPath = path.join(__dirname, 'public', 'hot');
      let viteUrl = 'http://localhost:5173';
      if (fs.existsSync(hotPath)) {
        viteUrl = fs.readFileSync(hotPath, 'utf8').trim();
        // Remove trailing slash if present
        if (viteUrl.endsWith('/')) {
          viteUrl = viteUrl.slice(0, -1);
        }
      }

      let html = content;

      // Replace Blade directives with actual markup for development
      html = html.replace('@viteReactRefresh', `
        <script type="module">
          import RefreshRuntime from "${viteUrl}/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
      `);

      html = html.replace("@vite(['resources/js/app.tsx', 'resources/css/app.css'])", `
        <script type="module" src="${viteUrl}/@vite/client"></script>
        <script type="module" src="${viteUrl}/resources/js/app.tsx"></script>
      `);

      html = html.replace('@inertiaHead', `
        <!-- Inertia Head Mock -->
        <title>Pika Platform - Specifikimi i Regjistrimit të Biznesit (AL & KS)</title>
      `);

      // Inject the initial Inertia page details so it loads BusinessOnboarding directly
      html = html.replace('@inertia', `
        <div id="app" data-page='{"component":"BusinessOnboarding","props":{},"url":"/","version":""}'></div>
      `);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Inertia local dev server running at http://localhost:${PORT}/`);
});
