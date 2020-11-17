/*  MENU SCENE after Boss1 defeated

    Has options for entering the tutorial or starting stage2.
*/

var ironlevelButton, tutorialButton, audioButton;
var soundState = 'off';

class MenuBoss1C extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuBoss1C' });
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
      this.soundtrack = this.sound.add('menuMusic', {volume: 0.5, loop: true});

      buttonSound = this.sound.add('buttonSound', {volume: 0.5});

      // Background
      this.add.tileSprite(400, 300, 800, 600, 'sky0');
      this.add.tileSprite(400, 300, 800, 600, 'clouds1');

      // Title
      this.add.text(80,90,'Revenge of The', { fontSize: '75px', fill: '#ffffff' });
      this.add.text(280,170,'Blade', { fontSize: '75px', fill: '#ffffff' });

      // Play tutorial
      tutorialButton = this.add.text(350, 270, 'TUTORIAL', { fontSize: '20px', fill: '#b5dbf7' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => {
        buttonSound.play();
        this.soundtrack.stop();
        this.scene.stop('MenuBoss1C');
        this.scene.start('InstructionsB1C');
      });
      tutorialButton.on('pointerover', () => { this.buttonOver(tutorialButton); });
      tutorialButton.on('pointerout', () => { this.buttonNotOver(tutorialButton); });


      this.add.image(510, 345, 'check');
      this.add.image(590, 525, 'cross');

      // boss crosses
      this.add.image(450, 370, 'check');
      this.add.image(450, 460, 'cross');
      this.add.image(450, 548, 'cross');


      this.add.text(300,330,'Stone Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(360, 360, 'BOSS 1', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(360,450,'BOSS 4', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(220,508,'Chromium Alloy Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(360,538,'BOSS 5', { fontSize: '20px', fill: '#8db9d9' });



      ironlevelButton = this.add.text(280,420,'Titanium Level', { fontSize: '30px', fill: '#02a3d9' });
      ironlevelButton.setInteractive();
      ironlevelButton.on('pointerdown', () => {
        buttonSound.play();
        this.soundtrack.stop();
        this.scene.stop('MenuBoss1C');
        this.scene.start('Stage4'); // change to Stage2 when available
      });
      ironlevelButton.on('pointerover', () => { this.buttonOver(ironlevelButton); });
      ironlevelButton.on('pointerout', () => { this.buttonNotOver(ironlevelButton); });

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
