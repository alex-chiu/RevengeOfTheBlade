/*  MENU SCENE

    Initial load screen for game.
    Has options for entering the tutorial or starting the game.
*/

var playButton;
var tutorialButton;
var audioButton;
var soundState = 'on';

class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
      // Soundtrack
      this.load.audio('menuMusic', ['assets/audio/soundtrack/intro.wav'])

      this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
      this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
    }

    create() {
      this.soundtrack = this.sound.add('menuMusic', {volume: 0.5, loop: true});
      this.soundtrack.play();

      this.add.tileSprite(400, 300, 800, 600, 'sky0');
      this.add.tileSprite(400, 300, 800, 600, 'clouds1');

      this.add.text(80,90,'Revenge of The', { fontSize: '75px', fill: '#ffffff' });
      this.add.text(280,170,'Blade', { fontSize: '75px', fill: '#ffffff' });

      tutorialButton = this.add.text(350, 300, 'TUTORIAL', { fontSize: '20px', fill: '#b5dbf7' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => {
        this.soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('Instructions');
      });
      tutorialButton.on('pointerover', () => { this.buttonOver(tutorialButton); });
      tutorialButton.on('pointerout', () => { this.buttonNotOver(tutorialButton); });

      playButton = this.add.text(310, 375, 'PLAY', { fontSize: '75px', fill: '#8db9d9' });
      playButton.setInteractive();
      playButton.on('pointerdown', () => {
        this.soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('Stage5');
    });
      playButton.on('pointerover', () => { this.buttonOver(playButton); });
      playButton.on('pointerout', () => { this.buttonNotOver(playButton); });

      audioButton = this.add.text(5, 570, 'audio', { fontSize: '30px', fill: '#8db9d9' });
      audioButton.setInteractive();
      audioButton.on('pointerdown', () => { this.switchSound(); });
      audioButton.on('pointerover', () => { this.buttonOver(audioButton); });
      audioButton.on('pointerout', () => { this.buttonNotOver(audioButton); });
    }

    switchSound() {
      if (soundState == 'off') {
        this.soundtrack.play();
        soundState = 'on'
      }
      else {
        this.soundtrack.stop();
        soundState = 'off'
      }
    }

    buttonOver(button) {
      if (button == playButton) {
        playButton.setStyle({fill:'#fffb00'});
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#fffb00'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#fffb00'});
      }
    }

    buttonNotOver(button) {
      if (button == playButton) {
        playButton.setStyle({fill:'#8db9d9'})
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#8db9d9'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#8db9d9'});
      }
    }

    update() {

    }
}
