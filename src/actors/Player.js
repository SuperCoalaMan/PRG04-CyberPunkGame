import { CollisionType, Vector, Keys, Animation, SpriteSheet, range, Side } from 'excalibur'
import { Creature } from './Creature.js'
import { Resources } from '../resources.js'
import { Coin } from './Coin.js'
import { Enemy } from './Enemy.js'
import { Goal } from './Goal.js'

const SPEED       = 220
const JUMP_FORCE  = -650 
const LIVES_START = 3

export class Player extends Creature {

    #lives
    #score
    #isOnGround   = false
    #groundCount  = 0
    #isDead       = false

    #onLivesChanged
    #onScoreChanged
    #onGameOver

    constructor(x, y, callbacks) {
        super({
            pos:           new Vector(x, y),
            width:         38,
            height:        46,
            collisionType: CollisionType.Active,
            z:             10,
        }, 1)

        this.#lives          = LIVES_START
        this.#score          = 0
        this.#onLivesChanged = callbacks.onLivesChanged ?? (() => {})
        this.#onScoreChanged = callbacks.onScoreChanged ?? (() => {})
        this.#onGameOver     = callbacks.onGameOver     ?? (() => {})
    }

    get lives() { return this.#lives }
    get score() { return this.#score }

    onInitialize(engine) {
        this.setupSprite()
        this.on('collisionstart', (evt) => this.hitSomething(evt))
        this.on('collisionend',   (evt) => this.leftSomething(evt))
        this.#onLivesChanged(this.#lives)
        this.#onScoreChanged(this.#score)
    }

    setupSprite() {
        const walkSheet = SpriteSheet.fromImageSource({
            image:  Resources.PlayerWalk,
            grid: {
                spriteWidth:  48,
                spriteHeight: 48,
                rows:         2,
                columns:      4,
            }
        })
        const idleSheet = SpriteSheet.fromImageSource({
            image:  Resources.PlayerIdle,
            grid: {
                spriteWidth:  48,
                spriteHeight: 48,
                rows:         2,
                columns:      4,
            }
        })

        const walkAnim = Animation.fromSpriteSheet(walkSheet, range(0, 3), 100)
        const idleAnim = Animation.fromSpriteSheet(idleSheet, range(0, 3), 100)

        this.graphics.add('walk', walkAnim)
        this.graphics.add('jump', idleAnim)
        this.graphics.add('idle', idleAnim)
        this.graphics.use('idle')
    }

    onPreUpdate(engine) {
        if (this.#isDead) return
        this.handleInput(engine)
        this.updateAnimation()
        this.checkFallOutOfWorld()
    }

    handleInput(engine) {
        const kb = engine.input.keyboard

        if (kb.isHeld(Keys.Left) || kb.isHeld(Keys.A)) {
            this.vel.x = -SPEED
            this.graphics.flipHorizontal = true
        } else if (kb.isHeld(Keys.Right) || kb.isHeld(Keys.D)) {
            this.vel.x = SPEED
            this.graphics.flipHorizontal = false
        } else {
            this.vel.x = 0
        }

        const jumpPressed = kb.wasPressed(Keys.Up)
                         || kb.wasPressed(Keys.W)
                         || kb.wasPressed(Keys.Space)
                         //this.#isOnGround

        if (jumpPressed ) {
            this.vel.y = JUMP_FORCE
            this.#isOnGround = false
            this.#groundCount = 0
        }
    }

    updateAnimation() {
        if (!this.#isOnGround) {
            this.graphics.use('idle')
        } else if (Math.abs(this.vel.x) > 10) {
            this.graphics.use('walk')
        } else {
            this.graphics.use('idle')
        }
    }

    checkFallOutOfWorld() {
        if (this.pos.y > 800) {
            this.loseLife()
        }
    }

    hitSomething(event) {
        const other = event.other.owner

        if (other instanceof Enemy) {
            this.handleEnemyCollision(other, event)
            return
        }

        if (other instanceof Coin) {
            this.collectCoin(other)
            return
        }

        if (other instanceof Goal) {
            return
        }

        if (event.side === Side.Bottom) {
            this.#groundCount++
            this.#isOnGround = true
        }
    }

    handleEnemyCollision(enemy, event) {
        if (this.#isDead) return

        const stomp = event.side === Side.Bottom

        if (stomp) {
            enemy.die()
            this.vel.y = -400
            this.addScore(200)
        } else {
            this.loseLife()
        }
    }

    leftSomething(event) {
        const other = event.other.owner

        if (other instanceof Enemy || other instanceof Coin || other instanceof Goal) {
            return
        }

        this.#groundCount = Math.max(0, this.#groundCount - 1)
        if (this.#groundCount === 0) {
            this.#isOnGround = false
        }
    }

    collectCoin(coin) {
        coin.collect()
        this.addScore(100)
    }

    addScore(points) {
        this.#score += points
        this.#onScoreChanged(this.#score)
    }

    loseLife() {
        if (this.#isDead) return
        this.#isDead = true

        this.#lives--
        this.#onLivesChanged(this.#lives)

        if (this.#lives <= 0) {
            this.#onGameOver(this.#score)
        } else {
            this.vel = Vector.Zero
            this.graphics.opacity = 0.3
            setTimeout(() => {
                this.pos          = new Vector(100, 350)
                this.vel          = Vector.Zero
                this.#isOnGround  = false
                this.#groundCount = 0
                this.#isDead      = false
                this.graphics.opacity = 1.0
                this.startInvincibility(1500)
            }, 600)
        }
    }

    onDamaged() {
        this.graphics.opacity = 0.4
        setTimeout(() => { this.graphics.opacity = 1.0 }, 800)
    }
}
