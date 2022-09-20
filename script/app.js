// this was to test layout
// let degreesToRotate = 0
// const rotate = (degrees) => {
//     degreesToRotate += degrees
//     document.querySelector('.gameboard-container').style.transform="rotate("+degreesToRotate+"deg)"
    
// }
const gameBoardContainer = document.querySelector('.gameboard-container')
let isOrientationNormal = true

const startGame = () => {
    document.getElementById('start-button').remove()
    drawGameBoard()
}

// when a turn starts, before location is selected
const startTurn = () => {
    const start = isOrientationNormal?0:1
    for (i=start; i < 7; i++) {
        const selector = document.createElement('div')
        selector.classList.add('selector')
        selector.setAttribute('id', 'selector'+i)
        gameBoardContainer.appendChild(selector)
        isOrientationNormal?undefined:selector.style.gridRow='1 / 9'
    }
}

// Below is the function that draws the gameboard after the game begins
const drawGameBoard = () => {
    // const cover = document.createElement('div')
    // cover.classList.add('tester')
    // gameBoardContainer.appendChild(cover)
    for (i = 0; i < 42; i++) {
        let prefix = isOrientationNormal?'':'rotated-'
        const newSquare = document.createElement('div')
        const newSquareOverlay = document.createElement('div')
        newSquare.classList.add('gameboard-space')
        newSquareOverlay.classList.add('overlay')
        newSquare.setAttribute('id', prefix+'space'+i)
        newSquareOverlay.setAttribute('id', prefix+'space'+i)
        gameBoardContainer.appendChild(newSquare)
        gameBoardContainer.appendChild(newSquareOverlay)
    }
    // remove after testing is done
    startTurn()
    // testing shading
    const shadow = document.createElement('div')
    shadow.classList.add('shadow')
    gameBoardContainer.appendChild(shadow)
}

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