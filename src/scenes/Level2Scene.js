import { Color } from 'excalibur'
import { LevelScene } from './LevelScene.js'
import { Platform } from '../actors/Platform.js'
import { Coin } from '../actors/Coin.js'
import { Slime } from '../actors/Slime.js'
import { Bat } from '../actors/Bat.js'
import { Goal } from '../actors/Goal.js'
import { Background } from '../actors/Background.js'

// Level 2 — night theme, more gaps, harder enemies
export class Level2Scene extends LevelScene {

    onInitialize(engine) {
        this.backgroundColor = Color.fromHex('#12122e')
        this.setupLevel(100, 460, 3300)
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
        return [new Background(3300)]
    }

    buildPlatforms() {
        return [
            new Platform(0,    520, 380,  80, true),
            new Platform(480,  520, 260,  80, true),
            new Platform(840,  520, 240,  80, true),
            new Platform(1180, 520, 320,  80, true),
            new Platform(1620, 520, 280,  80, true),
            new Platform(2010, 520, 380,  80, true),
            new Platform(2490, 520, 480,  80, true),
            new Platform(3080, 520, 300,  80, true),

            new Platform(240,  400, 140, 20, false),
            new Platform(440,  330, 120, 20, false),
            new Platform(660,  400, 140, 20, false),
            new Platform(900,  310, 130, 20, false),
            new Platform(1100, 380, 150, 20, false),
            new Platform(1360, 290, 140, 20, false),
            new Platform(1590, 360, 130, 20, false),
            new Platform(1830, 270, 140, 20, false),
            new Platform(2060, 350, 140, 20, false),
            new Platform(2310, 270, 150, 20, false),
            new Platform(2560, 360, 130, 20, false),
            new Platform(2820, 290, 140, 20, false),
        ]
    }

    buildCoins() {
        const coins = []
        const gCoins = [100, 200, 540, 700, 950, 1280, 1720, 2100, 2600, 2900, 3100]
        for (const x of gCoins) coins.push(new Coin(x, 492))

        coins.push(new Coin(290,  370))
        coins.push(new Coin(500,  300))
        coins.push(new Coin(730,  370))
        coins.push(new Coin(960,  280))
        coins.push(new Coin(1900, 240))
        coins.push(new Coin(2380, 240))
        coins.push(new Coin(2630, 330))
        return coins
    }

    buildEnemies() {
        return [
            new Bat(540,  490),
            new Bat(940,  490),
            new Bat(1300, 490),
            new Bat(1700, 490),
            new Bat(2100, 490),
            new Bat(2550, 490),
            new Bat(3090, 490),

            new Bat(380,  300),
            new Bat(750,  280),
            new Bat(1150, 250),
            new Bat(1600, 270),
            new Bat(2050, 250),
            new Bat(2520, 250),
            new Bat(2900, 250),
        ]
    }

    buildGoal() {
        return [new Goal(3200, 480, () => this.handleLevelComplete(true))]
    }
}
