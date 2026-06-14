import { Actor, CollisionType, Vector, Color, GraphicsGroup, Sprite } from 'excalibur'
import { Resources } from '../resources.js'

export class Platform extends Actor {

    #isGround

    constructor(x, y, width, height, isGround = true) {
        super({
            pos:           new Vector(x, y),
            width:         width,
            height:        height,
            collisionType: CollisionType.Fixed,
            z:             1,
            anchor:        new Vector(0, 0),
        })
        this.#isGround = isGround
    }

    onInitialize(engine) {
        this.buildGraphics()
    }

    buildGraphics() {
        const TILE = 48
        const cols = Math.ceil(this.width  / TILE)
        const rows = Math.ceil(this.height / TILE)

        const members = []
        const source  = this.#isGround ? Resources.Ground : Resources.Platform

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                members.push({
                    graphic: source.toSprite(),
                    offset:  new Vector(col * TILE, row * TILE),
                })
            }
        }

        const group = new GraphicsGroup({ members })
        this.graphics.use(group)
    }
}
