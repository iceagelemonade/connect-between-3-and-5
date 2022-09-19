// this was to test layout
// let degreesToRotate = 0
// const rotate = (degrees) => {
//     degreesToRotate += degrees
//     document.querySelector('.gameboard-container').style.transform="rotate("+degreesToRotate+"deg)"
    
// }
const gameBoardContainer = document.querySelector('.gameboard-container')

const startGame = () => {
    document.getElementById('start-button').remove()
    drawGameBoard()
}
// Below is the function that draws the gameboard after the game begins
const drawGameBoard = () => {
    // const cover = document.createElement('div')
    // cover.classList.add('tester')
    // gameBoardContainer.appendChild(cover)
    for (i = 0; i < 42; i++) {
        const newSquare = document.createElement('div')
        newSquare.classList.add('gameboard-space')
        newSquare.setAttribute('id', 'space'+i)
        gameBoardContainer.appendChild(newSquare)
    }
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