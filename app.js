const cp = require('child_process')
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')


const app = express()

//enviar archivo

app.post('/', (req, res) => {
    let writeable = fs.createWriteStream('./test')
    req.pipe(writeable);
    req.on('end', () => {
        cp.exec('code test', (err, stdout) => {
            if (err) throw err;
            console.log(stdout)
        })
        res.end('File received\n')
    })

})


app.use('/', (req, res, next) => {
    res.send('Hola SSL server')
})

const sslServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))

    },
    app)

sslServer.listen(3443, () => console.log('Server seguro en el puerto 3443'))