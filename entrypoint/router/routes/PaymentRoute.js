const paymentService = require("../../services/socket/PaymentService");

const paymentRoute = (socket) => {
  socket.on("payment", (data) => paymentService.payment(socket, data));
};

module.exports = paymentRoute;
