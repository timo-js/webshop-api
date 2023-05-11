const mongoose = require("mongoose");
const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/webshop")
    .then(() => logger.info("Connected to MongoDB..."))
    .catch((err) => {
      logger.error("Could not connect to MongoDB...");
      process.exit(1);
    });
};
