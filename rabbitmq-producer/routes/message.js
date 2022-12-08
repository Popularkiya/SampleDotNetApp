var express = require("express");
var router = express.Router();

var amqp = require("amqplib/callback_api");

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
}

const url = process.env.AMQP_URL;
const queue = process.env.QUEUE_NAME;
const tempQueue = process.env.TEMP_QUEUE;
const humidityQueue = process.env.HUMIDITY_QUEUE;
const carbonQueue = process.env.CO2_QUEUE;
const uvQueue = process.env.UV_QUEUE;

var currentQueue = queue;
var tempIdx = 0;
var humidIdx = 0;
var carbIdx = 0;
var uvIdx = 0;

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
  console.log(`Hello World`)

  if (req.body.message.startsWith('\\start')) {
    res.render("index", { response: `Started simulation.` });
    let duration = 60
    if (/^\\start\([0-9]+\)$/.test(req.body.message)) {
      duration = Number(req.body.message.match(/\d+/)) * 60; // parse value to minutes
      console.log(duration);
    }
    var matches = req.body.message.match(/\((.*?)\)/);
    for (let i = 1; i <= duration; i++) {
      setTimeout(() => {
      tempIdx ++;
      channel.sendToQueue(tempQueue, new Buffer.from(`{"Id":"${pad(tempIdx, 24)}","Value":${getRandomFloat(18, 25, 1)},"Instance":${i%8 + 1}}`)); //celcius
      if (i % 2 == 0) {
        humidIdx ++;
        channel.sendToQueue(humidityQueue, new Buffer.from(`{"Id":"${pad(humidIdx, 24)}","Value":${getRandomFloat(40, 70, 1)},"Instance":${i%8 + 1}}`));
      } //%
      if (i % 3 == 0) {
        carbIdx++;
        channel.sendToQueue(carbonQueue, new Buffer.from(`{"Id":"${pad(carbIdx, 24)}","Value":${getRandomFloat(0.03, 0.07, 1)},"Instance":${i%8 + 1}}`));
      }//%
      if (i % 4 == 0) {
        uvIdx++;
        channel.sendToQueue(uvQueue, new Buffer.from(`{"Id":"${pad(uvIdx, 24)}","Value":${getRandomFloat(300, 400, 3)},"Instance":${i%8 + 1}}`));
      } //nm - dlugosc fali
      }, i * 1000); // sleep i * 1000 ms
    }
  }
  else if (req.body.message.startsWith('\\queue')) {
    var matches = req.body.message.match(/\((.*?)\)/);

    if (matches) {
        var submatch = matches[1];
        if (submatch == tempQueue || submatch == humidityQueue || submatch == carbonQueue || submatch == uvQueue || submatch == queue) {
          currentQueue = submatch;
          res.render("index", { response: `Changed current queue to: ${submatch}` });
        }
        res.render("index", { response: `Queue: ${submatch} doesn't exist.` });
    } else {
      res.render("index", { response: `Current queue is: ${currentQueue}` });
    }
  }
  else {
    channel.sendToQueue(currentQueue, new Buffer.from(req.body.message));
    res.render("index", { response: `Successfully sent: ${req.body.message}` });
  }
});

module.exports = router;
