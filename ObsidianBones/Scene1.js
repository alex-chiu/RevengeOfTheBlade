// Global Variables
var player, player_atk;
var boss;
var cursors;
var spaceBar;
var W, A, S, D;
var life = 100, bossLife = 100;
var lifeText, bossLifeText;
var attack_anim_playing = false;
var sky;
var clouds;
var far;
var back;
var mid;
var front;
var ground, platforms;

// DEBUG PARAMETERS
var debug = true;

// Scene1 Class
class Scene1 extends Phaser.Scene{
    constructor() {
        super({key:'Scene1'});
    }

    // Preload Images and Sprites
    preload() {
        this.load.spritesheet('robotBoss', 'assets/sprites/robot-boss-sprite.png', { frameWidth: 320, frameHeight: 500 });
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });

        // Background images
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
        bossLifeText = this.add.text(580, 15, 'Boss Life: 100', { fontSize: '25px', fill: '#ffffff' });

        // Platforms
        platforms = this.physics.add.staticGroup();
        for (var i = 15; i <= 800; i += 30 ) {
            platforms.create(i, 565);
        }
        if (!debug) {
            platforms.children.visible = false;
        }

        // Create Boss
        boss = this.physics.add.sprite(650, 400, 'robotBoss')
        boss.setBounce(0);
        boss.setCollideWorldBounds(true);
        boss.displayWidth = game.config.width * 0.15;
        boss.scaleY = boss.scaleX;
        boss.body.setGravityY(300);

        // Create Player
        player = this.physics.add.sprite(100, 475, 'hero');
        player.setBounce(0.25);
        player.setCollideWorldBounds(true);
        player.displayWidth = game.config.width * 0.075;
        player.scaleY = player.scaleX;
        player.body.setGravityY(300);
        player.setInteractive();

        player_atk = this.physics.add.sprite(100, 475, 'hero_attack');
        player_atk.setBounce(0.25);
        player_atk.setCollideWorldBounds(true);
        player_atk.displayWidth = game.config.width * 0.128;
        player_atk.scaleY = player_atk.scaleX;
        player_atk.body.setGravityY(300);
        player_atk.visible = false;

        // Create Player Animations
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
            key: 'pre_atk_l',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 7 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'pre_atk_r',
            frames: this.anims.generateFrameNumbers('hero', { start: 21, end: 28 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'atk_l',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'atk_r',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: 0
        });

        // Add Input Sources
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        cursors = this.input.keyboard.createCursorKeys();

        // Add Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player_atk, platforms);
        this.physics.add.collider(boss, platforms);


    }

    // Constantly Updating Game Loop
    update() {
        // Implement Parallax Background
        clouds.tilePositionX -= 0.2;
        far.tilePositionX += 0.5;
        back.tilePositionX -= 0.7;
        mid.tilePositionX += 1.0;


        // Player Movement
        if (A.isDown) {
            player.setVelocityX(-160);
            player_atk.setVelocityX(-160);
            player.anims.play('left', true);

            front.tilePositionX -= 3;
            ground.tilePositionX -= 2.7;
        }
        else if (D.isDown) {
            player.setVelocityX(160);
            player_atk.setVelocityX(160);
            player.anims.play('right', true);

            front.tilePositionX += 3;
            ground.tilePositionX += 2.7;
        }
        else {
            player.setVelocityX(0);
            player_atk.setVelocityX(0);
            player.anims.play('turn');
        }

        // Jumping
        if ((spaceBar.isDown || W.isDown) && player.body.touching.down) {
            player.setVelocityY(-250);
            player_atk.setVelocityY(-250);
        }

                // Attack Animations
        if (attack_anim_playing == false) {
            if (cursors.right.isDown) {
                attack_anim_playing = true;
                player.anims.play('pre_atk_r');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        player_atk.visible = true;
                        player_atk.anims.play('atk_r');
                        this.updateLifeText(player_atk, boss);
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                player_atk.visible = false;
                                player.visible = true;
                                attack_anim_playing = false;

                            }
                        })
                    }
                })
            }

            else if (cursors.left.isDown) {
                attack_anim_playing = true;
                player.anims.play('pre_atk_l');
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        player.visible = false;
                        player_atk.visible = true;
                        player_atk.anims.play('atk_l');
                        this.updateLifeText(player_atk, boss);
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                player_atk.visible = false;
                                player.visible = true;
                                attack_anim_playing = false;

                            }
                        })
                    }
                })
            }
        }
    }


    // Updates Life Text
    updateLifeText(player_atk, boss){
        var boundsA = player_atk.getBounds();
        var boundsB = boss.getBounds();

        if (Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB) == true){
            bossLife-=10
            bossLifeText.setText('Boss Life: ' + bossLife);
            }
        if (bossLife == 0){
            boss.disableBody(true, true);
        }


    }
}
