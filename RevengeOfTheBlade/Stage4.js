/*  Stage 4 SCENE

    4th stage

*/

// GLOBAL VARIABLES IN EACH SCENE
var player, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal;
var playerAlive = true;
var meleeAtkDir, rangedAtkDir, callRangedAttack, attackAnimPlaying = false;
var W, A, S, D, cursors, spaceBar, mouseX, mouseY;
var lifeText;
var sky, clouds, far, back, mid, front;
var ground, platforms, obstacles;
var daggerGroup;

// SCENE SPECIFIC VARIABLES
var buttonS4;
// enemies
var police, policeAlive = true, policeLife = 100, policeLifeText, policeDmg;
var car, carAlive = true, carLife = 100, carLifeText, carDmg;
var politician, politicianAlive = true, politicianLife = 100, politicianLifeText, politicianDmg;
var healthLoot;

// PLATFORMS
var pf1, pf2, pf3, pf4, pf5;
var dir1 = 1;
var dir2 = 1;
var dir3 = 1;
var dir4 = 1;
var dir5 = 1;
var pf1Appear = 100;
var pf2Appear = 50;
var pf3Appear = 100;
var pf4Appear = 50;
var pf5Appear = 100;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// SCENE CLASS
class Stage4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage4' });
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
        this.load.image('4sky01', 'assets/backgrounds/stage4/0sky4.png');
        this.load.image('4clouds11', 'assets/backgrounds/stage4/1clouds4.png');
        this.load.image('4far21', 'assets/backgrounds/stage4/2far4.png');
        this.load.image('4back31', 'assets/backgrounds/stage4/3back4.png');
        this.load.image('4mid41', 'assets/backgrounds/stage4/4mid4.png');
        this.load.image('4front51', 'assets/backgrounds/stage4/5front4.png');
        this.load.image('4ground11', 'assets/backgrounds/stage4/ground4.png');

        // Boss Spritesheet
        this.load.spritesheet('police', 'assets/sprites/police.png', { frameWidth: 110, frameHeight: 150 });

        // Platforms
        this.load.image('platformV', 'assets/platforms/platformV1.png');
        this.load.image('platformH', 'assets/platforms/platform-s4.png');


        // Dagger
        this.load.image('dagger', 'assets/daggers.png');

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

        // Loot
        this.load.image('healthLoot', 'assets/healthLoot.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99');

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
        sky = this.add.tileSprite(400, 300, 800, 600, '4sky01');
        clouds = this.add.tileSprite(400, 300, 800, 600, '4clouds11');
        far = this.add.tileSprite(400, 300, 800, 600, '4far21');
        back = this.add.tileSprite(400, 300, 800, 600, '4back31');
        mid = this.add.tileSprite(400, 300, 800, 600, '4mid41');
        front = this.add.tileSprite(400, 300, 800, 600, '4front51');
        ground = this.add.tileSprite(400, 300, 800, 600, '4ground11');
        this.add.existing(ground);
        sky.fixedToCamera = true;

        // Player Life Text
        lifeText = this.add.text(15, 15, 'Life: ' + playerLife, { fontSize: '25px', fill: '#ffffff' });

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 575);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }

        // Moving platforms
        pf1 = this.physics.add.image(100, 50, 'platformH');
        pf2 = this.physics.add.image(150, 150, 'platformH');
        pf3 = this.physics.add.image(200, 300, 'platformH');
        pf4 = this.physics.add.image(350, 200, 'platformH');
        pf5 = this.physics.add.image(400, 500, 'platformH')
        
        // Create Dagger Group
        daggerGroup = new DaggerGroupS4(this);

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

        // temporary buttons
        buttonS4 = this.add.text(50, 50, 'BOSS 4', { fontSize: '20px', fill: '#b5dbf7' });
        buttonS4.setInteractive();
        buttonS4.on('pointerdown', () => {
          //soundtrack5.stop();
          this.scene.stop('Stage4');
          this.scene.start('Stage4Boss');
        });

        // SCENE SPECIFIC GAME OBJECTS

        // Reset Values
        playerLife = 100;

        policeLife = 180;
        playerAlive = true;
        policeAlive = true;
        policeLifeText = 180;

        carLife = 200;
        carAlive = true;
        carAlive = true;
        carLifeText = 200;

        politicianLife = 150;
        politicianAlive = true;
        politicianAlive = true;
        politicianLifeText = 150;

        lootCounter1 = 0;
        playerDetected = false;
        attackAnimPlaying = false;

        // Create Enemies
        police = this.physics.add.sprite(650, 400, 'police')
        police.setBounce(0);
        police.setCollideWorldBounds(true);
        police.displayWidth = game.config.width * 0.1;
        police.scaleY = police.scaleX;
        police.body.setGravityY(300);

        car = this.physics.add.sprite(650, 400, 'car')
        car.setBounce(0);
        car.setCollideWorldBounds(true);
        car.displayWidth = game.config.width * 0.1;
        car.scaleY = car.scaleX;
        car.body.setGravityY(300);

        politician = this.physics.add.sprite(650, 400, 'politician')
        politician.setBounce(0);
        politician.setCollideWorldBounds(true);
        politician.displayWidth = game.config.width * 0.1;
        politician.scaleY = politician.scaleX;
        politician.body.setGravityY(300);

        // Enemy Life Text
        policeLifeText = this.add.text(590, 20, 'Police Life: 180', { fontSize: '15px', fill: '#ffffff' });
        carLifeText = this.add.text(190, 20, 'Car Battery: 200', { fontSize: '15px', fill: '#ffffff' });
        politicianLifeText = this.add.text(390, 20, 'Politician Life: 150', { fontSize: '15px', fill: '#ffffff' });


        // Enemy Overlap
        this.physics.add.collider(police, platforms);
        this.physics.add.overlap(player, police);
        this.physics.add.overlap(playerMeleeAtk, police);
        this.physics.add.overlap(player, cloud);
        this.physics.add.overlap(playerMeleeAtk, cloud);
    }

    // Constantly Updating Game Loop
    update() {
        // Scene End Condition
        if (!policeAlive) {
            this.scene.pause('Stage4');
            this.scene.launch('Stage4Win');
        }
        else if (!playerAlive) {
            this.scene.pause('Stage4Boss');
            this.scene.launch('Stage4Die')
        }

        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.3;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.1;

        // Platform movement
        pf1.setVelocityY(dir*50);
        if (pf1.body.position.y >= 100){
          dir = -1;
        }
        if (pf1.body.position.y <= 10){
          dir = 1;
        }

        pf2.setVelocityY(dir1*60);
        if (pf2.body.position.y >= 200){
          dir1 = -1;
        }
        if (pf2.body.position.y <= 100){
          dir1 = 1;
        }

        /*
        pf3.setVelocityY(dir2*70);
        if (cloud2.body.position.y >= 350){
          dir2 = -1;
        }
        if (cloud2.body.position.y <= 250){
          dir2 = 1;
        }

        pf4.setVelocityY(dir2*60);
        if (cloud2.body.position.y >= 350){
          dir2 = -1;
        }
        if (cloud2.body.position.y <= 250){
          dir2 = 1;
        }

        pf5.setVelocityY(dir2*50);
        if (cloud2.body.position.y >= 350){
          dir2 = -1;
        }
        if (cloud2.body.position.y <= 250){
          dir2 = 1;
        }
        */


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

        this.resetTints();

        if (!playerDetected) {
            police.anims.play('policeStatic');
        }
        else {
            if (player.body.position.x < police.body.position.x - 5) {
                police.anims.play('policeLeft', true);
                police.setVelocityX(-70);
            }
            else if (player.body.position.x > police.body.position.x + 5) {
                police.anims.play('policeRight', true);
                police.setVelocityX(70);
            }
            else {
                police.anims.play('policeStatic');
                police.setVelocityX(0);
            }
        }

        if (Math.abs(player.body.position.x - police.body.position.x) <= 150) {
            playerDetected = true;
        }

        var boundsPl = player.getBounds();
        var boundsV = police.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsV)) && playerAlive && policeAlive) {
            playerLife -= 0.15;
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
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
        if (policeDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    police.clearTint();
                    policeDmg = false;
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
                        // Check damage against targets
                        this.updatePoliceLife();
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
                        // Check damage against targets
                        this.updatePoliceLife();
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

    updatePoliceLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = police.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && policeAlive) {
            if (policeLife < 10) {
              policeLife = 0
            }
            else {
              policeLife -= 10
            }
            policeLifeText.setText('Police Life: ' + policeLife);
            police.setTint('0xff0000');
            attack1_creature.play();
            policeDmg = true;
        }
        if (policeLife == 0 && lootCounter1 == 0) {
            var hLootB1 = healthLoot.create(police.body.x, police.body.y, 'healthLoot');
            hLootB1.setBounce(0.5);
            hLootB1.setCollideWorldBounds(true);
            police.disableBody(true, true);
            policeAlive = false;
            lootCounter1 += 1
        }
    }

    updateCarLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = car.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && carAlive) {
            if (carLife < 10) {
                carLife = 0
            }
            else {
                carLife -= 10
            }
            carLifeText.setText('Car Battery: ' + carLife);
            car.setTint('0xff0000');
            attack2_metal.play();
            carDmg = true;
        }
        if (carLife == 0 && lootCounter1 == 0) {
            var hLootB1 = healthLoot.create(car.body.x, car.body.y, 'healthLoot');
            hLootB1.setBounce(0.5);
            hLootB1.setCollideWorldBounds(true);
            car.disableBody(true, true);
            carAlive = false;
            lootCounter1 += 1
        }
    }

    updatePoliticianLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = politician.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && politicianAlive) {
            if (politicianLife < 10) {
                politicianLife = 0
            }
            else {
                politicianLife -= 10
            }
            politicianLifeText.setText('Politician Life: ' + politicianLife);
            politician.setTint('0xff0000');
            attack1_creature1.play();
            politicianDmg = true;
        }
        if (politicianLife == 0 && lootCounter1 == 0) {
            var hLootB1 = healthLoot.create(politician.body.x, politician.body.y, 'healthLoot');
            hLootB1.setBounce(0.5);
            hLootB1.setCollideWorldBounds(true);
            politician.disableBody(true, true);
            politicianAlive = false;
            lootCounter1 += 1
        }
    }

    // Function that updates the player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + Math.round(playerLife));
    }

    // Throws Dagger
    launchDagger(aimX, aimY) {
        daggerGroup.throwDagger(player.body.x, player.body.y, aimX, aimY)
    }

}

// Dagger Group Class
class DaggerGroupS4 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: DaggerS4,
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
class DaggerS4 extends Phaser.Physics.Arcade.Sprite {
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
        // Check dagger overlap with enemies
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), police.getBounds())) && policeAlive) {
            this.setActive(false);
            this.setVisible(false);
            policeLife -= 5;
            if (!playerDetected) {
                playerDetected = true;
            }
            policeLifeText.setText('Police Life: ' + policeLife);
            police.setTint('0xff0000')
            policeDmg = true;
        }
        // Disable enemies if their health reaches 0
        if (policeLife == 0 && lootCounter1 == 0) {
            var hLoot = healthLoot.create(police.body.x, police.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            police.disableBody(true, true);
            policeAlive = false;
            lootCounter1 += 1
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
