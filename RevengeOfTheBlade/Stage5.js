/* STAGE 5 SCENE

    5TH AND LAST STAGE OF THE GAME BEFORE FACING THE FINAL
    Final stage for game.
*/

// Global Variables
var player, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal;
var meleeAtkDir, rangedAtkDir, callRangedAttack, attackAnimPlaying = false;
var daggerGroup;

var enemy1, enemy2, drone;
var enemy1Alive = true;
var enemy2Alive = true;

var playerAlive = true;
var playerDetected = false;

var atkDir, callAttack;
var delX1, delX2;
var laserGroup;
var cursors, spaceBar;
var W, A, S, D;
var life = 30, enemy1Life = 50;
var enemy2Life = 50;
var lifeText, enemy1LifeText, enemy2LifeText;
var attackAnimPlaying = false;
var sky, clouds;
var far, back, mid, front;
var ground, platforms;
var soundtrack5;
var bossSceneButton;
var healthLoots;

// SFX
var preattack1;
var preattack2;
var attack1_metal;
var attack1_object;
var attack1_platform;
var attack2_throw;
var attack2_metal;
var attack_noenemy;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// Robot Boss Fight Class
class Stage5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage5' });
    }

    // Preload Images and Sprites
    preload() {
        // Soundtrack
        this.load.audio('stage5Music', ['assets/audio/soundtrack/stage1.wav']);

        // Sound Effects
        // melee
        this.load.audio('preattack1', ['assets/audio/soundeffects/player/preattack1.mp3']);
        this.load.audio('attack1_metal', ['assets/audio/soundeffects/player/attack1_metal.mp3']);
        this.load.audio('attack1_object', ['assets/audio/soundeffects/player/attack1_object.mp3']);
        this.load.audio('attack1_platform', ['assets/audio/soundeffects/player/attack1_platform.mp3']);
        // range
        this.load.audio('preattack2', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_throw', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_metal', ['assets/audio/soundeffects/player/preattack2.mp3']);
        // both 
        this.load.audio('attack_noenemy', ['assets/audio/soundeffects/player/attack1_noenemy.mp3']);

        // Enemies
        this.load.spritesheet('enemy1', 'assets/sprites/robot1.png', { frameWidth: 167, frameHeight: 280 });
        this.load.spritesheet('enemy2', 'assets/sprites/robot2.png', { frameWidth: 133, frameHeight: 195 });
        this.load.spritesheet('drone', 'assets/sprites/drone.png', { frameWidth: 110, frameHeight: 75 });

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

        // Laser
        this.load.image('laser', 'assets/laser.png');

        // Dagger
        this.load.image('dagger', 'assets/daggers.png');

        //Loot
        this.load.image('healthLoot', 'assets/healthLoot.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99');

        soundtrack5 = this.sound.add('stage5Music', {volume: 0.5, loop: true});
        soundtrack5.play();

        // Player attack sound effects
        preattack1 = this.sound.add('preattack1');
        attack1_metal = this.sound.add('attack1_metal');
        attack1_object = this.sound.add('attack1_object');
        attack1_platform = this.sound.add('attack1_platform');
        preattack2 = this.sound.add('preattack2');
        attack2_throw = this.sound.add('attack2_throw');
        attack2_metal = this.sound.add('attack2_metal');
        attack_noenemy = this.sound.add('attack_noenemy');
        
        // preattack1.play();
        // attack1_metal.play();
        // attack1_object.play();
        // attack1_platform.play();
        // preattack2.play();
        // attack2_throw.play();
        // attack2_metal.play();
        // attack_noenemy.play();

        // Reset Values
        life = 30;
        enemy1Life = 50;
        playerAlive = true;
        enemy1Alive = true;
        playerDetected = false;

        // Reset Values of enemy2
        enemy2Life = 50;
        enemy2Alive = true;

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
        enemy1LifeText = this.add.text(580, 15, 'Enemy 1 Life: 50', { fontSize: '20px', fill: '#ffffff' });
        enemy2LifeText = this.add.text(330, 15, 'Enemy 2 Life: 50', { fontSize: '20px', fill: '#ffffff' });

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 565);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }
        // Create Dagger Group
        daggerGroup = new DaggerGroup5(this);

        // Create Player
        this.createPlayerSprites();

        // Create Enemies
        enemy1 = this.physics.add.sprite(650, 400, 'enemy1')
        enemy1.setBounce(0);
        enemy1.setCollideWorldBounds(true);
        enemy1.displayWidth = game.config.width * 0.11;
        enemy1.scaleY = enemy1.scaleX;
        enemy1.body.setGravityY(300);

        // Create Enemy2
        enemy2 = this.physics.add.sprite(350, 400, 'enemy2')
        enemy2.setBounce(0);
        enemy2.setCollideWorldBounds(true);
        enemy2.displayWidth = game.config.width * 0.095;
        enemy2.scaleY = enemy2.scaleX;
        enemy2.body.setGravityY(300);

        // enemy1's Laser Attacks
        laserGroup = new LaserGroup5(this);

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

        // Loot
        healthLoots = this.physics.add.group();
        this.physics.add.overlap(player, healthLoots, this.pickupLoot, null, this);
        this.physics.add.overlap(playerMeleeAtk, healthLoots, this.pickupLoot, null, this);
        this.physics.add.collider(healthLoots, platforms);

        // Temporary button to get to boss fight
        if (debug) {
            bossSceneButton = this.add.text(350, 300, 'BOSS', { fontSize: '80px', fill: '#b5dbf7' });
            bossSceneButton.setInteractive();
            bossSceneButton.on('pointerdown', () => {
            soundtrack5.stop();
            this.scene.stop('Stage5');
            this.scene.start('RobotBossFight');
            })
        }

        // Graphics for drawing debug line
        graphics = this.add.graphics();
        if (debug) {
            graphics.lineStyle(5, 0xFF0000, 1)
            testLine = new Phaser.Geom.Line(this, player.body.x, player.body.y - 50, player.body.x, player.body.y + 50);
        }

        // Add Platform Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(playerMeleeAtk, platforms);
        this.physics.add.collider(playerWalkNA, platforms);
        this.physics.add.collider(playerArm, platforms);
        this.physics.add.collider(playerArmFinal, platforms);

        this.physics.add.collider(enemy1, platforms);
        this.physics.add.collider(enemy2, platforms);


        // Add overlaps
        this.physics.add.overlap(player, enemy1);
        this.physics.add.overlap(player, enemy2);

        this.physics.add.overlap(playerMeleeAtk, enemy1);
        this.physics.add.overlap(playerMeleeAtk, enemy2);

    }

    // Constantly Updating Game Loop
    update() {
        //updates// Launch Stage5Die Scene
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

        // enemy AI/Movement
        if (!playerDetected) {
            enemy1.anims.play('enemy1Default');
            enemy2.anims.play('enemy2Default');
        }
        else {
            delX1 = enemy1.body.position.x - player.body.position.x;
            delX2 = enemy2.body.position.x - player.body.position.x;
            // player is left of enemies
            if (player.body.position.x < enemy1.body.position.x) {
                enemy1.anims.play('enemy1LeftAtk');
                if (delX1 > 160) {
                    enemy1.setVelocityX(-35);
                }
                else if (delX1 < 130) {
                    enemy1.setVelocityX(35);
                }
                else {
                    enemy1.setVelocityX(0);
                    if (enemy1Alive){
                      this.shootLasers('L');
                    }
                }
            }
            // enemy 2: faster but lower range of detection
            else if (player.body.position.x < enemy2.body.position.x) {
                enemy2.anims.play('enemy2LeftAtk');
                if (delX2 > 130) {
                    enemy2.setVelocityX(-35);
                }
                else if (delX2 < 100) {
                    enemy2.setVelocityX(35);
                }
                else {
                    enemy2.setVelocityX(0);
                    if (enemy2Alive){
                        this.shootLaser('L');
                    }
                }
            }
            // if player is right of enemies
            else if (player.body.position.x > enemy1.body.position.x) {
                enemy1.anims.play('enemy1RightAtk');
                if (delX1 < -130) {
                    enemy1.setVelocityX(35);
                }
                else if (delX1 > -160) {
                    enemy1.setVelocityX(-35);
                }
                else {
                    enemy1.setVelocityX(0);
                    if (enemy1Alive){
                      this.shootLasers('R');
                    }
                }
            }
            else if (player.body.position.x > enemy2.body.position.x) {
                enemy2.anims.play('enemy2RightAtk');
                if (delX2 < -160) {
                    enemy2.setVelocityX(35);
                }
                else if (delX2 > -130) {
                    enemy2.setVelocityX(-35);
                }
                else {
                    enemy2.setVelocityX(0);
                    if (enemy2Alive){
                        this.shootLaser('R');
                    }
                }
            }
        }

        if (Math.abs(player.body.position.x - enemy1.body.position.x) <= 200) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.x - enemy2.body.position.x) <= 150) {
            playerDetected = true;
        }

        // Debug Player and Boss Locations
        if (debug) {
            console.log("Player X Location:" + player.body.position.x);
            console.log("enemy1 X Location:" + enemy1.body.position.x);
        }

        this.updatePlayerLifeText();
    }


        
    pickupLoot(player, healthLoots) {
        healthLoots.disableBody(true, true);
        if (life < 95){
          life += 10;
        }
        else{
          life = 100
        }
        this.updatePlayerLifeText()
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

    // Function that Updates the enemy's Life Text
    updateEnemy1LifeText() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = enemy1.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && enemy1Alive) {
            if (enemy1Life<10){
              enemy1Life = 0
            }
            else{
              enemy1Life -= 10
            }
            enemy1LifeText.setText('Enemy 1 Life: ' + enemy1Life);
            enemy1.setTint('0xff0000');
            attack2_metal.play();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    enemy1.clearTint();
                }
            })
        }
        if (enemy1Life == 0) {
            var hLoot = healthLoots.create(enemy1.body.x, enemy1.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            enemy1.disableBody(true, true);
            enemy1Alive = false;
        }
    }


    // Function that Updates the enemy's Life Text
    updateEnemy1LifeText() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = enemy2.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && enemy2Alive) {
            if (enemy2Life<10){
              enemy2Life = 0
            }
            else{
              enemy2Life -= 10
            }
            enemy2LifeText.setText('Enemy 2 Life: ' + enemy2Life);
            enemy2.setTint('0xff0000');
            attack1_metal.play();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    enemy2.clearTint();
                }
            })
        }
        if (enemy2Life == 0) {
            var hLoot = healthLoots.create(enemy2.body.x, enemy2.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            enemy2.disableBody(true, true);
            enemy2Alive = false;
        }
    }

    // Updates player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + life);

    }

    // Function that fires laser from enemy1 (bullets, to be added)
    shootLasers(direction) {
        if (direction == 'L') {
            laserGroup.fireLaser(enemy1.body.position.x, enemy1.body.position.y + 82, direction);
        }
        else {
            laserGroup.fireLaser(enemy1.body.position.x + 100, enemy1.body.position.y + 110, direction);
        }
    }

    // Function that fires laser from enemy2
    shootLaser(direction) {
        if (direction == 'L') {
            laserGroup.fireLaser(enemy2.body.position.x, enemy2.body.position.y + 82, direction);
        }
        else {
            laserGroup.fireLaser(enemy2.body.position.x + 100, enemy2.body.position.y + 110, direction);
        }
    }


    // Called when player starts melee attack.
    playerMeleeAttack() {
        if (debug) { console.log('MELEE ATTACK') };
        if (attackAnimPlaying == false) {
            if (meleeAtkDir == 'R') {
                attackAnimPlaying = true;
                player.anims.play('preMeleeAtkR');
                preattack1.play();
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerMeleeAtk.visible = true;
                        this.updateEnemy1LifeText();
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
                preattack1.play();
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerMeleeAtk.visible = true;
                        this.updateEnemy1LifeText();
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
                playerArm.anims.play('preRangedAtk');
                preattack2.play();
                this.time.addEvent({
                    delay: 280,
                    callback: () => {
                        this.launchDagger(x, y);
                        playerArm.visible = false;
                        playerArmFinal.visible = true;
                        playerArmFinal.anims.play('playerRangedAtkR', true);
                        attack2_throw.play();
                        
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
                playerArm.anims.play('preRangedAtk');
                preattack2.play();
                this.time.addEvent({
                    delay: 280,
                    callback: () => {
                        this.launchDagger(x, y);
                        playerArm.visible = false;
                        playerArmFinal.visible = true;
                        playerArmFinal.anims.play('playerRangedAtkL');
                        attack2_throw.play();
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

    // Throws Dagger
    launchDagger(aimX, aimY) {
        daggerGroup.throwDagger(player.body.x, player.body.y, aimX, aimY)
    }
}

// Laser Group Class
class LaserGroup5 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Laser5,
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
class Laser5 extends Phaser.Physics.Arcade.Sprite {
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
class DaggerGroup5 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Dagger5,
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
class Dagger5 extends Phaser.Physics.Arcade.Sprite {
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
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), enemy1.getBounds())) && enemy1Alive) {
            this.setActive(false);
            this.setVisible(false);
            enemy1Life -= 5;
            enemy1LifeText.setText('Enemy 1 Life: ' + enemy1Life);
            if (!playerDetected) {
                playerDetected = true;
            }
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), enemy2.getBounds())) && enemy2Alive) {
            this.setActive(false);
            this.setVisible(false);
            enemy2Life -= 5;
            enemy2LifeText.setText('Enemy 2 Life: ' + enemy2Life);
            if (!playerDetected) {
                playerDetected = true;
            }
        }

        if (enemy1Life == 0) {
            enemy1Alive = false;
            enemy1.disableBody(true, true);
        }
        if (enemy2Life == 0) {
            enemy2Alive = false;
            enemy2.disableBody(true, true);
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
