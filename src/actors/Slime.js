import { Vector, Animation, SpriteSheet, range } from 'excalibur'
import { Enemy } from './Enemy.js'
import { Resources } from '../resources.js'

export class Slime extends Enemy {

    constructor(x, y) {
        super({
            pos:    new Vector(x, y),
            width:  40,
            height: 36,
        }, 1, 80, 120)
    }

    setupSprite() {
        const sheet = SpriteSheet.fromImageSource({
            image: Resources.Slime,
            grid: {
                spriteWidth:  48,
                spriteHeight: 48,
                rows:         1,
                columns:      3,
            }
        })
        const walkAnim = Animation.fromSpriteSheet(sheet, range(0, 3), 100)
        this.graphics.add('walk', walkAnim)
        this.graphics.use('walk')
    }
}
