const eventService = require("../../services/socket/EventService");

const eventRoute = (socket) => {
  socket.on("getMyEvent", (data) => eventService.getMyEvent(socket, data));
};

module.exports = eventRoute;

