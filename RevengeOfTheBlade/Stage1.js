/*  STAGE 1 SCENE

    1st stage of game.
    Prehistoric era
*/

// GLOBAL VARIABLES IN EACH SCENE
var player, playerMeleeAtk, playerWalkNA, playerArm, playerArmFinal;
var playerAlive = true;
var meleeAtkDir, rangedAtkDir, callRangedAttack, attackAnimPlaying = false;
var W, A, S, D, cursors, spaceBar, mouseX, mouseY;
var playerLife = 100;
var lifeText;
var sky, clouds, far, back, mid, front;
var ground, platforms, obstacles;
var daggerGroup;
var nextAttack;

// SCENE SPECIFIC VARIABLES
var button1;
var soundtrack1;

var raptor, ptero, ptero2;
var delX, delY, delX2, delY2;
var raptorLife = 80, pteroLife = 50,  ptero2Life = 50;
var raptorAlive = true, pteroAlive = 50, ptero2Alive = 50;
var raptorLifeText = 80, pteroLifeText = 50, ptero2LifeText = 50;
var raptorDmg = false, pteroDmg = false, ptero2Dmg = false;

var healthLoot;
var lootCounter3S = 0;
var lootCounter1S = 0;
var lootCounter2S = 0;

// PLATFORMS
var pf1, pf2, pf3, pf4, pf5;
var dir1 = 1;
var dir2 = 1;
var dir3 = 1;
var dir4 = 1;
var dir5 = 1;


// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// SFX
var attack1_creature, attack1_creature1, ptero_wingflap;

// SCENE CLASS
class Stage1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage1' });
    }

    // Preload Images and Sprites
    preload() {
        // Hero Spritesheets
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm', 'assets/sprites/ranged-attack/hero-attack2-arm-sprite.png', { frameWidth: 145, frameHeight: 230 });
        this.load.spritesheet('hero_walk_no_arm', 'assets/sprites/ranged-attack/hero-walk-sprite-noarm.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm_final', 'assets/sprites/ranged-attack/attack2-throw.png', { frameWidth: 220, frameHeight: 230 });

        // enemy spritesheet
        this.load.spritesheet('raptor', 'assets/sprites/velociraptor.png', { frameWidth: 312, frameHeight: 250 });
        this.load.spritesheet('ptero', 'assets/sprites/pterodactyl.png', { frameWidth: 310, frameHeight: 195 });

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
        this.load.image('platform1', 'assets/platforms/platform-s1.png');

        // Dagger
        this.load.image('dagger', 'assets/daggers.png');

        // Sound Effects
        // Soundtrack
        this.load.audio('stage1Music', ['assets/audio/soundtrack/stage1.wav']);
        // Melee
        this.load.audio('preattack1', ['assets/audio/soundeffects/player/preattack1.mp3']);
        this.load.audio('attack1_metal', ['assets/audio/soundeffects/player/attack1_metal.mp3']);
        this.load.audio('attack1_object', ['assets/audio/soundeffects/player/attack1_object.mp3']);
        this.load.audio('attack1_platform', ['assets/audio/soundeffects/player/attack1_platform.mp3']);
        this.load.audio('attack1_creature', ['assets/audio/soundeffects/player/attack1_creature.mp3']);
        this.load.audio('attack1_creature1', ['assets/audio/soundeffects/player/attack1_creature1.mp3']);

        // Range
        this.load.audio('preattack2', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_throw', ['assets/audio/soundeffects/player/preattack2.mp3']);
        this.load.audio('attack2_metal', ['assets/audio/soundeffects/player/preattack2.mp3']);
        // Both
        this.load.audio('attack_noenemy', ['assets/audio/soundeffects/player/attack1_noenemy.mp3']);

        // enemy movement
        this.load.audio('ptero_wingflap', ['assets/audio/soundeffects/Stage1/pterodactyl_wingflap.mp3']);

        // Loot
        this.load.image('healthLoot', 'assets/healthLoot.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99');
        soundtrack1 = this.sound.add('stage1Music', {volume: 0.35, loop: true});
        soundtrack1.play();


        // Player attack sound effects
        preattack1 = this.sound.add('preattack1', {volume: 0.15});
        attack1_metal = this.sound.add('attack1_metal', {volume: 0.15});
        attack1_object = this.sound.add('attack1_object', {volume: 0.15});
        attack1_platform = this.sound.add('attack1_platform', {volume: 0.15});
        preattack2 = this.sound.add('preattack2', {volume: 0.15});
        attack2_throw = this.sound.add('attack2_throw', {volume: 0.15});
        attack2_metal = this.sound.add('attack2_metal', {volume: 0.15});
        attack_noenemy = this.sound.add('attack_noenemy', {volume: 0.15});
        attack1_creature = this.sound.add('attack1_creature', {volume: 0.15});
        attack1_creature1 = this.sound.add('attack1_creature', {volume: 0.15});
        ptero_wingflap = this.sound.add('ptero_wingflap', {volume: 0.15});


        // Background Tile Sprites (X, Y, W, H)
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
        lifeText = this.add.text(15, 15, 'Life: 100', { fontSize: '25px', fill: '#ffffff' });

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 575);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }

        // Moving platforms
        pf1 = this.physics.add.image(50, 450, 'platform1')
            .setImmovable(true);
        pf1.body.collideWorldBounds = true;
        pf1.body.bounce.set(1);
        pf1.body.setAllowGravity(false);

        pf2 = this.physics.add.image(300, 380, 'platform1')
            .setImmovable(true);

        pf3 = this.physics.add.image(150, 170, 'platform1')
            .setImmovable(true);
        pf3.body.collideWorldBounds = true;
        pf3.body.bounce.set(1);
        pf3.body.setAllowGravity(false);

        pf4 = this.physics.add.image(700, 270, 'platform1')
            .setImmovable(true);

        pf5 = this.physics.add.image(600, 280, 'platform1')
            .setImmovable(true);
        pf5.body.collideWorldBounds = true;
        pf5.body.bounce.set(1);
        pf5.body.setAllowGravity(false);


        // Create Dagger Group
        daggerGroup = new DaggerGroupS1(this);

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


        playerLife = 100;
        raptorLife = 80;
        playerAlive = true;
        raptorAlive = true;
        raptorLifeText = 80;
        lootCounter3S = 0;
        lootCounter1S = 0;
        pteroLife = 50;
        ptero2Life = 50;
        pteroAlive = true;
        ptero2Alive = true;
        pteroLifeText = 50;
        ptero2LifeText = 50;
        lootCounter2S = 0;
        playerDetected = false;
        attackAnimPlaying = false;

        // Create Enemies
        raptor = this.physics.add.sprite(650, 400, 'raptor')
        raptor.setBounce(0.01);
        raptor.setCollideWorldBounds(true);
        raptor.displayWidth = game.config.width * 0.32;
        raptor.scaleY = raptor.scaleX;
        raptor.body.setGravityY(300);

        ptero = this.physics.add.sprite(300, 200, 'ptero')
        ptero.setCollideWorldBounds(true);
        ptero.displayWidth = game.config.width * 0.18;
        ptero.scaleY = ptero.scaleX;
        ptero.body.setAllowGravity(false);

        ptero2 = this.physics.add.sprite(500, 100, 'ptero')
        ptero2.setCollideWorldBounds(true);
        ptero2.displayWidth = game.config.width * 0.18;
        ptero2.scaleY = ptero2.scaleX;
        ptero2.body.setAllowGravity(false);


        // Enemy Life Text
        raptorLifeText = this.add.text(590, 20, 'Raptor Life: 80', { fontSize: '15px', fill: '#ffffff' });
        pteroLifeText = this.add.text(200, 20, 'Ptero Life: 50', { fontSize: '15px', fill: '#ffffff' });
        ptero2LifeText = this.add.text(380, 20, 'Ptero 2 Life: 50', { fontSize: '15px', fill: '#ffffff' });

        // Enemy Overlap
        this.physics.add.collider(raptor, platforms);
        this.physics.add.overlap(player, raptor);
        this.physics.add.overlap(playerMeleeAtk, raptor);
        this.physics.add.overlap(player, ptero);
        this.physics.add.overlap(player, ptero2);
        this.physics.add.overlap(playerMeleeAtk, ptero);
        this.physics.add.overlap(player, ptero2);

        this.physics.add.overlap(ptero, pf1);
        this.physics.add.overlap(ptero2, pf1);
        this.physics.add.overlap(raptor, pf1);

        this.physics.add.overlap(ptero, pf2);
        this.physics.add.overlap(ptero2, pf2);
        this.physics.add.overlap(raptor, pf2);

        this.physics.add.overlap(ptero, pf3);
        this.physics.add.overlap(ptero2, pf3);
        this.physics.add.overlap(raptor, pf3);

        this.physics.add.overlap(ptero, pf4);
        this.physics.add.overlap(ptero2, pf4);
        this.physics.add.overlap(raptor, pf4);

        this.physics.add.overlap(ptero, pf5);
        this.physics.add.overlap(ptero2, pf5);
        this.physics.add.overlap(raptor, pf5);


    }

    // Constantly Updating Game Loop
    update() {
        // Scene End Condition
        if (!raptorAlive && !pteroAlive && !ptero2Alive) {
            this.scene.pause('Stage1');
            this.scene.launch('Stage1Win');
            soundtrack1.stop();
        }
        else if (!playerAlive) {
            this.scene.pause('Stage1');
            this.scene.launch('Stage1Die')
            soundtrack1.stop();
        }

        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.1;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.3;

        // Platform movement
        pf1.setVelocityX(dir1*70);
        // pf1.setVelocityY(0);
        if (pf1.body.position.x >= 400){
            dir1 = -1;
        }
        if (pf1.body.position.x <= 10){
            dir1 = 1;
        }

        pf2.setVelocityY(dir2*60);
        if (pf2.body.position.y >= 450){
            dir2 = -1;
        }
        if (pf2.body.position.y <= 100){
            dir2 = 1;
        }

        pf3.setVelocityX(dir3*70);
        // pf3.setVelocityY(0);
        if (pf3.body.position.x >= 600){
            dir3 = -1;
        }
        if (pf3.body.position.x <= 200){
            dir3 = 1;
        }

        pf4.setVelocityY(dir4*40);
        if (pf4.body.position.y >= 420){
            dir4 = -1;
        }
        if (pf4.body.position.y <= 130){
            dir4 = 1;
        }

        pf5.setVelocityX(dir5*70);
        // pf5.setVelocityY(0);
        if (pf5.body.position.x >= 600){
            dir5 = -1;
        }
        if (pf5.body.position.x <= 100){
            dir5 = 1;
        }


        // allow player to stand on platforms
        this.physics.world.collide(pf1, player, function () {
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf2, player, function () {
            pf2.setVelocityX(0);
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf3, player, function () {
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf4, player, function () {
            pf4.setVelocityX(0);
            player.setVelocityX(0);
        });

        this.physics.world.collide(pf5, player, function () {
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

        // if (W.isDown && A.isDown && player.body.touching.down ) {
        //     player.setVelocityY(-100);
        //     player.setVelocityX(-50);
        // }

        // if (W.isDown && D.isDown && player.body.touching.down) {
        //     player.setVelocityY(-100);
        //     player.setVelocityX(50);
        // }

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

        // Resets tints on game objects.
        this.resetTints();

        // Enemy Movement
        if (!playerDetected) {
            raptor.anims.play('raptorStatic');
            ptero.anims.play('pteroStatic');
            ptero2.anims.play('pteroStatic');
            ptero_wingflap.play();

        }
        else {
            delX = ptero.body.position.x - player.body.position.x;
            delX2 = ptero2.body.position.x - player.body.position.x;
            delY = ptero.body.position.y - player.body.position.y;
            delY2 = ptero2.body.position.y - player.body.position.y;
            if (player.body.position.x < raptor.body.position.x - 5) {
                raptor.anims.play('raptorLeft', true);
                raptor.setVelocityX(-70);
            }
            else if (player.body.position.x > raptor.body.position.x + 5) {
                raptor.anims.play('raptorRight', true);
                raptor.setVelocityX(70);
            }
            else {
                raptor.anims.play('raptorStatic');
                raptor.setVelocityX(0);
            }
            // PTERO 1
            // upper right or directly above
            if (player.body.position.x <= ptero.body.position.x && player.body.position.y <= ptero.body.position.y) {
                ptero.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX > 10 && delY > 10) {
                    ptero.setVelocityX(-70);
                    ptero.setVelocityY(-1);
                }
                else  {
                    ptero.setVelocityX(-60);
                    ptero.setVelocityY(-5);
                }
            }
            // ptero is upper left
            else if (player.body.position.x > ptero.body.position.x && player.body.position.y < ptero.body.position.y) {
                ptero.anims.play('pteroRight', true);
                ptero_wingflap.play();
                if (delX > 10 && delY > 10) {
                    ptero.setVelocityX(70);
                    ptero.setVelocityY(-5);
                }
                else  {
                    ptero.setVelocityX(60);
                    ptero.setVelocityY(-5);
                }
            }
            // ptero lower right or directly below
            else if (player.body.position.x <= ptero.body.position.x && player.body.position.y >= ptero.body.position.y) {
                ptero.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX > 10 && delY > 10) {
                    ptero.setVelocityX(-70);
                    ptero.setVelocityY(30);
                }
                else  {
                    ptero.setVelocityX(-30);
                    ptero.setVelocityY(30);
                }
            }
            // ptero lower left
            else if (player.body.position.x > ptero.body.position.x && player.body.position.y > ptero.body.position.y) {
                ptero.anims.play('pteroRight', true);
                ptero_wingflap.play();
                if (delX > 10 && delY > 10) {
                    ptero.setVelocityX(-70);
                    ptero.setVelocityY(30);
                }
                else  {
                    ptero.setVelocityX(40);
                    ptero.setVelocityY(30);
                }
            }

            // ptero directly left
            else if (player.body.position.x > ptero.body.position.x && player.body.position.y == ptero.body.position.y) {
                ptero.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX > 10) {
                    ptero.setVelocityX(70);
                    ptero.setVelocityY(10);
                }
                else  {
                    ptero.setVelocityX(70);
                    ptero.setVelocityY(3);
                }
            }

            // ptero directly right
            else if (player.body.position.x < ptero.body.position.x && player.body.position.y == ptero.body.position.y) {
                ptero.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX > 200) {
                    ptero.setVelocityX(70);
                    ptero.setVelocityY(10);
                }
                else  {
                    ptero.setVelocityX(-70);
                    ptero.setVelocityY(3);
                }
            }

            // PTERO 2
            // upper right or directly above
            if (player.body.position.x <= ptero2.body.position.x && player.body.position.y <= ptero2.body.position.y) {
                ptero2.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX2 > 10 && delY2 > 10) {
                    ptero2.setVelocityX(-70);
                    ptero2.setVelocityY(-1);
                }
                else {
                    ptero2.setVelocityX(-60);
                    ptero2.setVelocityY(-5);
                }
            }
            // ptero is upper left
            else if (player.body.position.x > ptero2.body.position.x && player.body.position.y < ptero2.body.position.y) {
                ptero2.anims.play('pteroRight', true);
                ptero_wingflap.play();
                if (delX2 > 10 && delY2 > 10) {
                    ptero2.setVelocityX(70);
                    ptero2.setVelocityY(-5);
                }
                else  {
                    ptero2.setVelocityX(60);
                    ptero2.setVelocityY(-5);
                }
            }
            // ptero lower right or directly below
            else if (player.body.position.x <= ptero2.body.position.x && player.body.position.y >= ptero2.body.position.y) {
                ptero2.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX2 > 10 && delY2 > 10) {
                    ptero2.setVelocityX(-70);
                    ptero2.setVelocityY(30);
                }
                else  {
                    ptero2.setVelocityX(-30);
                    ptero2.setVelocityY(30);
                }
            }
            // ptero lower left
            else if (player.body.position.x > ptero2.body.position.x && player.body.position.y > ptero2.body.position.y) {
                ptero2.anims.play('pteroRight', true);
                ptero_wingflap.play();
                if (delX2 > 10 && delY2 > 10) {
                    ptero2.setVelocityX(-70);
                    ptero2.setVelocityY(30);
                }
                else  {
                    ptero2.setVelocityX(40);
                    ptero2.setVelocityY(30);
                }
            }

            // ptero directly left
            else if (player.body.position.x > ptero2.body.position.x && player.body.position.y == ptero2.body.position.y) {
                ptero2.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX2 > 10) {
                    ptero2.setVelocityX(70);
                    ptero2.setVelocityY(10);
                }
                else  {
                    ptero2.setVelocityX(70);
                    ptero2.setVelocityY(3);
                }
            }

            // ptero directly right
            else if (player.body.position.x < ptero2.body.position.x && player.body.position.y == ptero2.body.position.y) {
                ptero2.anims.play('pteroLeft', true);
                ptero_wingflap.play();
                if (delX2 > 200) {
                    ptero2.setVelocityX(70);
                    ptero2.setVelocityY(10);
                }
                else  {
                    ptero2.setVelocityX(-70);
                    ptero2.setVelocityY(3);
                }
            }
        }

        if (Math.abs(player.body.position.x - raptor.body.position.x) <= 150) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.x - ptero.body.position.x) <= 800) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.y - ptero.body.position.y) <= 600) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.x - ptero2.body.position.x) <= 800) {
            playerDetected = true;
        }

        if (Math.abs(player.body.position.y - ptero2.body.position.y) <= 600) {
            playerDetected = true;
        }

        var boundsPl = player.getBounds();
        var boundsV = raptor.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsV)) && playerAlive && raptorAlive) {
            playerLife -= 0.2;
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                soundtrack1.stop();
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

        var boundsPt = ptero.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsPt)) && playerAlive && pteroAlive) {
            playerLife -= 0.1
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                soundtrack1.stop();
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

        var boundsPt2 = ptero2.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsPl, boundsPt2)) && playerAlive && ptero2Alive) {
            playerLife -= 0.1
            if (playerLife <= 0) {
                player.disableBody(true, true);
                player.setActive(false);
                player.setVisible(false);
                playerAlive = false;
                //soundtrack1.stop();
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
        if (raptorDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    raptor.clearTint();
                    raptorDmg = false;
                }
            })
        }

        if (pteroDmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    ptero.clearTint();
                    pteroDmg = false;
                }
            })
        }

        if (ptero2Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    ptero2.clearTint();
                    ptero2Dmg = false;
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

    // function for range attack delay
    rangeDelay(){
        if(nextAttack>game.time.now) {
            return;
        }
        // > do range attack

        // wait at least 2 seconds to
        nextAttack = game.time.now + 2000;
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
                        this.updateRaptorLife();
                        this.updatePteroLife();
                        this.updatePtero2Life();
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
                        this.updateRaptorLife();
                        this.updatePteroLife();
                        this.updatePtero2Life();
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

    updateRaptorLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = raptor.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && raptorAlive) {
            if (raptorLife < 10) {
              raptorLife = 0
            }
            else {
              raptorLife -= 10
            }
            raptorLifeText.setText('Raptor Life: ' + raptorLife);
            raptor.setTint('0xff0000');
            attack1_creature1.play();
            raptorDmg = true;
        }
        if (raptorLife == 0 && lootCounter3S == 0) {
            var hLoot = healthLoot.create(raptor.body.x, raptor.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            raptor.disableBody(true, true);
            raptorAlive = false;
            lootCounter3S += 1
        }
    }

    updatePteroLife() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = ptero.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && pteroAlive) {
            if (pteroLife < 10) {
              pteroLife = 0
            }
            else {
              pteroLife -= 10
            }
            pteroLifeText.setText('Ptero Life: ' + pteroLife);
            ptero.setTint('0xff0000');
            attack1_creature.play();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    ptero.clearTint();
                }
            })
        }
        if (pteroLife == 0 && lootCounter1S == 0) {
            var hLoot = healthLoot.create(ptero.body.x, ptero.body.y, 'healthLoot');
            hLoot.setBounce(0.7);
            hLoot.setCollideWorldBounds(true);
            ptero.disableBody(true, true);
            pteroAlive = false;
            lootCounter1S += 1
        }
    }

    updatePtero2Life() {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = ptero2.getBounds();

        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && ptero2Alive) {
            if (ptero2Life < 10) {
                ptero2Life = 0
            }
            else {
                ptero2Life -= 10
            }
            ptero2LifeText.setText('Ptero 2 Life: ' + ptero2Life);
            ptero2.setTint('0xff0000');
            attack1_creature.play();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    ptero2.clearTint();
                }
            })
        }

        if (ptero2Life == 0 && lootCounter2S == 0) {
            var hLoot = healthLoot.create(ptero2.body.x, ptero2.body.y, 'healthLoot');
            hLoot.setBounce(0.7);
            hLoot.setCollideWorldBounds(true);
            ptero2.disableBody(true, true);
            ptero2Alive = false;
            lootCounter2S += 1
        }
    }

    // Updates player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + Math.round(playerLife));
    }

    // Throws Dagger
    launchDagger(aimX, aimY) {
        daggerGroup.throwDagger(player.body.x, player.body.y, aimX, aimY)
    }

}

// Dagger Group Class
class DaggerGroupS1 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: DaggerS1,
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
class DaggerS1 extends Phaser.Physics.Arcade.Sprite {
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
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), raptor.getBounds())) && raptorAlive) {
            if (raptorLife < 5){
              raptorLife = 0
            }
            else{
              raptorLife -= 5;
            }
            this.setActive(false);
            this.setVisible(false);
            attack1_creature1.play();
            if (!playerDetected) {
                playerDetected = true;
            }
            raptorLifeText.setText('Raptor Life: ' + raptorLife);
            raptor.setTint('0xff0000')
            raptorDmg = true;
        }

        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), ptero.getBounds())) && pteroAlive) {
            if (pteroLife < 5){
              pteroLife = 0
            }
            else{
              pteroLife -= 5;
            }
            this.setActive(false);
            this.setVisible(false);
            attack1_creature.play();
            if (!playerDetected) {
                playerDetected = true;
            }
            pteroLifeText.setText('Ptero Life: ' + pteroLife);
            ptero.setTint('0xff0000')
            pteroDmg = true;
        }

        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), ptero2.getBounds())) && ptero2Alive) {
            if (ptero2Life < 5){
              ptero2Life = 0
            }
            else{
              ptero2Life -= 5;
            }
            this.setActive(false);
            this.setVisible(false);
            attack1_creature.play();
            if (!playerDetected) {
                playerDetected = true;
            }
            ptero2LifeText.setText('Ptero 2 Life: ' + ptero2Life);
            ptero2.setTint('0xff0000')
            ptero2Dmg = true;
        }

        if (raptorLife == 0 && lootCounter3S == 0) {
            var hLoot = healthLoot.create(raptor.body.x, raptor.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            raptor.disableBody(true, true);
            raptorAlive = false;
            lootCounter3S += 1
        }

        if (pteroLife == 0 && lootCounter1S == 0) {
            var hLoot = healthLoot.create(ptero.body.x, ptero.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            ptero.disableBody(true, true);
            pteroAlive = false;
            lootCounter1S += 1
        }

        if (ptero2Life == 0 && lootCounter2S == 0) {
            var hLoot = healthLoot.create(ptero2.body.x, ptero2.body.y, 'healthLoot');
            hLoot.setBounce(0.5);
            hLoot.setCollideWorldBounds(true);
            ptero2.disableBody(true, true);
            ptero2Alive = false;
            lootCounter2S += 1
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
