const yargs = require('yargs')
const child = require('child_process')
const pass = '123'

// node app.js server --pass=123
// Link imagen de prueba : https://cdn.pixabay.com/photo/2013/05/30/18/21/cat-114782_1280.jpg

yargs
  .command(
    'server',
    '',
    {
      pass: { describe: 'pass', demandOption: true }
    },
    (argv) => {
      console.log('Arrancando servidor...')

      argv.pass == pass
        ? child.exec('node index.js', (err, stdout) => {
            if (err) {
              console.log(err)
            } else {
              console.log(stdout)
            }
          })
        : console.log('Credenciales incorrectas')
    }
  )
  .help().argv
