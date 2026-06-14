import { Actor, CollisionType, Vector, Color } from 'excalibur'

export class Goal extends Actor {

    #onReached
    #triggered = false
    #flag      = null

    constructor(x, y, onReached) {
        super({
            pos:           new Vector(x, y),
            width:         10,
            height:        80,
            collisionType: CollisionType.Passive,
            color:         Color.fromHex('#AAAAAA'),
            z:             2,
        })
        this.#onReached = onReached
    }

    onInitialize(engine) {
        this.#flag = new Actor({
            pos:    new Vector(this.pos.x + 20, this.pos.y - 28),
            width:  36,
            height: 24,
            color:  Color.fromHex('#FFD700'),
            z:      2,
        })
        engine.currentScene.add(this.#flag)

        this.on('collisionstart', (evt) => this.hitSomething(evt))
    }

    hitSomething(event) {
        if (this.#triggered) return
        if (event.other.owner?.constructor?.name === 'Player') {
            this.#triggered = true
            this.#onReached()
        }
    }

    kill() {
        if (this.#flag) {
            this.#flag.kill()
            this.#flag = null
        }
        super.kill()
    }
}
