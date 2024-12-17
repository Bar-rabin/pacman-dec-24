'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER_FOOD = '🍕'
const CHERRY = '🍒'

var gIsVictorious
const gGame = {
  score: 0,
  isOn: false,
}

var gBoard = []
var gRandomCherry
var gFoodCount

function init() {
  gDeadGhost = []
  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)

  renderBoard(gBoard, '.board-container')
  gGame.isOn = true
  gIsVictorious = false
  gRandomCherry = setInterval(getRandomCherry, 15000)
  gFoodCount = 56
}

function buildBoard() {
  const size = 10
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL
      }
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === size - 2) ||
        (i === size - 2 && j === 1) ||
        (i === size - 2 && j === size - 2)
      ) {
        board[i][j] = SUPER_FOOD
      }
    }
  }
  return board
}

function updateScore(diff) {
  // TODO: update model and dom
  gGame.score += diff

  const elScore = document.querySelector('.score span')
  elScore.innerText = gGame.score
  //   checkIsVictorious()
}

function gameOver() {
  gGame.isOn = false
  showTheModal()
}

function resetGame(modal) {
  gGame.score = 0
  const elScore = document.querySelector('.score span')
  elScore.innerText = gGame.score

  var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'

  clearInterval(gGhostsInterval)
  init()
}

function showTheModal() {
  var elModal = document.querySelector('.modal')
  var elModalText = document.querySelector('.modal span')

  if (gIsVictorious) {
    elModalText.innerText = 'You won!'
    elModal.style.display = 'block'
    return
  }

  if (!gGame.isOn) {
    elModalText.innerText = 'Game Over'

    elModal.style.display = 'block'
  }
}
getRandomCherry()
function getRandomCherry() {
  var randomCell = findEmptyPos(gBoard)
  if (!randomCell) return
  gBoard[randomCell.i][randomCell.j] = CHERRY
  renderCell(randomCell, CHERRY)
}

function findEmptyPos(gBoard) {
  var emptyPoss = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var cell = gBoard[i][j]

      if (cell === ' ') {
        var pos = { i: i, j: j }

        emptyPoss.push(pos)
      }
    }
  }

  var randIdx = getRandomInt(1, emptyPoss.length - 2)
  var emptyPos = emptyPoss[randIdx]
  return emptyPos
}
