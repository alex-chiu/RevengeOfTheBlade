/*  ROBOT BOSS FIGHT SCENE

    Scene for boss fight with the robot boss.
    Final stage for game.
*/

// Global Variables
var player, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal;
var meleeAtkDir, rangedAtkDir, callRangedAttack, attackAnimPlaying;
var daggerGroup;
var boss, boss1;
var bossAlive = true, boss1Alive = true;
var playerAlive = true;
var playerDetected = false, playerDetected1 = false;
var delX, atkDir, callAttack, delX1;
var laserGroup, laserGroupSecond;
var cursors, spaceBar;
var W, A, S, D;
var life = 175, bossLife = 150, boss1Life = 250;
var lifeText, bossLifeText, boss1LifeText;
var attackAnimPlaying = false;
var sky, clouds;
var far, back, mid, front;
var ground, platforms;
var soundtrack5;
var bombs;
var bossDmg = false, boss1Dmg = false;
var swordLoot, dagLoot;
var swordAlive  = true, dagsAlive = true;
var lootCounterSw = 0, lootCounterDag = 0;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;
var laserE, laserL, laserR, robot1Move, robot2Move;

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

        this.load.image('swordLoot', 'assets/swordLoot.png');

        // soundeffects
        this.load.audio('preattack1', ['assets/audio/soundeffects/player/preattack1.mp3']);
        this.load.audio('preattack2', ['assets/audio/soundeffects/player/preattack2.mp3']);
        // enemies
        this.load.audio('laserE', ['assets/audio/soundeffects/Stage5/laser_e.wav']);
        this.load.audio('laserR', ['assets/audio/soundeffects/Stage5/laser_r.wav']);
        this.load.audio('laserL', ['assets/audio/soundeffects/Stage5/laser_l.mp3']);
        this.load.audio('robotMove', ['assets/audio/soundeffects/Stage5/robot_move.wav']);
        
        
        this.load.image('pixel', 'assets/16x16.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99')

        soundtrack5 = this.sound.add('stage5Music', {volume: 0.3, loop: true});
        soundtrack5.play();

        // Enemy sound effects
        robot1Move = this.sound.add('robotMove', {volume: 0.33, loop: true});
        robot2Move = this.sound.add('robotMove', {volume: 0.33, loop: true});
        laserE = this.sound.add('laserE', {volume: 0.2, loop: false});
        laserR = this.sound.add('laserR', {volume: 0.2, loop: false});
        laserL = this.sound.add('laserL', {volume: 0.2, loop: false});
        robot1Move.play();
        robot2Move.play();

        this.cameras.main.shake(10000, 0.005);

        preattack1 = this.sound.add('preattack1', {volume: 0.15});
        preattack2 = this.sound.add('preattack2', {volume: 0.15});

        // Reset Values
        life = 175;
        bossLife = 150;
        boss1Life = 250;
        playerAlive = true;
        bossAlive = true;
        boss1Alive = true;
        playerDetected = false;
        playerDetected1 = false;
        attackAnimPlaying = false;
        swordAlive = true;
        dagsAlive = true;
        lootCounterSw = 0;
        lootCounterDag = 0

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
        lifeText = this.add.text(15, 15, 'Life: 175', { fontSize: '25px', fill: '#ffffff' });
        bossLifeText = this.add.text(580, 15, 'Android Life: 250', { fontSize: '15px', fill: '#ffffff' });
        boss1LifeText = this.add.text(350, 15, 'Robot Life: 150', { fontSize: '15px', fill: '#ffffff' });

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


        boss1 = this.physics.add.sprite(150, 400, 'robotBoss')
        boss1.setBounce(0);
        boss1.setCollideWorldBounds(true);
        boss1.displayWidth = game.config.width * 0.18;
        boss1.scaleY = boss1.scaleX;
        boss1.body.setGravityY(300);

        //boss1.disableBody(true, true);


        // Boss' Laser Attacks
        laserGroup = new LaserGroup(this);

        laserGroupSecond = new LaserGroupSecond(this);

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

        // Graphics for drawing debug line
        graphics = this.add.graphics();
        if (debug) {
            graphics.lineStyle(5, 0xFF0000, 1)
            testLine = new Phaser.Geom.Line(this, player.body.x, player.body.y - 50, player.body.x, player.body.y + 50);
        }

        // Create Loot
        swordLoot= this.physics.add.group();
        this.physics.add.overlap(player, swordLoot, this.pickupLoot, null, this);
        this.physics.add.overlap(playerMeleeAtk, swordLoot, this.pickupLoot, null, this);
        this.physics.add.collider(swordLoot, platforms);

        dagLoot = this.physics.add.group();
        this.physics.add.overlap(player, dagLoot, this.pickupLoot1, null, this);
        this.physics.add.overlap(playerMeleeAtk, dagLoot, this.pickupLoot1, null, this);
        this.physics.add.collider(dagLoot, platforms);

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

        this.physics.add.overlap(player, boss1);
        this.physics.add.overlap(playerMeleeAtk, boss1);
        this.physics.add.collider(boss1, platforms);

        // let particles = this.add.particles('pixel');

        // let emitter = particles.createEmitter({
        //     x: 100,
        //     y: 100,
        //     frame: 0,
        //     quantity: 1,
        //     frequency: 200,
        //     angle: { min: 0, max: 30 },
        //     speed: 200,
        //     gravityY: 100,
        //     lifespan: { min: 1000, max: 2000 },
        //     particleClass: Particle
        // });
    }

    // Constantly Updating Game Loop
    update() {

        //boss1.disableBody(true, true);
        //boss1.setActive(false);
        //boss1.setVisible(false);
        if (playerAlive == false) {
            soundtrack5.stop();
            this.scene.pause('RobotBossFight')
            this.scene.launch('GameOver');
        }
        if (!swordAlive && !dagsAlive) {
            soundtrack5.stop();
            robot1Move.stop();
            robot2Move.stop();
            this.scene.pause('RobotBossFight')
            this.scene.launch('GameCompleted');
        }

        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.1;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.3;

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
            this.cameras.main.shake(2000, 0.0035);
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

        this.resetTints();

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
                      laserR.play();
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
                      laserL.play();
                    }

                }
            }
        }

        if (!playerDetected) {
            boss1.anims.play('bossDefault');
        }
        else {
            delX1 = boss1.body.position.x - player.body.position.x;
            if (player.body.position.x < boss1.body.position.x) {
                boss1.anims.play('bossLeftAtk');
                if (delX1 > 150) {
                    boss1.setVelocityX(-40);
                }
                else if (delX1 < 140) {
                    boss.setVelocityX(40);
                }
                else {
                    boss.setVelocityX(0);
                    if (boss1Alive) {
                      this.shootLaser1('L');
                      laserE.play();
                    }
                }
            }
            else if (player.body.position.x > boss1.body.position.x) {
                boss1.anims.play('bossRightAtk');
                if (delX1 < -150) {
                    boss1.setVelocityX(40);
                }
                else if (delX1 > -140) {
                    boss1.setVelocityX(-40);
                }
                else {
                    boss1.setVelocityX(0);
                    if (boss1Alive){
                      this.shootLaser1('R');
                      laserE.play();
                    }

                }
            }
        }

        if (Math.abs(player.body.position.x - boss.body.position.x) <= 200) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.x - boss1.body.position.x) <= 200) {
            playerDetected = true;
        }

        var boundsPlayer = player.getBounds();
        var boundsRB = boss.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPlayer, boundsRB)) && playerAlive && bossAlive) {
            life -= 0.1
            if (life <= 0) {
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

        var boundsRB1 = boss1.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPlayer, boundsRB1)) && playerAlive && boss1Alive) {
            life -= 0.13
            if (life <= 0) {
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

        //boss1.setActive(false);
        //boss1.setVisible(false);

        // Debug Player and Boss Locations
        if (debug) {
            console.log("Player X Location:" + player.body.position.x);
            console.log("Boss X Location:" + boss.body.position.x);
        }

        this.updatePlayerLifeText();
    }

    resetTints() {
        // Clear Tint
        if (bossDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    boss.clearTint();
                    bossDmg = false;
                }
            })
        }

        if (boss1Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    boss1.clearTint();
                    boss1Dmg = false;
                }
            })
        }
    }

    pickupLoot(player, swordLoot) {
        swordLoot.disableBody(true, true);
        swordAlive = false
    }

    pickupLoot1(player, dagLoot) {
        dagLoot.disableBody(true, true);
        dagsAlive = false
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
        player = this.physics.add.sprite(400, 475, 'hero');
        player.setBounce(0.25);
        player.setCollideWorldBounds(true);
        player.displayWidth = game.config.width * 0.075;
        player.scaleY = player.scaleX;
        player.body.setGravityY(300);

        // Melee attack sprite
        playerMeleeAtk = this.physics.add.sprite(400, 475, 'hero_attack');
        playerMeleeAtk.setBounce(0.25);
        playerMeleeAtk.setCollideWorldBounds(true);
        playerMeleeAtk.displayWidth = game.config.width * 0.128;
        playerMeleeAtk.scaleY = playerMeleeAtk.scaleX;
        playerMeleeAtk.body.setGravityY(300);
        playerMeleeAtk.visible = false;

        // Player walking sprite with no arm (plays when casting ranged attack)
        playerWalkNA = this.physics.add.sprite(400, 475, 'hero_walk_no_arm');
        playerWalkNA.setBounce(0.25);
        playerWalkNA.setCollideWorldBounds(true);
        playerWalkNA.displayWidth = game.config.width * 0.075;
        playerWalkNA.scaleY = playerWalkNA.scaleX;
        playerWalkNA.body.setGravityY(300);
        playerWalkNA.visible = false;

        // Player arm sprite
        playerArm = this.physics.add.sprite(400, 475, 'hero_ranged_attack_arm');
        playerArm.setBounce(0.25);
        playerArm.setCollideWorldBounds(true);
        playerArm.displayWidth = game.config.width * 0.075;
        playerArm.scaleY = playerArm.scaleX;
        playerArm.body.setGravityY(300);
        playerArm.visible = false;

        // Final frame of player arm sprite (rotated based on projectile direction)
        playerArmFinal = this.physics.add.sprite(400, 475, 'hero_ranged_attack_arm_final');
        playerArmFinal.setBounce(0.25);
        playerArmFinal.setCollideWorldBounds(true);
        playerArmFinal.displayWidth = game.config.width * 0.110;
        playerArmFinal.scaleY = playerArmFinal.scaleX;
        playerArmFinal.body.setGravityY(300);
        playerArmFinal.visible = false;
    }

    bombAttack(player, bomb) {
      if (life < 5){
        life = 0
      }
      else{
        life -= 5
      }
      lifeText.setText('Life: ' + life);
      player.setTint('0xff0000')
      this.time.addEvent({
          delay: 400,
          callback: () => {
              player.clearTint();
          }
      })
      bomb.disableBody(true, true);
      bomb.setActive(false);
      bomb.setVisible(false);

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
            if (bossLife < 20){
              bossLife = 0
            }
            else{
              bossLife -= 20
            }
            bossLifeText.setText('Android Life: ' + bossLife);
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
        if (bossLife == 0 && lootCounterSw == 0) {
            var hLootB1 = swordLoot.create(600, 200, 'swordLoot');
            hLootB1.setBounce(0.5);
            hLootB1.setCollideWorldBounds(true);
            boss.disableBody(true, true);
            bossAlive = false;
            lootCounterSw += 1
        }
    }

    updateBossLifeText1() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB1 = boss1.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB1)) && boss1Alive) {
            if (boss1Life < 20){
              boss1Life = 0
            }
            else{
              boss1Life -= 20
            }
            boss1LifeText.setText('Robot Life: ' + boss1Life);
            boss1.setTint('0xff0000')
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    boss1.clearTint();
                }
            })
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            //bomb.allowGravity = false;
        }
        if (boss1Life == 0 && lootCounterDag == 0) {
            var hLootB2 = dagLoot.create(400, 200, 'dagger');
            hLootB2.setBounce(0.5);
            hLootB2.setCollideWorldBounds(true);
            boss1.disableBody(true, true);
            boss1Alive = false;
            lootCounterDag += 1
        }
    }

    // Updates player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + Math.round(life));
    }

    // Function that fires laser from boss
    shootLaser(direction) {
        if (direction == 'L') {
            laserGroup.fireLaser(boss.body.position.x - 10, boss.body.position.y + 80, direction);
        }
        else {
            laserGroup.fireLaser(boss.body.position.x + 125, boss.body.position.y + 95, direction);
        }
    }

    shootLaser1(direction) {
        if (direction == 'L') {
            laserGroupSecond.fireLaser1(boss1.body.position.x - 10, boss1.body.position.y + 80, direction);
        }
        else {
            laserGroupSecond.fireLaser1(boss1.body.position.x + 125, boss1.body.position.y + 95, direction);
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
                        this.updateBossLifeText();
                        this.updateBossLifeText1();
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
                        this.updateBossLifeText();
                        this.updateBossLifeText1();
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

class LaserGroupSecond extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: LaserSecond,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: 'laser'
        })
    }

    fireLaser1 (x, y, direction) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire1(x, y, direction);
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
            if (life < 8){
              life = 0
            }
            else{
              life -= 8;
              this.setActive(false);
              this.setVisible(false);
            }

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
            var angle = Math.atan2(-100, 250);
            this.rotation = angle;
        }
        else if (direction == 'R') {
            this.setVelocityX(250);
            this.rotation = Math.PI;
        }
    }
}

class LaserSecond extends Phaser.Physics.Arcade.Sprite {
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
            if (life < 8){
              life = 0
            }
            else{
              life -= 8;
              this.setActive(false);
              this.setVisible(false);
            }
        }
        if (life == 0) {
            player.disableBody(true, true);
            player.setActive(false);
            player.setVisible(false);
            playerAlive = false;
            soundtrack5.stop();
        }
    }


    fire1 (x, y, direction) {
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
            this.rotation = Math.PI;
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
            if (bossLife < 10){
              bossLife = 0
            }
            else{
              bossLife -= 10
            }
            this.setActive(false);
            this.setVisible(false);

            if (!playerDetected) {
                playerDetected = true;
            }

            bossLifeText.setText('Android Life: ' + bossLife);
            boss.setTint('0xff0000');
            bossDmg = true;

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }

        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), boss1.getBounds())) && boss1Alive) {
            if (boss1Life < 10){
              boss1Life = 0
            }
            else{
              boss1Life -= 10
            }
            this.setActive(false);
            this.setVisible(false);

            if (!playerDetected) {
                playerDetected = true;
            }

            boss1LifeText.setText('Robot Life: ' + boss1Life);
            boss1.setTint('0xff0000');
            boss1Dmg = true;

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }

        if (bossLife == 0 && lootCounterSw == 0) {
            var hLoot = swordLoot.create(700, 200, 'swordLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            bossAlive = false;
            boss.disableBody(true, true);
            lootCounterSw += 1
        }

        if (boss1Life == 0 && lootCounterDag == 0) {
            var hLoot = dagLoot.create(700, 200, 'dagger');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            boss1Alive = false;
            boss1.disableBody(true, true);
            lootCounterDag += 1
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
