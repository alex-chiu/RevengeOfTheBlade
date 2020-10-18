/*  TUTORIAL SCENE

    Scene that appears when the player wishes to enter the tutorial.
    Has basic platforms to jump around on and targets to attack.
*/

// Global Variables
var graphics;
var player, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal;
var playerAlive = true;
var delX, meleeAtkDir, rangedAtkDir, callRangedAttack;
var W, A, S, D, cursors, spaceBar, mouseX, mouseY;
var playerLife = 100;
var lifeText;
var meleeAnimPlaying = false;
var sky, clouds, far, back, mid, front;
var ground, platforms, obstacles;
var target1, target2;
var target1life = 50;
var target2life = 50;
var target1Alive = true;
var target2Alive = true;
var target1LifeText = 50, target2LifeText = 50;

var daggerGroup;

// DEBUG PARAMETERS
var debug = false;
var testLine;

// Robot Boss Fight Class
class Tutorial extends Phaser.Scene{
    constructor() {
        super({ key: 'Tutorial' });
    }

    // Preload Images and Sprites
    preload() {
        // Hero Spritesheets
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm', 'assets/sprites/ranged-attack/hero-attack2-arm-sprite.png', { frameWidth: 145, frameHeight: 230 });
        this.load.spritesheet('hero_walk_no_arm', 'assets/sprites/ranged-attack/hero-walk-sprite-noarm.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm_final', 'assets/sprites/ranged-attack/attack2-throw.png', { frameWidth: 220, frameHeight: 230 });

        // Background Images
        this.load.image('sky01', 'assets/backgrounds/stage1/0sky1.png');
        this.load.image('clouds11', 'assets/backgrounds/stage1/1clouds1.png');
        this.load.image('far21', 'assets/backgrounds/stage1/2far1.png');
        this.load.image('back31', 'assets/backgrounds/stage1/3back1.png');
        this.load.image('mid41', 'assets/backgrounds/stage1/4mid1.png');
        this.load.image('front51', 'assets/backgrounds/stage1/5front1.png');
        this.load.image('ground11', 'assets/backgrounds/stage1/6platform1.png');

        // Platforms
        this.load.image('platformV', 'assets/platforms/platformV1.png');
        this.load.image('platformH', 'assets/platforms/platformH.png');

        // Targets
        this.load.image('target', 'assets/target.png');

        // Daggers
        this.load.image('dagger', 'assets/dagger.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99')

        // Background
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky01');
        clouds = this.add.tileSprite(400, 300, 800, 600, 'clouds11');
        far = this.add.tileSprite(400, 300, 800, 600, 'far21');
        back = this.add.tileSprite(400, 300, 800, 600, 'back31');
        mid = this.add.tileSprite(400, 300, 800, 600, 'mid41');
        front = this.add.tileSprite(400, 300, 800, 600, 'front51');
        ground = this.add.tileSprite(400, 300, 800, 600, 'ground11');
        this.add.existing(ground);
        sky.fixedToCamera = true;

        // Targets
        target1 = this.add.image(750, 515, 'target');
        target2 = this.add.image(600, 100, 'target');

        // Platforms
        obstacles = this.physics.add.staticGroup();
        obstacles.create(250, 650, 'platformV');
        obstacles.create(0, 525, 'platformH');
        obstacles.create(250, 475, 'platformH');
        obstacles.create(285, 500, 'platformH');
        obstacles.create(320, 525, 'platformH');
        obstacles.create(320, 550, 'platformH');

        // Text
        lifeText = this.add.text(15, 15, 'Life: 100', { fontSize: '25px', fill: '#ffffff' });
        target1LifeText = this.add.text(650, 45, 'Life: 50', { fontSize: '25px', fill: '#ffffff' });
        target2LifeText = this.add.text(650, 15, 'Life: 50', { fontSize: '25px', fill: '#ffffff' });

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 575);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }

        // Create Dagger Group
        daggerGroup = new DaggerGroup(this);

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

        // Add Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(playerMeleeAtk, platforms);
        this.physics.add.collider(playerWalkNA, platforms);
        this.physics.add.collider(playerArm, platforms);
        this.physics.add.collider(playerArmFinal, platforms);
        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(playerMeleeAtk, obstacles);
        this.physics.add.collider(playerWalkNA, obstacles);
        this.physics.add.collider(playerArm, obstacles);
        this.physics.add.collider(playerArmFinal, obstacles);
        this.physics.add.overlap(player, target1);
        this.physics.add.overlap(playerMeleeAtk, target1);
        this.physics.add.overlap(player, target2);
        this.physics.add.overlap(playerMeleeAtk, target2);
    }

    // Constantly Updating Game Loop
    update() {
        if (target1Alive == false && target2Alive == false) {
          this.scene.pause('Tutorial')
          this.scene.launch('TutorialCompleted');
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

        if (spaceBar.isDown) {
            if (player.body.velocity.x >= 0) {
                meleeAtkDir = 'R';
            }
            else {
                meleeAtkDir = 'L';
            }
            this.playerMeleeAttack();
        }

        if (callRangedAttack) {
            this.playerRangedAttack(mouseX, mouseY);
        }

        // Updates each individual sprite's position each loop
        this.updatePlayerPos();
        this.updateVel();

        // Draws test line for determining center of player sprite
        if (debug) {
            testLine.setTo(player.body.x + 27, player.body.y - 50, player.body.x + 27, player.body.y + 50);
            graphics.strokeLineShape(testLine);
        }

        // Update Life Text
        this.updatePlayerLifeText();
        this.updateTargetLifeText();
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
                        this.updateTarget1Life();
                        this.updateTarget2Life();
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
                        this.updateTarget1Life();
                        this.updateTarget2Life();
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

    // Function that updates the player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + playerLife);
    }

    // Updates Target 1's Life
    updateTarget1Life () {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = target1.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && target1Alive) {
            target1life -= 10
            target1.setTint('0xff0000')
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    target1.clearTint();
                }
            })
        }
        if (target1life == 0) {
            target1.destroy();
            target1Alive = false;
        }
    }

    // Updates Target 2's Life
    updateTarget2Life () {
        var boundsA2 = playerMeleeAtk.getBounds();
        var boundsB2 = target2.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsA2, boundsB2)) && target2Alive) {
            target2life -= 10
            target2.setTint('0xff0000')
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    target2.clearTint();
                }
            })
        }
        if (target2life == 0) {
            target2.destroy();
            target2Alive = false;
        }
    }

    updateTargetLifeText() {
        target1LifeText.setText('Life: ' + target1life)
        target2LifeText.setText('Life: ' + target2life)
    }

    // Throws Dagger
    launchDagger(aimX, aimY) {
        daggerGroup.throwDagger(player.body.x, player.body.y, aimX, aimY)
    }

}

// Dagger Group Class
class DaggerGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Dagger,
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
class Dagger extends Phaser.Physics.Arcade.Sprite {
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
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), target1.getBounds())) && target1Alive) {
            this.setActive(false);
            this.setVisible(false);
            target1life -= 5;
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), target2.getBounds())) && target2Alive) {
            this.setActive(false);
            this.setVisible(false);
            target2life -= 5;
        }

        if (target1life == 0) {
            target1.destroy();
            target1Alive = false;
        }
        if (target2life == 0) {
            target2.destroy();
            target2Alive = false;
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
