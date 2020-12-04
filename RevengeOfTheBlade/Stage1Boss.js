/*  Boss 1 SCENE

    BOSS of 1st stage

*/

// GLOBAL VARIABLES IN EACH SCENE
var player, playerLife, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal;
var playerAlive = true;
var meleeAtkDir, rangedAtkDir, callRangedAttack, attackAnimPlaying = false;
var W, A, S, D, cursors, spaceBar, mouseX, mouseY;
var lifeText;
var sky, clouds, far, back, mid, front;
var ground, platforms, obstacles;
var daggerGroup;

// SCENE SPECIFIC VARIABLES
var button1B;
var textAlive = true;

var trex, trexAlive = true, trexLife = 170, trexLifeText, trexDmg;
var healthLoot;
var lavaF;

var balloon;
var balloonAlive = true;
var dirB = 1, dirDa = 1;
var dags, dagsAlive = true;
var swordLoot, swordAlive = true;

var soundtrack1;
var trexMove;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// SCENE CLASS
class Stage1Boss extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage1Boss' });
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

        // Boss Spritesheet
        this.load.spritesheet('trex', 'assets/sprites/trex.png', { frameWidth: 470, frameHeight: 245 });

        // Lava
        this.load.image('lava', 'assets/lava.png');

        // Platforms
        this.load.image('platformV', 'assets/platforms/platformV1.png');
        this.load.image('platformH', 'assets/platforms/platformH.png');

        // Dagger
        this.load.image('dagger', 'assets/daggers.png');
        this.load.image('daggerB', 'assets/daggersBalloon.png');
        this.load.image('balloon', 'assets/balloon2.png');

        // Sound Effects
        // Soundtrack
        this.load.audio('stage1Music', ['assets/audio/soundtrack/stage1.wav']);

        // Melee
        this.load.audio('preattack1', ['assets/audio/soundeffects/player/preattack1.mp3']);
        this.load.audio('attack1_metal', ['assets/audio/soundeffects/player/attack1_metal.mp3']);
        this.load.audio('attack1_object', ['assets/audio/soundeffects/player/attack1_object.mp3']);
        this.load.audio('attack1_platform', ['assets/audio/soundeffects/player/attack1_platform.mp3']);
        this.load.audio('attack1_creature', ['assets/audio/soundeffects/player/attack1_creature.mp3']);

        // Range
        this.load.audio('preattack2', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_throw', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_metal', ['assets/audio/soundeffects/player/preattack2.mp3']);
        // Both
        this.load.audio('attack_noenemy', ['assets/audio/soundeffects/player/attack1_noenemy.mp3']);
        // Enemy
        this.load.audio('trexMove', ['assets/audio/soundeffects/Stage1/trex_move.wav']);
        // Loot
        this.load.image('healthLoot', 'assets/healthLoot.png');
        this.load.image('swordLoot', 'assets/swordLoot.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99');
        soundtrack1 = this.sound.add('stage1Music', {volume: 0.35, loop: true});
        soundtrack1.play();

        this.cameras.main.shake(8000, 0.005);

        // Player attack sound effects
        preattack1 = this.sound.add('preattack1', {volume: 0.15});
        attack1_metal = this.sound.add('attack1_metal', {volume: 0.15});
        attack1_object = this.sound.add('attack1_object', {volume: 0.15});
        attack1_platform = this.sound.add('attack1_platform', {volume: 0.15});
        preattack2 = this.sound.add('preattack2', {volume: 0.15});
        attack2_throw = this.sound.add('attack2_throw', {volume: 0.15});
        attack2_metal = this.sound.add('attack2_metal', {volume: 0.15});
        attack_noenemy = this.sound.add('attack_noenemy', {volume: 0.15});
        // Enemy sound effect
        trexMove = this.sound.add('trexMove', {volume: 0.4, loop: true});
        trexMove.play();

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
        daggerGroup = new DaggerGroupS1B(this);

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
        swordLoot = this.physics.add.group();
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

        // SCENE SPECIFIC GAME OBJECTS

        // Reset Values
        //playerLife = Math.floor(playerLife);
        playerLife = 100;
        trexLife = 170;
        playerAlive = true;
        trexAlive = true;
        trexLifeText = 170;
        lootCounter1 = 0;
        playerDetected = false;
        attackAnimPlaying = false;
        dirB = 1;
        dirDa = 1;
        balloonAlive = true;
        textAlive = true;
        dagsAlive = true;
        swordAlive = true;

        // Create Enemies
        trex = this.physics.add.sprite(650, 400, 'trex')
        trex.setBounce(0);
        trex.setCollideWorldBounds(true);
        trex.displayWidth = game.config.width * 0.4;
        trex.scaleY = trex.scaleX;
        trex.body.setGravityY(300);

        // Enemy Life Text
        trexLifeText = this.add.text(590, 20, 'T-Rex Life: 170', { fontSize: '15px', fill: '#ffffff' });

        balloon = this.physics.add.image(150, 100, 'balloon');
        balloon.body.setAllowGravity(false);
        dags = this.physics.add.image(150, 155, 'daggerB');
        dags.body.setAllowGravity(false);

        // Enemy Overlap
        this.physics.add.collider(trex, platforms);
        this.physics.add.overlap(player, trex);
        this.physics.add.overlap(playerMeleeAtk, trex);
        this.physics.add.collider(dags, platforms);
        this.physics.add.overlap(player, dags, this.pickupDag, null, this);
        this.physics.add.overlap(playerMeleeAtk, dags, this.pickupDag, null, this);

        this.label = this.add.text(13, 563, '', { fontSize: '16px' }).setWordWrapWidth(800);
        this.typewriteText('In boss fights, collect both the daggers and sword to win. \nA volcano has erupted! Avoid contact with lava.');


        lavaF = this.physics.add.group();
        // this.physics.add.collider(lavaF, platforms);
        this.physics.add.collider(player, lavaF, this.lavaFall, null, this);

        //game.input.onDown.addOnce(this.label.destroy());
        /*this.label.on('pointerdown', () => {
          //soundtrack5.stop();
          this.label.destroy();
        });*/
    }

    // Constantly Updating Game Loop
    update() {
        // Scene End Condition
        if (!swordAlive && !dagsAlive) {
            trex.disableBody(true, true);
            trexAlive = false;
            trexMove.stop();
            soundtrack1.stop();
            this.scene.pause('Stage1Boss');
            this.scene.launch('Stage1BossWin');

        }
        else if (!playerAlive) {
            trexMove.stop();
            this.scene.pause('Stage1Boss');
            this.scene.launch('Stage1BossDie');
            soundtrack1.stop();
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

        // Enemy Movement
        if (!playerDetected) {
            trex.anims.play('trexStatic');
        }
        else {
            if (player.body.position.x < trex.body.position.x - 5) {
                trex.anims.play('trexLeft', true);
                trex.setVelocityX(-70);
                trexMove.play();
            }
            else if (player.body.position.x > trex.body.position.x + 5) {
                trex.anims.play('trexRight', true);
                trex.setVelocityX(70);
                trexMove.play();
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
            if (playerLife < 0.15){
              playerLife = 0
            }
            else{
              playerLife -= 0.15;
            }
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


        balloon.setVelocityX(dirB*70);
        if (balloon.body.position.x >= 650){
          dirB = -1;
        }
        if (balloon.body.position.x <= 10){
          dirB = 1;
        }

        if (balloonAlive){
          dags.setVelocityX(dirDa*70);
          if (dags.body.position.x >= 650){
            dirDa = -1;
          }
          if (dags.body.position.x <= 10){
            dirDa = 1;
          }
        }
        else{
          dags.setVelocityX(0);
        }

        if (trexLife <= 50){
          this.label.destroy();
          textAlive = false;
        }

        // Update Life Text
        this.updatePlayerLifeText();
    }

    removeText(){
      this.label.destroy();
    }

    typewriteText(text){
      const length = text.length
      let i = 0
      this.time.addEvent({
        callback: () => {
          if (textAlive){
            this.label.text += text[i]
            ++i
          }

        },
        repeat: length -1,
        delay: 40
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
        trexMove.stop();
        swordAlive = false;
    }

    pickupDag(player, dags) {
        dags.disableBody(true, true);
        dagsAlive = false
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

    // Falling
    lavaFall(player, lava) {
        if (playerLife < 6){
          playerLife = 0
        }
        else{
          playerLife -= 6;
        }
        lifeText.setText('Life: ' + playerLife);
        player.setTint('0xff0000')
        this.time.addEvent({
            delay: 400,
            callback: () => {
                player.clearTint();
            }
        })
        lava.disableBody(true, true);
        lava.setActive(false);
        lava.setVisible(false);

        if (playerLife == 0) {
            player.disableBody(true, true);
            player.setActive(false);
            player.setVisible(false);
            playerAlive = false;
            soundtrack1.stop();
        }
    }

    // Function to update T-rex life
    updateTRexLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = trex.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && trexAlive) {
            if (trexLife < 12){
              trexLife = 0
            }
            else{
              trexLife -= 12
            }
            trexLifeText.setText('T-Rex Life: ' + trexLife);
            trex.setTint('0xff0000');
		    attack1_creature.play();
            trexDmg = true;

            var x0 = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var x1 = Phaser.Math.Between(50, 750);
            var x2 = Phaser.Math.Between(200, 600);
            var lava0 = lavaF.create(x0, 10, 'lava');
            var lava1 = lavaF.create(x1, 20, 'lava');
            var lava2 = lavaF.create(x2, 30, 'lava');
            lava0.setBounce(1);
            lava1.setBounce(0.5);
            lava2.setBounce(1);
            lava0.setVelocity(Phaser.Math.Between(-200, 200), 20);
            lava1.setVelocity(Phaser.Math.Between(-100, 0), 30);
            lava2.setVelocity(Phaser.Math.Between(0, 100), 40);
        }
        if (trexLife == 0 && lootCounter1 == 0) {
            var hLootB1 = swordLoot.create(game.config.width/2, 200, 'swordLoot');
            hLootB1.setBounce(0.5);
            hLootB1.setCollideWorldBounds(true);
            trex.disableBody(true, true);
            trexAlive = false;
            lootCounter1 += 1

            var x0 = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var x1 = Phaser.Math.Between(50, 750);
            var x2 = Phaser.Math.Between(200, 600);
            var lava0 = lavaF.create(x0, 10, 'lava');
            var lava1 = lavaF.create(x1, 20, 'lava');
            var lava2 = lavaF.create(x2, 30, 'lava');
            lava0.setBounce(1);
            lava1.setBounce(0.5);
            lava2.setBounce(1);
            lava0.setVelocity(Phaser.Math.Between(-200, 200), 20);
            lava1.setVelocity(Phaser.Math.Between(-100, 0), 30);
            lava2.setVelocity(Phaser.Math.Between(0, 100), 40);

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
class DaggerGroupS1B extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: DaggerS1B,
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
class DaggerS1B extends Phaser.Physics.Arcade.Sprite {
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
            if (trexLife < 6){
              trexLife = 0
            }
            else{
              trexLife -= 6
            }
            this.setActive(false);
            this.setVisible(false);
            if (!playerDetected) {
                playerDetected = true;
            }
            trexLifeText.setText('T-Rex Life: ' + trexLife);
            trex.setTint('0xff0000')
            trexDmg = true;

            var x0 = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var x1 = Phaser.Math.Between(50, 750);
            var x2 = Phaser.Math.Between(200, 600);
            var lava0 = lavaF.create(x0, 10, 'lava');
            var lava1 = lavaF.create(x1, 20, 'lava');
            var lava2 = lavaF.create(x2, 30, 'lava');
            lava0.setBounce(1);
            lava1.setBounce(0.5);
            lava2.setBounce(1);
            lava0.setVelocity(Phaser.Math.Between(-200, 200), 20);
            lava1.setVelocity(Phaser.Math.Between(-100, 0), 30);
            lava2.setVelocity(Phaser.Math.Between(0, 100), 40);


        }

        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), balloon.getBounds())) && balloonAlive) {
            balloon.disableBody(true, true);
            balloonAlive = false;
            dags.body.setAllowGravity(true);
            dags.setCollideWorldBounds(true);
            dags.setBounce(0.3);
            var x0 = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var x1 = Phaser.Math.Between(50, 750);
            var x2 = Phaser.Math.Between(200, 600);
            var lava0 = lavaF.create(x0, 10, 'lava');
            var lava1 = lavaF.create(x1, 20, 'lava');
            var lava2 = lavaF.create(x2, 30, 'lava');
            lava0.setBounce(1);
            lava1.setBounce(0.5);
            lava2.setBounce(1);
            lava0.setVelocity(Phaser.Math.Between(-200, 200), 20);
            lava1.setVelocity(Phaser.Math.Between(-100, 0), 30);
            lava2.setVelocity(Phaser.Math.Between(0, 100), 40);
        }

        // Disable trex if health reaches 0
        if (trexLife == 0 && lootCounter1 == 0) {
            var hLoot = swordLoot.create(game.config.width/2, 200, 'swordLoot');
            hLoot.setBounce(0.5);
            // hLoot.setCollideWorldBounds(true);
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
