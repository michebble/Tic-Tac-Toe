console.log('Tic Tac Toe');

//---Game Logic---//

/* 
have toggle for player 1 and 2

**game loop**
player clicks board section
if that section is free, then player token appears
check win conditon
if there are three player tokens in a row, then player wins
if not, toggle player and return to start of loop

gameboard

0|1|2
-----
3|4|5
-----
6|7|8

places to check for win
      offset
0,1,2|1
0,3,6|3
0,4,8|4
1,4,7|3
2,4,6|2
2,5,8|3
3,4,5|1
6,7,8|1



*/




var playArea = new Array(9).fill('emptySquare');
var winningCombinations = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
var whichPlayer = 'cross';

var playMove = function(currentPlayer,  squareId) {
  playArea[squareId] = currentPlayer;
}

var checkRow = function(position1, position2, position3) {
  if (playArea[position1] == 'emptySquare') {
    return false;
  } else if (playArea[position2] !== playArea[position3]) {
    return false;
  } else if (playArea[position1] === playArea[position3]) {
    return true;
  }  
}

var winCondition = function() {
  for (var possibleCombination = 0; possibleCombination < winningCombinations.length; possibleCombination++) {
    if (checkRow(winningCombinations[possibleCombination][0],winningCombinations[possibleCombination][1],winningCombinations[possibleCombination][2]) === true) {
      return true;
    }
  }
  return false;
}


var assignPointsForRound = function(winner) {
  var crossScoreForRound = document.createElement('div');
  var naughtsScoreForRound = document.createElement('div');
  if (winner === 'cross') {
    crossScoreForRound.textContent = '1';
    crossScoreSheet.appendChild(crossScoreForRound);
    naughtsScoreForRound.textContent = '0';
    naughtsScoreSheet.appendChild(naughtsScoreForRound);
  } else if (winner === 'naught') {
    crossScoreForRound.textContent = '0';
    crossScoreSheet.appendChild(crossScoreForRound);
    naughtsScoreForRound.textContent = '1';
    naughtsScoreSheet.appendChild(naughtsScoreForRound);
  } else if (winner === 'none') {
    crossScoreForRound.textContent = '0';
    crossScoreSheet.appendChild(crossScoreForRound);
    naughtsScoreForRound.textContent = '0';
    naughtsScoreSheet.appendChild(naughtsScoreForRound);
  }
  setTimeout(clearBoard, 1000);
}

var placeMark = function(markName) {
  event.target.style.backgroundImage = "url('" + markName + ".png')";
  event.target.style.backgroundSize = "contain"; 
  event.target.classList.remove('rotateIn');
  event.target.classList.add('jello');
  event.target.removeEventListener('click', chooseSpace);
}



var disableBoard = function() {
  var squareToDisable = document.querySelectorAll('.square');
  for (var i =0; i < 9; i++) {
    squareToDisable[i].removeEventListener('click', chooseSpace);
  }
}

var chooseSpace = function(event){
  var squareId = Number(event.target.getAttribute('data-id'));
  if (whichPlayer === 'cross') {
    playMove(whichPlayer, squareId);
    placeMark(whichPlayer);
    if (winCondition() === true) {
      disableBoard();
      assignPointsForRound(whichPlayer);
    } else if (winCondition() === false && playArea.indexOf('emptySquare') === -1) {
      console.log("game over");
      assignPointsForRound('none');
      setTimeout(clearBoard, 1000);
    } 
    whichPlayer = 'naught';
  } else if (whichPlayer === 'naught') {
    playMove(whichPlayer, squareId);
    placeMark(whichPlayer);
    if (winCondition() === true) { 
      assignPointsForRound(whichPlayer);
    } else if (winCondition() === false && playArea.indexOf('emptySquare') === -1) {
      console.log("game over");
      assignPointsForRound('none');
      setTimeout(clearBoard, 1000);
    } 
    whichPlayer = 'cross';
  }
  console.log(playArea);
}
//  (playArea.indexOf('emptySquare') === -1)

// var assignToken = function(event) {
//   event.target.style.backgroundImage = "url('https://www.fillmurray.com/" + event.target.clientHeight + "/" + event.target.clientWidth + "')";
// }

//---presentation---//

/* 
get the elemets
-player 1
-player 2
-board


*/



var gameBoard = document.querySelector('.game-board');
var crossScoreSheet = document.querySelector('.player-ones-area');
var naughtsScoreSheet = document.querySelector('.player-twos-area');

var createBoard = function() {
  for (var i = 0; i < 9; i++) {
    var gameSquare = document.createElement('div');
    gameSquare.addEventListener('click', chooseSpace);
    gameSquare.className = 'square';
    gameSquare.setAttribute('data-id',i);
    gameSquare.classList.add('animated');
    gameSquare.classList.add('rotateIn');
    gameBoard.appendChild(gameSquare);
  }
}

var clearBoard =function() {
  var squaresToClear = document.querySelectorAll('.square');
  for (var i = 0; i < 9; i++) {
    gameBoard.removeChild(squaresToClear[i]);
  }
  playArea = new Array(9).fill('emptySquare');
  // whichPlayer = 'cross';
  createBoard();
}
createBoard();