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
var simulation = 1;

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
    for (let i = 1; i <= 60; i++) {
      setTimeout(function(){
        channel.sendToQueue(tempQueue, new Buffer.from(`{"Id":"${pad(i*simulation, 24)}","Value":${getRandomFloat(18, 25, 1)}}`)); //celcius
        if (i % 2 == 0) {channel.sendToQueue(humidityQueue, new Buffer.from(`{"Id":"${pad(i/2*simulation, 24)}","Value":${getRandomFloat(40, 70, 1)}}`));} //%
        if (i % 3 == 0) {channel.sendToQueue(carbonQueue, new Buffer.from(`{"Id":"${pad(i/3*simulation, 24)}","Value":${getRandomFloat(0.03, 0.07, 1)}}`));}//%
        if (i % 4 == 0) {channel.sendToQueue(uvQueue, new Buffer.from(`{"Id":"${pad(i/4*simulation, 24)}","Value":${getRandomFloat(300, 400, 3)}}`));} //nm - dlugosc fali
      }, 1000);
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
