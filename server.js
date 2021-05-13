const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const mongoose = require('mongoose')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers,userLogin } = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = socketio(server)



//Db Config
const uri = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Connected...'))
.catch((err)=>console.log(err))


//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'Chat Bot'  
const genel = 'Genel Sohbet'



//Run when client connects
io.on('connection', socket => { 
    console.log('New WS Connection...') 

    socket.on('socket',({keke})=>{
        console.log(keke)
        console.log("AAA")
    })

    socket.on('login',({username,password})=>{
        const user = userLogin(socket.id, username,password, genel)

        socket.join(user.room) 

        socket.emit('message', formatMessage(botName, 'Chate Bağlandın'))
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${username} bağlandı`))

       // console.log(user)
        //console.log(getRoomUsers(user.room))
        //Send users and room info
        io.to(user.room).emit('roomUsers', { 
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //Listen room entrance
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

        socket.emit('message', formatMessage(botName, 'Welcome to Chat'))

        //Herkese (user hariç) broadcast 
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} joined chat`))

        //Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })


 

    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    //Runs when client disconnects
    socket.on('disconnect', () => { 
        console.log("Disconnected.")
        const user = userLeave(socket.id) 
        //User dahil herkese
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} left chat`))
            
            //Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
 


})



const PORT = process.env.PORT || 3000;


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
