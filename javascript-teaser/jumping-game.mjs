import {Box, startGame} from './coderdojo-game-0.1.mjs'

let sky = new Box({color: 'lightblue', x: 0, y: 0, width: 640, height: 250})

let sun = new Box({color: 'yellow', x: 500, y: 50, width: 50, height: 50})

let ground = new Box({x: 0, y: 250, width: 640, height: 150})

let cloud1 = new Box({
    color: 'white',
    x: -100, 
    y: 50, 
    width: 75, 
    height: 55,
    dx: -1,
    beforeUpdate: (state) => {
        if (cloud1.x < -cloud1.width) {
            cloud1.x = state.canvasWidth
        }
    }
})

let cloud2 = new Box({
    color: 'white',
    x: -100, 
    y: 125, 
    width: 100, 
    height: 25,
    dx: -1.2,
    beforeUpdate: (state) => {
        if (cloud2.x < -cloud2.width) {
            cloud2.x = state.canvasWidth
        }
    }
})

let tree = new Box({
    color: 'brown',
    x: 100, 
    y: 150, 
    width: 50, 
    height: 150,
    dx: -2,
    beforeUpdate: (state) => {
        if (tree.x < -treeCrown.width) {
            tree.x = state.canvasWidth
        }
    }
})

let treeCrown = new Box({
    color: 'darkgreen',
    x: 50, 
    y: 50, 
    width: 150, 
    height: 150,
    dx: -2,
    beforeUpdate: (state) => {
        if (treeCrown.x < -treeCrown.width) {
            treeCrown.x = state.canvasWidth
        }
    }
})

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
    dx: -5, 
    beforeUpdate: (state) => {
        if (obstacle.x < -obstacle.width) {
            obstacle.x = state.canvasWidth
        }
    }
})

startGame([ground, sky, sun, cloud1, cloud2, tree, treeCrown, player, obstacle])