/*  Boss 4 SCENE

    Boss 4th stage

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
var buttonB4;

var cloud;
var cloud1;
var cloud2;
var dir = 1;
var dir1 = 1;
var dir2 = 1;
var dirC = 1;
var cloudLife0 = 10;
var cloud1Life = 8;
var cloud2Life = 100;
var daggersAlive = true, swordAlive = true;
var textAlive5 = true;

var trex, trexAlive = true, trexLife = 100, trexLifeText, trexDmg;
var swordLoot;
var daggerLoot;
var spike, spike1, spike2;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// SCENE CLASS
class Stage4Boss extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage4Boss' });
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
        this.load.spritesheet('trex', 'assets/sprites/trex.png', { frameWidth: 470, frameHeight: 245 });

        this.load.image('cloud', 'assets/cloud.png');

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
        this.load.image('swordLoot', 'assets/swordLoot.png');
        this.load.image('spikes', 'assets/spikes1.png');
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
        ground = this.add.tileSprite(400, 312, 800, 600, '4ground11');
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

        // Create Dagger Group
        daggerGroup = new DaggerGroupB4(this);

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
        swordLoot= this.physics.add.group();
        this.physics.add.overlap(player, swordLoot, this.pickupLoot, null, this);
        this.physics.add.overlap(playerMeleeAtk, swordLoot, this.pickupLoot, null, this);
        this.physics.add.collider(swordLoot, platforms);

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
        buttonB4 = this.add.text(50, 50, 'STAGE 5', { fontSize: '20px', fill: '#b5dbf7' });
        buttonB4.setInteractive();
        buttonB4.on('pointerdown', () => {
          //soundtrack5.stop();
          this.scene.stop('Stage4Boss');
          this.scene.start('Stage5');
        });

        // SCENE SPECIFIC GAME OBJECTS

        // Reset Values
        //playerLife = Math.floor(playerLife);
        playerLife = 100;
        trexLife = 100;
        playerAlive = true;
        trexAlive = true;
        daggersAlive = true;
        swordAlive = true;
        trexLifeText = 100;
        lootCounter1 = 0;
        playerDetected = false;
        attackAnimPlaying = false;
        dir = 1;
        dir1 = 1;
        dir2 = 1;
        dirC = 1;
        cloudLife0 = 10;
        cloud1Life = 8;
        cloud2Life = 100;
        textAlive5 = true;


        // Create Enemies
        trex = this.physics.add.sprite(650, 400, 'trex')
        trex.setBounce(0);
        trex.setCollideWorldBounds(true);
        trex.displayWidth = game.config.width * 0.4;
        trex.scaleY = trex.scaleX;
        trex.body.setGravityY(300);

        cloud = this.physics.add.image(650, 100, 'cloud')
        cloud1 = this.physics.add.image(400, 200, 'cloud')
        cloud2 = this.physics.add.image(150, 300, 'cloud')
        daggerLoot = this.physics.add.image(650, 70, 'dagger')

        // Enemy Life Text
        trexLifeText = this.add.text(590, 20, 'T-Rex Life: 100', { fontSize: '15px', fill: '#ffffff' });

        // Enemy Overlap
        this.physics.add.collider(trex, platforms);
        this.physics.add.overlap(player, trex);
        this.physics.add.overlap(playerMeleeAtk, trex);

        this.physics.add.overlap(player, cloud);
        this.physics.add.overlap(playerMeleeAtk, cloud);
        this.physics.add.overlap(player, cloud1);
        this.physics.add.overlap(playerMeleeAtk, cloud1);
        this.physics.add.overlap(player, cloud2);
        this.physics.add.overlap(playerMeleeAtk, cloud2);
        this.physics.add.overlap(player, daggerLoot, this.pickupDag, null, this);
        this.physics.add.overlap(playerMeleeAtk, daggerLoot, this.pickupDag, null, this);

        spike = this.physics.add.image(250, 500, 'spikes');
        spike.displayWidth = 50
        spike.displayHeight = 20
        spike1 = this.physics.add.image(400, 500, 'spikes');
        spike1.displayWidth = 50
        spike1.displayHeight = 20
        spike2 = this.physics.add.image(700, 500, 'spikes');
        spike2.displayWidth = 50
        spike2.displayHeight = 20

        this.physics.add.collider(spike, platforms);
        this.physics.add.collider(spike1, platforms);
        this.physics.add.collider(spike2, platforms);


        this.label = this.add.text(13, 570, '', { fontSize: '20px' }).setWordWrapWidth(800);
        this.typewriteText('Jump on the clouds to collect the daggers! If you fail, try again');
    }

    // Constantly Updating Game Loop
    update() {
        // Scene End Condition
        if (!swordAlive && !daggersAlive) {
            this.scene.pause('Stage4Boss');
            this.scene.launch('Stage4BossWin');
        }
        else if (!playerAlive) {
            this.scene.pause('Stage4Boss');
            this.scene.launch('Stage4BossDie')
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

        this.resetTints();

        cloud.setVelocityY(dir*70);
        if (cloud.body.position.y >= 100){
          dir = -1;
        }
        if (cloud.body.position.y <= 10){
          dir = 1;
        }

        cloud1.setVelocityY(dir1*70);
        if (cloud1.body.position.y >= 200){
          dir1 = -1;
        }
        if (cloud1.body.position.y <= 100){
          dir1 = 1;
        }

        cloud2.setVelocityY(dir2*70);
        if (cloud2.body.position.y >= 350){
          dir2 = -1;
        }
        if (cloud2.body.position.y <= 250){
          dir2 = 1;
        }

        daggerLoot.setVelocityY(dir*70);
        if (daggerLoot.body.position.y >= 100){
          dirC = -1;
        }
        if (daggerLoot.body.position.y <= 10){
          dirC = 1;
        }

        // Enemy Movement
        if (!playerDetected) {
            trex.anims.play('trexStatic');
        }
        else {
            if (player.body.position.x < trex.body.position.x - 5) {
                trex.anims.play('trexLeft', true);
                trex.setVelocityX(-70);
            }
            else if (player.body.position.x > trex.body.position.x + 5) {
                trex.anims.play('trexRight', true);
                trex.setVelocityX(70);
            }
            else {
                trex.anims.play('trexStatic');
                trex.setVelocityX(0);
            }
        }

        if (Math.abs(player.body.position.x - trex.body.position.x) <= 150) {
            playerDetected = true;
        }

        var boundsPl = player.getBounds();
        var boundsV = trex.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsV)) && playerAlive && trexAlive) {
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

        var boundsC = cloud.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsC)) && playerAlive && cloudLife0 > 0) {
            cloudLife0 -= 0.05;
            if (cloudLife0 <= 0) {
                cloud.disableBody(true, true);
            }
        }

        var boundsC1 = cloud1.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsC1)) && playerAlive && cloud1Life > 0) {
            cloud1Life -= 0.05;
            if (cloud1Life <= 0) {
                cloud1.disableBody(true, true);
            }
        }

        var boundsC2 = cloud2.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsC2)) && playerAlive && cloud2Life > 0) {
            cloud2Life -= 0.05;
            if (cloud2Life <= 0) {
                cloud2.disableBody(true, true);
            }
        }

        var boundsSp = spike.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsSp)) && playerAlive) {
            playerLife -= 0.2;
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

        var boundsSp1 = spike1.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsSp1)) && playerAlive) {
            playerLife -= 0.2;
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

        var boundsSp2 = spike2.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsSp2)) && playerAlive) {
            playerLife -= 0.2;
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

        if (D.isDown && this.label.text.length == 65){
          this.label.destroy();
          textAlive5 = false;
        }

        // Update Life Text
        this.updatePlayerLifeText();
    }

    typewriteText(text){
      const length = text.length
      let i = 0
      this.time.addEvent({
        callback: () => {
          if (textAlive5){
            this.label.text += text[i]
            ++i
          }

        },
        repeat: length -1,
        delay: 30
      })
    }


    // Function that clears the tints on each object (player and enemies) each loop.
    // Necessary because Events/Callbacks not allowed in Dagger/Laser detection
    resetTints() {
        // Clear Tint
        if (trexDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    trex.clearTint();
                    trexDmg = false;
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

    pickupLoot(player, swordLoot) {
        swordLoot.disableBody(true, true);
        swordAlive = false
    }

    pickupDag(player, daggerLoot) {
        daggerLoot.disableBody(true, true);
        daggersAlive = false
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
                        this.updateTRexLife();
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
                        this.updateTRexLife();
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

    updateTRexLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = trex.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && trexAlive) {
            if (trexLife < 10) {
              trexLife = 0
            }
            else {
              trexLife -= 10
            }
            trexLifeText.setText('T-Rex Life: ' + trexLife);
            trex.setTint('0xff0000');
            attack2_metal.play();
            trexDmg = true;
        }
        if (trexLife == 0 && lootCounter1 == 0) {
            var hLootB1 = swordLoot.create(game.config.width/2, 200, 'swordLoot');
            hLootB1.setBounce(0.5);
            hLootB1.setCollideWorldBounds(true);
            trex.disableBody(true, true);
            trexAlive = false;
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
class DaggerGroupB4 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: DaggerB4,
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
class DaggerB4 extends Phaser.Physics.Arcade.Sprite {
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
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), trex.getBounds())) && trexAlive) {
            this.setActive(false);
            this.setVisible(false);
            trexLife -= 5;
            if (!playerDetected) {
                playerDetected = true;
            }
            trexLifeText.setText('T-Rex Life: ' + trexLife);
            trex.setTint('0xff0000')
            trexDmg = true;
        }
        // Disable enemies if their health reaches 0
        if (trexLife == 0 && lootCounter1 == 0) {
            var hLoot = swordLoot.create(game.config.width/2, 200, 'swordLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            trex.disableBody(true, true);
            trexAlive = false;
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
