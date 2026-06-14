import { Scene, Vector, Color, Font, FontUnit, Label, TextAlign, Keys } from 'excalibur'

export class GameOverScene extends Scene {

    #finalScore = 0

    onInitialize(engine) {
        this.backgroundColor = Color.fromHex('#2d0a0a')
    }

    onActivate(ctx) {
        this.#finalScore = ctx?.data?.score ?? 0
        const prev = parseInt(localStorage.getItem('highscore') ?? '0')
        if (this.#finalScore > prev) {
            localStorage.setItem('highscore', String(this.#finalScore))
        }
        this.clear()
        this.buildUI(this.engine)
    }

    buildUI(engine) {
        if (!engine) return
        const cx = engine.drawWidth  / 2
        const cy = engine.drawHeight / 2

        const mk = (text, y, size, color) => new Label({
            text,
            pos:  new Vector(cx, y),
            font: new Font({ size, unit: FontUnit.Px, color, textAlign: TextAlign.Center }),
        })

        this.add(mk('VERLOREN, BEETJE JAMMER DIT',                         cy - 110, 64, Color.fromHex('#FF4444')))
        this.add(mk(`Score: ${this.#finalScore}`,        cy - 10,  32, Color.White))
        this.add(mk(`Highscore: ${localStorage.getItem('highscore') ?? 0}`, cy + 40, 24, Color.fromHex('#FFD700')))
        this.add(mk('Klik op ENTER om terug te gaan naar het menu',     cy + 120, 26, Color.White))
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene('start')
        }
    }
}
