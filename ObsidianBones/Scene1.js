var obstacles;
var player, player_atk, player_pre_atk;
var boss;
var cursors;
var spaceBar;
var W, A, S, D;
var life = 100;
var lifeText;

class Scene1 extends Phaser.Scene{
    constructor() {
        super({key:'Scene1'});
    }

    preload() {
        this.load.image('obstacle', 'assets/sprites/obstacle.png');
        this.load.image('robotBoss', 'assets/sprites/RobotBoss1.jpg');
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });
        this.load.spritesheet('hero_pre_attack', 'assets/sprites/hero-preattack-sprite.png', { frameWidth: 130, frameHeight: 230 });
    }

    create() {
        this.cameras.main.setBackgroundColor('#828b99')
        lifeText = this.add.text(16, 16, 'Life: 100', { fontSize: '25px', fill: '#ffffff' });

        // Create Obstacles
        obstacles = this.physics.add.staticGroup();
        obstacles.create(300, 580, 'obstacle');
        obstacles.create(200, 565, 'obstacle');
        obstacles.create(200, 600, 'obstacle');
        obstacles.create(600, 600, 'obstacle');
        
        // Create Boss
        boss = this.physics.add.image(650, 400, 'robotBoss')
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

        player_pre_atk = this.physics.add.sprite(100, 475, 'hero_pre_attack');
        player_pre_atk.setBounce(0.25);
        player_pre_atk.setCollideWorldBounds(true);
        player_pre_atk.displayWidth = game.config.width * 0.064;
        player_pre_atk.scaleY = player_pre_atk.scaleX;
        player_pre_atk.body.setGravityY(300);
        player_pre_atk.visible = false;

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
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'hero', frame: 6 } ],
            frameRate: 10
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left_pre_atk',
            frames: this.anims.generateFrameNumbers('hero_pre_attack', { start: 9, end: 16 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'right_pre_atk',
            frames: this.anims.generateFrameNumbers('hero_pre_attack', { start: 0, end: 7 }),
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'left_atk',
            frames: this.anims.generateFrameNumbers('hero_attack', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'right_atk',
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
        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(player, boss);
        this.physics.add.collider(player_pre_atk, obstacles);
        this.physics.add.collider(player_pre_atk, boss);
        this.physics.add.collider(player_atk, obstacles);
        this.physics.add.collider(player_atk, boss);
        this.physics.add.collider(boss, obstacles);
    }

    update() {
        // Player Movement
        if (A.isDown) {
            player.setVelocityX(-160);
            player_pre_atk.setVelocityX(-160);
            player_atk.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (D.isDown) {
            player.setVelocityX(160);
            player_pre_atk.setVelocityX(160);
            player_atk.setVelocityX(160);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player_pre_atk.setVelocityX(0);
            player_atk.setVelocityX(0);
            player.anims.play('turn');
        }

        // Jumping
        if ((spaceBar.isDown || W.isDown) && player.body.touching.down) {
            player.setVelocityY(-250);
            player_pre_atk.setVelocityY(-250);
            player_atk.setVelocityY(-250);
        }

        if (cursors.right.isDown) {
            player.visible = false;
            player_pre_atk.visible = true;
            player_pre_atk.anims.play('right_pre_atk');
            this.time.addEvent({
                delay: 250,
                callback: () => {
                    player_pre_atk.visible = false;
                    player_atk.visible = true;
                    player_atk.anims.play('right_atk');
                    this.time.addEvent({
                        delay: 400,
                        callback: () => {
                            player_atk.visible = false;
                            player.visible = true;
                        }
                    })
                }
            })
        }
        else if (cursors.left.isDown) {
            player.visible = false;
            player_pre_atk.visible = true;
            player_pre_atk.anims.play('left_pre_atk');
            this.time.addEvent({
                delay: 250,
                callback: () => {
                    player_pre_atk.visible = false;
                    player_atk.visible = true;
                    player_atk.anims.play('left_atk');
                    this.time.addEvent({
                        delay: 400,
                        callback: () => {
                            player_atk.visible = false;
                            player.visible = true;
                        }
                    })
                }
            })
        }
    }
}