const mongoose = require('mongoose')
const scheman = mongoose.Schema

//Create Schema
const UserSchema=new mongoose.Schema({
    socketId:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    room:{
        type: String,
        required:true
    },
})

module.exports=User=mongoose.model('user',UserSchema)