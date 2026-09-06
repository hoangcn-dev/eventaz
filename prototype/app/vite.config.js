import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';

function jsonAndMediaStoragePlugin() {
  return {
    name: 'json-and-media-storage-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-json', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { filename, data } = JSON.parse(body);
              if (filename && (filename.endsWith('.json'))) {
                // Lưu dữ liệu duy nhất vào thư mục public
                const publicPath = path.resolve(__dirname, './public', filename);
                fs.writeFileSync(publicPath, JSON.stringify(data, null, 2), 'utf-8');

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
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });

      server.middlewares.use('/api/upload-image', (req, res) => {
        if (req.method === 'POST') {
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
              const uploadsDir = path.resolve(__dirname, './public/uploads');
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
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });

      server.middlewares.use('/api/delete-image', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { url } = JSON.parse(body);
              if (url && url.startsWith('/uploads/')) {
                const filename = path.basename(url);
                const filePath = path.resolve(__dirname, './public/uploads', filename);
                if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, message: `Successfully deleted image ${filename}` }));
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
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [vue(), jsonAndMediaStoragePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
