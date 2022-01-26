var express = require('express');
var router = express.Router();
const FastMQ = require('fastmq');

/* GET home page. */
router.get('/', function (req, res, next) {

  var requestChannel;
  // create a client with 'requestChannel' channel name and connect to server.
  FastMQ.Client.connect('requestChannel', 'master')
    .then((channel) => {
      // client connected
      requestChannel = channel;
      let reqPayload = { data: 'reqeust data' };

      // send request to 'responseChannel' channel  with topic 'test_cmd' and JSON format payload.
      return requestChannel.request('responseChannel', 'test_cmd', reqPayload, 'json');
    })
    .then((result) => {
      console.log('Got response from master, data:' + result.payload.data);
      // client channel disconnect
      requestChannel.disconnect();
      res.status(200).json(result.payload)
    })
    .catch((err) => {
      console.log('Got error:', err.stack);
    });
});

module.exports = router;
