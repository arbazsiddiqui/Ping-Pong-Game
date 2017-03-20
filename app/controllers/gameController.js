var express = require('express');
var router = express.Router();
var playersData = require('../helpers/playersData');
var matches = [];
var cplayers = [];
var report = [];
var cnt = 1;

router.get('/player/join/:id', function (req ,res) {
  playerId = req.params.id;
  for (i=0; i<playersData.data.length; i++){
    if(playersData.data[i].id == playerId){
      cplayers.push(playersData.data[i]);
      return res.json({status : 200, message : "Successfully joined the game"})
    }
  }
  return res.json({status : 400, message : "Not Authorised for this game"})
});

router.get('/refree/draw', function (req, res) {
  draw(cplayers, function (matches) {
    cplayers = [];
    return res.json(matches);
  });
});

function draw(players, callback) {
  var shuffledPlayers = shuffle(players);
  matches = [];
  for (i=0; i<shuffledPlayers.length; i+=2){
    match = {};
    match.matchId = cnt;
    match.player1 = shuffledPlayers[i];
    match.player2 = shuffledPlayers[i+1];
    matches.push(match);
    cnt++;
  }
  return callback(matches);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

router.get('/player/match/:matchId', function (req, res) {
  matchId = req.params.matchId;
  for(i=0; i<matches.length; i++){
    if(matches[i].matchId == matchId){
      temp={};
      temp.matchId = matchId;
      temp.match = matches[i].player1.name + " vs " + matches[i].player2.name;
      winner = startMatch(matches[i].player1, matches[i].player2);
      temp.winner = winner.name;
      report.push(temp);
      console.log(report);
      return res.json(winner);
    }
  }
});

function startMatch(player1, player2) {
  player1Score = 0;
  player2Score = 0;
  player1Type = "offensive";
  player2Type = "defensive";

  while(player1Score < 5 && player2Score < 5){
    player1Move = playerMove(player1, player1Type);
    player2Move = playerMove(player2, player2Type);
    newValues = fight(player1Move, player1Type, player1Score, player2Move, player2Type, player2Score);
    player1Move = newValues[0];
    player1Type = newValues[1];
    player1Score = newValues[2];
    player2Move = newValues[3];
    player2Type = newValues[4];
    player2Score = newValues[5];
  }
  if(player1Score==5)
    winner = player1;
  else
    winner = player2;
  cplayers.push(winner);
  return winner;
}

function playerMove(player, playerType) {
  if(playerType=="offensive"){
    return getRandomInt(1,10)
  }
  else if(playerType=="defensive"){
    return generateDefenseArray(player.length)
  }

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDefenseArray(len) {
  defArr = [];
  for(i=0; i<len; i++){
    defArr.push(getRandomInt(1,10));
  }
  return defArr;
}

function fight(p1Move, p1Type, p1Score, p2Move, p2Type, p2Score){
  if(p1Type=="offensive"){
    if(p2Move.indexOf(p1Move)!=-1){
      p1Type = "defensive";
      p2Type = "offensive";
      p2Score = p2Score+1
    }
    else
      p1Score = p1Score+1;
  }
  else if(p1Type=="defensive"){
    if(p1Move.indexOf(p2Move)!=-1){
      p1Type = "offensive";
      p2Type = "defensive";
      p1Score = p1Score+1;
    }
    else
      p2Score = p2Score+1;
  }

  return [p1Move, p1Type, p1Score, p2Move, p2Type, p2Score];
}

router.get('/refree/report', function (req, res) {
  if(report.length<7){
    return res.json({status : 400, message: 'Game not complete yet'})
  }
  var rep = {};
  rep.gameLog = report;
  rep.winner = report[6].winner;
  return res.json(rep);
});

module.exports = router;