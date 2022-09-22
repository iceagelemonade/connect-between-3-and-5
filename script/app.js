// this was to test layout
// let degreesToRotate = 0
// const rotate = (degrees) => {
//     degreesToRotate += degrees
//     document.querySelector('.gameboard-container').style.transform="rotate("+degreesToRotate+"deg)"
    
// }
const body = document.querySelector('body')
const mainContainer = document.querySelector('.main-container')
const gameBoardContainer = document.querySelector('#gameboard-container')
let isOrientationNormal = true
const columns = () => isOrientationNormal?7:6
const rows = () => isOrientationNormal?6:7

const winningScore = 100

const colors = {color1: '#ffff00', color2: '#ff0000'}

let player1ColorChoice = null
let player2ColorChoice = null

let player1Score = 0
let player2Score = 0

let turnCount = 0

let roundsToRotate = 3
let currentTokensOnBoard = []

const firstPlayer = {
    name: null,
    color: null,
}
const secondPlayer = {
    name: null,
    color: null,
}



const imageArr = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350]

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

const drawWin = () => {
    let mask = document.createElement('div')
    mask.classList.add('playfield-mask')
    body.appendChild(mask)
    let winPopUp = document.createElement('div')
    winPopUp.classList.add('popup')
    const winner = () => {
        if (player1Score > player2Score) {
            return 'Player 1 Wins!'
        } else if (player2Score > player1Score) {
            return 'Player 2 Wins!'
        } else {
            return `It's a tie!`
        }
    }
    winPopUp.innerHTML = '<div>'+winner()+ '</div><div>Play Again?</div><button type="button" id="start-button"onclick="resetGame()">Start Game</button>'
    body.appendChild(winPopUp)
}

const detectWin = () => {
    if (player1Score >= winningScore || player2Score >= winningScore) {
        drawWin()
        
        
        // if (player1Score > player2Score) {
        //     console.log('Player 1 wins')
        // } else if (player2Score > player1Score) {
        //     console.log('Player 2 wins')
        // } else {
        //     console.log(`It's a tie!`)
        // }
    }
}

const score = () => {
    let scoring = false    
    for (let i =0; i < 42; i++){
        if (currentTokensOnBoard[i].remove === true) {
            currentTokensOnBoard[i].controlledBy.name === 'Player 1'?player1Score+=25:player2Score+=25
            // name += 25
            currentTokensOnBoard[i] = {isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false}
            scoring = true
        }
    }
    if (scoring === true) {
        clearGameBoard()
        drawGameBoard()
        document.querySelector('#player1-score').innerText = player1Score
        document.querySelector('#player2-score').innerText = player2Score
        console.log('Player 1 score: ', player1Score,'\nPlayer 2 score: ',player2Score)
        checkBeneath()
        detectWin()
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
    if (document.getElementById('start-button') != null) {
        document.getElementById('start-button').remove()
    }
    createTokenArr(currentTokensOnBoard)
    drawGameBoard()
    let scoreboard1 = document.createElement('div')
    let scoreboard2 = document.createElement('div')
    scoreboard1.classList.add('scoreboard')
    scoreboard2.classList.add('scoreboard')
    scoreboard1.setAttribute('id', 'player-1')
    scoreboard2.setAttribute('id', 'player-2')
    scoreboard1.innerHTML = 'PLAYER<br />1<br />Score:<br /><span id="player1-score">0</span>'
    scoreboard2.innerHTML = 'PLAYER<br />2<br />Score:<br /><span id="player2-score">0</span>'
    mainContainer.appendChild(scoreboard1)
    mainContainer.appendChild(scoreboard2)
    let turnTracker = document.createElement('div')
    let roundTracker = document.createElement('div')
    turnTracker.classList.add('scoreboard')
    roundTracker.classList.add('scoreboard')
    turnTracker.setAttribute('id', 'turn-tracker')
    roundTracker.setAttribute('id', 'round-tracker')
    turnTracker.innerHTML = 'Current Player:<br /><span id="current-turn"></span>'
    roundTracker.innerHTML = 'Rounds until Rotate:<br /><span id="round-to-turn">3</span>'
    mainContainer.appendChild(roundTracker)
    mainContainer.appendChild(turnTracker)
    console.log('Current Token Placement is:/n', currentTokensOnBoard)
    turnCount = 1
    writeCurrentPlayer()
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
            turnHandler()
            turnCount++
            writeCurrentPlayer()
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
///////////////////////////////////////////////////////////////
// turn handler
const writeRounds = () => {
    const rounds = document.getElementById('round-to-turn')
    rounds.innerText = roundsToRotate
}
const writeCurrentPlayer = () => {
    let curPlayer = turnCount%2 === 0?secondPlayer:firstPlayer
    document.getElementById('current-turn').innerText = curPlayer.name
    document.getElementById('current-turn').style.color = curPlayer.color 
}

const rotateHandler = () => {
    let direction = Math.floor(Math.random()*2)===1?'cw':'ccw'
    console.log('rotating ',direction)
    // rotate(direction)
    let mask = document.createElement('div')
    mask.classList.add('playfield-mask')
    body.appendChild(mask)
    let rotatePopUp = document.createElement('div')
    rotatePopUp.classList.add('popup')
    rotatePopUp.innerHTML = `Board is Rotating!<span id="rotation-direction">But What Direction?</span>`
    body.appendChild(rotatePopUp)

    let dir = document.getElementById('rotation-direction')
    let textToggle = false
    setTimeout(()=>{
        let rotationDisplayInterval = setInterval(()=>{
           textToggle === true?dir.innerText = "COUNTER-CLOCKWISE":dir.innerText = "CLOCKWISE"
           textToggle = !textToggle
        }, 100)
        setTimeout(()=>{
            clearInterval(rotationDisplayInterval)
            direction === 'cw'?dir.innerText = "CLOCKWISE":dir.innerText = "COUNTER-CLOCKWISE"
        },4000)
    },1000)
    

    setTimeout(()=>{
        document.querySelector('.popup').remove()
        document.querySelector('.playfield-mask').remove()
        rotate(direction)        
    },6000)
       
    roundsToRotate = 3
    writeRounds()
}

const turnHandler = () => {
    if (turnCount%2 === 0) {
        roundsToRotate--
    }
    if (roundsToRotate === 0) {
        rotateHandler()
    } else {
        writeRounds()
    }
}





//////////////////////////////////////////////
// whose first?

const displayFirstPlayer = () => {
    let display = document.createElement('div')
    display.classList.add('popup')
    display.classList.add('popup-overlay')
    display.innerText = firstPlayer.name + ' Goes First'
    document.querySelector('.popup').appendChild(display)
    setTimeout(()=>{
        document.querySelector('.popup').remove()
        document.querySelector('.playfield-mask').remove()
        startGame()
    } ,1000)
}


let imageValue = 0

const getImage = () => {
    const image = document.getElementById('coin')
    imageValue === 35? imageValue = 0: imageValue = imageValue
    const toLoad = imageArr[imageValue]
    image.src='./coin-flip-red-yellow/'+toLoad+'.png'
    imageValue++
}
let timer = null
const pickFirstPlayerAnimation = () => {
    imageValue = 0
    let endTime = Math.floor(Math.random() * 2) === 1?1750: 2280
    console.log(endTime)
    let timerFast = setInterval(getImage, 10)
    let timerFastEnd = setTimeout(() => {
        console.log('medium timer starting')
        clearInterval(timerFast)
        let timerMed = setInterval(getImage, 20)
        setTimeout(() => {
            console.log('slow timer starting')
            clearInterval(timerMed)
            let timerSlow = setInterval(getImage, 30)
            setTimeout(() => {
                clearInterval(timerSlow)
                },endTime)
        },2210)

    },2880)
    if (endTime === 1750) {
        firstPlayer.color = colors.color1
        secondPlayer.color = colors.color2
    } else {
        firstPlayer.color = colors.color2
        secondPlayer.color = colors.color1 
    }
    if (player1ColorChoice === firstPlayer.color) {
        firstPlayer.name = 'Player 1'
        secondPlayer.name = 'Player 2'
    } else {
        firstPlayer.name = 'Player 2'
        secondPlayer.name = 'Player 1'
    }  
    let displayWinner = setTimeout(displayFirstPlayer, 5390 + endTime)
}


const assignColor = (event) => {
    player1ColorChoice = colors[event.srcElement.getAttribute('data-color')]
    player2ColorChoice = player1ColorChoice === colors.color1?colors.color2:colors.color1
    console.log(`Player 1 :`,player1ColorChoice,`\nPlayer 2 :`,player2ColorChoice)
    let leftImage = null
    let rightImage = null
    if (player1ColorChoice === colors.color1){
        leftImage = '<img src="coin-flip-red-yellow/0.png" alt="yellow token" width="60%" id="yellow" data-color="color1">'
        rightImage = '<img src="coin-flip-red-yellow/180.png" alt="yellow token" width="60%"  id="red" data-color="color2">'
    } else {
        rightImage = '<img src="coin-flip-red-yellow/0.png" alt="yellow token" width="60%" id="yellow" data-color="color1">'
        leftImage = '<img src="coin-flip-red-yellow/180.png" alt="yellow token" width="60%"  id="red" data-color="color2">'
    }
    document.querySelector('.popup').innerHTML=`Who will go first?
    <div class="pick-color">
        <div>
        Player 1:<br />`+leftImage+
        
        `</div>
        <img src="coin-flip-red-yellow/0.png" alt="yellow token" width="40%" id="coin" data-color="color1">
        <div>
        Player 2:<br />`+rightImage+
        
        `</div>
    </div>`
    setTimeout(pickFirstPlayerAnimation, 500)
}

const pickColor = () => {
    let mask = document.createElement('div')
    mask.classList.add('playfield-mask')
    body.appendChild(mask)
    let selectColorPopUp = document.createElement('div')
    selectColorPopUp.classList.add('popup')
    selectColorPopUp.innerHTML="Player 1<br />Choose Your Color:"
    let selectColor = document.createElement('div')
    selectColor.classList.add('pick-color')
    selectColor.innerHTML=`<img src="coin-flip-red-yellow/0.png" alt="yellow token" width="30%" id="yellow" data-color="color1">
    <img src="coin-flip-red-yellow/180.png" alt="yellow token" width="30%"  id="red" data-color="color2">`
    selectColorPopUp.appendChild(selectColor)
    body.appendChild(selectColorPopUp)
    document.querySelector('#yellow').addEventListener('click', assignColor)
    document.querySelector('#red').addEventListener('click', assignColor)
}

const resetGame = () => {
    player1Score = 0
    player2Score = 0
    turnCount = 0
    currentTokensOnBoard = []
    let scoreboards = document.querySelectorAll('.scoreboard')
    for (let i = 0; i < scoreboards.length; i++) {
        scoreboards[i].remove()
    }
    document.querySelector('.popup').remove()
    document.querySelector('.playfield-mask').remove()
    clearGameBoard()
    isOrientationNormal = true
    pickColor()


}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Below is the code for the animations in the upper-right and upper-left corners
const flipAnimation = () => {
    let left = 0
    let right = 18
    const leftImg = document.getElementById('logo-left-coin')
    const rightImg = document.getElementById('logo-right-coin')

    
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

