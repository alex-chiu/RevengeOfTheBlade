/*  ROBOT BOSS FIGHT SCENE

    Scene for boss fight with the robot boss.
    Final stage for game.
*/

// Global Variables
var player, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal;
var meleeAtkDir, rangedAtkDir, callRangedAttack, attackAnimPlaying = false;
var daggerGroup;
var boss;
var bossAlive = true;
var playerAlive = true;
var playerDetected = false;
var delX, atkDir, callAttack;
var laserGroup;
var cursors, spaceBar;
var W, A, S, D;
var life = 30, bossLife = 100;
var lifeText, bossLifeText;
var attackAnimPlaying = false;
var sky, clouds;
var far, back, mid, front;
var ground, platforms;
var soundtrack5;
var bombs;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// Robot Boss Fight Class
class RobotBossFight extends Phaser.Scene {
    constructor() {
        super({ key: 'RobotBossFight' });
    }

    // Preload Images and Sprites
    preload() {
        // Soundtrack
        this.load.audio('stage5Music', ['assets/audio/soundtrack/stage1.wav'])

        this.load.spritesheet('robotBoss', 'assets/sprites/robot-boss-sprite.png', { frameWidth: 390, frameHeight: 500 });
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm', 'assets/sprites/ranged-attack/hero-attack2-arm-sprite.png', { frameWidth: 145, frameHeight: 230 });
        this.load.spritesheet('hero_walk_no_arm', 'assets/sprites/ranged-attack/hero-walk-sprite-noarm.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm_final', 'assets/sprites/ranged-attack/attack2-throw.png', { frameWidth: 220, frameHeight: 230 });

        // Background Images
        this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
        this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
        this.load.image('far2', 'assets/backgrounds/stage5/2far.png');
        this.load.image('back3', 'assets/backgrounds/stage5/3back.png');
        this.load.image('mid4', 'assets/backgrounds/stage5/4mid.png');
        this.load.image('front5', 'assets/backgrounds/stage5/5front.png');
        this.load.image('ground', 'assets/backgrounds/stage5/6platform.png');

        // Laser and Bomb
        this.load.image('laser', 'assets/laser.png')
        this.load.image('bomb', 'assets/bomb.png')

        // Dagger
        this.load.image('dagger', 'assets/dagger.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99')

        soundtrack5 = this.sound.add('stage5Music', {volume: 0.5, loop: true});
        soundtrack5.play();

        // Reset Values
        life = 30;
        bossLife = 100;
        playerAlive = true;
        bossAlive = true;
        playerDetected = false;

        // Background
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky0');
        clouds = this.add.tileSprite(400, 300, 800, 600, 'clouds1');
        far = this.add.tileSprite(400, 300, 800, 600, 'far2');
        back = this.add.tileSprite(400, 300, 800, 600, 'back3');
        mid = this.add.tileSprite(400, 300, 800, 600, 'mid4');
        front = this.add.tileSprite(400, 300, 800, 600, 'front5');
        ground = this.add.tileSprite(400, 300, 800, 600, 'ground');
        this.add.existing(ground);
        sky.fixedToCamera = true;

        // Text
        lifeText = this.add.text(15, 15, 'Life: 100', { fontSize: '25px', fill: '#ffffff' });
        bossLifeText = this.add.text(580, 15, 'Boss Life: 100', { fontSize: '25px', fill: '#ffffff' });

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 565);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }
        // Create Dagger Group
        daggerGroup = new DaggerGroup1(this);

        // Create Boss
        boss = this.physics.add.sprite(650, 400, 'robotBoss')
        boss.setBounce(0);
        boss.setCollideWorldBounds(true);
        boss.displayWidth = game.config.width * 0.15;
        boss.scaleY = boss.scaleX;
        boss.body.setGravityY(300);

        // Boss' Laser Attacks
        laserGroup = new LaserGroup(this);

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

        // Create Player
        this.createPlayerSprites();
        // Create Player Animations
        this.createPlayerAnims();

        // Add Input Sources
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        cursors = this.input.keyboard.createCursorKeys();

        // Ranged Attack Call when MB1 Clicked
        this.input.on('pointerdown', function (pointer) {
            mouseX = pointer.x;
            mouseY = pointer.y;
            if (debug) { console.log('Mouse Location: ' + mouseX + ', ' + mouseY) };
            if (mouseX >= player.body.x + 27) {
                meleeAtkDir = 'R';
            }
            else if (mouseX < player.body.x + 27) {
                meleeAtkDir = 'L';
            }
            callRangedAttack = true;
        })

        // Graphics for drawing debug line
        graphics = this.add.graphics();
        if (debug) {
            graphics.lineStyle(5, 0xFF0000, 1)
            testLine = new Phaser.Geom.Line(this, player.body.x, player.body.y - 50, player.body.x, player.body.y + 50);
        }

        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, this.bombAttack, null, this);

        // Add Platform Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(playerMeleeAtk, platforms);
        this.physics.add.collider(playerWalkNA, platforms);
        this.physics.add.collider(playerArm, platforms);
        this.physics.add.collider(playerArmFinal, platforms);

        // Add Colliders
        this.physics.add.overlap(player, boss);
        this.physics.add.overlap(playerMeleeAtk, boss);
        this.physics.add.collider(boss, platforms);
    }

    // Constantly Updating Game Loop
    update() {
        if (playerAlive == false) {
          this.scene.pause('RobotBossFight')
          this.scene.launch('GameOver');

          /* let panel = this.scene.get('gameOverScreen');
          panel.events.on('clickMenu', this.handleGoMenu, this);
          panel.events.on('clickTryAgain', this.handleTryAgain, this); */
        }

        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.3;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.1;

        // Player Movement
        if (A.isDown) {
            player.setVelocityX(-160);
            if (!attackAnimPlaying) {
                player.anims.play('left', true);
                playerWalkNA.anims.play('leftNoArm', true);
            }
            front.tilePositionX -= 3;
            ground.tilePositionX -= 2.7;
        }
        else if (D.isDown) {
            player.setVelocityX(160);
            if (!attackAnimPlaying) {
                player.anims.play('right', true);
                playerWalkNA.anims.play('rightNoArm', true);
            }
            front.tilePositionX += 3;
            ground.tilePositionX += 2.7;
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        // Jumping
        if (W.isDown && player.body.touching.down) {
            player.setVelocityY(-270);
        }

        // Melee Attack
        if (spaceBar.isDown) {
            if (player.body.velocity.x >= 0) {
                meleeAtkDir = 'R';
            }
            else {
                meleeAtkDir = 'L';
            }
            this.playerMeleeAttack();
        }

        // Ranged Attack
        if (callRangedAttack) {
            this.playerRangedAttack(mouseX, mouseY);
        }

        // Updates each individual sprite's position/velocity each loop
        this.updatePlayerPos();
        this.updateVel();

        // Draws test line for determining center of player sprite
        if (debug) {
            testLine.setTo(player.body.x + 27, player.body.y - 50, player.body.x + 27, player.body.y + 50);
            graphics.strokeLineShape(testLine);
        }

        // Boss AI/Movement
        if (!playerDetected) {
            boss.anims.play('bossDefault');
        }
        else {
            delX = boss.body.position.x - player.body.position.x;
            if (player.body.position.x < boss.body.position.x) {
                boss.anims.play('bossLeftAtk');
                if (delX > 150) {
                    boss.setVelocityX(-40);
                }
                else if (delX < 140) {
                    boss.setVelocityX(40);
                }
                else {
                    boss.setVelocityX(0);
                    if (bossAlive) {
                      this.shootLaser('L');
                    }
                }
            }
            else if (player.body.position.x > boss.body.position.x) {
                boss.anims.play('bossRightAtk');
                if (delX < -150) {
                    boss.setVelocityX(40);
                }
                else if (delX > -140) {
                    boss.setVelocityX(-40);
                }
                else {
                    boss.setVelocityX(0);
                    if (bossAlive){
                      this.shootLaser('R');
                    }

                }
            }
        }

        if (Math.abs(player.body.position.x - boss.body.position.x) <= 200) {
            playerDetected = true;
        }

        // Debug Player and Boss Locations
        if (debug) {
            console.log("Player X Location:" + player.body.position.x);
            console.log("Boss X Location:" + boss.body.position.x);
        }

        this.updatePlayerLifeText();
    }

    // Makes sure each sprite is in the same position.
    updatePlayerPos() {
        playerMeleeAtk.body.x = player.body.x - 25;
        playerWalkNA.body.x = player.body.x;
        playerMeleeAtk.body.y = player.body.y;
        playerWalkNA.body.y = player.body.y;
        playerArm.body.y = player.body.y;
        playerArmFinal.body.y = player.body.y;
    }

    // Updates velocity
    updateVel() {
        playerArm.setVelocityX(player.body.velocity.x);
        playerArmFinal.setVelocityX(player.body.velocity.x);
        playerArm.setVelocityY(player.body.velocity.y);
        playerArmFinal.setVelocityY(player.body.velocity.y);
    }

    // Creates player sprites
    createPlayerSprites() {
        // Base player sprite
        player = this.physics.add.sprite(130, 475, 'hero');
        player.setBounce(0.25);
        player.setCollideWorldBounds(true);
        player.displayWidth = game.config.width * 0.075;
        player.scaleY = player.scaleX;
        player.body.setGravityY(300);

        // Melee attack sprite
        playerMeleeAtk = this.physics.add.sprite(130, 475, 'hero_attack');
        playerMeleeAtk.setBounce(0.25);
        playerMeleeAtk.setCollideWorldBounds(true);
        playerMeleeAtk.displayWidth = game.config.width * 0.128;
        playerMeleeAtk.scaleY = playerMeleeAtk.scaleX;
        playerMeleeAtk.body.setGravityY(300);
        playerMeleeAtk.visible = false;

        // Player walking sprite with no arm (plays when casting ranged attack)
        playerWalkNA = this.physics.add.sprite(130, 475, 'hero_walk_no_arm');
        playerWalkNA.setBounce(0.25);
        playerWalkNA.setCollideWorldBounds(true);
        playerWalkNA.displayWidth = game.config.width * 0.075;
        playerWalkNA.scaleY = playerWalkNA.scaleX;
        playerWalkNA.body.setGravityY(300);
        playerWalkNA.visible = false;

        // Player arm sprite
        playerArm = this.physics.add.sprite(130, 475, 'hero_ranged_attack_arm');
        playerArm.setBounce(0.25);
        playerArm.setCollideWorldBounds(true);
        playerArm.displayWidth = game.config.width * 0.075;
        playerArm.scaleY = playerArm.scaleX;
        playerArm.body.setGravityY(300);
        playerArm.visible = false;

        // Final frame of player arm sprite (rotated based on projectile direction)
        playerArmFinal = this.physics.add.sprite(130, 475, 'hero_ranged_attack_arm_final');
        playerArmFinal.setBounce(0.25);
        playerArmFinal.setCollideWorldBounds(true);
        playerArmFinal.displayWidth = game.config.width * 0.110;
        playerArmFinal.scaleY = playerArmFinal.scaleX;
        playerArmFinal.body.setGravityY(300);
        playerArmFinal.visible = false;
    }

    bombAttack(bomb, player) {
      life -= 5
      lifeText.setText('Life: ' + life);
      player.setTint('0xff0000')
      this.time.addEvent({
          delay: 400,
          callback: () => {
              player.clearTint();
          }
      })
      if (life == 0) {
          player.disableBody(true, true);
          player.setActive(false);
          player.setVisible(false);
          playerAlive = false;
          soundtrack5.stop();
      }
    }

    // Function that Updates the Boss' Life Text
    updateBossLifeText() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = boss.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && bossAlive) {
            bossLife -= 10
            bossLifeText.setText('Boss Life: ' + bossLife);
            boss.setTint('0xff0000')
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    boss.clearTint();
                }
            })
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            //bomb.allowGravity = false;
        }
        if (bossLife == 0) {
            boss.disableBody(true, true);
            bossAlive = false;
        }
    }

    // Updates player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + life);

    }

    // Function that fires laser from boss
    shootLaser(direction) {
        if (direction == 'L') {
            laserGroup.fireLaser(boss.body.position.x, boss.body.position.y + 82, direction);
        }
        else {
            laserGroup.fireLaser(boss.body.position.x + 100, boss.body.position.y + 110, direction);
        }
    }

    // Called when player starts melee attack.
    playerMeleeAttack() {
        if (debug) { console.log('MELEE ATTACK') };
        if (attackAnimPlaying == false) {
            if (meleeAtkDir == 'R') {
                attackAnimPlaying = true;
                player.anims.play('preMeleeAtkR');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerMeleeAtk.visible = true;
                        this.updateBossLifeText();
                        playerMeleeAtk.anims.play('playerMeleeAtkR');
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                playerMeleeAtk.visible = false;
                                player.visible = true;
                                attackAnimPlaying = false;
                                callAttack = false;
                            }
                        })
                    }
                })
            }
            else if (meleeAtkDir == 'L') {
                attackAnimPlaying = true;
                player.anims.play('preMeleeAtkL');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerMeleeAtk.visible = true;
                        this.updateBossLifeText();
                        playerMeleeAtk.anims.play('playerMeleeAtkL');
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                playerMeleeAtk.visible = false;
                                player.visible = true;
                                attackAnimPlaying = false;
                                callAttack = false;
                            }
                        })
                    }
                })
            }
        }
    }

    // Called when player casts ranged attack
    playerRangedAttack(x, y) {
        if (debug) { console.log('RANGED ATTACK') };

        // Determines direction to fire projectile
        if (x >= player.body.x) {
            rangedAtkDir = 'R';
        }
        else {
            rangedAtkDir = 'L';
        }

        // Actual attack animation
        if (attackAnimPlaying == false) {
            if (rangedAtkDir == 'R') {
                if (playerArm.scaleX > 0) {
                    playerArm.scaleX *= -1;
                    playerArm.body.x = player.body.x + 10;
                }
                else {
                    playerArm.body.x = player.body.x + 70;
                }
                playerArmFinal.body.x = player.body.x - 5;
                attackAnimPlaying = true;
                player.visible = false;
                playerWalkNA.visible = true;
                playerArm.visible = true;
                if (Math.abs(player.body.velocity.x) > 0) {
                    playerWalkNA.anims.play('rightNoArm', true)
                }
                else {
                    playerWalkNA.anims.play('rightStatic', true)
                }
                playerArm.anims.play('preRangedAtk')
                this.time.addEvent({
                    delay: 280,
                    callback: () => {
                        this.launchDagger(x, y);
                        playerArm.visible = false;
                        playerArmFinal.visible = true;
                        playerArmFinal.anims.play('playerRangedAtkR', true);
                        this.time.addEvent({
                            delay: 200,
                            callback: () => {
                                playerArmFinal.visible = false;
                                playerWalkNA.visible = false;
                                player.visible = true;
                                attackAnimPlaying = false;
                                callRangedAttack = false;
                            }
                        })
                    }
                })
            }
            else if (rangedAtkDir == 'L') {
                if (playerArm.scaleX < 0) {
                    playerArm.scaleX *= -1;
                    playerArm.body.x = player.body.x + 50;
                }
                else {
                    playerArm.body.x = player.body.x - 10;
                }
                playerArmFinal.body.x = player.body.x - 25;
                attackAnimPlaying = true;
                player.visible = false;
                playerWalkNA.visible = true;
                playerArm.visible = true;
                if (Math.abs(player.body.velocity.x) > 0) {
                    playerWalkNA.anims.play('leftNoArm', true)
                }
                else {
                    playerWalkNA.anims.play('leftStatic', true)
                }
                playerArm.anims.play('preRangedAtk')
                this.time.addEvent({
                    delay: 280,
                    callback: () => {
                        this.launchDagger(x, y);
                        playerArm.visible = false;
                        playerArmFinal.visible = true;
                        playerArmFinal.anims.play('playerRangedAtkL');
                        this.time.addEvent({
                            delay: 200,
                            callback: () => {
                                playerArmFinal.visible = false;
                                playerWalkNA.visible = false;
                                player.visible = true;
                                attackAnimPlaying = false;
                                callRangedAttack = false;
                            }
                        })
                    }
                })
            }
        }
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

    // Throws Dagger
    launchDagger(aimX, aimY) {
        daggerGroup.throwDagger(player.body.x, player.body.y, aimX, aimY)
    }
}

// Laser Group Class
class LaserGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Laser,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: 'laser'
        })
    }

    fireLaser (x, y, direction) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y, direction);
        }
    }
}

// Laser Class
class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'laser');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y >= 528) {
            this.setActive(false);
            this.setVisible(false);
        }
        else if (Phaser.Geom.Rectangle.Overlaps(this.getBounds(), player.getBounds()) && playerAlive) {
            life -= 5;

            /*player.setTint('0xff0000')
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    player.clearTint();
                }
            })*/

            this.setActive(false);
            this.setVisible(false);

        }
        if (life == 0) {
            player.disableBody(true, true);
            player.setActive(false);
            player.setVisible(false);
            playerAlive = false;
            soundtrack5.stop();
        }
    }


    fire (x, y, direction) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.setGravityY(0);

        if (direction == 'L') {
            this.setVelocityX(-250);
            this.setVelocityY(100);
        }
        else if (direction == 'R') {
            this.setVelocityX(250);
        }
    }
}

// Dagger Group Class
class DaggerGroup1 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Dagger1,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: 'dagger'
        })
    }

    throwDagger (x, y, aimX, aimY) {
        const dagger = this.getFirstDead(false);
        if (dagger) {
            dagger.displayWidth = game.config.width * 0.04;
            dagger.scaleY = dagger.scaleX;
            dagger.throw(x, y, aimX, aimY);
        }
    }
}

// Dagger Class
class Dagger1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dagger');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Checks if dagger leaves screen
        if (this.y >= 540 || this. y <= 0 || this.x >= game.config.width || this.x <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), boss.getBounds())) && bossAlive) {
            this.setActive(false);
            this.setVisible(false);
            bossLife -= 5;
            bossLifeText.setText('Boss Life: ' + bossLife);
            /*boss.setTint('0xff0000')
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    boss.clearTint();
                }
            })*/
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }

        if (bossLife == 0) {
            boss.destroy();
            bossAlive = false;
        }
    }


    throw (x, y, aimX, aimY) {
        this.body.reset(x + 25, y + 25);
        this.setActive(true);
        this.setVisible(true);
        this.body.setGravityY(100);

        // Finds angle between player and cursor aim location
        var angle = Math.atan2((aimY - y), (aimX - x));
        this.rotation = angle + Math.PI/4;

        this.setVelocityX(Math.cos(angle) * 1000);
        this.setVelocityY(Math.sin(angle) * 1000)
    }
}
