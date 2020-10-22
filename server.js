console.log('starting server!')
const port = process.env.PORT || 4000
const io = require('socket.io')(port)
const channels = {
    food : {
        users: {}
    },
    games : {
        users: {}
    },
    movies : {
        users: {}
    },
    music : {
        users: {}
    }
}

io.on('connection', socket => {
    socket.on('new-user', (channel, name) => {
        socket.join(channel)
        socket.join(name)
        channels[channel].users[socket.id] = name
        socket.to(channel).broadcast.emit('user-connected', name)
    })
    socket.on('send-private-message', (recipient,message) => {
        socket.broadcast.to(recipient).emit('receive-private-message',{recipient,message})
    })
    socket.on('send-chat-message', (channel, message) => {
        socket.to(channel).broadcast.emit('chat-message', {
            message: message,
            name: channels[channel].users[socket.id]
        })
    })
    socket.on('unsubscribe', ({channel, name}) => {
        socket.leave(channel);
        socket.to(channel).emit('disconnected',channels[channel].users[socket.id])
        delete channels[channel].users[socket.id]
    })

})


function getUserChannels(socket) {
    return Object.entries(channels).reduce((names, [name, channel]) => {
        if (channel.users[socket.id] !== null) names.push(name)
        return names
    }, [])
}


