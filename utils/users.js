const User = require('../models/Users')




const onlineUsers = []
const users = []


//Login
function userLogin(id,username,password,room){
    const user = {id,username,room}

    users.push(user) 

    const newUser = new User({
        
        socketId:id,
        username:username, 
        password:password,
        room:room,
    })
    newUser.save()

    return newUser; 
}


//Join user to chat
function userJoin(id,username,room){
    const user = {id,username,room}

    users.push(user)
    


    return user;
    
}

//Get current user
function getCurrentUser(id) {
    //console.log(User.find({ id: id}))
    return User.find({ id: id}).exec();
    //return users.find(user=>id===user.id)
}

//User leaves 
function userLeave(id) {
    const index = users.findIndex(user=>id===user.id)

    if(index !== -1){
        return users.splice(index,1)[0]
    } 
}

//Get room users 
function getRoomUsers(room) {
    User.find({ room: room}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            //console.log(docs[0]);
            return docs;
        }
    });
    //console.log(User.find({ room: room}))
    
    //return users.filter(user=>room===user.room)
}

module.exports = {
    userJoin, 
    getCurrentUser,
    userLeave,
    getRoomUsers,
    userLogin
}