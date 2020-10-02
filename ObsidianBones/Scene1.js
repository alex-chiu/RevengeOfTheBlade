// Global Variables
var obstacles;
var player, player_atk;
var boss;
var cursors;
var spaceBar;
var W, A, S, D;
var life = 100, bossLife = 500;
var lifeText, bossLifeText;
var attack_anim_playing = false;
var player_attack_left_hitbox, player_attack_right_hitbox, boss_body_hitbox, boss_arm_hitbox;
var hello

// DEBUG PARAMETERS
var debug = false;

// Scene1 Class
class Scene1 extends Phaser.Scene{
    constructor() {
        super({key:'Scene1'});
    }

    // Preload Images and Sprites
    preload() {
        this.load.image('obstacle', 'assets/sprites/obstacle.png');
        this.load.spritesheet('robotBoss', 'assets/sprites/robot-boss-sprite.png', { frameWidth: 320, frameHeight: 500 });
        this.load.spritesheet('hero', 'assets/sprites/hero-walk-preattack-sprite.png', { frameWidth: 150, frameHeight: 230 });
        this.load.spritesheet('hero_attack', 'assets/sprites/hero-attack-sprite.png', { frameWidth: 255, frameHeight: 230 });
    }

    // Create all the Sprites/Images/Platforms
    create() {
        this.cameras.main.setBackgroundColor('#828b99')
        lifeText = this.add.text(15, 15, 'Life: 100', { fontSize: '25px', fill: '#ffffff' });
        bossLifeText = this.add.text(580, 15, 'Boss Life: 500', { fontSize: '25px', fill: '#ffffff' });

        // Create Obstacles
        obstacles = this.physics.add.staticGroup();
        obstacles.create(300, 580, 'obstacle');
        obstacles.create(200, 565, 'obstacle');
        obstacles.create(200, 600, 'obstacle');
        obstacles.create(600, 600, 'obstacle');

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

        // Player and Boss Hitboxes
        player_attack_right_hitbox = this.add.rectangle(player.body.position.x, player.body.position.y, 35, 90);
        player_attack_right_hitbox.setStrokeStyle(4, 0xefc53f);
        player_attack_left_hitbox = this.add.rectangle(player.body.position.x, player.body.position.y, 35, 90);
        player_attack_left_hitbox.setStrokeStyle(4, 0xefc53f);
        boss_body_hitbox = this.add.rectangle(boss.body.position.x, boss.body.position.y, 45, 185);
        boss_body_hitbox.setStrokeStyle(5, 0xefc53f);
        boss_arm_hitbox = this.add.rectangle(boss.body.position.x, boss.body.position.y, 75, 40);
        boss_arm_hitbox.setStrokeStyle(5, 0xefc53f);

        if (!debug) {
            player_attack_right_hitbox.visible = false;
            player_attack_left_hitbox.visible = false;
            boss_arm_hitbox.visible = false;
            boss_body_hitbox.visible = false;
        }

        // Add Input Sources
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        cursors = this.input.keyboard.createCursorKeys();

        // Add Colliders
        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(player_atk, obstacles);
        this.physics.add.collider(boss, obstacles);
    }

    // Constantly Updating Game Loop
    update() {
        player_attack_right_hitbox.setPosition(player.body.position.x + 75, player.body.position.y + 50);
        player_attack_left_hitbox.setPosition(player.body.position.x - 15, player.body.position.y + 50)
        boss_body_hitbox.setPosition(boss.body.position.x + 100, boss.body.position.y + 95);
        boss_arm_hitbox.setPosition(boss.body.position.x + 40, boss.body.position.y + 75);

        // Player Movement
        if (A.isDown) {
            player.setVelocityX(-160);
            player_atk.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (D.isDown) {
            player.setVelocityX(160);
            player_atk.setVelocityX(160);
            player.anims.play('right', true);
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
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                player_atk.visible = false;
                                player.visible = true;
                                attack_anim_playing = false;
                                this.checkPlayerAttack('R');
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
                        this.time.addEvent({
                            delay: 400,
                            callback: () => {
                                player_atk.visible = false;
                                player.visible = true;
                                attack_anim_playing = false;
                                this.checkPlayerAttack('L');
                            }
                        })
                    }
                })
            }
        }

        this.updateLifeText();
    }

    // Checks if Player Attack Hits
    checkPlayerAttack(direction) {
        if (debug) { console.log("CHECKING HIT") };
        if (direction == 'L') {
            if (Phaser.Geom.Intersects.RectangleToRectangle(player_attack_left_hitbox, boss_body_hitbox) || Phaser.Geom.Intersects.RectangleToRectangle(player_attack_left_hitbox, boss_arm_hitbox)) {
                if (debug) { console.log("LEFT HIT") };
                bossLife -= 1;
            }
        }
        else if (direction == 'R') {
            if (Phaser.Geom.Intersects.RectangleToRectangle(player_attack_right_hitbox, boss_body_hitbox) || Phaser.Geom.Intersects.RectangleToRectangle(player_attack_right_hitbox, boss_arm_hitbox)) {
                if (debug) { console.log("RIGHT HIT") };
                bossLife -= 1;
            }
        }
    }

    // Updates Life Text
    updateLifeText() {
        lifeText.setText('Life: ' + life);
        bossLifeText.setText('Boss Life: ' + bossLife);
    }
}
