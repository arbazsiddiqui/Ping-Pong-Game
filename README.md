# PING PONG SIMULATOR #

## Overview ##
The app simulates a virtual Ping Pong game with two random player competing bases on randomly generated numbers

## Installation ##

1. Perform a clone of this repo ```git clone https://github.com/arbazsiddiqui/Ping-Pong-Game```
2. Install the required packages ```npm install```
3. Run the server ```node server```

### APIS ###

### Player ###

**USE**

To join a player in the game

**URL**

```/player/join/:id```

**Method:**

`GET`

**URL Params**

`id=[integer]`

**Response:**

```javascript
{
   "status": 200,
   "message": "Successfully joined the game"
}
```
***

**USE**

To play match

**URL**

```/player/match/:matchId```

**Method:**

`GET`

**URL Params**

`matchId=[integer]`

**Response:**

Object of winner of the match

```javascript
{
   "id": 2,
   "name": "Nick",
   "length": 8
}
```
***

### Refree ###

**USE**

To draw matches among legal players

**URL**

```/refree/draw```

**Method:**

`GET`

**Response:**

An array containg randomly drawn matches among the legal players

```javascript
[
  {
    "matchId": 1,
    "player1": {
      "id": 6,
      "name": "Amit",
      "length": 6
    },
    "player2": {
      "id": 2,
      "name": "Nick",
      "length": 8
    }
  },
  {
    "matchId": 2,
    "player1": {
      "id": 8,
      "name": "Colwin",
      "length": 5
    },
    "player2": {
      "id": 3,
      "name": "Russel",
      "length": 7
    }
  },
  {
    "matchId": 3,
    "player1": {
      "id": 5,
      "name": "Pritam",
      "length": 6
    },
    "player2": {
      "id": 7,
      "name": "Chandler",
      "length": 5
    }
  },
  {
    "matchId": 4,
    "player1": {
      "id": 1,
      "name": "Joey",
      "length": 8
    },
    "player2": {
      "id": 4,
      "name": "Vivek",
      "length": 7
    }
  }
]
```
***

**USE**

To generate the report after tournament


**URL**

```/refree/report```

**Method:**

`GET`

**Response:**

An object containing gamelog and the CHAMPION

```javascript
{
  "gameLog": [
    {
      "matchId": "1",
      "match": "Russel vs Joey",
      "winner": "Russel"
    },
    {
      "matchId": "2",
      "match": "Vivek vs Nick",
      "winner": "Nick"
    },
    {
      "matchId": "3",
      "match": "Amit vs Pritam",
      "winner": "Amit"
    },
    {
      "matchId": "4",
      "match": "Chandler vs Colwin",
      "winner": "Colwin"
    },
    {
      "matchId": "5",
      "match": "Colwin vs Nick",
      "winner": "Nick"
    },
    {
      "matchId": "6",
      "match": "Russel vs Amit",
      "winner": "Amit"
    },
    {
      "matchId": "7",
      "match": "Amit vs Nick",
      "winner": "Nick"
    }
  ],
  "winner": "Nick"
}
```
