let canvas = document.getElementById('foo')
let ctx = canvas.getContext('2d')

export let canvasWidth = canvas.clientWidth
export let canvasHeight = canvas.clientHeight

export function dice(lower, upper) {
    return Math.floor(lower + (upper - lower) * Math.random())
}

function clear(color) {
    ctx.fillStyle = color || 'white'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

export function startGame(gameObjects) {
    let state = {
        canvasWidth: canvas.clientWidth,
        canvasHeight: canvas.clientHeight,
        startTime: Date.now(),
        isSpacePressed: false,
        isGameOver: false,
    }

    function render() {
        clear()

        for (let box of gameObjects) {
            box.render(state)
            box.update(state)
        }

        ctx.font = 'bold 20px fantasy'
        ctx.fillStyle = 'black'
        ctx.fillText(Math.floor((Date.now() - state.startTime)/100), 20, 40)

        if (!state.isGameOver) {
            window.requestAnimationFrame(render)
        }
    }

    window.addEventListener("keydown", event => {
        if (event.key == ' ') {
            state.isSpacePressed = true
        }
    });

    window.addEventListener("keyup", event => {
        if (event.key == ' ') {
            state.isSpacePressed = false
        }
    });

    window.requestAnimationFrame(render)
}

export class Box {
    constructor(params = {}) {
        this.x = params.x || 0
        this.y = params.y || 0
        this.width = params.width || 50
        this.height = params.height || 50
        this.dx = params.dx || 0
        this.dy = params.dy || 0
        this.gravity = params.gravity || 0
        this.ground = params.ground
        this.color = params.color || 'green'

        this.beforeUpdate = params.beforeUpdate || (() => {})
        this.afterUpdate = params.afterUpdate || (() => {})
    }

    jump(speed) {
        if (this.y == this.ground) {
            this.dy = -speed
        }
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update(state) {
        this.beforeUpdate(state)

        if (this.y < this.ground) {
            this.dy += this.gravity
        }
        
        this.x = this.x + this.dx
        this.y = this.y + this.dy

        if (this.ground !== undefined && this.y > this.ground) {
            this.y = this.ground
            this.dy = Math.max(0, this.dy)
        }

        this.afterUpdate(state)
    }

    hits(other) {
        return this.x < other.x + other.width
            && this.x + this.width > other.x
            && this.y < other.y + other.height
            && this.y + this.height > other.y
    }
}
