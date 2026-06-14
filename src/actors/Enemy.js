import { CollisionType, Vector, Animation, SpriteSheet, range } from 'excalibur'
import { Creature } from './Creature.js'

export class Enemy extends Creature {

    #patrolSpeed
    #patrolDistance
    #startX
    #direction = 1
    #initialized = false

    constructor(config, health, patrolSpeed, patrolDistance) {
        super({
            ...config,
            collisionType: CollisionType.Active,
            z: 5,
        }, health)

        this.#patrolSpeed    = patrolSpeed
        this.#patrolDistance = patrolDistance
    }

    onInitialize(engine) {
        this.#startX      = this.pos.x
        this.#initialized = true
        this.vel.x        = this.#patrolSpeed * this.#direction
        this.setupSprite()
    }

    setupSprite() {}

    onPreUpdate(engine) {
        if (!this.#initialized) return
        this.patrol()
        this.flipSprite()
    }

    patrol() {
        const dist = this.pos.x - this.#startX

        if (dist >  this.#patrolDistance) this.#direction = -1
        if (dist < -this.#patrolDistance) this.#direction =  1

        this.vel.x = this.#patrolSpeed * this.#direction
    }

    flipSprite() {
        this.graphics.flipHorizontal = this.#direction < 0
    }

    die() {
        this.body.collisionType = CollisionType.PreventCollision
        this.graphics.opacity   = 0.3
        setTimeout(() => this.kill(), 250)
    }

    onDeath() {
        this.die()
    }
}
