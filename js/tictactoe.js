const X_PLAYER = 'X'
const O_PLAYER = 'O'
const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const boxElements = document.querySelectorAll('[data-box]')
const board = document.getElementById('boardContainer')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  boxElements.forEach(box => {
    box.classList.remove(X_PLAYER)
    box.classList.remove(O_PLAYER)
    box.removeEventListener('click', handleClick)
    box.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const box = e.target
  const currentClass = circleTurn ? O_PLAYER : X_PLAYER
  placeMark(box, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...boxElements].every(box => {
    return box.classList.contains(X_PLAYER) || box.classList.contains(O_PLAYER)
  })
}

function placeMark(box, currentClass) {
  box.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_PLAYER)
  board.classList.remove(O_PLAYER)
  if (circleTurn) {
    board.classList.add(O_PLAYER)
  } else {
    board.classList.add(X_PLAYER)
  }
}

function checkWin(currentClass) {
  return WIN_CONDITIONS.some(combination => {
    return combination.every(index => {
      return boxElements[index].classList.contains(currentClass)
    })
  })
}


// Used this tutorial for reference
// https://www.sourcecodeexamples.net/2020/09/javascript-tic-tac-toe-game.html