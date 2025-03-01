require('dotenv').config();
var express = require('express');
var router = express.Router();
var axios = require('axios');

router.post('/users/:id/balances', async function(req, res, next) {
  try {
    if (!isNumber(req.body.amount)) {
      throw new Error('Accept only number')
    }
    
    var headers = {
      'ES-EventType': 'balanceUpdated'
    };
    var payload = {
      account_id: req.params.id,
      amount: parseInt(req.body.amount, 10),
      time_stamp: Date.now()
    };

    var hostname = process.env.EVENTSTORE_HOST;
    var port = process.env.EVENTSTORE_PORT;

    console.log(payload)

    await axios.post(`http://${hostname}:${port}/streams/stop-jeep`, payload, { headers });
    res.send(201, 'Successful');
  } catch (error) {
    res.send(400, error.message);
  }
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = router;
