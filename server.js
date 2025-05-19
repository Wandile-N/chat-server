const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

wss.on('connection', function connection(ws) {
    console.log('A client connected.');

    ws.on('message', function incoming(message) {
        console.log('received:', message);
        // Broadcast to all clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

console.log('WebSocket server running...');
