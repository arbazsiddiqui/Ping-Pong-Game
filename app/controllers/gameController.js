var express = require('express');
var router = express.Router();
var playersData = require('../helpers/playersData');
var matches = [];
var cplayers = [];
var report = [];
var cnt = 1;
var joinedFlag = 0;
var player1Score = 0;
var player2Score = 0;
var player1Type = "offensive";
var player2Type = "defensive";
var matchOver = 0;

//API to join players to the game
router.get('/player/join/:id', function (req, res) {
  playerId = req.params.id;
  for (i = 0; i < playersData.data.length; i++) {
    if (playersData.data[i].id == playerId) {
      //check if the player has already joined the game
      for (j = 0; j < cplayers.length; j++) {
        if (cplayers[j].id == playerId)
          return res.status(409).send("You have already joined the game");
      }
      cplayers.push(playersData.data[i]);
      //check if all the players have joined the game
      if (cplayers.length == playersData.data.length)
        joinedFlag = 1;
      return res.status(200).send("Successfully joined the game");
    }
  }
  return res.status(403).send("Not Authorised for this game");
});


//API to draw matches among the legal players
router.get('/refree/draw', function (req, res) {
  if (cplayers.length <= 1) //check if there are no or one player only
    return res.status(400).send("Only one active player in the game");
  if (!joinedFlag) //check if all the player have joined the game
    return res.status(400).send("Please wait for all the players to join");
  if ((cplayers.length)%2!=0) //check if a legal draw can be laid out
    return res.status(400).send("Odd number of players. Cant pair");

  draw(cplayers, function (matches) {
    cplayers = [];
    return res.status(200).send(matches);
  });
});

//function to draw two matches randomly
function draw(players, callback) {
  var shuffledPlayers = shuffle(players);
  for (i = 0; i < shuffledPlayers.length; i += 2) {
    match = {};
    match.matchId = cnt;
    match.status = "Yet to be Played";
    match.player1 = shuffledPlayers[i];
    match.player2 = shuffledPlayers[i + 1];
    matches.push(match);
    cnt++;
  }
  return callback(matches);
}

//function to shuffle an array
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

//API to play a match
router.post('/player/match', function (req, res) {
  matchId = parseInt(req.body.matchId);
  offensiveMove = parseInt(req.body.offensiveMove);
  if (matches.length == 0) //check if the attempting to play even before joining/drawing
    return res.status(400).send("No matches have been drawn yet");
  for (k = 0; k < matches.length; k++) {
    if (matches[k].matchId == matchId && matches[k].status == "Yet to be Played") {
      winner = startMatch(matches[k].player1, matches[k].player2, offensiveMove);
      if (matchOver) {
        temp = {};
        temp.matchId = matchId;
        temp.match = matches[k].player1.name + " vs " + matches[k].player2.name;
        temp.winner = winner.name;
        report.push(temp); //log the match for reporting later
        matches[k].status = "Game Over";
        matchOver = 0;
        return res.status(200).send("Game won by " + winner.name);
      }
      turnData = {};
      turnData.turnWinner = winner.name;
      turnData[matches[k].player1.name] = player1Score;
      turnData[matches[k].player2.name] = player2Score;
      return res.status(200).send(turnData);
    }
      //check if the match has already been played
    else if (matches[k].matchId == matchId && matches[k].status == "Game Over")
      return res.status(400).send("Game already played");
  }
  return res.status(400).send("Match Does not exist");
});

//function to start a turn and lay out moves
function startMatch(player1, player2, offensiveMove) {

  player1Move = playerMove(player1, player1Type, offensiveMove);
  player2Move = playerMove(player2, player2Type, offensiveMove);
  newValues = fight(player1Move, player1Type, player1Score, player2Move, player2Type, player2Score);
  player1Move = newValues[0];
  player1Type = newValues[1];
  player1Score = newValues[2];
  player2Move = newValues[3];
  player2Type = newValues[4];
  player2Score = newValues[5];
  turnwinner = newValues[6];

  if (player1Score == 5 || player2Score == 5) {
    if (player1Score == 5)
      winner = player1;
    else if (player2Score == 5)
      winner = player2;
    player1Score = 0;
    player2Score = 0;
    player1Type = "offensive";
    player2Type = "defensive";
    matchOver = 1;
    cplayers.push(winner);
    return winner;
  }

  else if (turnwinner == "p1") {
    turnwinner = player1;
    return turnwinner;
  }
  else if (turnwinner == "p2") {
    turnwinner = player2;
  }
  return turnwinner;
}

//function to determine a move by player
function playerMove(player, playerType) {
  if (playerType == "offensive") {
    return offensiveMove
  }
  else if (playerType == "defensive") {
    return generateDefenseArray(player.length)
  }

}

//function to get a random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to generate a random array of fix length
function generateDefenseArray(len) {
  defArr = [];
  for (i = 0; i < len; i++) {
    defArr.push(getRandomInt(1, 10));
  }
  return defArr;
}

//function to determine winner based on moves
function fight(p1Move, p1Type, p1Score, p2Move, p2Type, p2Score) {
  turnwinner = "";
  if (p1Type == "offensive") {
    if (p2Move.indexOf(p1Move) != -1) {
      p1Type = "defensive";
      p2Type = "offensive";
      p2Score = p2Score + 1;
      turnwinner = "p2";
    }
    else {
      p1Score = p1Score + 1;
      turnwinner = "p1";
    }
  }
  else if (p1Type == "defensive") {
    if (p1Move.indexOf(p2Move) != -1) {
      p1Type = "offensive";
      p2Type = "defensive";
      p1Score = p1Score + 1;
      turnwinner = "p1";
    }
    else {
      p2Score = p2Score + 1;
      turnwinner = "p2";
    }
  }

  return [p1Move, p1Type, p1Score, p2Move, p2Type, p2Score, turnwinner];
}

//API to generate a report
router.get('/refree/report', function (req, res) {
  if (report.length < playersData.data.length-1) {
    return res.status(400).send("Game not complete yet");
  }
  var rep = {};
  rep.gameLog = report;
  rep.champion = report[matches.length-1].winner;
  return res.status(200).send(rep);
});

module.exports = router;