/*  MENU SCENE after Boss1 defeated

    Has options for entering the tutorial or starting stage2.
*/

var ironlevelButton, tutorialButton, audioButton;
var soundState = 'off';

class MenuBoss5C extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuBoss5C' });
    }

    preload() {
      // Soundtrack
      this.load.audio('menuMusic', ['assets/audio/soundtrack/intro.wav'])
      this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
      this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
      this.load.image('check', 'assets/checkmark.png');
      this.load.image('cross', 'assets/crossmark.png');

      this.load.audio('buttonSound', ['assets/audio/soundeffects/button2.mp3']);
    }

    create() {
      // Background music
      this.soundtrack = this.sound.add('menuMusic', {volume: 0.35, loop: true});

      buttonSound = this.sound.add('buttonSound', {volume: 0.50});

      // Background
      this.add.tileSprite(400, 300, 800, 600, 'sky0');
      this.add.tileSprite(400, 300, 800, 600, 'clouds1');

      // Title
      this.add.text(80,90,'Revenge of The', { fontSize: '75px', fill: '#ffffff' });
      this.add.text(280,170,'Blade', { fontSize: '75px', fill: '#ffffff' });

      this.add.image(315, 345, 'check');
      this.add.image(690, 345, 'check');
      this.add.image(310, 435, 'check');
      this.add.image(735, 435, 'check');
      this.add.image(582, 525, 'check');

      // boss crosses/checks
      this.add.image(245, 370, 'check');
      this.add.image(646, 370, 'check');
      this.add.image(245, 460, 'check');
      this.add.image(646, 460, 'check');
      this.add.image(439, 548, 'check');


      this.add.text(100,330,'Stone Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(160, 360, 'BOSS 1', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(560,360,'BOSS 2', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(100,420,'Steel Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(160,450,'BOSS 3', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(470,420,'Titanium Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(560,450,'BOSS 4', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(210,508,'Chromium Alloy Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(355,538,'BOSS 5', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(500,330,'Iron Level', { fontSize: '30px', fill: '#02a3d9' });

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
      if (button == ironlevelButton) {
        ironlevelButton.setStyle({fill:'#fffb00'});
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#fffb00'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#fffb00'});
      }
    }

    buttonNotOver(button) {
      if (button == ironlevelButton) {
        ironlevelButton.setStyle({fill:'#02a3d9'})
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
