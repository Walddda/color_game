const http = require('http').createServer(); //ev express verwenden

const io = require('socket.io')(http, {
    cors: {origin: "*"}
})

io.on('connection', (socket) => {
    console.log('a user connected - '+socket.id)
    io.emit('new-user', socket.id);
    // console.log(io.sockets.clients())

    socket.on('message', (message) => {
        console.log(socket.id +': '+message)
        // console.log(message)
        io.emit('message', {message, id: socket.id})
    })

    socket.on('disconnect', (reason) => {
        console.log(socket.id +': '+reason)
        io.emit('user-lost', socket.id)
    })
})

http.listen(8080, () => console.log('listening on http://localhost:8080'));