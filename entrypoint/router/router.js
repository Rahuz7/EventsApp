const fs = require("fs");
const path = require("path");

const socketRoutesDir = "routes";

const linkRoutes = (socket) => {
  fs.readdirSync("./router/" + socketRoutesDir).forEach((file) => {
    const fullPath = path.join(socketRoutesDir, file);

    if (fs.statSync("./router/" + fullPath).isFile() && file.endsWith(".js")) {
      console.log("fullpath", fullPath)
      const routes = require("./" + fullPath);
      routes(socket);
    }
  });
};

module.exports =  { 
    linkRoutes 
};