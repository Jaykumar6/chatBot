const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// Get username and room from URL
const urlParams = new URLSearchParams(location.search)
const username = urlParams.get('username')
const room = urlParams.get('room')

const socket = io()

// ✅ This is what registers the user — without this, getCurrentUser returns undefined!
socket.emit('joinRoom', { username, room })

//get room user
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUsers(users)
})



socket.on('message', message => {
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', e => {
    e.preventDefault()
    const msg = e.target.elements.msg.value
    socket.emit('chatMessage', msg)
    document.getElementById('msg').value = ''
})

function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">${message.text}</p>
    `
    chatMessages.appendChild(div)
}
// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room
}
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}