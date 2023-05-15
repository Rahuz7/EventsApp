const eventService = require("../../services/socket/EventService");

const eventRoute = (socket) => {
  socket.on("getMyEvent", (data) => eventService.getMyEvent(socket, data));
  socket.on("addEvent", (data) => eventService.addEvent(socket, data));
  socket.on("getEventType", (data) => eventService.getEventType(socket, data));
  socket.on("getEvent", (data) => eventService.getEvent(socket, data));
  socket.on("editEvent", (data) => eventService.editEvent(socket, data));
};

module.exports = eventRoute;

