import ServerService from "./services/server/serverService.js";

// Start Server Service
const server = new ServerService();
server.start()
    .on('listening', () => {
        console.log("Server initialized!");
    })
    .on('error', (error) => {
        console.log(`Server failed to initialize: ${error.message}`)
    });