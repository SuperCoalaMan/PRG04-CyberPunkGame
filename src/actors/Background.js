import { Actor, CollisionType, Vector } from 'excalibur'
import { Resources } from '../resources.js'

export class Background extends Actor {

    constructor(levelWidth) {
        super({
            pos:           new Vector(levelWidth / 2, 300),
            width:         levelWidth,
            height:       1000,
            collisionType: CollisionType.PreventCollision,
            z:             -10,
            anchor:        new Vector(0.5, 0.5),
        })
    }

    onInitialize(engine) {
        // Tile the background sprite across the full level width
        const sprite = Resources.Background.toSprite()
        // Scale up to fill vertically
        sprite.scale = new Vector(
            this.width  / Resources.Background.width,
            this.height / Resources.Background.height,
        )
        this.graphics.use(sprite)
    }
}
