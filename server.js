const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const bp = require('body-parser')
const fs = require('fs')
const app = express()

const httpServer=new HttpServer(app)
const io = new IOServer(httpServer);
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static('public'));
let messages = [
];

/* ----------------------EJS-------------------------------- */

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index')
})


io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 

    socket.on('new-message', function(data) {
        messages.push(data); // agregar mensajes a array 
        io.sockets.emit('messages', messages); //emitir a todos los clientes
        // console.log(data);
        arch.save(data)
    });
    
});

class Contenedor {

    constructor(file) {

        this.archivo = file;
    }

    async save(obj) {
        try {

            const contenido = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
                let archivo = JSON.parse(contenido)
                archivo = [...archivo, obj];
                try {
                    archivo = JSON.stringify(archivo);
                    await fs.promises.writeFile(`./${this.archivo}`, archivo);
                }
                catch (err) {
                    console.log(`Error: ${err}`);
                }
            }
        catch (err) {
            console.log(`Error: ${err}`);
        }

    }
}

const arch = new Contenedor("mensajes.txt");

httpServer.listen(3000, ()=>console.log('Server ON'))


