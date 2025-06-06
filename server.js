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
    });

    socket.on("new message", (data) => {
        const { room, username, message } = data;
        io.to(room).emit("message", { username, message, room }); // for consistent event name
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });

    
});

console.log(`Socket.IO server running on port ${PORT}`);
