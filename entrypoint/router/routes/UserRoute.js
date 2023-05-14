const userService = require("../../services/socket/UserService");

const userRoute = (socket) => {
  socket.on("createUser", (data) => userService.createUser(socket, data));
  socket.on("login", (data) => userService.login(socket, data));
  socket.on("activate", (data) => userService.activate(socket, data));
  socket.on("grantMeEventOwner", (data) => userService.grantMeEventOwner(socket, data))
  socket.on("giveAccess", (data) => userService.giveAccess(socket, data))
  socket.on("refreshCredential", (data) => userService.refreshCredential(socket, data))
};

module.exports = userRoute;

