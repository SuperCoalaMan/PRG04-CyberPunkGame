import { Actor, CollisionType, Vector } from 'excalibur'

export class Creature extends Actor {

    #maxHealth
    #health
    #isInvincible = false

    constructor(config, maxHealth) {
        super(config)
        this.#maxHealth = maxHealth
        this.#health    = maxHealth
    }

    get health() { return this.#health }
    get maxHealth() { return this.#maxHealth }
    get isAlive() { return this.#health > 0 }

    // Deal damage to this creature, with brief invincibility window
    takeDamage(amount) {
        if (this.#isInvincible) return

        this.#health = Math.max(0, this.#health - amount)
        this.onDamaged()

        if (this.#health <= 0) {
            this.onDeath()
        } else {
            this.startInvincibility(800)
        }
    }

    heal(amount) {
        this.#health = Math.min(this.#maxHealth, this.#health + amount)
    }

    // Short invincibility after getting hit (milliseconds)
    startInvincibility(duration) {
        this.#isInvincible = true
        setTimeout(() => { this.#isInvincible = false }, duration)
    }

    // Override in subclasses
    onDamaged() {}
    onDeath()   {}
}
