/* STAGE 5 SCENE

    5TH AND LAST STAGE OF THE GAME BEFORE FACING THE FINAL
    Final stage for game.
*/

// Global Variables
var player, playerAtk;
var boss;
var bossAlive = true;
var playerAlive = true;
var playerDetected = false;
var delX, atkDir, callAttack;
var laserGroup;
var cursors, spaceBar;
var W, A, S, D;
var life = 10, bossLife = 100;
var lifeText, bossLifeText;
var attackAnimPlaying = false;
var sky, clouds;
var far, back, mid, front;
var ground, platforms;
var soundtrack5;
var bossSceneButton;
var healthLoots;

// DEBUG PARAMETERS
var debug = false;

// Robot Boss Fight Class
class Stage5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage5' });
    }

    // Preload Images and Sprites
    preload() {
        // Soundtrack
        this.load.audio('stage5Music', ['assets/audio/soundtrack/stage1.wav'])

        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });

        // Background Images
        this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
        this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
        this.load.image('far2', 'assets/backgrounds/stage5/2far.png');
        this.load.image('back3', 'assets/backgrounds/stage5/3back.png');
        this.load.image('mid4', 'assets/backgrounds/stage5/4mid.png');
        this.load.image('front5', 'assets/backgrounds/stage5/5front.png');
        this.load.image('ground', 'assets/backgrounds/stage5/6platform.png');

        // Laser
        this.load.image('laser', 'assets/laser.png')
        this.load.image('healthLoot', 'assets/healthLoot.png')
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99')

        soundtrack5 = this.sound.add('stage5Music', {volume: 0.5, loop: true});
        soundtrack5.play();

        // Reset Values
        life = 10;
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

        // Create Boss
        /*boss = this.physics.add.sprite(650, 400, 'robotBoss')
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
        });*/

        // Create Player
        player = this.physics.add.sprite(100, 475, 'hero');
        player.setBounce(0.25);
        player.setCollideWorldBounds(true);
        player.displayWidth = game.config.width * 0.075;
        player.scaleY = player.scaleX;
        player.body.setGravityY(300);

        playerAtk = this.physics.add.sprite(100, 475, 'hero_attack');
        playerAtk.setBounce(0.25);
        playerAtk.setCollideWorldBounds(true);
        playerAtk.displayWidth = game.config.width * 0.128;
        playerAtk.scaleY = playerAtk.scaleX;
        playerAtk.body.setGravityY(300);
        playerAtk.visible = false;

        // Create Player Animations
        this.createPlayerAnimations();

        // Add Input Sources
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', function (pointer) {
            mouseX = pointer.x;
            mouseY = pointer.y;
            if (debug) { console.log('Mouse Location: ' + mouseX + ', ' + mouseY) };
            if (mouseX >= player.body.x + 27) {
                atkDir = 'R';
            }
            else if (mouseX < player.body.x + 27) {
                atkDir = 'L';
            }
            callAttack = true;
        })

        // Loot
        healthLoots = this.physics.add.staticGroup();
        this.physics.add.overlap(player, healthLoots, this.pickupLoot, null, this);
        this.physics.add.overlap(playerAtk, healthLoots, this.pickupLoot, null, this);

        // Add Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(playerAtk, platforms);
        //this.physics.add.collider(boss, platforms);

        // TEMPORARY button
        bossSceneButton = this.add.text(350, 300, 'BOSS', { fontSize: '80px', fill: '#b5dbf7' });
        bossSceneButton.setInteractive();
        bossSceneButton.on('pointerdown', () => {
          soundtrack5.stop();
          this.scene,stop('Stage5');
          this.scene.start('RobotBossFight');
        })
    }

    // Constantly Updating Game Loop
    update() {
      // Launch Stage5Die Scene
        if (playerAlive == false) {
          this.scene.pause('Stage5')
          this.scene.launch('Stage5Die');

          /* let panel = this.scene.get('gameOverScreen');
          panel.events.on('clickMenu', this.handleGoMenu, this);
          panel.events.on('clickTryAgain', this.handleTryAgain, this); */
        }
        // Launch Stage5Win Scene
        /*
        if (enemy1Alive == false && enemy2Alive == false) {
          this.scene.pause('Stage5')
          this.scene.launch('Stage5Win');
        }
        */

        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.3;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.1;

        // Player Movement
        if (A.isDown) {
            player.setVelocityX(-160);
            playerAtk.setVelocityX(-160);
            player.anims.play('left', true);

            front.tilePositionX -= 3;
            ground.tilePositionX -= 2.7;
        }
        else if (D.isDown) {
            player.setVelocityX(160);
            playerAtk.setVelocityX(160);
            player.anims.play('right', true);

            front.tilePositionX += 3;
            ground.tilePositionX += 2.7;
        }
        else {
            player.setVelocityX(0);
            playerAtk.setVelocityX(0);
            player.anims.play('turn');
        }

        // Jumping
        if ((spaceBar.isDown || W.isDown) && player.body.touching.down) {
            player.setVelocityY(-270);
            playerAtk.setVelocityY(-270);
        }

        if (callAttack) {
            this.playerAttackCall();
        }

        // Boss AI/Movement
        /*if (!playerDetected) {
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
                    if (bossAlive){
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
        }*/

        this.updatePlayerLifeText();
    }

    // Function that Updates the Boss' Life Text
    /*updateBossLifeText(playerAtk, boss) {
        var boundsA = playerAtk.getBounds();
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
        }
        if (bossLife == 0) {
            boss.disableBody(true, true);
            bossAlive = false;
        }

        // boss.setAlpha(0.5);

    }*/

    // Updates player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + life);

    }

    pickupLoot(healthLoots){
        healthLoots.disableBody(true, true);
        if (life < 95){
          life += 5;
        }
        else{
          life = 100
        }
        updatePlayerLifeText()
    }

    // Function that fires laser from boss
    /*shootLaser(direction) {
        if (direction == 'L') {
            laserGroup.fireLaser(boss.body.position.x, boss.body.position.y + 82, direction);
        }
        else {
            laserGroup.fireLaser(boss.body.position.x + 100, boss.body.position.y + 110, direction);
        }
    }*/

    // Called when player attacks
    playerAttackCall() {
        if (debug) { console.log('ATTACKING') };
        if (attackAnimPlaying == false) {
            if (atkDir == 'R') {
                attackAnimPlaying = true;
                player.anims.play('preAtkR');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerAtk.visible = true;
                        playerAtk.anims.play('playerAtkR');
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                playerAtk.visible = false;
                                player.visible = true;
                                attackAnimPlaying = false;
                                callAttack = false;
                            }
                        })
                    }
                })
            }
            else if (atkDir == 'L') {
                attackAnimPlaying = true;
                player.anims.play('preAtkL');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerAtk.visible = true;
                        playerAtk.anims.play('playerAtkL');
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                playerAtk.visible = false;
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

    // Creates all the player animations
    createPlayerAnimations() {
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
        this.anims.create({
            key: 'preAtkL',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 7 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'preAtkR',
            frames: this.anims.generateFrameNumbers('hero', { start: 21, end: 28 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'playerAtkL',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'playerAtkR',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: 0
        });
    }
}

// Laser Group Class
/*class LaserGroup extends Phaser.Physics.Arcade.Group {
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
            })

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
}*/
