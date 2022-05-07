const express = require("express");
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const BodyParser = require("body-parser");

const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index", {
    loginTitle: "Chatto | Broadcast Room Chat",
    chatroomTitle: "Chatto | Broadcast",
  });
});

// send message
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    const { id, message } = data;
    socket.broadcast.emit("message", id, message);
  });

  socket.on("userJoined", (data) => {
    const { userID } = data;
    socket.broadcast.emit("userJoined", userID);
  });
});

server.listen(3000, () => {
  console.log("SERVER READY...");
});
