// Global Variables
var graphics;
var player, playerAtk;
var playerAlive = true;
var delX, atkDir, callAttack;
var W, A, S, D, cursors, spaceBar, mouseX, mouseY;
var life = 100;
var lifeText;
var attackAnimPlaying = false;
var sky, clouds;
var far, back, mid, front;
var ground, platforms;

// DEBUG PARAMETERS
var debug = false;
var testLine;

// Robot Boss Fight Class
class Tutorial2 extends Phaser.Scene{
    constructor() {
        super({ key: 'Tutorial2' });
    }

    // Preload Images and Sprites
    preload() {
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });

        // Background Images
        this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
        this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
        this.load.image('far2', 'assets/backgrounds/stage5/2far.png');
        this.load.image('back3', 'assets/backgrounds/stage5/3back.png');
        this.load.image('mid4', 'assets/backgrounds/stage5/4mid.png');
        this.load.image('front5', 'assets/backgrounds/stage5/5front.png');
        this.load.image('ground', 'assets/backgrounds/stage5/6platform.png');
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99')

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

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 565);
        }
        if (debug == false) {
            platforms.setVisible(false);
        }

        // Create Player
        player = this.physics.add.sprite(100, 475, 'hero');
        player.setBounce(0.25);
        player.setCollideWorldBounds(true);
        player.displayWidth = game.config.width * 0.075;
        player.scaleY = player.scaleX;
        player.body.setGravityY(300);

        playerAtk = this.physics.add.sprite(100, 475, 'hero_attack');
        playerAtk.setBounce(0.25);
        playerAtk.setCollideWorldBounds(true);
        playerAtk.displayWidth = game.config.width * 0.128;
        playerAtk.scaleY = playerAtk.scaleX;
        playerAtk.body.setGravityY(300);
        playerAtk.visible = false;

        // Create Player Animations
        this.createPlayerAnims();

        // Add Input Sources
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', function (pointer) {
            mouseX = pointer.x;
            mouseY = pointer.y;
            console.log('Mouse Location: ' + mouseX + ', ' + mouseY);
            if (mouseX >= player.body.x + 27) {
                atkDir = 'R';
            }
            else if (mouseX < player.body.x + 27) {
                atkDir = 'L';
            }
            callAttack = true;
        })

        graphics = this.add.graphics();
        if (debug) {
            graphics.lineStyle(5, 0xFF0000, 1)
            testLine = new Phaser.Geom.Line(this, player.body.x, player.body.y - 50, player.body.x, player.body.y + 50);
        }

        // Add Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(playerAtk, platforms);
    }

    // Constantly Updating Game Loop
    update() {
        // Implement Parallax Background
        clouds.tilePositionX -= 0.5;
        far.tilePositionX += 0.3;
        back.tilePositionX -= 0.2;
        mid.tilePositionX += 0.1;

        // Player Movement
        if (A.isDown) {
            player.setVelocityX(-160);
            playerAtk.setVelocityX(-160);
            player.anims.play('left', true);

            front.tilePositionX -= 3;
            ground.tilePositionX -= 2.7;
        }
        else if (D.isDown) {
            player.setVelocityX(160);
            playerAtk.setVelocityX(160);
            player.anims.play('right', true);

            front.tilePositionX += 3;
            ground.tilePositionX += 2.7;
        }
        else {
            player.setVelocityX(0);
            playerAtk.setVelocityX(0);
            player.anims.play('turn');
        }

        // Jumping
        if ((spaceBar.isDown || W.isDown) && player.body.touching.down) {
            player.setVelocityY(-250);
            playerAtk.setVelocityY(-250);
        }

        if (callAttack) {
            this.playerAttackCall();
        }

        if (debug) {
            testLine.setTo(player.body.x + 27, player.body.y - 50, player.body.x + 27, player.body.y + 50);
            graphics.strokeLineShape(testLine);
        }
    }

    // Creates player animations
    createPlayerAnims() {
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
        this.anims.create({
            key: 'preAtkL',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 7 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'preAtkR',
            frames: this.anims.generateFrameNumbers('hero', { start: 21, end: 28 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'playerAtkL',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'playerAtkR',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: 0
        });
    }

    // Called when player attacks
    playerAttackCall() {
        console.log('ATTACKING');
        if (attackAnimPlaying == false) {
            if (atkDir == 'R') {
                attackAnimPlaying = true;
                player.anims.play('preAtkR');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerAtk.visible = true;
                        playerAtk.anims.play('playerAtkR');
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                playerAtk.visible = false;
                                player.visible = true;
                                attackAnimPlaying = false;
                                callAttack = false;
                            }
                        })
                    }
                })
            }
            else if (atkDir == 'L') {
                attackAnimPlaying = true;
                player.anims.play('preAtkL');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        playerAtk.visible = true;
                        playerAtk.anims.play('playerAtkL');
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                playerAtk.visible = false;
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

    // Function that updates the player's life text
    updatePlayerLifeText() {
        lifeText.setText('Life: ' + life);
    }
}
