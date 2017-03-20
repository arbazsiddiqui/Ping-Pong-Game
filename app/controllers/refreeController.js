var express = require('express');
var router = express.Router();
var playersData = require('../helpers/playersData');
router.get('/start', function (req, res) {
  var currentPlayers = {};
  console.log(playersData.data);
  for (i=0; i<playersData.data.length; i++){
    currentPlayers[playersData.data[i].id] = playersData.data[i]
  }
  return res.json(currentPlayers);
});

module.exports = router;