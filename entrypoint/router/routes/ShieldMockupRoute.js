const shieldMockupService = require("../../services/socket/ShieldMockupService");

const shieldMockupRoute = (socket) => {
  socket.on("authorized", (data) => shieldMockupService.authorized(socket, data));
  socket.on("denied", (data) => shieldMockupService.denied(socket, data));
};

module.exports = shieldMockupRoute;