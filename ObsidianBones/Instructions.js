/*  TUTORIAL ENTRY INSTRUCTION SCENE

    Provides basic instructions to player regarding the controls of the game.
*/

var hero;
var playButton;
var backButton;
var practiceTxt;
var menuTxt;

class Instructions extends Phaser.Scene{
    constructor() {
        super({ key: 'Instructions' });
    }

    preload(){
      this.add.text(130,15,'INSTRUCTIONS', { fontSize: '75px', fill: '#6543b5' });

      this.add.text(50,150,'W - Jump', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,200,'A - Move Left', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,250,'D - Move Right', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,350,'<> - Melee Attack', { fontSize: '40px', fill: '#d2c4f5' });
      this.add.text(50,400,'MB1 - Ranged Attack', { fontSize: '40px', fill: '#d2c4f5' });

      this.load.image('hero', 'assets/sprites/hero.png');
      this.load.image('arrowR', 'assets/arrowR.png');
      this.load.image('arrowL', 'assets/arrowL.png');
      menuTxt = this.add.text(100, 541,'MENU', { fontSize: '20px', fill: '#ffffff' });
      practiceTxt = this.add.text(605, 541,'PRACTICE', { fontSize: '20px', fill: '#ffffff' });
    }

    create(){
      hero = this.physics.add.staticGroup();
      hero.create(660, 280, 'hero');

      playButton = this.add.image(750, 550, 'arrowR');
      playButton.setInteractive();
      playButton.on('pointerdown', () => { this.scene.start('Tutorial'); });
      playButton.on('pointerover', () => { this.buttonOver(playButton); });
      playButton.on('pointerout', () => { this.buttonNotOver(playButton); });

      backButton = this.add.image(50, 550, 'arrowL');
      backButton.setInteractive();
      backButton.on('pointerdown', () => { this.scene.start('Menu'); });
      backButton.on('pointerover', () => { this.buttonOver(backButton); });
      backButton.on('pointerout', () => { this.buttonNotOver(backButton); });
    }

    buttonOver(button) {
      if (button == playButton) {
        practiceTxt.setStyle({fill:'#fffb00'});
      }
      else{
        menuTxt.setStyle({fill:'#fffb00'});
      }
    }

    buttonNotOver(button){
      if (button == playButton) {
        practiceTxt.setStyle({fill:'#ffffff'})
      }
      else {
        menuTxt.setStyle({fill:'#ffffff'});
      }
    }

    update() {

    }
}
