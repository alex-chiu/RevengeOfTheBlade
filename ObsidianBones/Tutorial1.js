var hero;
class Tutorial1 extends Phaser.Scene{
    constructor() {
        super({ key: 'Tutorial1' });
    }

    preload(){
      this.add.text(130,15,'INSTRUCTIONS', { fontSize: '75px', fill: '#8d948d' });

      this.add.text(50,150,'W - jump', { fontSize: '40px', fill: '#ffffff' });
      this.add.text(50,200,'A - move left', { fontSize: '40px', fill: '#ffffff' });
      this.add.text(50,250,'D - move right', { fontSize: '40px', fill: '#ffffff' });
      this.add.text(50,350,'<> - sword attacks', { fontSize: '40px', fill: '#ffffff' });
      this.add.text(50,400,'   - daggers attack', { fontSize: '40px', fill: '#ffffff' });

      this.load.image('hero', 'assets/sprites/hero.png');
      this.load.image('arrowR', 'assets/arrowR.png');
      this.load.image('arrowL', 'assets/arrowL.png');

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
