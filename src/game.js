import { Engine, DisplayMode, SolverStrategy, Vector, Color } from 'excalibur'
import { ResourceLoader } from './resources.js'
import { StartScene } from './scenes/StartScene.js'
import { Level1Scene } from './scenes/Level1Scene.js'
import { Level2Scene } from './scenes/Level2Scene.js'
import { GameOverScene } from './scenes/GameOverScene.js'
import { WinScene } from './scenes/WinScene.js'

export class Game extends Engine {

    constructor() {
        super({
            width:       1280,
            height:      600,
            maxFps:      60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver:  SolverStrategy.Arcade,
                gravity: new Vector(0, 1200),
            },
            backgroundColor: Color.fromHex('#1a1a2e'),
        })

        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        // Register all scenes
        this.addScene('start',    new StartScene())
        this.addScene('level1',   new Level1Scene())
        this.addScene('level2',   new Level2Scene())
        this.addScene('gameover', new GameOverScene())
        this.addScene('win',      new WinScene())
        
        this.goToScene('start')
    }
}

new Game()
