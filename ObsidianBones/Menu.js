var playButton;
var tutorialButton;

class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu' });
    }

    preload(){

      this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
      this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');

    }

    create(){
      this.add.tileSprite(400, 300, 800, 600, 'sky0');
      this.add.tileSprite(400, 300, 800, 600, 'clouds1');

      this.add.text(80,100,'OBSIDIAN BONES', { fontSize: '75px', fill: '#ffffff' });

      tutorialButton = this.add.text(350, 300, 'TUTORIAL', { fontSize: '20px', fill: '#b5dbf7' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => { this.scene.start('Tutorial1'); });
      tutorialButton.on('pointerover', () => { this.buttonOver(tutorialButton); });
      tutorialButton.on('pointerout', () => { this.buttonNotOver(tutorialButton); });

      playButton = this.add.text(310, 375, 'PLAY', { fontSize: '75px', fill: '#8db9d9' });
      playButton.setInteractive();
      playButton.on('pointerdown', () => { this.scene.start('RobotBossFight'); });
      playButton.on('pointerover', () => { this.buttonOver(playButton); });
      playButton.on('pointerout', () => { this.buttonNotOver(playButton); });
    }

    buttonOver(button){
      if (button == playButton){
        playButton.setStyle({fill:'#fffb00'});
      }
      else{
        tutorialButton.setStyle({fill:'#fffb00'});
      }
    }

    buttonNotOver(button){
      if (button == playButton){
        playButton.setStyle({fill:'#8db9d9'})
      }
      else{
        tutorialButton.setStyle({fill:'#8db9d9'});
      }
    }

    update(){

    }
}
