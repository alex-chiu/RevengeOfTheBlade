/*  STORYLINE SCENE (before middle stage)


*/

var moveOnAlive = false;
var ENTER;
var script;
var enterText;
var cutscene0, opendoor;

class Storyline2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Storyline2' });
    }

    preload() {
      this.load.audio('cutscene0', ['assets/audio/soundtrack/cutscene0.wav']);
      this.load.audio('opendoor', ['assets/audio/soundeffects/opendoor.wav']);

    }

    create() {

      cutscene0 = this.sound.add('cutscene0', {volume: 0.35, loop: true});
      cutscene0.play();

      opendoor = this.sound.add('opendoor', {volume: 0.35});

      script = '✉ Incoming Message ✉ \nWell done, Agent. You have survived Earth\'s prehistoric age. \nWeapon: Upgraded from [ STONE ] to [ IRON ] to [ STEEL ] \nRange ATK DMG: 8 // Melee ATK DMG: 15 \nHealth restored and injuries treated \n\n\n⍟ COORDINATES ⍟\n\nNorth America, Earth \nA.D. 2020 [Digital Age] \n\nCommencing time travel \n\n▁▁▁▂▂▂▃▃▃▃▄▄▄▅▅▅▆▆▆▇▇▇███\n\nMessage: In this era you must defeat foes of Earth\'s modern era, a period of great social and political unrest. You need to protect civilians caught in the crossfire.\n\n▋▋▋▋▋▋▋▋▋▋ ARRIVED ▋▋▋▋▋▋▋▋▋▋'
      this.label = this.add.text(60, 60, '', { fontSize: '17px', fill: '#37F121'}).setWordWrapWidth(645);
      this.typewriteText(script);
      ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      enterText = this.add.text(300,530,'[PRESS ENTER TO EXIT SHIP AND CONTINUE MISSION]', { fontSize: '15px', fill: '#ffffff'});
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
        delay: 30
      })

      this.time.addEvent({
          delay: 30 * text.length + 1000,
          callback: () => {
              enterText.visible = true;
          }
      })

    }

    update() {
      if (ENTER.isDown) {
        opendoor.play();
        cutscene0.stop();
        this.scene.stop('Storyline2');
        this.scene.launch('Stage4');
      }

      }
}
