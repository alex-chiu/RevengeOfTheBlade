/*  PRELOAD SCENE

    Preloads all the animations for the game.
*/

class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        // Load all hero spritesheets
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm', 'assets/sprites/ranged-attack/hero-attack2-arm-sprite.png', { frameWidth: 145, frameHeight: 230 });
        this.load.spritesheet('hero_walk_no_arm', 'assets/sprites/ranged-attack/hero-walk-sprite-noarm.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm_final', 'assets/sprites/ranged-attack/attack2-throw.png', { frameWidth: 220, frameHeight: 230 });

        // Load all enemy spritesheets
        // Stage 1
        this.load.spritesheet('raptor', 'assets/sprites/velociraptor.png', { frameWidth: 390, frameHeight: 195 });

        // Stage 5
        this.load.spritesheet('enemy1', 'assets/sprites/robot1.png', { frameWidth: 167, frameHeight: 280 });
        this.load.spritesheet('enemy2', 'assets/sprites/robot2.png', { frameWidth: 133, frameHeight: 195 });
        this.load.spritesheet('enemy3', 'assets/sprites/drone.png', { frameWidth: 110, frameHeight: 75 });
        this.load.spritesheet('robotBoss', 'assets/sprites/robot-boss-sprite.png', { frameWidth: 390, frameHeight: 500 });
    }

    create() {
        console.log("PRELOADING ASSETS");

        // Player Animations
        this.createPlayerAnims();

        // Stage 1 Animations
        this.createRaptorAnims();

        // Stage 5 Animations
        this.createEnemy1Anims();
        this.createEnemy2Anims();
        this.createEnemy3Anims();
        this.createBossAnims();

        this.scene.stop('Preload');
        this.scene.start('Menu');
    }

    // Creates player animations
    createPlayerAnims() {
        // Player default movement
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'hero', frame: 14 } ],
            frameRate: 10
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 15, end: 20 }),
            frameRate: 10,
            repeat: -1
        });

        // Player pre-melee attack
        this.anims.create({
            key: 'preMeleeAtkL',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 7 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'preMeleeAtkR',
            frames: this.anims.generateFrameNumbers('hero', { start: 21, end: 28 }),
            frameRate: 32,
            repeat: 0
        });

        // Player melee attack
        this.anims.create({
            key: 'playerMeleeAtkL',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'playerMeleeAtkR',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: 0
        });

        // Player no arm movement
        this.anims.create({
            key: 'leftNoArm',
            frames: this.anims.generateFrameNumbers('hero_walk_no_arm', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'leftStatic',
            frames: [ { key: 'hero_walk_no_arm', frame: 3 } ],
            freamRate: 10
        })
        this.anims.create({
            key: 'turnNoArm',
            frames: [ { key: 'hero_walk_no_arm', frame: 6 } ],
            frameRate: 10
        });
        this.anims.create({
            key: 'rightNoArm',
            frames: this.anims.generateFrameNumbers('hero_walk_no_arm', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'rightStatic',
            frames: [ { key: 'hero_walk_no_arm', frame: 9 } ],
            freamRate: 10
        })

        // Arm pre-ranged attack
        this.anims.create({
            key: 'preRangedAtk',
            frames: this.anims.generateFrameNumbers('hero_ranged_attack_arm', { start: 0, end: 13 }),
            frameRate: 50,
            repeat: 0
        });

        // Arm final ranged attack frame
        this.anims.create({
           key: 'playerRangedAtkL',
           frames: [ { key: 'hero_ranged_attack_arm_final', frame: 0 } ],
           frameRate: 5,
           repeat: -1
        });
        this.anims.create({
            key: 'playerRangedAtkR',
            frames: [ { key: 'hero_ranged_attack_arm_final', frame: 1 } ],
            frameRate: 5,
            repeat: -1
         });
    }

    // Creates stage 1 animations
    createRaptorAnims() {
        this.anims.create({
            key: 'raptorLeft',
            frames: this.anims.generateFrameNumbers('raptor', { start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'raptorRight',
            frames: this.anims.generateFrameNumbers('raptor', { start: 7, end: 13}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'raptorStatic',
            frames: [ { key: 'raptor', frame: 6 } ],
            frameRate: 10,
            repeat: -1
        })
    }

    // Creates enemy animations
    createEnemy1Anims() {
        // Create Enemy Animations
        this.anims.create({
            key:'enemy1LeftAtk',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'enemy1RightAtk',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 3, end: 4}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'enemy1Default',
            frames: [ { key: 'enemy1', frame: 2 } ],
            frameRate: 10,
            repeat: -1
        });
    }

    createEnemy2Anims() {
        this.anims.create({
            key:'enemy2LeftAtk',
            frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'enemy2RightAtk',
            frames: this.anims.generateFrameNumbers('enemy2', { start: 3, end: 4}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'enemy2Default',
            frames: [ { key: 'enemy2', frame: 2 } ],
            frameRate: 10,
            repeat: -1
        });
    }

    // flying enemy [no specific orientation]
    createEnemy3Anims() {
        this.anims.create({
            key:'enemy3Default',
            frames: this.anims.generateFrameNumbers('enemy3', { start: 0, end: 3}),
            frameRate: 10,
            repeat: 1
        });
    }

    createBossAnims() {
        // Create Boss Animations
        this.anims.create({
            key:'bossLeftAtk',
            frames: this.anims.generateFrameNumbers('robotBoss', { start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'bossRightAtk',
            frames: this.anims.generateFrameNumbers('robotBoss', { start: 4, end: 6}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'bossDefault',
            frames: [ { key: 'robotBoss', frame: 3 } ],
            frameRate: 10,
            repeat: -1
        });
    }
}
