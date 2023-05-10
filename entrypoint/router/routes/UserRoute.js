const userService = require("../../services/socket/UserService");

const userRoute = (socket) => {
  socket.on("createUser", (data) => userService.createUser(socket, data));
  socket.on("login", (data) => userService.login(socket, data));
};

module.exports = userRoute;