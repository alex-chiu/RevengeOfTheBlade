var obstacles;
var player;
var boss;
var cursors;
var life = 100;
var lifeText;

class Scene1 extends Phaser.Scene{
    constructor() {
        super({key:'Scene1'});
    }

    preload() {
        this.load.image('obstacle', 'assets/sprites/obstacle.png');
        this.load.spritesheet('hero', 'assets/sprites/hero.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('robotBoss', 'assets/sprites/hero.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.cameras.main.setBackgroundColor('#828b99')
        lifeText = this.add.text(16, 16, 'Life: 100', { fontSize: '25px', fill: '#ffffff' });

        obstacles = this.physics.add.staticGroup();
        obstacles.create(300, 580, 'obstacle');
        obstacles.create(200, 565, 'obstacle');
        obstacles.create(200, 600, 'obstacle');
        obstacles.create(600, 600, 'obstacle');
        
        boss = this.add.image(650, 555, 'robotBoss')

        player = this.physics.add.sprite(100, 450, 'hero');
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'hero', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        player.body.setGravityY(300)

        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(player, boss);
    }

    update() {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-160);
        }
    }
}