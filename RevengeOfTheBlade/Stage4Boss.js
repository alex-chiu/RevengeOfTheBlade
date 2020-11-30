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

var helicopter, helicopterAlive = true, helicopterLife = 130, helicopterLifeText = 130, helicopterDmg = false;
var helicopter2, helicopter2Alive = true, helicopter2Life = 140, helicopter2LifeText = 140, helicopter2Dmg = false;
var tank, tankAlive = true, tankLife = 200, tankLifeText, tankDmg = false;
var ammo, missile;
var ammoGroup, missileGroup;

var dirH = 1;
var dirH2 = 1;
var lootCounter1 = 0, lootCounter1H = 0, lootCounter1T = 0;

var delXT;

var swordLoot;
var daggerLoot;
var healthLoot;
var spike, spike1, spike2;

var soundtrack4;
var warzone, missile1, missile2, shooting, tankShoot, tankMove;

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

        // Boss Spritesheets
        this.load.spritesheet('helicopter', 'assets/sprites/helicopter.png', { frameWidth: 320, frameHeight: 123 });
        this.load.spritesheet('tank', 'assets/sprites/tank.png', { frameWidth: 353, frameHeight: 125 });


        // Boss ammunition
        this.load.image('ammo', 'assets/ammo1.png');
        this.load.image('missile', 'assets/missile.png');

        this.load.image('cloud', 'assets/cloud.png');

        // Platforms
        this.load.image('platformV', 'assets/platforms/platformV1.png');
        this.load.image('platformH', 'assets/platforms/platform-s4.png');

        // Dagger
        this.load.image('dagger', 'assets/daggers.png');

        // Soundtrack
        this.load.audio('stage4Music', ['assets/audio/soundtrack/stage4.wav']);

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
        this.load.audio('warzone', ['assets/audio/soundeffects/Stage4/warzone.wav']);
        this.load.audio('missile1', ['assets/audio/soundeffects/Stage4/missile_s.wav']);
        this.load.audio('missile2', ['assets/audio/soundeffects/Stage4/missile_f.wav']);
        this.load.audio('shooting', ['assets/audio/soundeffects/Stage4/shooting.mp3']);
        this.load.audio('tankMove', ['assets/audio/soundeffects/Stage4/tank_move.mp3']);
        this.load.audio('tankShoot', ['assets/audio/soundeffects/Stage4/tank_shoot.mp3']);

        // Loot
        this.load.image('swordLoot', 'assets/swordLoot.png');
        this.load.image('spikes', 'assets/spikes1.png');
        this.load.image('healthLoot', 'assets/healthLoot.png');
    }


    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99');

        soundtrack4 = this.sound.add('stage4Music', {volume: 0.23, loop: true});
        soundtrack4.play();

        // background noise
        warzone = this.sound.add('warzone', {volume: 0.06, loop: true});
        warzone.play();
        shooting = this.sound.add('shooting', {volume: 0.07, loop: true});
        shooting.play();

        // sfx
        missile1 = this.sound.add('missile1', {volume: 0.08, loop: false});
        missile2 = this.sound.add('missile2', {volume: 0.08, loop: false});
        tankMove = this.sound.add('tankMove', {volume: 0.08, loop: true});
        tankShoot = this.sound.add('tankShoot', {volume: 0.05, loop: false});


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

        healthLoot = this.physics.add.group();
        this.physics.add.overlap(player, healthLoot, this.pickupHLoot, null, this);
        this.physics.add.overlap(playerMeleeAtk, healthLoot, this.pickupHLoot, null, this);
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
        //playerLife = Math.floor(playerLife);
        playerLife = 155;
        daggersAlive = true;
        swordAlive = true;
        playerAlive = true;

        lootCounter1 = 0;
        lootCounter1T = 0;
        lootCounter1H = 0;

        helicopterLife = 130;
        helicopterAlive = true;
        helicopterLifeText = 130;

        helicopter2Life = 140;
        helicopter2Alive = true;
        helicopter2LifeText = 140;

        tankLife = 200;
        tankAlive = true;
        tankLifeText = 200;

        playerDetected = true;
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
        helicopter = this.physics.add.sprite(20, 120, 'helicopter');
        helicopter.setCollideWorldBounds(true);
        helicopter.displayWidth = game.config.width * 0.24;
        helicopter.scaleY = helicopter.scaleX;
        //helicopter.body.setAllowGravity(false);
        helicopter.setGravityY(0);

        helicopter2 = this.physics.add.sprite(550, 220, 'helicopter');
        helicopter2.setCollideWorldBounds(true);
        helicopter2.displayWidth = game.config.width * 0.26;
        helicopter2.scaleY = helicopter2.scaleX;
        //helicopter2.body.setAllowGravity(false);
        helicopter2.setGravityY(0);

        tank = this.physics.add.sprite(650, 400, 'tank');
        tank.setBounce(0);
        tank.setCollideWorldBounds(true);
        tank.displayWidth = game.config.width * 0.4;
        tank.scaleY = tank.scaleX;
        tank.body.setGravityY(300);

        ammoGroup = new AmmoGroup4(this);
        missileGroup = new MissileGroup4(this);

        cloud = this.physics.add.image(650, 100, 'cloud');
        cloud1 = this.physics.add.image(400, 200, 'cloud');
        cloud2 = this.physics.add.image(150, 300, 'cloud');
        daggerLoot = this.physics.add.image(650, 70, 'dagger');

        // Enemy Life Text
        helicopterLifeText = this.add.text(210, 20, 'Attack Helicopter: 130', { fontSize: '13px', fill: '#ffffff' });
        helicopter2LifeText = this.add.text(435, 20, 'Missile Helicopter: 140', { fontSize: '13px', fill: '#ffffff' });
        tankLifeText = this.add.text(670, 20, 'Tank Life: 200', { fontSize: '13px', fill: '#ffffff' });

        // Enemy Overlap
        this.physics.add.collider(tank, platforms);
        this.physics.add.overlap(player, tank);
        this.physics.add.overlap(playerMeleeAtk, tank);

        this.physics.add.overlap(player, helicopter);
        this.physics.add.overlap(player, helicopter2);

        this.physics.add.overlap(playerMeleeAtk, helicopter);
        this.physics.add.overlap(playerMeleeAtk, helicopter2);

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


        this.label = this.add.text(8, 570, '', { fontSize: '16px' }).setWordWrapWidth(800);
        this.typewriteText('You have entered a warzone. Jump on the pollution clouds to collect the weapons!');
    }

    // Constantly Updating Game Loop
    update() {
        // Scene End Condition
        if (!swordAlive && !daggersAlive) {
            shooting.stop();
            warzone.stop();
            tankMove.stop();
            soundtrack4.stop();
            this.scene.pause('Stage4Boss');
            this.scene.launch('Stage4BossWin');
        }
        else if (!playerAlive) {
            shooting.stop();
            warzone.stop();
            tankMove.stop();
            soundtrack4.stop();
            this.scene.pause('Stage4Boss');
            this.scene.launch('Stage4BossDie')
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
            tank.anims.play('tankLeft');

        }
        else {
            delXT = tank.body.position.x - player.body.position.x;

            // TANK: shoot if close, else keep moving left /  right
            // Player is left of Tank
            if (player.body.position.x < tank.body.position.x) {
                if (delXT > 110) {
                    tank.anims.play('tankLeft', true);
                    tank.setVelocityX(-50);
                    tankMove.play();
                }
                else if (delXT < 80) {
                    tank.anims.play('tankLeft', true);
                    tank.setVelocityX(50);
                    tankMove.play();
                }
                else {
                    tank.anims.play('tankLeftAtk');
                    tank.setVelocityX(0);
                    if (tankAlive) {
                        this.shootAmmo('L');
                        tankShoot.play();
                    }
                }
            }
            // Player is right of tank
            else if (player.body.position.x > tank.body.position.x) {
                if (delXT > -340) {
                    tank.anims.play('tankRight', true);
                    tank.setVelocityX(-35);
                    tankMove.play();
                }
                else if (delXT < -370) {
                    tank.anims.play('tankRight', true);
                    tank.setVelocityX(35);
                    tankMove.play();
                }
                else {
                    tank.anims.play('tankRightAtk');
                    tank.setVelocityX(0);
                    if (tankAlive){
                        this.shootAmmo('R');
                        tankShoot.play();
                    }
                }
            }

        }

        // helicopter movement (steady height, fly horizontally while shooting)
        // upper heli
        helicopter.setVelocityX(dirH*70);
        helicopter.setVelocityY(5);
        if (helicopter.body.position.x >= 500){
            dirH = -1;
            helicopter.anims.play('helicopterLeft', true);
            // this.shootMissile('L');
        }
        if (helicopter.body.position.x <= 5){
            dirH = 1;
            helicopter.anims.play('helicopterRight', true);
            this.shootMissile('R');
            missile1.play();
        }
        // lower heli
        helicopter2.setVelocityX(dirH2*60);
        helicopter2.setVelocityY(5);
        if (helicopter2.body.position.x >= 550){
            dirH2 = -1;
            helicopter2.anims.play('helicopterLeft', true);
            // this.shootMissile('L');
        }
        if (helicopter2.body.position.x <= 50){
            dirH2 = 1;
            helicopter2.anims.play('helicopterRight', true);
            this.shootMissile('R');
            missile2.play();

        }



        if (Math.abs(player.body.position.x - tank.body.position.x) <= 150) {
            playerDetected = true;
        }



        var boundsPl = player.getBounds();
        var boundsT = tank.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsT)) && playerAlive && tankAlive) {
            playerLife -= 0.25;
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                soundtrack4.stop();
                warzone.stop();
                shooting.stop();
                tankMove.stop();
                tank.disableBody(true, true)
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

        var boundsHc = helicopter.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsHc)) && playerAlive && helicopterAlive) {
            playerLife -= 0.1
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                soundtrack4.stop();
                warzone.stop();
                shooting.stop();
                tankMove.stop();
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

        var boundsHc2 = helicopter2.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsHc2)) && playerAlive && helicopter2Alive) {
            playerLife -= 0.1
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
    // Necessary because Events/Callbacks not allowed in Dagger/ammo detection
    resetTints() {
        // Clear Tint
        if (tankDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    tank.clearTint();
                    tankDmg = false;
                }
            })
        }

        if (helicopterDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    helicopter.clearTint();
                    helicopterDmg = false;
                }
            })
        }

        if (helicopter2Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    helicopter2.clearTint();
                    helicopter2Dmg = false;
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
        swordAlive = false;
        playerLife += 5;

    }

    pickupHLoot(player, healthLoot) {
        healthLoot.disableBody(true, true);
        if (playerLife < 145){
          playerLife += 10;
        }
        else {
          playerLife = 155
        }
        this.updatePlayerLifeText()
    }

    pickupDag(player, daggerLoot) {
        daggerLoot.disableBody(true, true);
        daggersAlive = false;
        playerLife += 5;

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
                        this.updateTankLife();
                        this.updateHelicopterLife();
                        this.updateHelicopter2Life();
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
                        this.updateTankLife();
                        this.updateHelicopterLife();
                        this.updateHelicopter2Life();
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

    updateTankLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = tank.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && tankAlive) {
            if (tankLife < 17) {
                tankLife = 0
            }
            else {
                tankLife -= 17
            }
            tankLifeText.setText('Tank Life: ' + tankLife);
            tank.setTint('0xff0000');
            attack2_metal.play();
            tankDmg = true;
        }
        if (tankLife == 0 && lootCounter1T == 0) {
            var hLootB1 = swordLoot.create(game.config.width/2, 200, 'swordLoot');
            hLootB1.setBounce(0.5);
            hLootB1.setCollideWorldBounds(true);
            tank.disableBody(true, true);
            tankMove.stop();
            tankAlive = false;
            lootCounter1T += 1
        }
    }

    updateHelicopterLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = helicopter.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && helicopterAlive) {
            if (helicopterLife < 17) {
                helicopterLife = 0
            }
            else {
                helicopterLife -= 17
            }
            helicopterLifeText.setText('Attack Helicopter Life: ' + helicopterLife);
            helicopter.setTint('0xff0000');
            attack2_metal.play();
            helicopterDmg = true;
        }
        if (helicopterLife == 0 && lootCounter1H == 0) {
            var hLootH1 = healthLoot.create(helicopter.body.x, helicopter.body.y, 'healthLoot');
            hLootH1.setBounce(0.5);
            hLootH1.setCollideWorldBounds(true);
            helicopter.disableBody(true, true);
            helicopterAlive = false;
            lootCounter1H += 1
        }
    }

    updateHelicopter2Life() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = helicopter2.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && helicopter2Alive) {
            if (helicopter2Life < 17) {
                helicopter2Life = 0
            }
            else {
                helicopter2Life -= 17
            }
            helicopter2LifeText.setText('Missile Helicopter Life: ' + helicopter2Life);
            helicopter2.setTint('0xff0000');
            attack2_metal.play();
            helicopter2Dmg = true;
        }
        if (helicopter2Life == 0 && lootCounter1 == 0) {
            var hLootH1 = healthLoot.create(helicopter2.body.x, helicopter2.body.y, 'healthLoot');
            hLootH1.setBounce(0.5);
            hLootH1.setCollideWorldBounds(true);
            helicopter2.disableBody(true, true);
            helicopter2Alive = false;
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


    // Function that shoots ammo from tanks
    shootAmmo(direction) {
        if (direction == 'L') {
            ammoGroup.fireAmmo(tank.body.position.x - 20, tank.body.position.y + 50, direction);
        }
        else if (direction == 'R') {
            ammoGroup.fireAmmo(tank.body.position.x + 335, tank.body.position.y + 50, direction);
        }
    }

    // Function that shoots missiles from helicopters
    shootMissile(direction) {
        if (direction == 'D') {
            missileGroup.fireMissile(helicopter.body.position.x - 20, helicopter.body.position.y + 75, direction);
            missileGroup.fireMissile(helicopter2.body.position.x - 20, helicopter2.body.position.y + 75, direction);
            this.cameras.main.shake(3000, 0.004)
        }
        else if (direction == 'R') {
            missileGroup.fireMissile(helicopter.body.position.x + 200, helicopter.body.position.y - 30, direction);
            missileGroup.fireMissile(helicopter2.body.position.x + 200, helicopter2.body.position.y - 30, direction);
            this.cameras.main.shake(3000, 0.004)
        }
        else if (direction == 'L') {
            missileGroup.fireMissile(helicopter.body.position.x - 20, helicopter.body.position.y - 30, direction);
            missileGroup.fireMissile(helicopter2.body.position.x - 20, helicopter2.body.position.y - 30, direction);
            this.cameras.main.shake(3000, 0.004)
        }
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



// Ammo Group Class
class AmmoGroup4 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Ammo4,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: 'ammo'
        })
    }

    fireAmmo (x, y, direction) {
        const ammo = this.getFirstDead(false);
        if (ammo) {
            ammo.fire(x, y, direction);
        }
    }
}

// ammo Class
class Ammo4 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ammo');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y >= 528) {
            this.setActive(false);
            this.setVisible(false);
        }
        else if (Phaser.Geom.Rectangle.Overlaps(this.getBounds(), player.getBounds()) && playerAlive) {
            playerLife -= 2;
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
            soundtrack4.stop();
            shooting.stop();
            warzone.stop();
            tankMove.stop();
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


// Missile Group Class
class MissileGroup4 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Missile4,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: 'missile'
        })
    }

    fireMissile (x, y, direction) {
        const missile = this.getFirstDead(false);
        if (missile) {
            missile.fire(x, y, direction);
        }
    }
}

// Missile Class
class Missile4 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'missile');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y >= 528) {
            this.setActive(false);
            this.setVisible(false);
        }
        else if (Phaser.Geom.Rectangle.Overlaps(this.getBounds(), player.getBounds()) && playerAlive) {
            playerLife -= 5;
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
            soundtrack4.stop();
            // warzone.stop();
            // shooting.stop();
            // tankMove.stop();
        }
    }

    fire (x, y, direction) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.setGravityY(0);

        if (direction == 'D') {
            this.setVelocityX(20);
            this.setVelocityY(20);
            var angle = Math.atan2(-252, 200);
            this.rotation = 0.9;
        }
        else if (direction == 'R') {
            this.setVelocityX(50);
            this.setVelocityY(20);
            var angle = Math.atan2(300, 150);
            this.rotation = angle;
        }
        else if (direction == 'L') {
            this.setVelocityX(50);
            this.setVelocityY(20);
            var angle = Math.atan2(-300, 150);
            this.rotation = angle;
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
        // S4 RANGE DPS: 9
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), tank.getBounds())) && tankAlive) {
            if (tankLife < 9){
              tankLife = 0
              tankMove.stop();
            }
            else{
              tankLife -= 9
            }
            this.setActive(false);
            this.setVisible(false);
            if (!playerDetected) {
                playerDetected = true;
            }
            tankLifeText.setText('Tank Life: ' + tankLife);
            tank.setTint('0xff0000')
            tankDmg = true;
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), helicopter.getBounds())) && helicopterAlive) {
            if (helicopterLife < 9){
              helicopterLife = 0
            }
            else{
              helicopterLife -= 9
            }
            this.setActive(false);
            this.setVisible(false);
            if (!playerDetected) {
                playerDetected = true;
            }
            helicopterLifeText.setText('Attack Helicopter Life: ' + helicopterLife);
            helicopter.setTint('0xff0000')
            helicopterDmg = true;
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), helicopter2.getBounds())) && helicopter2Alive) {
            if (helicopter2Life < 9){
              helicopter2Life = 0
            }
            else{
              helicopter2Life -= 9
            }
            this.setActive(false);
            this.setVisible(false);
            if (!playerDetected) {
                playerDetected = true;
            }
            helicopter2LifeText.setText('Missile Helicopter Life: ' + helicopter2Life);
            helicopter2.setTint('0xff0000');
            helicopter2Dmg = true;
        }

        // Disable enemies if their health reaches 0
        if (tankLife == 0 && lootCounter1T == 0) {
            var hLoot = swordLoot.create(game.config.width/2, 200, 'swordLoot');
            tankMove.stop();
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            tank.disableBody(true, true);
            tankAlive = false;
            lootCounter1T += 1
        }
        if (helicopterLife == 0 && lootCounter1H == 0) {
            var hLootH1 = healthLoot.create(helicopter.body.x, helicopter.body.y, 'healthLoot');
            hLootH1.setBounce(0.5);
            hLootH1.setCollideWorldBounds(true);
            helicopter.disableBody(true, true);
            helicopterAlive = false;
            lootCounter1H += 1
        }
        if (helicopter2Life == 0 && lootCounter1 == 0) {
            var hLootH1 = healthLoot.create(helicopter2.body.x, helicopter2.body.y, 'healthLoot');
            hLootH1.setBounce(0.5);
            hLootH1.setCollideWorldBounds(true);
            helicopter2.disableBody(true, true);
            helicopter2Alive = false;
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
        this.setVelocityY(Math.sin(angle) * 1000);
    }
}
