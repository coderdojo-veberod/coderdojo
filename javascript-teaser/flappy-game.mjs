import {Box, startGame, canvasHeight, dice} from './coderdojo-game-0.1.mjs'

let holeMargin = 50
let holeSize = 150
let holePosition

let upperBox = new Box({
    x: -50, 
    dx: -5, 
    beforeUpdate: (state) => {
        if (upperBox.x <= -upperBox.width) {
            holePosition = dice(holeMargin, canvasHeight - holeSize - holeMargin)
            upperBox.x = state.canvasWidth
            upperBox.height = holePosition

            lowerBox.x = state.canvasWidth
            lowerBox.y = holePosition + holeSize
            lowerBox.height = state.canvasHeight - lowerBox.y
        }
    }
})

let lowerBox = new Box({
    x: -50, 
    dx: -5, 
})

let bird = new Box({
    color: 'blue',
    x: 100,
    y: 100,
    beforeUpdate: (state) => {
        bird.dy = state.isSpacePressed? -3 : 3

        if (bird.hits(lowerBox) || bird.hits(upperBox)) {
            state.isGameOver = true
        }

        if (bird.y < 0) {
            bird.y = 0
        }

        if (bird.y + bird.height > canvasHeight) {
            bird.y = canvasHeight - bird.height
        }
    }
})

startGame([bird, upperBox, lowerBox])
