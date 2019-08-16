require('dotenv').config();
var express = require('express');
var router = express.Router();
var axios = require('axios');

router.post('/users/:id/balances', async function(req, res, next) {
  var headers = {
    'ES-EventType': 'balanceUpdated'
  };
  var payload = {
    account_id: req.params.id,
    amount: req.body.amount
  };

  var hostname = process.env.EVENTSTORE_HOST;
  var port = process.env.EVENTSTORE_PORT;

  try {
    await axios.post(`http://${hostname}:${port}/streams/stop-jeep`, payload, { headers });
    res.send('Successful');
  } catch (error) {
    res.send('Failed', error);
  }
});

module.exports = router;
