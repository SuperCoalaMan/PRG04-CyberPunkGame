import { Actor, CollisionType, Vector, Animation, SpriteSheet, range } from 'excalibur'
import { Resources } from '../resources.js'

export class Coin extends Actor {

    #collected = false

    constructor(x, y) {
        super({
            pos:           new Vector(x, y),
            width:         24,
            height:        24,
            collisionType: CollisionType.Passive,
            z:             3,
        })
    }

    onInitialize(engine) {
        const sheet = SpriteSheet.fromImageSource({
            image: Resources.Coin,
            grid: {
                spriteWidth:  24,
                spriteHeight: 24,
                rows:         1,
                columns:      6,
            }
        })
        const spinAnim = Animation.fromSpriteSheet(sheet, range(0, 5), 80)
        this.graphics.add('spin', spinAnim)
        this.graphics.use('spin')
    }

    collect() {
        if (this.#collected) return
        this.#collected = true
        this.graphics.opacity = 0
        setTimeout(() => this.kill(), 100)
    }
}
