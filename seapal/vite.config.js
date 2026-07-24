import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Dev-only endpoint that writes the artworks array straight to picData.json.
// Only runs during `npm run dev` — it's not part of the production build,
// so it never exists on your live deployed site.
function picDataApiPlugin() {
  return {
    name: 'pic-data-api',
    configureServer(server) {
      server.middlewares.use('/api/save-pic-data', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
          try {
            const works = JSON.parse(body)
            const filePath = path.resolve(__dirname, 'src/data/picData.json')
            const content = JSON.stringify(works, null, 2) + '\n'
            fs.writeFileSync(filePath, content, 'utf-8')
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message }))
          }
        })
      })
    },
  }
}

// Dev-only endpoint that saves an uploaded image into public/seapal/
// and returns the path to use in picData.json. Dev-only, same as above.
function imageUploadApiPlugin() {
  return {
    name: 'image-upload-api',
    configureServer(server) {
      server.middlewares.use('/api/upload-image', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
          try {
            const { filename, dataUrl } = JSON.parse(body)
            const match = /^data:(.+);base64,(.*)$/.exec(dataUrl || '')
            if (!match) throw new Error('Invalid image data')
            const buffer = Buffer.from(match[2], 'base64')

            const safeName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '-')
            const destDir = path.resolve(__dirname, 'public')
            fs.mkdirSync(destDir, { recursive: true })

            let finalName = safeName
            let counter = 1
            while (fs.existsSync(path.join(destDir, finalName))) {
              const ext = path.extname(safeName)
              const base = path.basename(safeName, ext)
              finalName = `${base}-${counter}${ext}`
              counter++
            }

            fs.writeFileSync(path.join(destDir, finalName), buffer)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, path: `/seapal/${finalName}` }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), picDataApiPlugin(), imageUploadApiPlugin()],
  base: '/seapal',
})
