
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

//Get username and room from URL
const {username,room} = Qs.parse(location.search,{
  ignoreQueryPrefix:true
})

const socket = io()


//Join chatroom
socket.emit('joinRoom',{username,room})

//Message from server
socket.on('message',message=>{
  outputMessage(message)

  //Mesaj geldiğinde en alta scrolla
  chatMessages.scrollTop = chatMessages.scrollHeight

})

//Room users from server
socket.on('roomUsers',({room,users})=>{
  listRoomUsers(users)
  setRoomName(room)
})

//Message submit
chatForm.addEventListener('submit', e=>{
  e.preventDefault()

  //Get message text from html
  const msg = e.target.elements.msg.value

  //Emit message to server
  socket.emit('chatMessage',msg)
 
  //Yazı çubuğunu temizle
  e.target.elements.msg.value =''
  e.target.elements.msg.focus()
})

//Output message to DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`
  document.querySelector('.chat-messages').appendChild(div);
}

//Show users in DOM
function listRoomUsers(users){
  
  var ul = document.getElementById("users");
  ul.innerHTML=""
  users.forEach(user => {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(user.username));
  ul.appendChild(li);

  });
  
}

//Set room name in DOM
function setRoomName(room){
  var h2 = document.getElementById("room-name");

  h2.innerText=room

}



















/*
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
*/
