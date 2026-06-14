import { Scene, Vector, Color, Font, FontUnit, Label, TextAlign, Keys } from 'excalibur'

export class StartScene extends Scene {

    #highscoreLabel = null

    onInitialize(engine) {
        this.backgroundColor = Color.fromHex('#1a1a2e')
        this.buildUI(engine)
    }

    onActivate(ctx) {
        const hs = ctx?.data?.highscore
        if (hs != null) {
            const prev = parseInt(localStorage.getItem('highscore') ?? '0')
            if (hs > prev) localStorage.setItem('highscore', String(hs))
        }
        if (this.#highscoreLabel) {
            this.#highscoreLabel.text = `Highscore: ${localStorage.getItem('highscore') ?? 0}`
        }
    }

    buildUI(engine) {
        const cx = engine.drawWidth  / 2
        const cy = engine.drawHeight / 2

        const makeLabel = (text, x, y, size, color) => new Label({
            text,
            pos:  new Vector(x, y),
            font: new Font({ size, unit: FontUnit.Px, color, textAlign: TextAlign.Center }),
        })

        this.add(makeLabel('PLATFORMER PROGRAMMEREN 4', cx, cy - 130, 52, Color.fromHex('#FFD700')))
        this.add(makeLabel('ZIEKE CYPERPUNK GAME', cx, cy - 70, 20, Color.fromHex('#cccccc')))

        this.#highscoreLabel = makeLabel(
            `Highscore: ${localStorage.getItem('highscore') ?? 0}`,
            cx, cy - 10, 24, Color.fromHex('#88EEFF')
        )
        this.add(this.#highscoreLabel)

        this.add(makeLabel('Press ENTER to start', cx, cy + 70, 30, Color.White))
        this.add(makeLabel(
            '← → / A D  Bewegen       ↑ / W / Space  springen',
            cx, cy + 140, 17, Color.fromHex('#aaaaaa')
        ))
        this.add(makeLabel(
            'Kill enemies door op ze te springen met je voetjesss',
            cx, cy + 170, 15, Color.fromHex('#888888')
        ))
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene('level1')
        }
    }
}
