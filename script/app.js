// this was to test layout
// let degreesToRotate = 0
// const rotate = (degrees) => {
//     degreesToRotate += degrees
//     document.querySelector('.gameboard-container').style.transform="rotate("+degreesToRotate+"deg)"
    
// }
const gameBoardContainer = document.querySelector('#gameboard-container')
let isOrientationNormal = true
let currentTokensOnBoard = []
const color1 = '#ffff00'
const color2 = '#ff0000'
const firstPlayer = {
    name: null,
    color: color1,
}
const secondPlayer = {
    name: null,
    color: color2,
}
let turnCount = 0



const createTokenArr = (arr) => {
    for (i = 0; i < 42; i++) {
        arr.push({isOccupied: false, controlledBy: null})
    }
}

const startGame = () => {
    document.getElementById('start-button').remove()
    drawGameBoard()
    createTokenArr(currentTokensOnBoard)
    console.log('Current Token Placement is:/n', currentTokensOnBoard)
    turnCount = 1
}

// Select a place to add token
const addToken = (e) => {
    // First, get the id of the coloumn that was click
    const id = e.srcElement.getAttribute('id')
    // then, get just the number of that ID to identify the column
    const col = parseInt(id.replace('selector',''))
    // then some math to calculate the bottom of the column
    let squareToCheck = isOrientationNormal?col + 35: col + 36
    // and also what to subtract as we look up the stack
    let toSubtract = isOrientationNormal?7:6

    let currentPlayer = turnCount%2===0?secondPlayer:firstPlayer

    for (let i = 0; i < toSubtract; i++) {
        if (squareToCheck < 0) {
            console.log('invalid move')
        
        } else if (!currentTokensOnBoard[squareToCheck].isOccupied) {
            currentTokensOnBoard[squareToCheck].isOccupied = true
            currentTokensOnBoard[squareToCheck].controlledBy = currentPlayer
            document.getElementById('space'+squareToCheck).style.backgroundColor = currentPlayer.color
            turnCount++
            return
        } else {
            squareToCheck -= toSubtract
        }
        
    }
    
    // console.log(`the bottom of the column is:\n`,squareToCheck,`and we will subtract:\n`,toSubtract)
}


// when a turn starts, before location is selected
const startTurn = () => {
    const start = isOrientationNormal?2:3
    const row = isOrientationNormal?'2 / 9':'1 / 9'
    let id = 0
    for (i=start; i < 9; i++) {
        const selector = document.createElement('div')
        selector.classList.add('selector')
        selector.setAttribute('id', 'selector' + id)
        selector.style.zIndex = 3
        selector.style.gridColumn = i
        selector.style.gridRow = row
        selector.addEventListener('click', addToken)
        gameBoardContainer.appendChild(selector)
        id++
    }
}

// Below is the function that draws the gameboard after the game begins
const drawGameBoard = () => {
    const colMax = 8
    const colMin = isOrientationNormal?2:3
    const rowMin = isOrientationNormal?3:2
    let col = colMin
    let row = rowMin
    for (i = 0; i < 42; i++) {
        if (col > colMax) {
            row++
            col = colMin
        }

        const newSquare = document.createElement('div')
        const newSquareOverlay = document.createElement('div')
        newSquare.classList.add('gameboard-space')
        newSquareOverlay.classList.add('overlay')
        newSquare.setAttribute('id', 'space'+i)
        newSquare.style.gridColumn = col
        newSquare.style.gridRow = row
        newSquareOverlay.style.gridColumn = col
        newSquareOverlay.style.gridRow = row
        gameBoardContainer.appendChild(newSquare)
        gameBoardContainer.appendChild(newSquareOverlay)
        col++
    }
    // remove after testing is done
    startTurn()
    // testing shading
    // const shadow = document.createElement('div')
    // shadow.classList.add('shadow')
    // gameBoardContainer.appendChild(shadow)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Below is the code for the animations in the upper-right and upper-left corners
const flipAnimation = () => {
    let left = 0
    let right = 18
    const leftImg = document.getElementById('logo-left-coin')
    const rightImg = document.getElementById('logo-right-coin')
    const imageArr = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350]
    
    const getImage = () => {
        left === 35? left = 0: left = left
        const toLoadL = imageArr[left]
        leftImg.src='./coin-flip-red-yellow/'+toLoadL+'.png'
        left++
        right === -1? right = 34: right = right
        const toLoadR = imageArr[right]
        rightImg.src='./coin-flip-red-yellow/'+toLoadR+'.png'
        right--
        
    }

    const spinLeft = setInterval(getImage, 60)
}

document.addEventListener('DOMContentLoaded', flipAnimation())