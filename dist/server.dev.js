"use strict";

var io = require('socket.io')(4000); // create server


var users = {};
io.on('connection', function (socket) {
  socket.on('new-user', function (name) {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  }); //socket.emit('chat-message', 'hello world')

  socket.on('send-chat', function (data) {
    socket.broadcast.emit('message-received', {
      data: data,
      user: users[socket.id]
    });
  });
  socket.on('disconnect', function () {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});