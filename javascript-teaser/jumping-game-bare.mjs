import {Box, startGame} from './coderdojo-game-0.1.mjs'

let sky = new Box({color: 'lightblue', x: 0, y: 0, width: 640, height: 250})

let sun = new Box({color: 'yellow', x: 500, y: 50, width: 50, height: 50})

let ground = new Box({x: 0, y: 250, width: 640, height: 150})

let player = new Box({
    color: 'blue',
    x: 100, 
    y: 200,
    height: 150,
    gravity: 0.5,
    ground: 200,
    beforeUpdate: (state) => {
        if (state.isSpacePressed) {
            player.jump(15)
        }
        
        if (player.hits(obstacle)) {
            state.isGameOver = true
        }
    }
})

let obstacle = new Box({
    color: 'orange',
    x: -50, 
    y: 300, 
    height: 50, 
    dx: -5, 
    beforeUpdate: (state) => {
        if (obstacle.x < -obstacle.width) {
            obstacle.x = state.canvasWidth
        }
    }
})

startGame([ground, sky, sun, player, obstacle])