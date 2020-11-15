/*  MENU SCENE

    Initial load screen for game.
    Has options for entering the tutorial or starting the game.
*/

// const { default: WebFontFile } = ("./WebFontFile.js");

var playButton, tutorialButton, audioButton;
var soundState = 'off';
var buttonSound;
var clouds;

class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
      // Soundtrack
      this.load.audio('menuMusic', ['assets/audio/soundtrack/intro.wav'])
      this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
      this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');

      this.load.audio('buttonSound', ['assets/audio/soundeffects/button3.wav']);

    }

    create() {
      // Background music
      this.soundtrack = this.sound.add('menuMusic', {volume: 0.05, loop: true});

      buttonSound = this.sound.add('buttonSound', {volume: 0.50});

      // Background
      this.add.tileSprite(400, 300, 800, 600, 'sky0');
      clouds = this.add.tileSprite(400, 300, 800, 600, 'clouds1');

      // Title
      this.add.text(80,90,'Revenge of The', { fontSize: '75px', fill: '#ffffff'});
      this.add.text(280,170,'Blade', { fontSize: '75px', fill: '#ffffff' });

      // Play tutorial
      tutorialButton = this.add.text(350, 300, 'TUTORIAL', { fontSize: '20px', fill: '#b5dbf7' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => {
        buttonSound.play();
        this.soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('Instructions');
      });
      tutorialButton.on('pointerover', () => { this.buttonOver(tutorialButton); });
      tutorialButton.on('pointerout', () => { this.buttonNotOver(tutorialButton); });

      // Play main levels
      playButton = this.add.text(310, 375, 'PLAY', { fontSize: '75px', fill: '#8db9d9' });
      playButton.setInteractive();
      playButton.on('pointerdown', () => {
        buttonSound.play();
        this.soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('Storyline0');
      });
      playButton.on('pointerover', () => { this.buttonOver(playButton); });
      playButton.on('pointerout', () => { this.buttonNotOver(playButton); });

      audioButton = this.add.text(5, 570, 'audio', { fontSize: '30px', fill: '#8db9d9' });
      audioButton.setInteractive();
      audioButton.on('pointerdown', () => {
        this.switchSound();
        buttonSound.play();
      });
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
        playButton.setStyle({fill:'#FACF1A'});
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#FACF1A'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#FACF1A'});
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
      clouds.tilePositionX += 0.8;
    }
}
