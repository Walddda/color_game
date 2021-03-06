const http = require('http').createServer(); //ev express verwenden
const users = []
var colors = ['green', 'blue', 'red', 'yellow', 'purple', 'orange']
var interval;
var time;
var players = [];

const io = require('socket.io')(http, {
    cors: {origin: "*"}
})

io.on('connection', (socket) => {
    console.log('a user connected - '+socket.id)
    // io.emit('new-user', socket.id);
    socket.on('joined', (name) => {
        socket.username = name
        users.push({username: name, id: socket.id})
        // console.log(users)

        socket.join("game");
        socket.emit("message", { username: "admin", id: 'admin', message: `Welcome to the game` })
        socket.broadcast.to("game").emit("message", { username: "admin", id: 'admin', message: `${socket.username} has joined` })
        io.to("game").emit("roomData", {users: users})
    })
    // console.log(io.sockets.clients())

    socket.on('message', (message) => {
        console.log(socket.id +': '+message)
        // console.log(message)
        io.emit('message', {message, username: socket.username, id: socket.id})
    })

    socket.on('disconnect', (reason) => {
        console.log(socket.id +': '+reason)
        
        var removeIndex = users.map(user => user.id).indexOf(socket.id);
        ~removeIndex && users.splice(removeIndex, 1);

        // console.log(users)

        if(socket.username){
            socket.broadcast.to("game").emit("message", { username: "admin", id:"admin", message: `${socket.username} left` })
            io.to("game").emit("roomData", {users: users})
        }
    })

    socket.on('start-game-call', (data) => {
        players = [] 
        console.log('starting . . .')
        var game = []
        const shuffled = colors.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, users.length);
        let i = 0;
        let impostor = Math.floor(Math.random()*users.length)
        // console.log(impostor)
        users.forEach(user => {
            var u = {user, color: selected[i], role: impostor == i ? 'impostor' : 'player'};
            if(impostor == i){console.log(user.username + ' is impostor')}
            i++;
            game.push(u)
        });
        time = 60;
        io.emit('start-game', {game, colors: selected, time})
        interval = setInterval(() => {
            if(time >= 1){time--;}
            else{
                clearInterval(interval);
                io.emit('end-game', {})
            }
        }, 1000)
    })

    socket.on('end-game-res', (data) => {
        console.log('end player '+data.id)
        clearInterval(interval);
        // console.log(data)
        players.push(data)
        // console.log(players)
        console.log(players.length)
        console.log(data.sum)
        if (players.length == data.sum) {
            console.log('all players have guessed')
            var result = []
            console.log(players)
            players.forEach(player => {
                result.push({name: player.username, color: player.color, guess: player.guess} )

                // if(player.guess == player.color){
                //     result.push({name: player.username, color: player.color, guess: player.guess} )
                // }
            })  
            console.log(result)
            io.emit('end-game-fin', result)       
        }
    })
})

http.listen(8080, () => console.log('listening on http://localhost:8080'));