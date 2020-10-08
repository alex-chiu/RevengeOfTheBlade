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

      const practiceButton = this.add.text(630, 550, 'practice', { fontSize: '30px', fill: '#1dd613' });
      practiceButton.setInteractive();
      practiceButton.on('pointerdown', () => { this.scene.start('RobotBossFight'); });


    }

    create(){
      hero = this.physics.add.staticGroup();
        hero.create(660, 280, 'hero');

    }

    update(){

    }
}
