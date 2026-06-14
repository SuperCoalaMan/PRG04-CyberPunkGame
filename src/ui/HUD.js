import { ScreenElement, Vector, Color, Font, FontUnit, Label, CollisionType, FontStyle } from 'excalibur'

export class HUD extends ScreenElement {

    #scoreLabel = null
    #livesLabel = null

    constructor() {
        super({
            pos:           Vector.Zero,
            collisionType: CollisionType.PreventCollision,
            z:             100,
            anchor:        Vector.Zero,
        })
    }

    onInitialize(engine) {
        this.#scoreLabel = new Label({
            text:  'Score: 0',
            pos:   new Vector(16, 16),
            font:  new Font({
                size:   26,
                unit:   FontUnit.Px,
                color:  Color.White,
            }),
        })

        this.#livesLabel = new Label({
            text: '❤ ❤ ❤',
            pos:  new Vector(engine.drawWidth - 140, 16),
            font: new Font({
                size:  26,
                unit:  FontUnit.Px,
                color: Color.fromHex('#FF5555'),
            }),
        })

        this.addChild(this.#scoreLabel)
        this.addChild(this.#livesLabel)
    }

    updateScore(score) {
        if (this.#scoreLabel) this.#scoreLabel.text = `Score: ${score}`
    }

    updateLives(lives) {
        if (this.#livesLabel) {
            const hearts = Math.max(0, lives)
            this.#livesLabel.text = '❤ '.repeat(hearts).trim() || '💀'
        }
    }
}
