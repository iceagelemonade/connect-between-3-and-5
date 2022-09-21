// this was to test layout
// let degreesToRotate = 0
// const rotate = (degrees) => {
//     degreesToRotate += degrees
//     document.querySelector('.gameboard-container').style.transform="rotate("+degreesToRotate+"deg)"
    
// }
const gameBoardContainer = document.querySelector('#gameboard-container')
let isOrientationNormal = true
const columns = () => isOrientationNormal?7:6
const rows = () => isOrientationNormal?6:7

let player1Score = 0
let player2Score = 0

let currentTokensOnBoard = []
const color1 = '#ffff00'
const color2 = '#ff0000'
const firstPlayer = {
    name: 'player1',
    color: color1,
}
const secondPlayer = {
    name: 'player2',
    color: color2,
}

let turnCount = 0

// these are used for checking scoring playfields:
const scoringPositionsStandard = [
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false}
]

const scoringPositionsRotated = [
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false}
]

const score = () => {
    let scoring = false    
    for (let i =0; i < 41; i++){
        if (currentTokensOnBoard[i].remove === true) {
            currentTokensOnBoard[i].controlledBy.name === 'player1'?player1Score+=25:player2Score+=25
            // name += 25
            currentTokensOnBoard[i] = {isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false}
            scoring = true
        }
    }
    if (scoring === true) {
        clearGameBoard()
        drawGameBoard()
        console.log('Player 1 score: ', player1Score,'\nPlayer 2 score: ',player2Score)
        checkBeneath()
    } else {return}
}

const detectScore = () => {
    const checkArr = isOrientationNormal?scoringPositionsStandard:scoringPositionsRotated
    for (i = 0; i < 42; i++) {
        // first, check is position is occupied
        if (currentTokensOnBoard[i].isOccupied === true) {
            // check row
            if (checkArr[i].row === true) {
                let rowCheck = 1
                for (r = i+1; r < i+4; r++) {
                    if (currentTokensOnBoard[r].controlledBy === currentTokensOnBoard[i].controlledBy && currentTokensOnBoard[r].isOccupied === true) {
                        rowCheck++
                        console.log(`row check 1`)
                    }
                }
                if (rowCheck === 4) {
                    console.log(`row check 2`)
                    currentTokensOnBoard[i].remove = true
                    currentTokensOnBoard[i+1].remove = true
                    currentTokensOnBoard[i+2].remove = true
                    currentTokensOnBoard[i+3].remove = true
                } 
            }
            // check column
            if (checkArr[i].column === true) {
                let colCheck = 1
                for (c = i+columns(); c <= i+(columns()*3); c = c + columns()) {
                    if (currentTokensOnBoard[c].controlledBy === currentTokensOnBoard[i].controlledBy && currentTokensOnBoard[c].isOccupied === true) {
                        colCheck++
                    }
                }
                if (colCheck === 4) {
                    currentTokensOnBoard[i].remove = true
                    currentTokensOnBoard[i+columns()].remove = true
                    currentTokensOnBoard[i+(columns()*2)].remove = true
                    currentTokensOnBoard[i+(columns()*3)].remove = true
                }
            }
            // check Diaganol 1
            if (checkArr[i].d1 === true) {
                let diaCheck = 1
                for (d = i+(columns()+1); d <= i+((columns()+1)*3); d = d + (columns()+1)) {
                    if (currentTokensOnBoard[d].controlledBy === currentTokensOnBoard[i].controlledBy && currentTokensOnBoard[d].isOccupied === true) {
                        diaCheck++
                    }
                }
                if (diaCheck === 4) {
                    currentTokensOnBoard[i].remove = true
                    currentTokensOnBoard[i+(columns()+1)].remove = true
                    currentTokensOnBoard[i+((columns()+1)*2)].remove = true
                    currentTokensOnBoard[i+((columns()+1)*3)].remove = true
                }
            }
            // check Diaganol 2
            if (checkArr[i].d2 === true) {
                let diaCheck = 1
                for (d = i+(columns()-1); d <= i+((columns()-1)*3); d = d + (columns()-1)) {
                    if (currentTokensOnBoard[d].controlledBy === currentTokensOnBoard[i].controlledBy && currentTokensOnBoard[d].isOccupied === true) {
                        diaCheck++
                    }
                }
                if (diaCheck === 4) {
                    currentTokensOnBoard[i].remove = true
                    currentTokensOnBoard[i+(columns()-1)].remove = true
                    currentTokensOnBoard[i+((columns()-1)*2)].remove = true
                    currentTokensOnBoard[i+((columns()-1)*3)].remove = true
                }
            }
        }
    }
    console.log(`Token placement after detectScore:\n`,currentTokensOnBoard)
    score()
}

const createTokenArr = (arr) => {
    for (i = 0; i < 42; i++) {
        arr.push({isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false})
    }
}

const clearGameBoard =() => {
    while (gameBoardContainer.firstChild) {
        gameBoardContainer.removeChild(gameBoardContainer.firstChild)
    }
}

const startGame = () => {
    document.getElementById('start-button').remove()
    createTokenArr(currentTokensOnBoard)
    drawGameBoard()

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

    let maxCheck = isOrientationNormal?6:7

    let currentPlayer = turnCount%2===0?secondPlayer:firstPlayer

    for (let i = 0; i < maxCheck; i++) {
         if (!currentTokensOnBoard[squareToCheck].isOccupied) {
            currentTokensOnBoard[squareToCheck].isOccupied = true
            currentTokensOnBoard[squareToCheck].controlledBy = currentPlayer
            document.getElementById('space'+squareToCheck).style.backgroundColor = currentPlayer.color
            detectScore()
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
    // const divsToClear = document.querySelectorAll('.selector')
    // while (divsToClear.length > 0) {
    //     document.remove(divsToClear)
    //     console.log('removed')
    // }
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
    // change container classes
    const newCLass = isOrientationNormal?'standard':'rotated'
    gameBoardContainer.setAttribute('class', newCLass)
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
        if (currentTokensOnBoard[i].isOccupied === true) {
            newSquare.style.backgroundColor = currentTokensOnBoard[i].controlledBy.color
        }

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

const fillBeneath = () => {
    // console.log(`this is after checkBeneath:\n`,currentTokensOnBoard)
    clearGameBoard()
    for (let i = 41; i >= 0; i--) {
        if (currentTokensOnBoard[i].spacesBeneath > 0) {
            currentTokensOnBoard[i+(currentTokensOnBoard[i].spacesBeneath * columns())] = currentTokensOnBoard[i]
            currentTokensOnBoard[i+(currentTokensOnBoard[i].spacesBeneath * columns())].spacesBeneath = 0
            currentTokensOnBoard[i] = {isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false}
        }
    }
    // console.log(`this is after fillBeneath:\n`,currentTokensOnBoard)
    drawGameBoard()
    detectScore()
}

const checkBeneath = () => {
    for (let i = 0; i < 42; i++) {
        if (currentTokensOnBoard[i].isOccupied === true) {
            for (let c = i + columns(); c < 42; c = c + columns()) {
                if (currentTokensOnBoard[c].isOccupied === false) {
                    // console.log(currentTokensOnBoard[i])
                    currentTokensOnBoard[i].spacesBeneath += 1
                    // console.log(currentTokensOnBoard[i], currentTokensOnBoard[i].spacesBeneath)
                }
            }
        }
    }
    fillBeneath()
}

const refreshTokenArr = (deg) => {
    let newArr = []
    let start = deg===90?42:-1
    let move = deg===90?rows()*-1:rows()
    let prev = start
    let reset = deg===90?1:-1
    for (i = 0; i < 42; i++) {
        if (i%columns()===0) {
            prev = start + (reset*(i/columns()))
        }
        newArr[i] = currentTokensOnBoard[prev + move] 
        prev = prev + move
    }
    // console.log('this is the old arr:\n',currentTokensOnBoard)
    currentTokensOnBoard = newArr
    // console.log('this is the new arr:\n',currentTokensOnBoard)    
}

// const refreshTokenArr = (deg) => {
//     let newArr = []
//     createTokenArr(newArr)
//     let start = deg===90?-1:42
//     let col = isOrientationNormal?6:7
//     let move = deg===90?col*-1:col
//     let prev = start
//     console.log('some values and stuff',start,col,move,prev)
//     for (i = 0; i < 43; i = i + col) {
        
//         for (c = 0; c < col; c++){
//             console.log(i+c)
//             console.log(currentTokensOnBoard[i+c])
//             newArr[prev + move] = currentTokensOnBoard[i + c]
//             prev += move
//         }

//         prev = (deg===90)?start-= 1:start+= 1
//         // (deg===-90)?start+= 1:start=start
//     }
//     console.log('this is the old arr:\n',currentTokensOnBoard)
//     currentTokensOnBoard = newArr
//     console.log('this is the new arr:\n',currentTokensOnBoard)
// }

const rotate = (direction) => {
    const deg = direction === 'cw'?90:-90
    // console.log('this is deg: ',deg)
    gameBoardContainer.style.transform = "rotate("+deg+"deg)"
    isOrientationNormal = !isOrientationNormal
    // setTimeout(()=>{
        // console.log('redrawing now')
        refreshTokenArr(deg)
        clearGameBoard()
        gameBoardContainer.style.transform = "rotate(0deg)"
        drawGameBoard()
        checkBeneath()
    // }, 3000)
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
// ////////////////////////////////////////////////////////////////////////////////////////////////////////

