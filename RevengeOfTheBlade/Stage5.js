/* STAGE 5 SCENE

    5TH AND LAST STAGE OF THE GAME BEFORE FACING THE FINAL BOSS
    Final stage for game.
*/

// GLOBAL VARIABLES IN EACH SCENE
var player, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal, playerDmg = false;
var playerAlive = true;
var meleeAtkDir, rangedAtkDir, callRangedAttack, attackAnimPlaying = false;
var W, A, S, D, cursors, spaceBar, mouseX, mouseY;
var playerLife = 175;
var lifeText;
var sky, clouds, far, back, mid, front;
var ground, platforms, obstacles;
var daggerGroup;

// SCENE SPECIFIC VARIABLES
var button;

// PLATFORMS
var pf1, pf2, pf3, pf4, pf5;
var dir1 = 1;
var dir2 = 1;
var dir3 = 1;
var dir4 = 1;
var dir5 = 1;

// Enemies
var enemy1, enemy2, enemy3, enemy4;
var delX1, delX2, dronePos, delX3, delY3, delX4, delY4;
var enemy1Life = 150, enemy2Life = 160, enemy3Life = 140;
var enemy1Alive = true, enemy2Alive = true, enemy3Alive = true, enemy4Alive = true;
var enemy1LifeText = 150, enemy2LifeText = 160, enemy3LifeText = 140;
var enemy1Dmg = false, enemy2Dmg = false, enemy3Dmg = false, enemy4Dmg = false;

var dirE4 = 1;

// Loot
var healthLoot;
var lootCounter1 = 0;
var lootCounter2 = 0;
var lootCounter3 = 0;

// SFX
var soundtrack5;
var laserE, laserL, laserR, robot1Move, robot2Move;
var preattack1, preattack2, attack1_metal, attack1_object, attack1_platform;
var attack2_throw, attack2_metal, attack_noenemy;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// SCENE CLASS
class Stage5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage5' });
    }

    // Preload Images and Sprites
    preload() {
        // Soundtrack
        this.load.audio('stage5Music', ['assets/audio/soundtrack/stage5.wav']);

        // Sound Effects
        // Melee
        this.load.audio('preattack1', ['assets/audio/soundeffects/player/preattack1.mp3']);
        this.load.audio('attack1_metal', ['assets/audio/soundeffects/player/attack1_metal.mp3']);
        this.load.audio('attack1_object', ['assets/audio/soundeffects/player/attack1_object.mp3']);
        this.load.audio('attack1_platform', ['assets/audio/soundeffects/player/attack1_platform.mp3']);
        // Range
        this.load.audio('preattack2', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_throw', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_metal', ['assets/audio/soundeffects/player/preattack2.mp3']);
        // Both
        this.load.audio('attack_noenemy', ['assets/audio/soundeffects/player/attack1_noenemy.mp3']);
        // Enemies
        this.load.audio('laserE', ['assets/audio/soundeffects/Stage5/laser_e.wav']);
        this.load.audio('laserR', ['assets/audio/soundeffects/Stage5/laser_r.wav']);
        this.load.audio('laserL', ['assets/audio/soundeffects/Stage5/laser_l.mp3']);
        this.load.audio('robotMove', ['assets/audio/soundeffects/Stage5/robot_move.wav']);

        // Enemy Spritesheets
        this.load.spritesheet('enemy1', 'assets/sprites/robot1.png', { frameWidth: 167, frameHeight: 280 });
        this.load.spritesheet('enemy2', 'assets/sprites/robot2.png', { frameWidth: 133, frameHeight: 195 });
        this.load.spritesheet('drone', 'assets/sprites/drone.png', { frameWidth: 110, frameHeight: 75 });

        // Hero Spritesheets
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

        // Platforms
        this.load.image('platformV', 'assets/platforms/platformV1.png');
        this.load.image('platform5', 'assets/platforms/platform-s5.png');

        // Laser
        this.load.image('laser', 'assets/laser.png');

        // Dagger
        this.load.image('dagger', 'assets/daggers.png');

        // Loot
        this.load.image('healthLoot', 'assets/healthLoot.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99')

        // Play background music
        soundtrack5 = this.sound.add('stage5Music', {volume: 0.35, loop: true});
        soundtrack5.play();

        // Enemy sound effects
        robot1Move = this.sound.add('robotMove', {volume: 0.33, loop: true});
        robot2Move = this.sound.add('robotMove', {volume: 0.33, loop: true});
        laserE = this.sound.add('laserE', {volume: 0.2, loop: false});
        laserR = this.sound.add('laserR', {volume: 0.2, loop: false});
        laserL = this.sound.add('laserL', {volume: 0.2, loop: false});


        this.cameras.main.shake(5000, 0.0035);

        // Player attack sound effects
        preattack1 = this.sound.add('preattack1', {volume: 0.15});
        attack1_metal = this.sound.add('attack1_metal', {volume: 0.15});
        attack1_object = this.sound.add('attack1_object', {volume: 0.15});
        attack1_platform = this.sound.add('attack1_platform', {volume: 0.15});
        preattack2 = this.sound.add('preattack2', {volume: 0.15});
        attack2_throw = this.sound.add('attack2_throw', {volume: 0.15});
        attack2_metal = this.sound.add('attack2_metal', {volume: 0.15});
        attack_noenemy = this.sound.add('attack_noenemy', {volume: 0.15});

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

        // Moving platforms
        pf1 = this.physics.add.image(50, 400, 'platform5')
            .setImmovable(true);

        pf2 = this.physics.add.image(300, 350, 'platform5')
            .setImmovable(true);

        pf3 = this.physics.add.image(150, 150, 'platform5')
            .setImmovable(true);

        pf4 = this.physics.add.image(700, 250, 'platform5')
            .setImmovable(true);

        pf5 = this.physics.add.image(600, 200, 'platform5')
            .setImmovable(true);


        // Player Life Text
        lifeText = this.add.text(15, 15, 'Life: 175', { fontSize: '25px', fill: '#ffffff' });

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 565);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }

        //this.platforms.create(60, 100, 'platformH');

        // Create Dagger Group
        daggerGroup = new DaggerGroup5(this);

        // Create Player
        this.createPlayerSprites();

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

        // Create Loot
        healthLoot = this.physics.add.group();
        this.physics.add.overlap(player, healthLoot, this.pickupLoot, null, this);
        this.physics.add.overlap(playerMeleeAtk, healthLoot, this.pickupLoot, null, this);
        this.physics.add.collider(healthLoot, platforms);

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

        // SCENE SPECIFIC GAME OBJECTS

        // Reset Values
        playerLife = 175;
        enemy1Life = 150;
        enemy2Life = 160;
        enemy3Life = 140;
        playerAlive = true;
        enemy1Alive = true;
        enemy2Alive = true;
        enemy3Alive = true;
        enemy1LifeText = 150;
        enemy2LifeText = 160;
        enemy3LifeText = 140;
        lootCounter1 = 0;
        lootCounter2 = 0;
        lootCounter3 = 0;
        playerDetected = false;
        attackAnimPlaying = false;

        // Create Enemies
        enemy1 = this.physics.add.sprite(650, 400, 'enemy1')
        enemy1.setBounce(0);
        enemy1.setCollideWorldBounds(true);
        enemy1.displayWidth = game.config.width * 0.11;
        enemy1.scaleY = enemy1.scaleX;
        enemy1.body.setGravityY(300);

        enemy2 = this.physics.add.sprite(450, 400, 'enemy2')
        enemy2.setBounce(0);
        enemy2.setCollideWorldBounds(true);
        enemy2.displayWidth = game.config.width * 0.10;
        enemy2.scaleY = enemy2.scaleX;
        enemy2.body.setGravityY(300);

        enemy3 = this.physics.add.sprite(600, 400, 'drone')
        enemy3.setCollideWorldBounds(true);
        enemy3.displayWidth = game.config.width * 0.10;
        enemy3.scaleY = enemy3.scaleX;
        enemy3.body.setGravityY(5);

        laserGroup = new LaserGroup5(this);

        // Enemy Life Text
        enemy1LifeText = this.add.text(590, 20, 'Robot Life: 150', { fontSize: '15px', fill: '#ffffff' });
        enemy2LifeText = this.add.text(390, 20, 'Spy Bot Life: 160', { fontSize: '15px', fill: '#ffffff' });
        enemy3LifeText = this.add.text(190, 20, 'Drone Life: 140', { fontSize: '15px', fill: '#ffffff' });

        // Enemy Overlap
        this.physics.add.collider(enemy1, platforms);
        this.physics.add.collider(enemy2, platforms);
        this.physics.add.overlap(player, enemy1);
        this.physics.add.overlap(playerMeleeAtk, enemy1);
        this.physics.add.overlap(player, enemy2);
        this.physics.add.overlap(playerMeleeAtk, enemy2);
        this.physics.add.overlap(player, enemy3);
        this.physics.add.overlap(playerMeleeAtk, enemy3);

        // Enemy and Platform Overlap
        this.physics.add.overlap(enemy1, pf1);
        this.physics.add.overlap(enemy2, pf1);

        this.physics.add.overlap(enemy1, pf2);
        this.physics.add.overlap(enemy2, pf2);

        this.physics.add.overlap(enemy1, pf3);
        this.physics.add.overlap(enemy2, pf3);

        this.physics.add.overlap(enemy1, pf4);
        this.physics.add.overlap(enemy2, pf4);

        this.physics.add.overlap(enemy1, pf5);
        this.physics.add.overlap(enemy2, pf5);

    }

    // Constantly Updating Game Loop
    update() {
        // Scene End Condition
        if (!enemy1Alive && !enemy2Alive && !enemy3Alive) {
            soundtrack5.stop();
            robot1Move.stop();
            robot2Move.stop();
            this.scene.pause('Stage5');
            this.scene.launch('Stage5Win');
        }
        else if (!playerAlive) {
            soundtrack5.stop();
            robot1Move.stop();
            robot2Move.stop();
            this.scene.pause('Stage5');
            this.scene.launch('Stage5Die')
        }

        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.1;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.3;

        // Platform movement
        // 50 150
        pf1.setVelocityX(dir1*50);
        pf1.setVelocityY(0);
        if (pf1.body.position.x >= 30){
            dir1 = 1;
        }
        if (pf1.body.position.x <= 300){
            dir1 = -1;
        }

        pf2.setVelocityY(dir2*60);
        if (pf2.body.position.y >= 300){
            dir2 = -1;
        }
        if (pf2.body.position.y <= 100){
            dir2 = 1;
        }
        /// 150 600
        pf3.setVelocityX(dir3*70);
        pf3.setVelocityY(0);
        if (pf3.body.position.x >= 100){
            dir3 = 1;
        }
        if (pf3.body.position.x <= 500){
            dir3 = -1;
        }

        pf4.setVelocityY(dir4*40);
        if (pf4.body.position.y >= 400){
            dir4 = -1;
        }
        if (pf4.body.position.y <= 200){
            dir4 = 1;
        }

        // 600 800
        pf5.setVelocityX(dir5*50);
        pf5.setVelocityY(0);
        if (pf5.body.position.x >= 500){
            dir5 = 1;
        }
        if (pf5.body.position.x <= 800){
            dir5 = -1;
        }

        this.physics.world.collide(pf1, player, function () {
            pf1.setVelocityX(0);
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf2, player, function () {
            pf2.setVelocityX(0);
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf3, player, function () {
            pf3.setVelocityX(0);
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf4, player, function () {
            pf4.setVelocityX(0);
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf5, player, function () {
            pf5.setVelocityX(0);
            player.setVelocityX(0);
        });

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

        // Resets tints on game objects.
        this.resetTints();

        // Enemy Movement
        if (!playerDetected) {
            enemy1.anims.play('enemy1Default');
            enemy2.anims.play('enemy2Default');
            enemy3.anims.play('droneDefault');

        }
        else {
            delX1 = enemy1.body.position.x - player.body.position.x;
            delX2 = enemy2.body.position.x - player.body.position.x;
            delX3 = enemy3.body.position.x - player.body.position.x;
            delY3 = enemy3.body.position.y - player.body.position.y;
            // Player is left of enemies
            if (player.body.position.x < enemy1.body.position.x) {
                enemy1.anims.play('enemy1LeftAtk');
                if (delX1 > 160) {
                    enemy1.setVelocityX(-50);
                    robot1Move.play();
                }
                else if (delX1 < 130) {
                    enemy1.setVelocityX(50);
                    robot1Move.play();
                }
                else {
                    enemy1.setVelocityX(0);
                    if (enemy1Alive) {
                        this.shootLaser('L');
                        laserE.play();
                    }
                }
            }
            // Player is right of enemies
            else if (player.body.position.x > enemy1.body.position.x) {
                enemy1.anims.play('enemy1RightAtk');
                if (delX1 > -130) {
                    enemy1.setVelocityX(-35);
                    robot1Move.play();
                }
                else if (delX1 < -160) {
                    enemy1.setVelocityX(35);
                    robot1Move.play();
                }
                else {
                    enemy1.setVelocityX(0);
                    if (enemy1Alive){
                        this.shootLaser('R');
                        laserR.play();
                    }
                }
            }
            // Enemy 2: Faster
            if (player.body.position.x < enemy2.body.position.x) {
                enemy2.anims.play('enemy2LeftAtk');
                if (delX2 > 50) {
                    enemy2.setVelocityX(-50);
                    robot2Move.play();
                }
                else if (delX2 <= 50) {
                    enemy2.setVelocityX(50);
                    robot2Move.play();
                }
            }
            else if (player.body.position.x > enemy2.body.position.x) {
                enemy2.anims.play('enemy2RightAtk');
                if (delX2 < -50) {
                    enemy2.setVelocityX(50);
                    robot2Move.play();
                }
                else if (delX2 > -50) {
                    enemy2.setVelocityX(-50);
                    robot2Move.play();
                }
            }

            // enemy3 - flying (x and y dependent)
            // enemy3 is upper right of player
            if (player.body.position.x < enemy3.body.position.x && player.body.position.y < enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delX3 > 10 && delY3 > 10) {
                    enemy3.setVelocityX(-60);
                    enemy3.setVelocityY(-5);
                }
                else  {
                    enemy3.setVelocityX(-60);
                    enemy3.setVelocityY(-20);
                }
            }
            // enemy3 is upper left
            else if (player.body.position.x > enemy3.body.position.x && player.body.position.y < enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delX3 > 10 && delY3 > 10) {
                    enemy3.setVelocityX(60);
                    enemy3.setVelocityY(-50);
                }
                else  {
                    enemy3.setVelocityX(60);
                    enemy3.setVelocityY(-50);
                }
            }
            // enemy3 lower right
            else if (player.body.position.x < enemy3.body.position.x && player.body.position.y > enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delX3 > 10 && delY3 > 10) {
                    enemy3.setVelocityX(-60);
                    enemy3.setVelocityY(5);
                }
                else  {
                    enemy3.setVelocityX(-30);
                    enemy3.setVelocityY(30);
                }
            }
            // enemy3 lower left
            else if (player.body.position.x > enemy3.body.position.x && player.body.position.y > enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delX3 > 10 && delY3 > 10) {
                    enemy3.setVelocityX(-60);
                    enemy3.setVelocityY(-40);
                }
                else  {
                    enemy3.setVelocityX(30);
                    enemy3.setVelocityY(30);
                }
            }

            // enemy3 directly above
            else if (player.body.position.x == enemy3.body.position.x && player.body.position.y < enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delY3 > 10) {
                    enemy3.setVelocityX(10);
                    enemy3.setVelocityY(10);
                }
                else  {
                    enemy3.setVelocityX(0);
                    enemy3.setVelocityY(-50);
                }
            }

            // enemy3 directly below
            else if (player.body.position.x == enemy3.body.position.x && player.body.position.y > enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delY3 > 10) {
                    enemy3.setVelocityX(10);
                    enemy3.setVelocityY(10);
                }
                else  {
                    enemy3.setVelocityX(3);
                    enemy3.setVelocityY(30);
                }
            }

            // enemy3 directly left
            else if (player.body.position.x > enemy3.body.position.x && player.body.position.y == enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delX3 > 10) {
                    enemy3.setVelocityX(10);
                    enemy3.setVelocityY(10);
                }
                else  {
                    enemy3.setVelocityX(30);
                    enemy3.setVelocityY(3);
                }
            }

            // enemy3 directly right
            else if (player.body.position.x < enemy3.body.position.x && player.body.position.y == enemy3.body.position.y) {
                enemy3.anims.play('droneDefault');
                if (delX3 > 200) {
                    enemy3.setVelocityX(10);
                    enemy3.setVelocityY(10);
                }
                else  {
                    enemy3.setVelocityX(-30);
                    enemy3.setVelocityY(3);
                }
            }
        }


        // Checks if player is detected
        if (Math.abs(player.body.position.x - enemy1.body.position.x) <= 200) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.x - enemy2.body.position.x) <= 150) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.x - enemy3.body.position.x) <= 800) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.y - enemy3.body.position.y) <= 600) {
            playerDetected = true;
        }

        var boundsP = player.getBounds();

        var boundsE1 = enemy1.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsP, boundsE1)) && playerAlive && enemy1Alive) {
            playerLife -= 0.12
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                soundtrack5.stop();
            }
            this.updatePlayerLifeText()
            player.setTint('0xff0000');
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    player.clearTint();
                }
            })
        }

        var boundsE2 = enemy2.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsP, boundsE2)) && playerAlive && enemy2Alive) {
            playerLife -= 0.12
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                soundtrack5.stop();
            }
            this.updatePlayerLifeText()
            player.setTint('0xff0000');
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    player.clearTint();
                }
            })
        }

        var boundsE3 = enemy3.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsP, boundsE3)) && playerAlive && enemy3Alive) {
            playerLife -= 0.1
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                soundtrack5.stop();
            }
            this.updatePlayerLifeText()
            player.setTint('0xff0000');
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    player.clearTint();
                }
            })
        }

        // Update Life Text
        this.updatePlayerLifeText();
    }

    // Function that clears the tints on each object (player and enemies) each loop.
    // Necessary because Events/Callbacks not allowed in Dagger/Laser detection
    resetTints() {
        // Clear Tint
        if (enemy1Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    enemy1.clearTint();
                    enemy1Dmg = false;
                }
            })
        }
        if (enemy2Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    enemy2.clearTint();
                    enemy2Dmg = false;
                }
            })
        }
        if (enemy3Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    enemy3.clearTint();
                    enemy3Dmg = false;
                }
            })
        }
        if (playerDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    player.clearTint();
                    playerDmg = false;
                }
            })
        }
    }

    pickupLoot(player, healthLoot) {
        healthLoot.disableBody(true, true);
        if (playerLife < 90){
          playerLife += 10;
        }
        else {
          playerLife = 100
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
        playerArmFinal.body.x = player.body.x;
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
            if (enemy1Life < 20) {
              enemy1Life = 0
            }
            else {
              enemy1Life -= 20
            }
            enemy1LifeText.setText('Robot Life: ' + enemy1Life);
            enemy1.setTint('0xff0000');
            attack2_metal.play();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    enemy1.clearTint();
                }
            })
        }
        if (enemy1Life == 0 && lootCounter1 == 0) {
            var hLoot = healthLoot.create(enemy1.body.x, enemy1.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            enemy1.disableBody(true, true);
            enemy1Alive = false;
            lootCounter1 += 1
        }
    }

    updateEnemy2LifeText() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = enemy2.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && enemy2Alive) {
            if (enemy2Life < 20) {
              enemy2Life = 0
            }
            else {
              enemy2Life -= 20
            }
            enemy2LifeText.setText('Spy Bot Life: ' + enemy2Life);
            enemy2.setTint('0xff0000');
            attack2_metal.play();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    enemy2.clearTint();
                }
            })
        }
        if (enemy2Life == 0 && lootCounter2 == 0) {
            var hLoot = healthLoot.create(enemy2.body.x, enemy2.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            enemy2.disableBody(true, true);
            enemy2Alive = false;
            lootCounter2 += 1
        }
    }


    updateEnemy3LifeText() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = enemy3.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && enemy3Alive) {
            if (enemy3Life < 20) {
              enemy3Life = 0
            }
            else {
              enemy3Life -= 20
            }
            enemy3LifeText.setText('Drone Life: ' + enemy3Life);
            enemy3.setTint('0xff0000');
            attack2_metal.play();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    enemy3.clearTint();
                }
            })
        }
        if (enemy3Life == 0 && lootCounter3 == 0) {
            var hLoot = healthLoot.create(enemy3.body.x, enemy3.body.y, 'healthLoot');
            hLoot.setBounce(0.7);
            hLoot.setCollideWorldBounds(true);
            enemy3.disableBody(true, true);
            enemy3Alive = false;
            lootCounter3 += 1
        }
    }

    // Updates player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + Math.round(playerLife));
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
                        this.updateEnemy2LifeText();
                        this.updateEnemy3LifeText();
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
                        this.updateEnemy2LifeText();
                        this.updateEnemy3LifeText();
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
                playerArm.anims.play('preRangedAtk')
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

    // Function that fires lasers
    shootLaser(direction) {
        if (direction == 'L') {
            laserGroup.fireLaser(enemy1.body.position.x - 20, enemy1.body.position.y + 75, direction);
        }
        else if (direction == 'R') {
            laserGroup.fireLaser(enemy1.body.position.x + 100, enemy1.body.position.y + 75, direction);
        }
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
            playerLife -= 10;
            player.setTint('0xff0000');
            playerDmg = true;
            this.setActive(false);
            this.setVisible(false);
        }
        if (playerLife <= 0) {
            playerLife = 0;
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
            var angle = Math.atan2(-100, 250);
            this.rotation = angle;
        }
        else if (direction == 'R') {
            this.setVelocityX(250);
            this.setVelocityY(100);
            var angle = Math.atan2(-100, -250);
            this.rotation = angle;
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
            if (enemy1Life < 10){
              enemy1Life = 0
            }
            else{
              enemy1Life -= 10
            }
            this.setActive(false);
            this.setVisible(false);
            if (!playerDetected) {
                playerDetected = true;
            }
            enemy1LifeText.setText('Robot Life: ' + enemy1Life);
            enemy1.setTint('0xff0000')
            enemy1Dmg = true;
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), enemy2.getBounds())) && enemy2Alive) {
            if (enemy2Life < 10){
              enemy2Life = 0
            }
            else{
              enemy2Life -= 10
            }
            this.setActive(false);
            this.setVisible(false);
            if (!playerDetected) {
                playerDetected = true;
            }
            enemy2LifeText.setText('Spy Bot Life: ' + enemy2Life);
            enemy2.setTint('0xff0000')
            enemy2Dmg = true;
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), enemy3.getBounds())) && enemy3Alive) {
            if (enemy3Life < 10){
              enemy3Life = 0
            }
            else{
              enemy3Life -= 10
            }
            this.setActive(false);
            this.setVisible(false);
            if (!playerDetected) {
                playerDetected = true;
            }
            enemy3LifeText.setText('Drone Life: ' + enemy3Life);
            enemy3.setTint('0xff0000')
            enemy3Dmg = true;
        }
        if (enemy1Life == 0 && lootCounter1 == 0) {
            var hLoot = healthLoot.create(enemy1.body.x, enemy1.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            enemy1.disableBody(true, true);
            enemy1Alive = false;
            lootCounter1 += 1
        }

        if (enemy2Life == 0 && lootCounter2 == 0) {
            var hLoot = healthLoot.create(enemy2.body.x, enemy2.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            enemy2.disableBody(true, true);
            enemy2Alive = false;
            lootCounter2 += 1
        }

        if (enemy3Life == 0 && lootCounter3 == 0) {
            var hLoot = healthLoot.create(enemy3.body.x, enemy3.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            enemy3.disableBody(true, true);
            enemy3Alive = false;
            lootCounter3 += 1
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
