import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BackupExportError, buildBackupArchive } from './app/export/backup_export.js';
import { renderPdfBytes } from './app/pdf/pdf_export.js';

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

export function createAppServer() {
  return http.createServer(async (req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', app: 'PresupuestosPro' }));
      return;
    }

    if (req.method === 'POST' && req.url === '/api/export-backup') {
      try {
        const snapshot = await readJsonBody(req);
        const archive = buildBackupArchive(snapshot);
        res.writeHead(200, {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${archive.fileName}"`,
          'Content-Length': archive.bytes.byteLength,
        });
        res.end(Buffer.from(archive.bytes));
      } catch (error) {
        const status = error instanceof BackupExportError ? error.status : 500;
        res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          error: error instanceof Error ? error.message : 'Error interno del servidor',
          ...(error instanceof BackupExportError && error.quoteNumber ? { quoteNumber: error.quoteNumber } : {}),
        }));
      }
      return;
    }

    if (req.method === 'POST' && req.url === '/api/export-pdf') {
      try {
        const { profile, quote } = await readJsonBody(req);
        const document = renderPdfBytes(profile, quote);
        if (!document.valid) {
          throw new BackupExportError(document.message, 422, quote?.number ?? '');
        }
        const downloadName = `${quote?.number ?? 'presupuesto'}.pdf`;
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${downloadName}"`,
          'Content-Length': document.bytes.byteLength,
        });
        res.end(Buffer.from(document.bytes));
      } catch (error) {
        const status = error instanceof BackupExportError ? error.status : 500;
        res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          error: error instanceof Error ? error.message : 'Error interno del servidor',
          ...(error instanceof BackupExportError && error.quoteNumber ? { quoteNumber: error.quoteNumber } : {}),
        }));
      }
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
    } catch {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error interno del servidor');
    }
  });
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new BackupExportError('El cuerpo de la exportación no es JSON válido.', 400);
  }
}

const server = createAppServer();

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  server.listen(PORT, () => {
    console.log(`PresupuestosPro listening on http://localhost:${PORT}`);
  });
}
