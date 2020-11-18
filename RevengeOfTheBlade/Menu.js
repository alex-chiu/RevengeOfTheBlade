/*  MENU SCENE

    Initial load screen for game.
    Has options for entering the tutorial or starting the game.
*/

// const { default: WebFontFile } = ("./WebFontFile.js");

var playButton, tutorialButton, creditButton, audioButton;
var soundState = 'off';
var buttonSound, soundtrack;
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
      soundtrack = this.sound.add('menuMusic', {volume: 0.55, loop: true});
      buttonSound = this.sound.add('buttonSound', {volume: 0.50});

      // Background
      this.add.tileSprite(400, 300, 800, 600, 'sky0');
      clouds = this.add.tileSprite(400, 300, 800, 600, 'clouds1');

      // Title
      this.add.text(80,90,'Revenge of The', { fontSize: '75px', fill: '#ffffff'});
      this.add.text(280,170,'Blade', { fontSize: '75px', fill: '#ffffff' });

      // Play tutorial
      tutorialButton = this.add.text(330, 300, 'TUTORIAL', { fontSize: '30px', fill: '#b5dbf7' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => {
        buttonSound.play();
        soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('StorylineT');
      });
      tutorialButton.on('pointerover', () => { this.buttonOver(tutorialButton); });
      tutorialButton.on('pointerout', () => { this.buttonNotOver(tutorialButton); });

      // Play main levels
      playButton = this.add.text(280, 375, '▸PLAY', { fontSize: '75px', fill: '#8db9d9' });
      playButton.setInteractive();
      playButton.on('pointerdown', () => {
        buttonSound.play();
        soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('Storyline0');
      });
      playButton.on('pointerover', () => { this.buttonOver(playButton); });
      playButton.on('pointerout', () => { this.buttonNotOver(playButton); });

      // View Game Credits
      creditButton = this.add.text(325, 485, 'CREDITS', { fontSize: '35px', fill: '#8db9d9' });
      creditButton.setInteractive();
      creditButton.on('pointerdown', () => {
        buttonSound.play();
        soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('EndCredits');
      });
      creditButton.on('pointerover', () => { this.buttonOver(creditButton); });
      creditButton.on('pointerout', () => { this.buttonNotOver(creditButton); });

      // Play Audio
      audioButton = this.add.text(5, 570, 'audio ☊', { fontSize: '25px', fill: '#8db9d9' });
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
        soundtrack.play();
        soundState = 'on'
      }
      else {
        soundtrack.stop();
        soundState = 'off'
      }
    }

    buttonOver(button) {
      if (button == playButton) {
        playButton.setStyle({fill:'#37F121'});
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#37F121'});
      }
      if (button == creditButton) {
        creditButton.setStyle({fill:'#37F121'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#37F121'});
      }
    }

    buttonNotOver(button) {
      if (button == playButton) {
        playButton.setStyle({fill:'#8db9d9'})
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#8db9d9'});
      }
      if (button == creditButton) {
        creditButton.setStyle({fill:'#8db9d9'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#8db9d9'});
      }
    }

    update() {
      clouds.tilePositionX += 0.8;
    }
}
