import { Scene, Vector } from 'excalibur'
import { Player } from '../actors/Player.js'
import { HUD } from '../ui/HUD.js'

export class LevelScene extends Scene {

    #player      = null
    #hud         = null
    #worldActors = []
    #carryScore  = 0
    #spawnX      = 100
    #spawnY      = 460
    #worldWidth  = 3200

    get player() { return this.#player }

    setupLevel(spawnX, spawnY, worldWidth = 3200) {
        this.#spawnX     = spawnX
        this.#spawnY     = spawnY
        this.#worldWidth = worldWidth
    }

    buildWorld(engine) {
        return []
    }

    onActivate(ctx) {
        this.#carryScore = ctx?.data?.score ?? 0
        this.resetLevel()
    }

    resetLevel() {
        const engine = this.engine

        this.#worldActors.forEach(actor => actor.kill())
        this.#worldActors = []

        if (this.#player) { this.#player.kill(); this.#player = null }
        if (this.#hud)    { this.#hud.kill();    this.#hud    = null }

        this.#worldActors = this.buildWorld(engine)
        this.spawnPlayerAndHUD()
    }

    spawnPlayerAndHUD() {
        this.#hud    = new HUD()
        this.#player = new Player(this.#spawnX, this.#spawnY, {
            onLivesChanged: (lives) => this.#hud.updateLives(lives),
            onScoreChanged: (score) => this.#hud.updateScore(score + this.#carryScore),
            onGameOver:     (score) => this.triggerGameOver(score + this.#carryScore),
        })

        this.add(this.#player)
        this.add(this.#hud)

        this.camera.strategy.lockToActor(this.#player)
        this.camera.strategy.limitCameraBounds({
            left:   0,
            right:  this.#worldWidth,
            top:    0,
            bottom: 800,
        })
    }

    triggerGameOver(finalScore) {
        const prev = parseInt(localStorage.getItem('highscore') ?? '0')
        if (finalScore > prev) localStorage.setItem('highscore', String(finalScore))

        this.engine.goToScene('gameover', {
            sceneActivationData: { score: finalScore }
        })
    }

    handleLevelComplete(isLastLevel) {
        const score = (this.#player?.score ?? 0) + this.#carryScore
        this.engine.goToScene('win', {
            sceneActivationData: { score, isLevel2: isLastLevel }
        })
    }
}
