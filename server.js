// server.js
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;
const io = new Server(PORT, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join", ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined room ${room}`);
    });

    socket.on("message", (msg) => {
        const { room } = msg;
        console.log(`Message to room ${room}:`, msg);
        io.to(room).emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

console.log(`Socket.IO server running on port ${PORT}`);
