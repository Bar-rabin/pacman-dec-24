'use strict'

const PACMAN = '😜'
var gPacman
var gIsSuper = false

function createPacman(board) {
  // TODO: initialize gPacman...
  gPacman = {
    location: { i: 5, j: 5 },
    isSuper: false,
  }
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
  if (!gGame.isOn) return

  // TODO: use getNextLocation(), nextCell
  const nextLocation = getNextLocation(ev)
  if (!nextLocation) return

  const nextCell = gBoard[nextLocation.i][nextLocation.j]

  // TODO: return if cannot move
  if (nextCell === WALL) return

  if (nextCell === SUPER_FOOD) {
    if (gIsSuper) return
    gIsSuper = true
    setTimeout(() => {
      gIsSuper = false
      poshGhost()
    }, 5000)

    getGhostHTML()
  }

  // TODO: hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (gIsSuper) {
      removGhost(nextLocation)
    } else {
      gameOver()

      return
    }
  }

  // TODO: hitting food? call updateScore
  if (nextCell === FOOD) {
    updateScore(1)
    gFoodCount--
    if (gFoodCount === 0) {
      gIsVictorious = true
      showTheModal()
    }

    // var audio = new Audio('pacman.mp3')
    // audio.play()
  }

  if (nextCell === CHERRY) updateScore(10)

  // TODO: moving from current location:
  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY)

  // TODO: Move the pacman to new location:
  // TODO: update the model
  gPacman.location = nextLocation
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

  // TODO: update the DOM
  renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  }
  // TODO: figure out nextLocation
  switch (eventKeyboard.key) {
    case 'ArrowUp':
      nextLocation.i--
      break
    case 'ArrowDown':
      nextLocation.i++
      break
    case 'ArrowLeft':
      nextLocation.j--
      break
    case 'ArrowRight':
      nextLocation.j++
      break

    default:
      return null
  }
  return nextLocation
}
