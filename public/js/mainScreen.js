

const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')


const socket = io()

console.log(socket)

//Message from server
socket.on('message',message=>{
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAaa")
  outputMessage(message)

  //Mesaj geldiğinde en alta scrolla
  chatMessages.scrollTop = chatMessages.scrollHeight

})

//Room users from server
socket.on('roomUsers',({room,users})=>{
  //console.log(users)
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
