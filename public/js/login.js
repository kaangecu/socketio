const loginForm = document.getElementById('login-form')

const socket = io()

//Message submit
loginForm.addEventListener('submit', e => {
    e.preventDefault()

    const username = e.target.elements.username.value
    const password = e.target.elements.password.value

    socket.emit('login', { username, password })

    window.location.href = "main-screen.html";

})