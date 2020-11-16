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
        this.load.spritesheet('ptero', 'assets/sprites/pterodactyl.png', { frameWidth: 312, frameHeight: 250 });
        this.load.spritesheet('trex', 'assets/sprites/trex.png', { frameWidth: 470, frameHeight: 245 });

        // Stage 4
        this.load.spritesheet('police', 'assets/sprites/police.png', { frameWidth: 110, frameHeight: 150 });
        this.load.spritesheet('car', 'assets/sprites/policecar.png', { frameWidth: 365, frameHeight: 120 });
        this.load.spritesheet('politician', 'assets/sprites/politician.png', { frameWidth: 105, frameHeight: 150 });
        this.load.spritesheet('helicopter', 'assets/sprites/helicopter.png', { frameWidth: 320, frameHeight: 123 });
        this.load.spritesheet('tank', 'assets/sprites/tank.png', { frameWidth: 353, frameHeight: 125 });


        // Stage 5
        this.load.spritesheet('enemy1', 'assets/sprites/robot1.png', { frameWidth: 167, frameHeight: 280 });
        this.load.spritesheet('enemy2', 'assets/sprites/robot2.png', { frameWidth: 133, frameHeight: 195 });
        this.load.spritesheet('drone', 'assets/sprites/drone.png', { frameWidth: 110, frameHeight: 75 });
        this.load.spritesheet('robotBoss', 'assets/sprites/robot-boss-sprite.png', { frameWidth: 390, frameHeight: 500 });
    }

    create() {
        console.log("PRELOADING ASSETS");

        // Player Animations
        this.createPlayerAnims();

        // Stage 1 Animations
        this.createRaptorAnims();
        this.createPteroAnims();
        this.createTRexAnims();
        this.createPteroAnims();

        // Stage 4 Animations
        this.createPoliceAnims();
        this.createCarAnims();
        this.createPoliticianAnims();
        this.createHelicopterAnims();
        this.createTankAnims();

        // Stage 5 Animations
        this.createEnemy1Anims();
        this.createEnemy2Anims();
        this.createDroneAnims();
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

    createPteroAnims() {
        this.anims.create({
            key: 'pteroLeft',
            frames: this.anims.generateFrameNumbers('ptero', { start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'pteroRight',
            frames: this.anims.generateFrameNumbers('ptero', { start: 7, end: 13}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'pteroStatic',
            frames: [ { key: 'ptero', frame: 6 } ],
            frameRate: 10,
            repeat: -1
        })
    }

    createTRexAnims() {
        this.anims.create({
            key: 'trexLeft',
            frames: this.anims.generateFrameNumbers('trex', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'trexRight',
            frames: this.anims.generateFrameNumbers('trex', { start: 8, end: 15}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'trexStatic',
            frames: [ { key: 'trex', frame: 7 } ],
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

    createPoliceAnims() {
        this.anims.create({
            key: 'policeLeft',
            frames: this.anims.generateFrameNumbers('police', { start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'policeRight',
            frames: this.anims.generateFrameNumbers('police', { start: 7, end: 13}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'policeStatic',
            frames: [ { key: 'police', frame: 6 } ],
            frameRate: 10,
            repeat: -1
        })
    }

    createCarAnims() {
        this.anims.create({
            key:'carLeft',
            frames: this.anims.generateFrameNumbers('car', { start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'carRight',
            frames: this.anims.generateFrameNumbers('car', { start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    createPoliticianAnims() {
        this.anims.create({
            key:'politicianLeft',
            frames: this.anims.generateFrameNumbers('politician', { start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'politicianRight',
            frames: this.anims.generateFrameNumbers('politician', { start: 6, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'politicianStatic',
            frames: this.anims.generateFrameNumbers('politician', { start: 6, end: 7}),
            frameRate: 10,
            repeat: -1
        });
    }

    createHelicopterAnims() {
        this.anims.create({
            key:'helicopterLeft',
            frames: this.anims.generateFrameNumbers('helicopter', { stardt: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'helicopterRight',
            frames: this.anims.generateFrameNumbers('helicopter', { start: 5, end: 9}),
            frameRate: 10,
            repeat: -1
        });
    }

    createTankAnims() {
        this.anims.create({
            key:'tankLeft',
            frames: this.anims.generateFrameNumbers('tank', { start: 5, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'tankLeftAtk',
            frames: this.anims.generateFrameNumbers('tank', { start: 2, end: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'tankRight',
            frames: this.anims.generateFrameNumbers('tank', { start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'tankRightAtk',
            frames: this.anims.generateFrameNumbers('tank', { start: 9, end: 11}),
            frameRate: 10,
            repeat: -1
        });
    }



    // flying enemy [no specific orientation]
    createDroneAnims() {
        this.anims.create({
            key:'droneDefault',
            frames: this.anims.generateFrameNumbers('drone', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }
    // flying enemy [with orientation]
    createPteroAnims() {
        this.anims.create({
            key:'pteroLeft',
            frames: this.anims.generateFrameNumbers('ptero', { start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'pteroRight',
            frames: this.anims.generateFrameNumbers('ptero', { start: 7, end: 13}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'pteroStatic',
            frames: this.anims.generateFrameNumbers('ptero', { start: 5, end: 6}),
            frameRate: 10,
            repeat: -1
        });
    }

    createBossAnims() {
        // Create Final boss Animations
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
