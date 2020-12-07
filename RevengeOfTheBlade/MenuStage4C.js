/*  MENU SCENE after Stage4 completed

    Has options for entering the tutorial or starting the boss4 fight.
*/

var boss4Button, tutorialButton, audioButton;
var soundState = 'off';
var titleback, source, canvas, ctx, imageData;

class MenuStage4C extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuStage4C' });
    }

    preload() {
      // Soundtrack
      this.load.audio('menuMusic', ['assets/audio/soundtrack/intro.wav'])
      this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
      this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
      this.load.image('check', 'assets/checkmark.png');
      this.load.image('cross', 'assets/crossmark.png');
      this.load.image('heroStatic', 'assets/sprites/hero.png');
      this.load.image('pixel', 'assets/16x16.png');
      this.load.image('title', 'assets/title.png');
      this.load.image('titleback', 'assets/titleback.png');
      this.load.audio('buttonSound', ['assets/audio/soundeffects/button2.mp3']);
    }

    create() {
      // Background music
      this.soundtrack = this.sound.add('menuMusic', {volume: 0.35, loop: true});

      buttonSound = this.sound.add('buttonSound', {volume: 0.50});

      // // Background
      // this.add.tileSprite(400, 300, 800, 600, 'sky0');
      // this.add.tileSprite(400, 300, 800, 600, 'clouds1');

      // Title
      titleback = this.add.tileSprite(400, 300, 800, 600, 'titleback');
      this.add.tileSprite(400, 300, 800, 600, 'title');

      var source = this.textures.get('heroStatic').source[0].image;
      canvas = this.textures.createCanvas('pad', 125, 227).source[0].image;
      ctx = canvas.getContext('2d');

      ctx.drawImage(source, 0, 0);

      imageData = ctx.getImageData(0, 0, 125, 227);

      var x = 0;
      var y = 0;
      var color = new Phaser.Display.Color();

      for (var i = 0; i < imageData.data.length; i += 4){
        var r = imageData.data[i];
        var g = imageData.data[i + 1];
        var b = imageData.data[i + 2];
        var a = imageData.data[i + 3];

        if (a > 0){
          var startX = Phaser.Math.Between(0, 500);
          var startY = Phaser.Math.Between(0, 500);

          var dx = 200 + x * 16;
          var dy = 64 + y * 16;
          var image = this.add.image(startX, startY, 'pixel').setScale(0);

          color.setTo(r, g, b, a);
          image.setTint(color.color);
          this.tweens.add({
            targets: image,
            duration: 2000,
            x: dx,
            y: dy,
            scaleX: 1,
            scaleY: 1,
            angle: 360,
            delay: i / 1.5,
            yoyo: false,
            repeat: -1,
            repeatDelay: 3000,
            hold: 4000
            });
          }

          x++;

          if (x === 125){
              x = 0;
              y++;
          }
      }

      // Play tutorial
      tutorialButton = this.add.text(350, 278, 'TUTORIAL', { fontSize: '20px', fill: '#9082AF' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => {
        buttonSound.play();
        this.soundtrack.stop();
        this.scene.stop('MenuStage4C');
        this.scene.start('InstructionsS4C');
        this.textures.remove('pad')
      });
      tutorialButton.on('pointerover', () => { this.buttonOver(tutorialButton); });
      tutorialButton.on('pointerout', () => { this.buttonNotOver(tutorialButton); });


      // level crosses
      // level 1
      this.add.image(510, 345, 'check');
      // level 2
      this.add.image(540, 435, 'check');
      // level 3
      this.add.image(590, 525, 'cross');

      // boss crosses
      // level 1 boss
      this.add.image(478, 370, 'check');
      // level 3 boss
      this.add.image(460, 560, 'cross');


      this.add.text(300,330,'Stone Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(316, 360, 'BOSS 1: Iron', { fontSize: '20px', fill: '#8db9d9' });
      this.add.text(280,420,'Titanium Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(220,508,'Chromium Alloy Level', { fontSize: '30px', fill: '#02a3d9' });
      this.add.text(325,538,'Final Boss', { fontSize: '20px', fill: '#8db9d9' });

      boss4Button = this.add.text(311,450,'BOSS 2: Steel', { fontSize: '20px', fill: '#8db9d9' });
      boss4Button.setInteractive();
      boss4Button.on('pointerdown', () => {
        buttonSound.play();
        this.soundtrack.stop();
        this.scene.stop('MenuStage4C');
        this.scene.start('Stage4Boss');
        this.textures.remove('pad')
      });
      boss4Button.on('pointerover', () => { this.buttonOver(boss4Button); });
      boss4Button.on('pointerout', () => { this.buttonNotOver(boss4Button); });

      audioButton = this.add.text(5, 570, 'audio', { fontSize: '20px', fill: '#9681C1' });
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
      if (button == boss4Button) {
        boss4Button.setStyle({fill:'#37F121'});
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#37F121'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#7357AD'});
      }
    }

    buttonNotOver(button) {
      if (button == boss4Button) {
        boss4Button.setStyle({fill:'#8db9d9'})
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#9082AF'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#9681C1'});
      }
    }

    update() {
      titleback.tilePositionX -= 8;
    }
}
