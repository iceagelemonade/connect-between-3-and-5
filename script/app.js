
const body = document.querySelector('body')
const mainContainer = document.querySelector('.main-container')
const gameBoardContainer = document.querySelector('#gameboard-container')
let isOrientationNormal = true
const columns = () => isOrientationNormal?7:6
const rows = () => isOrientationNormal?6:7

let winningScore = null

const colors = {color1: 'rgb(255, 255, 0)', color2: 'rgb(255, 0, 0)', color3: 'rgb(255, 255, 255)'}

// const blankToken = {isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false}
// when I use the above each time I push a blank object the game crashes...

let player1ColorChoice = null
let player2ColorChoice = null

let player1Score = 0
let player2Score = 0

let turnCount = 1
let turnHandlerPosition = 6
let boardFull = false

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
// this array tells the program where to check wins when the board is not rotated
const scoringPositionsStandard = [
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false}
]

// this array tells the program where to check wins when the board is rotated
const scoringPositionsRotated = [
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: true, column: true, d1: true, d2:false},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},{row: false, column: true, d1: false, d2:true},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},
    {row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: true, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false},{row: false, column: false, d1: false, d2:false}
]


// this messages the players when there is a win state
const drawWin = () => {
    let mask = document.createElement('div')
    mask.classList.add('playfield-mask')
    body.appendChild(mask)
    let winPopUp = document.createElement('div')
    winPopUp.classList.add('popup')
    winPopUp.style.backgroundColor ='#282D2E'
    winPopUp.style.color = 'white'
    const winner = () => {
        if (player1Score > player2Score) {
            return 'Player 1 Wins!'
        } else if (player2Score > player1Score) {
            return 'Player 2 Wins!'
        } else {
            return `It's a tie!`
        }
    }
    winPopUp.innerHTML = '<div>'+winner()+ '</div><div class="outline-text"><span style="color:'+player1ColorChoice+'">Player 1: '+player1Score+'</span> || <span style="color:'+player2ColorChoice+'">Player 2: '+player2Score+'</span></div><button type="button" id="restart-button"onclick="resetGame()">Play Again?</button>'
    body.appendChild(winPopUp)
}

// this detects for winning conditions before every turn (and at the start of a turn in the event of a full gameboard)
const detectWin = (fromTurn) => {
    if (player1Score >= winningScore || player2Score >= winningScore || boardFull === true) {
        drawWin()
    } else if (fromTurn != true){
        turnHandlerPosition = 5
        turnHandler()
    }
}

// this adds points and resets the board after the scoring animation
const score = () => {
    let scoring = false    
    for (let i =0; i < 42; i++){
        if (currentTokensOnBoard[i].remove === true) {
            currentTokensOnBoard[i].controlledBy.name === 'Player 1'?player1Score+=25:player2Score+=25
            currentTokensOnBoard[i] = {isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false}
            scoring = true
        }
    }
    if (scoring === true) {
        clearGameBoard()
        drawGameBoard()
        document.querySelector('#player1-score').innerText = player1Score
        document.querySelector('#player2-score').innerText = player2Score
        turnHandlerPosition = 2
        turnHandler()
    } 
}

// this checks the current current tokens on the gameboard against the scoring arrays, and then maths if there is a line
const detectScore = () => {
    const checkArr = isOrientationNormal?scoringPositionsStandard:scoringPositionsRotated
    let scoreDetected = false
    for (i = 0; i < 42; i++) {
        // first, check is position is occupied
        if (currentTokensOnBoard[i].isOccupied === true) {
            // check row
            if (checkArr[i].row === true) {
                let rowCheck = 1
                for (r = i+1; r < i+4; r++) {
                    if (currentTokensOnBoard[r].controlledBy === currentTokensOnBoard[i].controlledBy && currentTokensOnBoard[r].isOccupied === true) {
                        rowCheck++
                    }
                }
                if (rowCheck === 4) {
                    currentTokensOnBoard[i].remove = true
                    currentTokensOnBoard[i+1].remove = true
                    currentTokensOnBoard[i+2].remove = true
                    currentTokensOnBoard[i+3].remove = true
                    scoreDetected = true
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
                    scoreDetected = true
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
                    scoreDetected = true
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
                    scoreDetected = true
                }
            }
        }
    }

    if (scoreDetected === true) {
        animationForScoreDetection()
    } else {
    turnHandlerPosition = 5
    turnHandler()
    }
}

// this creates the initial currentTokensOnBoard array
const createTokenArr = (arr) => {
    for (i = 0; i < 42; i++) {
        arr.push({isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false})
    }
}


// this is used whenever the gameboard needs to be redrawn by removing all tokens temporarily (happens after most animations and calculations)
const clearGameBoard =() => {
    while (gameBoardContainer.firstChild) {
        gameBoardContainer.removeChild(gameBoardContainer.firstChild)
    }
}

// this is used at the start of every turn to ensure there are still available spaces
const detectBoardFull = () => {
    let count = 0
    currentTokensOnBoard.forEach((element)=>{
        if (element.isOccupied === true) {
            count ++
        } 
    })
    return count
}

// this creates the layout after a game is initialized
const startGame = () => {
    
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
    let rules = document.createElement('button')
    turnCount = 0
    writeCurrentPlayer()
    turnHandler()
    
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
// this checks where the lowest open space is in the allowed collumn, and then changes the used selector div so the highlight can be removed for the token drop animation
    let currentPlayer = turnCount%2===0?secondPlayer:firstPlayer
    for (let i = 0; i < maxCheck; i++) {
         if (!currentTokensOnBoard[squareToCheck].isOccupied) {
            currentTokensOnBoard[squareToCheck].isOccupied = true
            currentTokensOnBoard[squareToCheck].controlledBy = currentPlayer
            document.getElementById(id).setAttribute('class', 'selected')
            document.querySelector('.selected').style.zIndex = '-10'
            clearSelectors()
            animateTokenPlacement(maxCheck - i)
            return
        } else {
            squareToCheck -= toSubtract
        }
        
    }

}


// when a turn starts, before location is selected
const startTurn = () => {
    if (detectBoardFull() === 42) {
        boardFull = true
        detectWin()
    }
    detectWin(true)
    turnCount++
    writeRounds()
    if ((turnCount)%2 === 0) {
        roundsToRotate--
    }
    
    
    writeCurrentPlayer()
    const color = turnCount%2===0?secondPlayer.color:firstPlayer.color
    const start = isOrientationNormal?2:3
    const row = isOrientationNormal?'2 / 9':'1 / 9'
    let id = 0
    for (i=start; i < 9; i++) {
        const selector = document.createElement('div')
        selector.classList.add('selector')
        selector.setAttribute('id', 'selector' + id)
        selector.style.zIndex = 20
        selector.style.gridColumn = i
        selector.style.gridRow = row

        const indicator = document.createElement('div')
        indicator.classList.add('indicator')
        indicator.style.backgroundColor = color
        selector.appendChild(indicator)

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
}

// this rearranges the currentTokensOnBoard array after tokens have to shift downwards
const fillBeneath = () => {
    clearGameBoard()
    for (let i = 41; i >= 0; i--) {
        if (currentTokensOnBoard[i].spacesBeneath > 0) {
            currentTokensOnBoard[i+(currentTokensOnBoard[i].spacesBeneath * columns())] = currentTokensOnBoard[i]
            currentTokensOnBoard[i+(currentTokensOnBoard[i].spacesBeneath * columns())].spacesBeneath = 0
            currentTokensOnBoard[i] = {isOccupied: false, controlledBy: null, spacesBeneath: 0, remove: false}
        }
    }
    drawGameBoard()
    turnHandlerPosition = 1
    turnHandler()
}

// this checks if tokens can be dropped downwards
const checkBeneath = () => {
    let dropDetected = false
    for (let i = 0; i < 42; i++) {
        if (currentTokensOnBoard[i].isOccupied === true) {
            for (let c = i + columns(); c < 42; c = c + columns()) {
                if (currentTokensOnBoard[c].isOccupied === false) {
                    currentTokensOnBoard[i].spacesBeneath += 1
                    dropDetected = true
                }
            }
        }
    }
    if (dropDetected === true) {
            animationForCheckBeneath()
    } else {
        turnHandlerPosition = 4
        turnHandler()
    }
}

// the math here is complicated, but is used when the board rotates to know which tokens should be reassigned to which locations
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
    currentTokensOnBoard = newArr   
}


// this rotates the gameboard container and calls the function above when the board rotates
const rotate = (direction) => {
    const deg = direction === 'cw'?90:-90
    isOrientationNormal = !isOrientationNormal
        refreshTokenArr(deg)
        clearGameBoard()
        gameBoardContainer.style.transform = "rotate(0deg)"
        drawGameBoard()
        turnHandlerPosition = 2
        turnHandler()
}

const writeRounds = () => {
    const rounds = document.getElementById('round-to-turn')
    rounds.innerText = roundsToRotate
}
const writeCurrentPlayer = () => {
    let curPlayer = turnCount%2 === 0?secondPlayer:firstPlayer
    document.getElementById('current-turn').innerText = curPlayer.name
    document.getElementById('current-turn').style.color = curPlayer.color 
}

// this announces a rotation with a popup and determines which direction to rotate
const rotateHandler = () => {
    let direction = Math.floor(Math.random()*2)===1?'cw':'ccw'
    let mask = document.createElement('div')
    mask.classList.add('playfield-mask')
    body.appendChild(mask)
    let rotatePopUp = document.createElement('div')
    rotatePopUp.classList.add('popup')
    rotatePopUp.innerHTML = `Board is Rotating!<span id="rotation-direction">But Which Direction?</span>`
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
        },2000)
    },1000)
    

    setTimeout(()=>{
        document.querySelector('.popup').remove()
        document.querySelector('.playfield-mask').remove()
        animationForRotation(direction)
        roundsToRotate = 3
               
    },5000)
       
    
}

// this is used to remove the highlight effect
const clearSelectors = () => {
    const divsToClear = document.querySelectorAll('.selector')
    for (i = 0; i < divsToClear.length; i++){
        document.querySelector('.selector').remove()
    }
}

// this merely checks the rounds and if its time to rotate
const checkRotate = () => {
    if (roundsToRotate === 0) {
        writeRounds()
        rotateHandler()   
    } else {
        turnHandlerPosition = 6
        turnHandler() 
    }
}

// this is the backbone for what functions need to run throughout a turn and porevents animations from overlapping
const turnHandler = () => {
    switch (turnHandlerPosition) {
        case 1:
            detectScore()
            break;
        case 2:
            checkBeneath()
            break;
        // case 3:
        //     fillBeneath()
        //     break;
        case 4:
            detectWin()
            break;    
        case 5:
            checkRotate()
            break;
        case 6:
            startTurn()
            break;
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
    } ,1500)
}

// /////////////////
// animation for the coin flip to see who goes first, and setting various variables based on the result
let imageValue = 0

const getImage = () => {
    const image = document.getElementById('coin')
    imageValue === 35? imageValue = 0: imageValue = imageValue
    const toLoad = imageArr[imageValue]
    image.src='./coin-flip-red-yellow/'+toLoad+'.png'
    imageValue++
}

const pickFirstPlayerAnimation = () => {
    imageValue = 0
    let endTime = Math.floor(Math.random() * 2) === 1?2130: 1635
    let timerFast = setInterval(getImage, 10)
    setTimeout(() => {
        clearInterval(timerFast)
        let timerMed = setInterval(getImage, 20)
        setTimeout(() => {
            clearInterval(timerMed)
            let timerSlow = setInterval(getImage, 30)
            setTimeout(() => {
                clearInterval(timerSlow)
                },endTime)
        },1400)

    },1400)
    if (endTime === 2130) {
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
    let displayWinner = setTimeout(displayFirstPlayer, 4000 + endTime)
}


const assignColor = (event) => {
    player1ColorChoice = colors[event.srcElement.getAttribute('data-color')]
    player2ColorChoice = player1ColorChoice === colors.color1?colors.color2:colors.color1
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
// //////////////////////////////////////////
const selectGameMode = () => {
    document.getElementById('start-button').remove()
    gameBoardContainer.innerHTML = `<div class="game-select">How many points to win?</div>
    <div class="game-select-buttons"><button type="button" class="point-button" onclick="pickColor(200)">200</button><button type="button" class="point-button" onclick="pickColor(500)">500</button><button type="button" class="point-button" onclick="pickColor(1000)">1000</button></div>`
}

const pickColor = (pointsToEnd) => {
    winningScore = pointsToEnd
    gameBoardContainer.innerHTML = ''
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


// used to reset the game after a game ends
const resetGame = () => {
    player1Score = 0
    player2Score = 0
    turnCount = 0
    roundsToRotate = 3
    boardFull = false
    turnHandlerPosition = 6
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

const closePopUp = () => {
    document.querySelector('.playfield-mask').remove()
    document.querySelector('.popup').remove()
}

const displayRules = () => {
    let mask = document.createElement('div')
    mask.classList.add('playfield-mask')
    body.appendChild(mask)
    let rulesPopUp = document.createElement('div')
    rulesPopUp.classList.add('popup')
    rulesPopUp.classList.add('rules-popup')
    rulesPopUp.addEventListener('click', closePopUp)
    rulesPopUp.innerHTML=`<span id="close-rules">(click anywhere to close)</span><h1>How to Play</h1><h1>Connect Between 3 & 5</h1><h3>[Chaos Edition]</h3><p>In this legally distinct twist on the classic game 4-in-a-Row, players take turns placing different color tokens on the game board in order to score points.</p><p>After Player 1 picks their color, a coin toss will decide which player goes first. When it is your turn, click anywhere along a single column to place your token in lowest available spot. If your token creates a straight line vertically, horizontally, or diagonally of at least between 3 & 5 touching tokens of the same color, the player who controls that color will be awarded 100 points (plus an extra 25 points for each additional same colored token that makes that line). Be warened, however, that the tokens will then be removed from the gameboard causing any tokens above them to fall, which could earn even more points, even for the other player.</p><p>Oh, and did we mention that after every third round the board will rotate 90 degrees in a random direction? Because, that's pretty important!</p><p>The first player to reach the number of points selected at the game's start (200, 500, or 1000) wins!</p><h2>Good Luck!</h2>`
    body.appendChild(rulesPopUp)
    
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

// animation for score detection:
const animationForScoreDetection = () => {
    // clearSelectors()    
    let blink = setInterval(() => {
        for (let i = 0; i < 42; i++){
            if (currentTokensOnBoard[i].remove === true) {
                let thisSpace = document.getElementById(`space${i}`)
                let orginalColor = currentTokensOnBoard[i].controlledBy.color
                if (thisSpace.style.backgroundColor != colors.color3) {
                    thisSpace.style.backgroundColor = colors.color3
                } else {
                    thisSpace.style.backgroundColor = orginalColor
                }
            }
        }
    },300)
    setTimeout(() => {
        scoring = false
        clearInterval(blink)
        score()
    },3000)
}


// animation for rotating the game board
animationForRotation = (direction) => {
    // clearSelectors()
    let moveModifier = direction === 'cw'?1:-1
    let position = .5
    let frameInterval = 10
    let rotateAnimation = setInterval(() => {
        if (position <= 90) {
            gameBoardContainer.style.transform = "rotate("+position * moveModifier+"deg)"
            position += .5
        }  
    },frameInterval)
    setTimeout(() => {
        clearInterval(rotateAnimation)
        rotate(direction)
        
    }, 2000)
}

// animation for moving pieces after check beneath
const animationForCheckBeneath = () => {
    const frameInterval = 15
    let maxSpacesBeneath = 0
    let moving = []
    for (let i = 0; i < 42; i++){
        if (currentTokensOnBoard[i].spacesBeneath > 0) {
            let thisId = `space${i}`
            let thisMaxMove = currentTokensOnBoard[i].spacesBeneath
            moving.push({id: thisId, move: 1, maxMove: thisMaxMove})
            if(currentTokensOnBoard[i].spacesBeneath > maxSpacesBeneath) {
                maxSpacesBeneath = currentTokensOnBoard[i].spacesBeneath
            }
        }
    }    
    let dropping = setInterval(() => {
        for (let t = 0; t < moving.length; t++) {
            let thisSpace = document.getElementById(moving[t].id)
            if (moving[t].move < 9 * moving[t].maxMove)  {
                thisSpace.style.top = moving[t].move + 'vh'
                moving[t].move += .5
            }
        }
    },frameInterval)
    setTimeout(()=>{
        clearInterval(dropping)
        fillBeneath()
    },((maxSpacesBeneath * (frameInterval * 20)) + 500))   
}


// animation for selecting a place to drop

const animateTokenPlacement = (spaces) => {
    let token = document.querySelector('.selected').firstChild
    let frameInterval = 15
    let move = .5
    let maxMove = spaces * 18
    let dropping = setInterval(()=>{
        token.style.top = move + 'vh'
        move += .5
    },frameInterval) 
    setTimeout(()=>{
        clearInterval(dropping)
        document.querySelector('.selected').remove()
        clearGameBoard()
        drawGameBoard()
        turnHandlerPosition = 1
        turnHandler()
    },maxMove * frameInterval) 
}