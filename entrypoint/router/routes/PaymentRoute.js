const paymentService = require("../../services/socket/PaymentService");

const paymentRoute = (socket) => {
  socket.on("payment", (data) => paymentService.payment(socket, data));
  socket.on("getBasket", (data) => paymentService.getBasket(socket, data));
};

module.exports = paymentRoute;
