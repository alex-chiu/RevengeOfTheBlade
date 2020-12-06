/*  MENU SCENE

    Initial load screen for game.
    Has options for entering the tutorial or starting the game.
*/

// const { default: WebFontFile } = ("./WebFontFile.js");

var playButton, tutorialButton, creditButton, audioButton;
var soundState = 'off';
var buttonSound, soundtrack;
var clouds, titleback;
var source, canvas, ctx, imageData;

class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
      // Soundtrack
      this.load.audio('menuMusic', ['assets/audio/soundtrack/intro.wav'])
      this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
      this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
      this.load.image('heroStatic', 'assets/sprites/hero.png');
      this.load.image('pixel', 'assets/16x16.png');
      this.load.audio('buttonSound', ['assets/audio/soundeffects/button3.wav']);
      this.load.image('title', 'assets/title.png');
      this.load.image('titleback', 'assets/titleback.png');
    }

    create() {
      // Background music
      soundtrack = this.sound.add('menuMusic', {volume: 0.55, loop: true});
      buttonSound = this.sound.add('buttonSound', {volume: 0.50});

      // Background
      this.add.tileSprite(400, 300, 800, 600, 'sky0');

      clouds = this.add.tileSprite(400, 300, 800, 600, 'clouds1');
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
      // Title
      // this.add.text(80,90,'Revenge of The', { fontSize: '75px', fill: '#ffffff'});
      // this.add.text(280,170,'Blade', { fontSize: '75px', fill: '#ffffff' });

      // Play tutorial
      tutorialButton = this.add.text(315, 317, 'TUTORIAL', { fontSize: '35px', fill: '#9082AF' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => {
        buttonSound.play();
        soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('StorylineT');
        this.textures.remove('pad')
      });
      tutorialButton.on('pointerover', () => { this.buttonOver(tutorialButton); });
      tutorialButton.on('pointerout', () => { this.buttonNotOver(tutorialButton); });

      // Play main levels
      playButton = this.add.text(275, 376, '▸PLAY', { fontSize: '75px', fill: '#A79BC2' });
      playButton.setInteractive();
      playButton.on('pointerdown', () => {
        buttonSound.play();
        soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('Storyline0');
        this.textures.remove('pad')
      });
      playButton.on('pointerover', () => { this.buttonOver(playButton); });
      playButton.on('pointerout', () => { this.buttonNotOver(playButton); });

      // View Game Credits
      creditButton = this.add.text(328, 485, 'CREDITS', { fontSize: '30px', fill: '#8678A5' });
      creditButton.setInteractive();
      creditButton.on('pointerdown', () => {
        buttonSound.play();
        soundtrack.stop();
        this.scene.stop('Menu');
        this.scene.start('EndCredits');
        this.textures.remove('pad');
      });
      creditButton.on('pointerover', () => { this.buttonOver(creditButton); });
      creditButton.on('pointerout', () => { this.buttonNotOver(creditButton); });

      // Play Audio
      audioButton = this.add.text(5, 570, 'audio ☊', { fontSize: '25px', fill: '#9681C1' });
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
        creditButton.setStyle({fill:'#7357AD'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#7357AD'});
      }
    }

    buttonNotOver(button) {
      if (button == playButton) {
        playButton.setStyle({fill:'#A79BC2'})
      }
      if (button == tutorialButton) {
        tutorialButton.setStyle({fill:'#9082AF'});
      }
      if (button == creditButton) {
        creditButton.setStyle({fill:'#8678A5'});
      }
      if (button == audioButton) {
        audioButton.setStyle({fill:'#9681C1'});
      }
    }

    update() {
      clouds.tilePositionX -= 1;
      titleback.tilePositionX -= 8;


    }
}
