// const { io } = require("socket.io-client");
const socket = io();

const form = document.getElementById("send-container");

const messageInput = document.getElementById("messageInp");

const messageContainer = document.querySelector(".container");

const name = prompt("Enter your name to join");
const append = (message ,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
});
socket.emit('new-user-joined', name);
socket.on("user-joined", name => {
    append(`${name} joined the chat`,"left");
});
socket.on("receive", data => {
    append(`${data.name}:${data.message}`,"left");
});

socket.on("leave", name => {
    append(`${name} has left the chat`, "left");
});