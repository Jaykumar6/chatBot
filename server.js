const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const formatMessage = require('./public/utils/message')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./public/utils/user')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const botName = 'chatCord Bot'



app.use(express.static(path.join(__dirname,'public')))

//run when client connect
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

    // Welcome message
    socket.emit('message', formatMessage(botName, 'Welcome to TalkHub'))

    // Broadcast when user joins
    socket.broadcast
        .to(user.room)
        .emit('message', formatMessage(botName, `${user.username} has joined the chat`))

    // ✅ NOW user is accessible here
    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
    })
})
   


// broadcast to everyone
    socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id)
    if (!user) {
        return
    }
    io.to(user.room).emit('message', formatMessage(user.username, msg))
})
    
    // When user disconnects
socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    if (user) {
        io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    }
    
})
 


})







const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})