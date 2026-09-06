import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3101;
const ROOT_DIR = path.resolve(__dirname, '..');

const getTargetDir = () => {
  if (process.env.PUBLIC_DIR) return process.env.PUBLIC_DIR;
  if (fs.existsSync(path.join(ROOT_DIR, 'dist'))) return path.join(ROOT_DIR, 'dist');
  // Nếu file events.json nằm ngay thư mục gốc (trên VPS), ghi trực tiếp vào thư mục gốc
  if (fs.existsSync(path.join(ROOT_DIR, 'events.json'))) return ROOT_DIR;
  if (fs.existsSync(path.join(ROOT_DIR, 'public'))) return path.join(ROOT_DIR, 'public');
  return ROOT_DIR;
};

const PUBLIC_DIR = getTargetDir();

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (reqUrl.pathname === '/api/save-json' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { filename, data } = JSON.parse(body);
        if (filename && filename.endsWith('.json')) {
          const targetPath = path.resolve(PUBLIC_DIR, filename);
          fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, message: `Successfully saved ${filename}` }));
          return;
        }
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, message: 'Invalid filename' }));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else if (reqUrl.pathname === '/api/upload-image' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { filename, base64Data } = JSON.parse(body);
        if (!base64Data) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, message: 'Missing base64Data' }));
          return;
        }
        const uploadsDir = path.resolve(PUBLIC_DIR, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(cleanBase64, 'base64');
        const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = path.join(uploadsDir, safeName);
        fs.writeFileSync(filePath, buffer);

        const publicUrl = `/uploads/${safeName}`;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, url: publicUrl }));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else if (reqUrl.pathname === '/api/delete-image' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { url: imgUrl } = JSON.parse(body);
        if (imgUrl && imgUrl.startsWith('/uploads/')) {
          const imgName = path.basename(imgUrl);
          const filePath = path.resolve(PUBLIC_DIR, 'uploads', imgName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: `Successfully deleted image ${imgName}` }));
            return;
          }
        }
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, message: 'File not found or invalid URL' }));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ success: false, message: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log(`Target directory for JSON & media persistence: ${PUBLIC_DIR}`);
});
