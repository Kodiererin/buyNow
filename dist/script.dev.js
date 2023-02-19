"use strict";

var socket = io('http://localhost:4000');
var messageContainer = document.getElementById('message-container');
var messageForm = document.getElementById('send-container');
var messageInput = document.getElementById('message-input');
user = prompt('enter a new user');
addMessage('you joined');
socket.emit('new-user', user);
socket.on('user-connected', function (name) {
  addMessage("".concat(name, " connected"));
});
socket.on('message-received', function (data) {
  addMessage("".concat(data.user, ": ").concat(data.data));
});
socket.on('new-user', function (name) {
  addMessage(name);
});
socket.on('user-disconnected', function (user) {
  addMessage("".concat(user, " disconnected"));
});
messageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  message = "".concat(messageInput.value);
  addMessage("You: ".concat(message));
  socket.emit('send-chat', message);
  messageInput.value = '';
});

function addMessage(message) {
  var messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}