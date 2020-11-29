/*  STORYLINE SCENE (before final stage)


*/

var moveOnAlive = false;
var ENTER;
var script;
var enterText;
var cutscene0;

class Storyline3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Storyline3' });
    }

    preload() {
      this.load.audio('cutscene0', ['assets/audio/soundtrack/cutscene0.wav']);
      this.load.audio('opendoor', ['assets/audio/soundeffects/opendoor.wav']);

    }

    create() {
      cutscene0 = this.sound.add('cutscene0', {volume: 0.35, loop: true});
      cutscene0.play();

      opendoor = this.sound.add('opendoor', {volume: 0.35});

      script = '✉ Incoming Message ✉ \nYour training has served you well, Agent. You have survived Earth\'s modern era. \n\nWeapon material: Upgraded from [ STEEL ] to [ TITANIUM ] to [CHROMIUM ALLOY] \nRange ATK DMG: 10 // Melee ATK DMG: 20 \nHealth restored and wounds treated \n\n\n⍟ COORDINATES ⍟\n\nEurope, Earth \nA.D. 2300 [Era of Android Uprising] \n\nCommencing time travel \n\n▁▁▁▂▂▂▃▃▃▃▄▄▄▅▅▅▆▆▆▇▇▇███\n\nMessage: The mission\'s final phase and ultimate goal is to save humanity from extinction. Humans have lost control of their own technology, and are now under attack. \n\n▋▋▋▋▋▋▋▋▋▋ ARRIVED ▋▋▋▋▋▋▋▋▋▋'
      this.label = this.add.text(70, 60, '', { fontSize: '17px', fill: '#37F121'}).setWordWrapWidth(650);
      this.typewriteText(script);
      ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      enterText = this.add.text(300,545,'[PRESS ENTER TO EXIT SHIP AND COMPLETE MISSION]', { fontSize: '15px', fill: '#ffffff'});
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
        this.scene.stop('Storyline3');
        this.scene.launch('Stage5');
      }

      }
}
