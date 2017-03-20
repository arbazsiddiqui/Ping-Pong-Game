Join player 1

```http://localhost:8080/player/join/1```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

Join player 2

```http://localhost:8080/player/join/2```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

Join player 3

```http://localhost:8080/player/join/3```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

Join player 4

```http://localhost:8080/player/join/4```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

Join player 5

```http://localhost:8080/player/join/5```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

Join player 6

```http://localhost:8080/player/join/6```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

Join player 7

```http://localhost:8080/player/join/7```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

Join player 8

```http://localhost:8080/player/join/8```

```javascript
{
  "status": 200,
  "message": "Successfully joined the game"
}
```

##### Ask refree to draw matches #####

```http://localhost:8080/refree/draw```

```javascript
[
  {
    "matchId": 1,
    "player1": {
      "id": 7,
      "name": "Chandler",
      "length": 5
    },
    "player2": {
      "id": 8,
      "name": "Colwin",
      "length": 5
    }
  },
  {
    "matchId": 2,
    "player1": {
      "id": 5,
      "name": "Pritam",
      "length": 6
    },
    "player2": {
      "id": 2,
      "name": "Nick",
      "length": 8
    }
  },
  {
    "matchId": 3,
    "player1": {
      "id": 6,
      "name": "Amit",
      "length": 6
    },
    "player2": {
      "id": 1,
      "name": "Joey",
      "length": 8
    }
  },
  {
    "matchId": 4,
    "player1": {
      "id": 3,
      "name": "Russel",
      "length": 7
    },
    "player2": {
      "id": 4,
      "name": "Vivek",
      "length": 7
    }
  }
]
```

Play match 1

```http://localhost:8080/player/match/1```

```javascript
{
  "id": 8,
  "name": "Colwin",
  "length": 5
}
```

Play match 2

```http://localhost:8080/player/match/2```

```javascript
{
  "id": 2,
  "name": "Nick",
  "length": 8
}
```

Play match 3

```http://localhost:8080/player/match/3```

```javascript
{
  "id": 1,
  "name": "Joey",
  "length": 8
}
```

Play match 4

```http://localhost:8080/player/match/4```

```javascript
{
  "id": 4,
  "name": "Vivek",
  "length": 7
}
```

##### Ask refree to draw matches among for the semifinals #####

```http://localhost:8080/refree/draw```

```javascript
[
  {
    "matchId": 5,
    "player1": {
      "id": 2,
      "name": "Nick",
      "length": 8
    },
    "player2": {
      "id": 8,
      "name": "Colwin",
      "length": 5
    }
  },
  {
    "matchId": 6,
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

Play match 5

```http://localhost:8080/player/match/5```

```javascript
{
  "id": 2,
  "name": "Nick",
  "length": 8
}
```

Play match 6

```http://localhost:8080/player/match/6```

```javascipt
{
  "id": 1,
  "name": "Joey",
  "length": 8
}
```

Ask refree to draw the finals

```http://localhost:8080/refree/draw```

```javascript
[
  {
    "matchId": 7,
    "player1": {
      "id": 1,
      "name": "Joey",
      "length": 8
    },
    "player2": {
      "id": 2,
      "name": "Nick",
      "length": 8
    }
  }
]
```

Play match 7 (final)

```http://localhost:8080/player/match/7```

```javascript
{
  "id": 1,
  "name": "Joey",
  "length": 8
}
```

##### Ask refree to generate the report #####

```http://localhost:8080/refree/report```

```javascript
{
  "gameLog": [
    {
      "matchId": "1",
      "match": "Chandler vs Colwin",
      "winner": "Colwin"
    },
    {
      "matchId": "2",
      "match": "Pritam vs Nick",
      "winner": "Nick"
    },
    {
      "matchId": "3",
      "match": "Amit vs Joey",
      "winner": "Joey"
    },
    {
      "matchId": "4",
      "match": "Russel vs Vivek",
      "winner": "Vivek"
    },
    {
      "matchId": "5",
      "match": "Nick vs Colwin",
      "winner": "Nick"
    },
    {
      "matchId": "6",
      "match": "Joey vs Vivek",
      "winner": "Joey"
    },
    {
      "matchId": "7",
      "match": "Joey vs Nick",
      "winner": "Joey"
    }
  ],
  "winner": "Joey"
}
```
