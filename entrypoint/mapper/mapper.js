const fs = require("fs");
const path = require("path");

const serviceDir = "./services/amqp";

const serviceMap = {};

const loadService = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      loadService(fullPath);
    } else if (file.endsWith(".js")) {
      console.log("full Path =", fullPath);
      const actions = require("../" + fullPath);
      Object.assign(serviceMap, actions);
    }
  });
};

loadService(serviceDir);

module.exports = serviceMap;