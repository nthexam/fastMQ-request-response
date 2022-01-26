var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');

  // let channel = await FastMQ.Client.connect('requestChannel', 'master');
  // const reqPayload = { data: 'reqeust data' };
  // let result = await channel.request('responseChannel', 'test_cmd', reqPayload, 'json');
  // channel.disconnect();
  // res.json(result);
});

module.exports = router;
