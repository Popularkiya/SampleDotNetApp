var express = require("express");
var router = express.Router();

var amqp = require("amqplib/callback_api");

const url = process.env.AMQP_URL;
const queue = process.env.QUEUE_NAME;
const tempQueue = process.env.TEMP_QUEUE;
const humidityQueue = process.env.HUMIDITY_QUEUE;
const carbonQueue = process.env.CO2_QUEUE;
const uvQueue = process.env.UV_QUEUE;

let channel = null;
amqp.connect(url, function (err, conn) {
  if (!conn) {
    throw new Error(`AMQP connection not available on ${url}`);
  }
  conn.createChannel(function (err, ch) {
    channel = ch;
  });
});

process.on("exit", (code) => {
  channel.close();
  console.log(`Closing`);
});

router.post("/", function (req, res, next) {
  channel.sendToQueue(queue, new Buffer.from(req.body.message));
  channel.sendToQueue(tempQueue, new Buffer.from(req.body.message));
  channel.sendToQueue(humidityQueue, new Buffer.from(req.body.message));
  channel.sendToQueue(carbonQueue, new Buffer.from(req.body.message));
  channel.sendToQueue(uvQueue, new Buffer.from(req.body.message));
  res.render("index", { response: `Successfully sent: ${req.body.message}` });
});

module.exports = router;
