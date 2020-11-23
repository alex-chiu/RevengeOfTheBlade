/*  TUTORIAL SCENE

    Scene that appears when the player wishes to enter the tutorial: when stage5 completed
    Has basic platforms to jump around on and targets to attack.
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
var target1, target2;
var target1life = 50, target2life = 50;
var target1Alive = true, target2Alive = true;
var target1LifeText = 50, target2LifeText = 50;
var target1Dmg = false, target2Dmg = false;

// DEBUG PARAMETERS
var debug = false;
var graphics, testLine;

// SOUND
var preattack1, preattack2, attack1_metal, attack1_object, attack1_platform;

// SCENE CLASS
class TutorialS5C extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialS5C' });
    }

    // Preload Images and Sprites
    preload() {
        // Hero Spritesheets
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm', 'assets/sprites/ranged-attack/hero-attack2-arm-sprite.png', { frameWidth: 145, frameHeight: 230 });
        this.load.spritesheet('hero_walk_no_arm', 'assets/sprites/ranged-attack/hero-walk-sprite-noarm.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_ranged_attack_arm_final', 'assets/sprites/ranged-attack/attack2-throw.png', { frameWidth: 220, frameHeight: 230 });

        // soundeffects
        // soundtrack
        this.load.audio('tutorialMusic', ['assets/audio/soundtrack/tutorial.wav']);
        this.load.audio('preattack1', ['assets/audio/soundeffects/player/preattack1.mp3']);
        this.load.audio('preattack2', ['assets/audio/soundeffects/player/preattack2.mp3']);

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
        this.load.image('platform1', 'assets/platforms/platform-s1.png');

        // Target
        this.load.image('target', 'assets/target.png');

        // Dagger
        this.load.image('dagger', 'assets/daggers.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99');
        // Play background music
        soundtrack0 = this.sound.add('tutorialMusic', {volume: 0.15, loop: true});
        soundtrack0.play();

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

        this.label = this.add.text(50, 40, '', { fontSize: '18px', fill: '#37F121' }).setWordWrapWidth(375);
        this.typewriteText('⊡ TRAINING SIMULATION ⊡ \n\n▸ Goal: Destroy both targets by using your sword and daggers. \n\n▸ Note: Your weapons deal different amounts of damage. \n\n▸ Practice: Try navigating the platforms and aiming with your cursor.');

        // soundeffects
        preattack1 = this.sound.add('preattack1', {volume: 0.25});
        preattack2 = this.sound.add('preattack2', {volume: 0.25});

        //Moving platforms
        pf0 = this.physics.add.image(200, 510, 'platform1')
            .setImmovable(true);
        pf0.body.setAllowGravity(false);

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

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 575);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }

        // Create Dagger Group
        daggerGroup = new DaggerGroupTS5(this);

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

        // Add Platform Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(playerMeleeAtk, platforms);
        this.physics.add.collider(playerWalkNA, platforms);
        this.physics.add.collider(playerArm, platforms);
        this.physics.add.collider(playerArmFinal, platforms);

        // SCENE SPECIFIC GAME OBJECTS

        // Reset Values
        target1life = 50;
        target2life = 50;
        target1Alive = true;
        target2Alive = true;
        target1LifeText = 50;
        target2LifeText = 50;
        attackAnimPlaying = false;

        // Targets
        target1 = this.add.image(750, 515, 'target');
        target2 = this.add.image(600, 150, 'target');

        // Target Life Text
        target1LifeText = this.add.text(518, 65, 'Ground Target: 50', { fontSize: '22px', fill: '#ffffff' });
        target2LifeText = this.add.text(495, 35, 'Airborne Target: 50', { fontSize: '22px', fill: '#ffffff' });

        // Target Overlap
        this.physics.add.overlap(player, target1);
        this.physics.add.overlap(playerMeleeAtk, target1);
        this.physics.add.overlap(player, target2);
        this.physics.add.overlap(playerMeleeAtk, target2);
    }

    typewriteText(text){
      const length = text.length
      let i = 0
      this.time.addEvent({
        callback: () => {
          this.label.text += text[i]
          ++i
        },
        repeat: length -1,
        delay: 30
      })
    }

    // Constantly Updating Game Loop
    update() {
        // Scene End Condition
        if (!target1Alive && !target2Alive) {
          this.scene.pause('TutorialS5C');
          this.scene.launch('TutorialCompletedS5C');
          soundtrack0.stop();
        }

        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.1;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.3;

        // Platform movement
        pf1.setVelocityX(dir1*70);
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
        if (pf5.body.position.x >= 600){
            dir5 = -1;
        }
        if (pf5.body.position.x <= 100){
            dir5 = 1;
        }


        // allow player to stand on platforms
        this.physics.world.collide(pf0, player, function () {
            player.setVelocityX(0);
        });

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


        // fix collisions s.t. only Top collision detected (not R, L, Bt)
        // this.physics.world.collide(pf0, player, function () {
        //     player.setVelocityX(0);
        //     return true;
        // }, function () {
        //     if (player.body.touching.left) {

        //     }
        // });

        // this.physics.world.collide(pf1, player, function () {
        //     player.setVelocityX(0);
        //     return true;
        // });

        // this.physics.world.collide(pf2, player, function () {
        //     pf2.setVelocityX(0);
        //     player.setVelocityX(0);
        //     return true;
        // });

        // this.physics.world.collide(pf3, player, function () {
        //     player.setVelocityX(0);
        //     return true;
        // });

        // this.physics.world.collide(pf4, player, function () {
        //     pf4.setVelocityX(0);
        //     player.setVelocityX(0);
        //     return true;
        // });

        // this.physics.world.collide(pf5, player, function () {
        //     player.setVelocityX(0);
        //     return true;
        // });



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

        // Clear Target Tint
        if (target1Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    target1.clearTint();
                    target1Dmg = false;
                }
            })
        }
        if (target2Dmg) {
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    target2.clearTint();
                    target2Dmg = false;
                }
            })
        }

        // Update Life Text
        this.updateTargetLifeText();
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
                preattack1.play();
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

    // Updates Target 1's Life
    updateTarget1Life () {
        var boundsA = playerMeleeAtk.getBounds();
        var boundsB = target1.getBounds();
        if ((Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)) && target1Alive) {
            target1life -= 10
            if (target1life < 0){
              target1life = 0
            }
            target1.setTint('0xff0000')
            target1Dmg = true;
        }
        if (target1life <= 0) {
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
            if (target2life < 0){
              target2life = 0
            }
            target2.setTint('0xff0000')
            target2Dmg = true;
        }
        if (target2life <= 0) {
            target2.destroy();
            target2Alive = false;
        }
    }

    updateTargetLifeText() {
        target1LifeText.setText('Ground Target: ' + target1life)
        target2LifeText.setText('Airborne Target: ' + target2life)
    }

    // Throws Dagger
    launchDagger(aimX, aimY) {
        daggerGroup.throwDagger(player.body.x, player.body.y, aimX, aimY)
    }

}

// Dagger Group Class
class DaggerGroupTS5 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: DaggerTS5,
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
class DaggerTS5 extends Phaser.Physics.Arcade.Sprite {
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
            target1.setTint('0xff0000')
            target1Dmg = true;
        }
        else if ((Phaser.Geom.Rectangle.Overlaps(this.getBounds(), target2.getBounds())) && target2Alive) {
            this.setActive(false);
            this.setVisible(false);
            target2life -= 5;
            target2.setTint('0xff0000')
            target2Dmg = true;
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
