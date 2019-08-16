var express = require('express');
var router = express.Router();
var axios = require('axios');

router.post('/users/:id/balances', async function(req, res, next) {
  var headers = {
    'ES-EventType': 'balanceUpdated'
  };
  var payload = {
    account_id: req.params.id,
    amount: 5
  };

  try {
    await axios.post('http://localhost:2113/streams/stop-jeep', payload, { headers });
    res.send('Successful');
  } catch (error) {
    res.send('Failed', error);
  }
});

module.exports = router;
