import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PresupuestosPro</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; color: #1f2937; background: #f8fafc; }
      .card { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; padding: 32px; box-shadow: 0 8px 24px rgba(15,23,42,0.08); }
      h1 { margin-top: 0; }
      code { background: #eef2ff; padding: 2px 6px; border-radius: 6px; }
      ul { line-height: 1.8; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>PresupuestosPro</h1>
      <p>La aplicación de presupuestos está funcionando en modo local.</p>
      <ul>
        <li>Perfil del freelancer</li>
        <li>Catálogo de servicios</li>
        <li>Presupuestos con cálculo automático</li>
        <li>Exportación a PDF</li>
      </ul>
      <p>Estado: <code>OK</code></p>
    </div>
  </body>
</html>`;

const server = http.createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', app: 'PresupuestosPro' }));
    return;
  }

  try {
    const staticFilePath = path.join(__dirname, 'public', 'index.html');
    let body = html;
    try {
      body = await readFile(staticFilePath, 'utf8');
    } catch {
      // fallback to inline html if no public page exists
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error interno del servidor');
  }
});

server.listen(PORT, () => {
  console.log(`PresupuestosPro listening on http://localhost:${PORT}`);
});
