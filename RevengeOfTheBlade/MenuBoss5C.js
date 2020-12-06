/*  MENU SCENE after Boss1 defeated

    Has options for entering the tutorial or starting stage2.
*/

var ironlevelButton, tutorialButton, audioButton, creditButtonGC;
var soundState = 'off';
var titleback, source, canvas, ctx, imageData;


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

      // Background
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

      // level crosses
      // level 1
      this.add.image(510, 345, 'check');
      // level 2
      this.add.image(540, 435, 'check');
      // level 3
      this.add.image(590, 525, 'check');

      // boss crosses
      // level 1 boss
      this.add.image(478, 370, 'check');
      // level 2 boss
      this.add.image(483, 460, 'check');
      // level 3 boss
      this.add.image(460, 549, 'check');


      this.add.text(300,330,'Stone Level', { fontSize: '30px', fill: '#7C5EBF' });
      this.add.text(316, 360, 'BOSS 1: Iron', { fontSize: '20px', fill: '#8678A5' });
      this.add.text(280,420,'Titanium Level', { fontSize: '30px', fill: '#7C5EBF' });
      this.add.text(311,450,'BOSS 2: Steel', { fontSize: '20px', fill: '#8678A5' });
      this.add.text(220,508,'Chromium Alloy Level', { fontSize: '30px', fill: '#7C5EBF' });
      this.add.text(325,538,'Final Boss', { fontSize: '20px', fill: '#8678A5' });

      audioButton = this.add.text(5, 570, 'audio', { fontSize: '20px', fill: '#8db9d9' });
      audioButton.setInteractive();
      audioButton.on('pointerdown', () => {
        this.switchSound();
        buttonSound.play();
      });
      audioButton.on('pointerover', () => { this.buttonOver(audioButton); });
      audioButton.on('pointerout', () => { this.buttonNotOver(audioButton); });

      // View Game Credits
      creditButtonGC = this.add.text(340, 278, 'CREDITS', { fontSize: '25px', fill: '#9681C1' });
      creditButtonGC.setInteractive();
      creditButtonGC.on('pointerdown', () => {
        buttonSound.play();
        this.scene.stop('MenuBoss5C');
        this.scene.start('EndCreditsGC');
        this.textures.remove('pad')
      });
      creditButtonGC.on('pointerover', () => { this.buttonOver(creditButtonGC); });
      creditButtonGC.on('pointerout', () => { this.buttonNotOver(creditButtonGC); });
    }

    buttonOver(button) {
      if (button == playButton) {
        playButton.setStyle({fill:'#37F121'});
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#37F121'});
      }
      if (button == creditButtonGC) {
        creditButtonGC.setStyle({fill:'#37F121'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#7357AD'});
      }
    }

    buttonNotOver(button) {
      if (button == playButton) {
        playButton.setStyle({fill:'#9681C1'})
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#9681C1'});
      }
      if (button == creditButtonGC) {
        creditButtonGC.setStyle({fill:'#9681C1'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#9681C1'});
      }
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


    update() {
      titleback.tilePositionX -= 8;
    }
}
