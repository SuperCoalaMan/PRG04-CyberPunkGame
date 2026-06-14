import { Color } from 'excalibur'
import { LevelScene } from './LevelScene.js'
import { Platform } from '../actors/Platform.js'
import { Coin } from '../actors/Coin.js'
import { Slime } from '../actors/Slime.js'
import { Bat } from '../actors/Bat.js'
import { Goal } from '../actors/Goal.js'
import { Background } from '../actors/Background.js'

export class Level1Scene extends LevelScene {

    onInitialize(engine) {
        this.backgroundColor = Color.fromHex('#5c94fc')
        this.setupLevel(100, 460, 3200)
    }

    buildWorld(engine) {
        const actors = []
        actors.push(...this.buildBackground())
        actors.push(...this.buildPlatforms())
        actors.push(...this.buildCoins())
        actors.push(...this.buildEnemies())
        actors.push(...this.buildGoal())

        for (const actor of actors) this.add(actor)
        return actors
    }

    buildBackground() {
        return [new Background(3200)]
    }

    buildPlatforms() {
        return [
            new Platform(0, 520, 3200, 80, true),

            new Platform(280,  400, 180, 20, false),
            new Platform(520,  330, 160, 20, false),
            new Platform(760,  400, 200, 20, false),
            new Platform(1020, 310, 180, 20, false),
            new Platform(1280, 380, 200, 20, false),
            new Platform(1540, 340, 200, 20, false),
            new Platform(1800, 260, 180, 20, false),
            new Platform(2060, 360, 200, 20, false),
            new Platform(2320, 290, 200, 20, false),
            new Platform(2560, 380, 220, 20, false),
            new Platform(2820, 310, 200, 20, false),
        ]
    }

    buildCoins() {
        const coins = []
        const gCoins = [150, 250, 400, 650, 850, 1100, 1350, 1650, 1950, 2250, 2550, 2850]
        for (const x of gCoins) coins.push(new Coin(x, 492))

        coins.push(new Coin(350,  370))
        coins.push(new Coin(600,  300))
        coins.push(new Coin(840,  370))
        coins.push(new Coin(1100, 280))
        coins.push(new Coin(1870, 230))
        coins.push(new Coin(2390, 260))
        coins.push(new Coin(2630, 350))
        return coins
    }

    buildEnemies() {
        return [
            new Slime(500,  490),
            new Slime(900,  490),
            new Slime(1400, 490),
            new Slime(1900, 490),
            new Slime(2400, 490),
            new Slime(2900, 490),

            new Bat(700,  300),
            new Bat(1200, 270),
            new Bat(1750, 220),
            new Bat(2300, 250),
            new Bat(2750, 220),
        ]
    }

    buildGoal() {
        return [new Goal(3100, 480, () => this.handleLevelComplete(false))]
    }
}
