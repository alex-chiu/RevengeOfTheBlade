var obstacles;
var player;
var boss;
var cursors;
var spaceBar;
var A;
var D;
var life = 100;
var lifeText;

class Scene1 extends Phaser.Scene{
    constructor() {
        super({key:'Scene1'});
    }

    preload() {
        this.load.image('obstacle', 'assets/sprites/obstacle.png');
        this.load.image('robotBoss', 'assets/sprites/RobotBoss1.jpg');
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-sprite.png', { frameWidth: 169, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 200, frameHeight: 230 });
        this.load.spritesheet('hero_pre_attack', 'assets/sprites/hero-preattack-sprite.png', { frameWidth: 200, frameHeight: 230 });
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
        boss.setBounce(0.1);
        boss.setCollideWorldBounds(true);
        boss.displayWidth = game.config.width * 0.1;
        boss.scaleY = boss.scaleX;
        boss.body.setGravityY(300);

        // Create Player
        player = this.physics.add.sprite(100, 475, 'hero');
        player.setBounce(0.25);
        player.setCollideWorldBounds(true);
        player.displayWidth = game.config.width * 0.05;
        player.scaleY = player.scaleX;
        player.body.setGravityY(300);

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

        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        // Add Colliders
        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(player, boss);
        this.physics.add.collider(boss, obstacles);
    }

    update() {
        if (A.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (D.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (spaceBar.isDown && player.body.touching.down)
        {
            player.setVelocityY(-250);
        }
    }
}