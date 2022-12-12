window.onload = () => {
  const rootElement = document.querySelector('div');

  const header = document.createElement('h1');
  header.innerHTML = 'Tic Tac Toe';
  header.className = 'title';
  rootElement.appendChild(header);

  [...Array(3).keys()].forEach((rowIndex) => {
    const row = document.createElement('div');
    row.className = `row row${rowIndex + 1}`;

    rootElement.appendChild(row);

    [...Array(3).keys()].forEach((colIndex) => {
      const boxNumber = rowIndex * 3 + colIndex;

      const box = document.createElement('div');
      box.className = `box box${boxNumber}`;

      row.appendChild(box);
    });
  });

  //<-----------logic---------------->

  const boxes = Array.from(document.querySelectorAll('.box'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const scoreButton = document.querySelector('#scoreButton');
  const announcer = document.querySelector('.announcer');
  const turnDisplay = document.querySelector('.display');
  const scoreCard = document.querySelector('.scoreCard');

  let showingScore = 'Show score';
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer;
  let playerXscore = 0;
  let playerOscore = 0;
  let isGameActive = true;

  const startingPlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    const chanceDie = Math.random();
    if (chanceDie > 0.5) {
      currentPlayer = 'X';
    } else {
      currentPlayer = 'O';
    }
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  startingPlayer();

  boxes.forEach((box, index) => {
    box.addEventListener('click', () => userAction(box, index));
  });

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleResultValidation() {
    let roundWon = false;
    let result;

    winningConditions.forEach((winCondition, index) => {
      if (index === 8) {
        return;
      }

      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        return;
      }

      if (a === b && b === c) {
        const firstBox = document.querySelector(`.box${winCondition[0]}`);
        const secondBox = document.querySelector(`.box${winCondition[1]}`);
        const thirdBox = document.querySelector(`.box${winCondition[2]}`);
        firstBox.classList.add('strike');
        secondBox.classList.add('strike');
        thirdBox.classList.add('strike');
        roundWon = true;
        return;
      }
    });

    if (roundWon) {
      currentPlayer === 'X'
        ? (result = 'PLAYERX_WON')
        : (result = 'PLAYERO_WON');
      currentPlayer === 'X' ? (playerXscore += 1) : (playerOscore += 1);
      isGameActive = false;
      turnDisplay.classList.add('hide');
      announcer.classList.remove('hide');
    }

    if (!roundWon && !board.includes('')) {
      result = 'TIE';
      announcer.classList.remove('hide');
    }

    switch (result) {
      case 'PLAYERO_WON':
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case 'PLAYERX_WON':
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case 'TIE':
        announcer.innerText = "It's a Tie";
    }

    if (showingScore === 'Hide score') {
      updateScoreCard();
    }
  }

  const isValidAction = (box) => {
    if (box.innerText === 'X' || box.innerText === 'O') {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (box, index) => {
    if (isValidAction(box) && isGameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`, 'playerinput');
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    startingPlayer();
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    turnDisplay.classList.remove('hide');
    announcer.classList.add('hide');

    boxes.forEach((box) => {
      box.innerText = '';
      box.classList.remove('playerX');
      box.classList.remove('playerO');
      box.classList.remove('strike');
    });
  };

  const updateScoreCard = () => {
    scoreCard.innerHTML = `<div> Player <span class="playerX">X</span>\'s score: ${playerXscore} </div>
        <div> Player <span class="playerO">O</span>\'s score: ${playerOscore} </div>`;
  };

  const showScore = () => {
    showingScore = showingScore === 'Show score' ? 'Hide score' : 'Show score';
    scoreButton.innerText = showingScore;
    if (showingScore === 'Hide score') {
      updateScoreCard();
    } else {
      scoreCard.innerHTML = '';
    }
  };

  resetButton.addEventListener('click', resetBoard);
  scoreButton.addEventListener('click', showScore);
};
