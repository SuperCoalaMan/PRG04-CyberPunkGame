import { Scene, Vector, Color, Font, FontUnit, Label, TextAlign, Keys } from 'excalibur'

export class WinScene extends Scene {

    #score    = 0
    #isLevel2 = false

    onInitialize(engine) {
        this.backgroundColor = Color.fromHex('#0a2d0a')
    }

    onActivate(ctx) {
        this.#score    = ctx?.data?.score    ?? 0
        this.#isLevel2 = ctx?.data?.isLevel2 ?? false
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

        const title    = this.#isLevel2 ? 'JE HEBT GEWONNENNNNNNN!' : 'JE HEBT HET LEVEL GEHAAAAAAAALD!'
        const nextText = this.#isLevel2
            ? 'Klik op ENTER om terug te gaan naar het menu'
            : 'Klik op ENTER om naar level 2 te gaan'

        this.add(mk(title,                       cy - 110, 56, Color.fromHex('#44FF88')))
        this.add(mk(`Score: ${this.#score}`,      cy - 20,  32, Color.White))
        this.add(mk(nextText,                     cy + 80,  26, Color.White))
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            if (this.#isLevel2) {
                engine.goToScene('start', { sceneActivationData: { highscore: this.#score } })
            } else {
                engine.goToScene('level2', { sceneActivationData: { score: this.#score } })
            }
        }
    }
}
