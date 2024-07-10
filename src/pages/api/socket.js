// import { io } from "socket.io-client";

// const { Server } = require("socket.io");
// // const app = require('express')()
// // const server = app.listen(PORT, ()=>console.log(`server is live on port: ${PORT}`))
// let socketConnected = new Set();

// const SocketHandler = (req, res) => {
//   if (res.socket.server.io) {
//     console.log("Socket is already running");
//     const io = res.socket.server.io;
//     io.on("connect", (socket) => {
//       console.log(socket.id);
//       socketConnected.add(socket.id);
//       socket.emit("total-client", socketConnected.size);
//       socket.on("disconnect", () => {
//         socketConnected.delete(socket.id);
//         console.log(`${socket.id} is disconnected`);
//         io.emit("total-client", socketConnected.size);
//       });
//     });
//   } else {
//     console.log("socket is initializing...");
//     const io = new Server(res.socket.server);
//     res.socket.server.io = io;
//     console.log(`get maxlisteners:${io}`);
//     io.on("connection", (socket) => {
//       console.log(socket.id);
//       socketConnected.add(socket.id);
//       io.emit("total-client", socketConnected.size);
//       console.log(socketConnected.size);
//       socket.on("disconnect", () => {
//         socketConnected.delete(socket.id);
//         console.log(`${socket.id} is disconnected`);
//         io.emit("total-client", socketConnected.size);
//       });
//     });
//   }
//   res.end();
// };

// export default SocketHandler;
