/*  STORYLINE SCENE (after clicking PLAY)


*/

var moveOnAlive = false;
var ENTER;
var script;
var enterText;
var cutscene0, button2;

class Storyline0 extends Phaser.Scene {
    constructor() {
        super({ key: 'Storyline0' });
    }

    preload() {
      this.load.audio('cutscene0', ['assets/audio/soundtrack/cutscene0.wav']);
      this.load.audio('button2', ['assets/audio/soundeffects/button2.mp3']);
    }

    create() {
      cutscene0 = this.sound.add('cutscene0', {volume: 0.35, loop: true});
      cutscene0.play();

      button2 = this.sound.add('button2', {volume: 0.35});

      script = 'Log in: ✳❃✱✻✹ \n\nWelcome, Comrade of the Intergalactic Space Force \nYou have (1) new mission assignment. \n\nReceiving data from headquarters  ▋▋▋▋▋▋▋▋▋▋  \n\n\n► MISSION DETAILS ◀ \nOperation: Avenge Planet Earth & Save Humanity \n\nLocation in Space: \n▹ Planet Earth\n▹ Milky Way Galaxy\n▹ Dimension 46B03 \n [A parallel dimension in which Earth still exists]  \n\nLocation in Time: \n▹ Mission begins in Earth\'s prehistoric age.\n▹ Use your time-traveling device to continue to the year 2200. \n\nWeapon Class: Blade \n▹ Sword and dagger \n▹ Weapon status will change to reflect current time period.  '
      this.label = this.add.text(70, 60, '', { fontSize: '16px', fill: '#37F121' }).setWordWrapWidth(650);
      this.typewriteText(script);
      ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      enterText = this.add.text(480,530,'[PRESS ENTER TO ACCEPT MISSION]', { fontSize: '15px', fill: '#ffffff'});
      enterText.visible = false;


    }

    typewriteText(text){
      const length = text.length
      let i = 0
      this.time.addEvent({
        callback: () => {
          this.label.text += text[i]
          ++i
        },
        repeat: length -1,
        delay: 50
      })

      this.time.addEvent({
          delay: 8500,
          callback: () => {
              enterText.visible = true;
          }
      })

    }


    update() {
      if (ENTER.isDown) {
        button2.play();
        this.scene.stop('Storyline0');
        this.scene.launch('Storyline1');
      }

      }
}
