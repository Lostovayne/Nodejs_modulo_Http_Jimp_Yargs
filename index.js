const http = require('http')
const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')
const PORT = 3000

// Crea un servidor HTTP
const server = http.createServer((req, res) => {
  // Establece el código de estado de la respuesta HTTP a 200
  res.statusCode = 200

  // Si la petición es a la raíz del sitio...
  if (req.url === '/') {
    // ...busca el archivo index.html en la carpeta "static" y envíalo como respuesta
    const filePath = path.join(__dirname, 'static', 'index.html')
    const readStream = fs.createReadStream(filePath)
    readStream.pipe(res)
  }

  // Si la petición es al archivo "styles.css"...
  else if (req.url === '/styles.css') {
    // ...busca el archivo styles.css en la carpeta "static" y envíalo como respuesta, estableciendo el tipo de contenido como "text/css"
    const filePath = path.join(__dirname, 'static', 'styles.css')
    const readStream = fs.createReadStream(filePath)
    res.setHeader('Content-Type', 'text/css')
    readStream.pipe(res)
  }

  // Si la petición comienza con "/formulario"...
  if (req.url.startsWith('/formulario')) {
    // ...extrae la URL de la imagen y la formatea
    const urlImg = req.url.slice(18)
    const UrlFormateada = decodeURIComponent(urlImg)

    // Utiliza la biblioteca Jimp para procesar la imagen
    Jimp.read(`${UrlFormateada}`, (err, image) => {
      if (err) {
        // Si hay un error, establece el código de estado de la respuesta HTTP a 500 y finaliza la respuesta
        console.error(err)
        res.statusCode = 500
        res.end()
      }

      // Procesa la imagen: la redimensiona, la convierte a escala de grises y la guarda en un archivo
      image
        .resize(350, Jimp.AUTO)
        .quality(60)
        .grayscale()
        .writeAsync('newImg.jpg')
        .then(() => {
          // Lee el archivo procesado y envíalo como respuesta, estableciendo el tipo de contenido como "image/jpg"
          fs.readFile('newImg.jpg', (err, imagen) => {
            res.writeHead(200, { 'Content-Type': 'image/jpg' })
            res.end(imagen)
          })
        })
    })
  }
})

// Inicia el servidor en el puerto indicado y muestra un mensaje en la consola
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
