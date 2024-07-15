const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const { useSearchParams } = require("next/navigation");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;
let socketConnected = new Set();
let userSocket = {};

io.on("connect", onConnected);

function onConnected(socket) {
  const socketID = socket.id;
  console.log(`socket id: ${socketID}`);
  socketConnected.add(socket.id);
  // io.emit('total-clients', {clients: socketConnected.size});
  // io.to(socketID).emit('socketID', socketID);

  socket.on("disconnect", () => {
    console.log(`socket disconnected: ${socket.id}`);
    socketConnected.delete(socket.id);
    for (let user in userSocket) {
      if (userSocket[user] === socket.id) {
        delete userSocket[user];
        break;
      }
    }
    // io.emit('total-clients', socketConnected.size);
  });

  socket.on("register", (data) => {
    userSocket[data.username] = socket.id;
    console.log(
      `User ${data.username} registered with socket id: ${socket.id}`
    );
  });

  socket.on("message", (data) => {
    const peerSocketID = userSocket[data.peer];
    // const senderSocketID = userSocket[data.sender];
    if (peerSocketID) io.to(peerSocketID).emit("chat-message", data);
  });

  socket.on("connectReq", (data) => {
    const peerSocketID = userSocket[data.peerUsername];
    if (peerSocketID) {
      io.to(peerSocketID).emit("connectReq", {
        socketID: data.skt,
        username: data.username,
      });
    }
  });

  socket.on("feedback", (data) => {
    const peerSocketID = userSocket[data.peer];
    console.log(`peer socket: ${data.peer}`);
    console.log(`sender socket: ${data.sender}`);
    if (peerSocketID){
      console.log(`peerSocketID: ${peerSocketID}`);
      console.log(`senderSocketID: ${userSocket[data.sender]}`);
      io.to(peerSocketID).emit("feedback", data);
    }
  });
}

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  app.post("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server ready at the port: ${port}`);
  });
});
