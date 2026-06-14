import { Vector, Animation, SpriteSheet, range, CollisionType } from 'excalibur'
import { Enemy } from './Enemy.js'
import { Resources } from '../resources.js'

export class Bat extends Enemy {

    constructor(x, y) {
        super({
            pos:    new Vector(x, y),
            width:  36,
            height: 28,
        }, 1, 130, 160)
    }

    onInitialize(engine) {
        this.body.useGravity = false
        super.onInitialize(engine)
    }

    setupSprite() {
        const sheet = SpriteSheet.fromImageSource({
            image: Resources.Bat,
            grid: {
                spriteWidth:  48,
                spriteHeight: 48,
                rows:         1,
                columns:      4,
            }
        })
        const flyAnim = Animation.fromSpriteSheet(sheet, range(0, 4), 100)
        this.graphics.add('fly', flyAnim)
        this.graphics.use('fly')
    }
}
