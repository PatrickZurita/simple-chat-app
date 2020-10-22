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
    },
    technology : {
        users: {}
    },
    developing: {
        users: {}
    },
    github: {
        users: {}
    },
    cooking: {
        users: {}
    },
    trends: {
        users: {}
    },
    sports: {
        users: {}
    }
}
io.on('connection', socket => {
    socket.on('new-user', (channel, name) => {
        socket.join(channel)
        socket.join(name)
        if (channels[channel] !== undefined) {
            channels[channel].users[socket.id] = name
            socket.to(channel).broadcast.emit('user-connected', name)
        }

    })
    socket.on('send-private-message', (sender,recipient,message) => {
        socket.broadcast.to(recipient).emit('receive-private-message',{sender,message})
    })
    socket.on('send-chat-message', (channel, message) => {
        if (channels[channel] !== undefined) {
            socket.to(channel).broadcast.emit('chat-message', {
                message: message,
                name: channels[channel].users[socket.id]
            })
        }
    })
    socket.on('unsubscribe', ({channel, name}) => {
        if (channels[channel] !== undefined) {
            socket.leave(channel);
            socket.to(channel).emit('disconnected',channels[channel].users[socket.id])
            delete channels[channel].users[socket.id]
        }
    })

})


