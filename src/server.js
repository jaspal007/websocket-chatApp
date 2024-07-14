const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const nextHandler = nextApp.getRequestHandler()

let port = 3000
let socketConnected = new Set()


io.on('connect', onConnected);

function onConnected(socket){
    const socketID = socket.id;
    console.log(`socket id: ${socketID}`)
    socketConnected.add(socket.id);
    // io.emit('total-clients', {clients: socketConnected.size});
    io.to(socketID).emit('socketID', socketID);

    socket.on('disconnect', ()=>{
        console.log(`socket disconnected: ${socket.id}`)
        socketConnected.delete(socket.id);
        io.emit('total-clients', socketConnected.size);
    });

    socket.on('message', data=>{
        // console.log(data);
        socket.broadcast.emit('chat-message', data);
    })

    socket.on('connectReq', data=>{
        socket.broadcast.emit('connectReq', data);
    })

    socket.on('feedback', data=>{
        console.log(`peer socket: ${data.peer}`);
        socket.to(data.peer).emit('feedback', 'for you');
    })
}

nextApp.prepare().then(()=>{
    app.get('*', (req, res)=>{
        return nextHandler(req, res);
    })
    app.post('*', (req, res)=>{
        return nextHandler(req, res);
    })
    server.listen(port, err=>{
        if(err)throw err
        console.log(`Server ready at the port: ${port}`);
    })
})