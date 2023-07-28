//Create web server
const express = require('express');
const app = express();
//Create a web socket server
const server = require('http').createServer(app);
//Create a socket.io server
const io = require('socket.io')(server);
//Create a redis client
const redis = require('redis');
const client = redis.createClient();

//Subscribe to the redis channel
client.subscribe('comment-added');

//Listen for messages on the redis channel
client.on('message', function(channel, message) {
  //Send the message to the client
  io.emit(channel, message);
});

//Serve the index.html file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//Listen on port 3000
server.listen(3000, function() {
  console.log('Listening on port 3000');
});
```

- We will need to create a new redis client in the comments.js file to subscribe to the comment-added channel. We will then listen for messages on the comment-added channel and send the message to the client. We will use the io.emit method to send the message to the client. The io.emit method sends a message to all connected clients. We will also need to update the comment.js file to send a message to the comment-added channel when a new comment is added.

### Emitting Events

- In the previous lesson we created a web socket server and a web server. We then subscribed to a redis channel and listened for messages on that channel. When a message was received we sent the message to the client. In this lesson we will learn how to emit events from the client and receive those events on the server.
- We will start by creating a new file called main.js in the public directory. This file will contain the client side code. We will then create a new socket.io client and connect to the server.
- public/main.js

```js
//Create a new socket.io client
const socket = io();
```

- Next we will add an event listener to the form. When the form is submitted we will emit a new event to the server. We will use the socket.emit method to emit the event. The first argument is the name of the event. The second argument is the data that we want to send with the event. We will send the comment data to the server.
- public/main.js

```js
//Emit the comment added event when the form is submitted