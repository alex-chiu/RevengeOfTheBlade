var hero;
class Tutorial1 extends Phaser.Scene{
    constructor() {
        super({ key: 'Tutorial1' });
    }

    preload(){
      this.add.text(130,15,'INSTRUCTIONS', { fontSize: '75px', fill: '#6543b5' });

      this.add.text(50,150,'W - jump', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,200,'A - move left', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,250,'D - move right', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,350,'<> - sword attacks', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,400,'   - daggers attack', { fontSize: '40px', fill: '#d2c4f5' });

      this.load.image('hero', 'assets/sprites/hero.png');
      this.load.image('arrowR', 'assets/arrowR.png');
      this.load.image('arrowL', 'assets/arrowL.png');
      this.add.text(100, 541,'MENU', { fontSize: '20px', fill: '#ffffff' });
      this.add.text(605, 541,'PRACTICE', { fontSize: '20px', fill: '#ffffff' });

    }

    create(){
      hero = this.physics.add.staticGroup();
        hero.create(660, 280, 'hero');

      const playButton = this.add.image(750, 550, 'arrowR');
      playButton.setInteractive();
      playButton.on('pointerdown', () => { this.scene.start('RobotBossFight'); });

      const backButton = this.add.image(50, 550, 'arrowL');
      backButton.setInteractive();
      backButton.on('pointerdown', () => { this.scene.start('Menu'); });


    }

    update(){

    }
}
