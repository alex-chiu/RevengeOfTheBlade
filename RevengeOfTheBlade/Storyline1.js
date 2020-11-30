/*  STORYLINE SCENE (right before stage1)


*/

var moveOnAlive = false;
var ENTER;
var script;
var enterText;
var opendoor;

class Storyline1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Storyline1' });
    }

    preload() {
      this.load.audio('opendoor', ['assets/audio/soundeffects/opendoor.wav']);
    }

    create() {
      opendoor = this.sound.add('opendoor', {volume: 0.35});

      script = '⍟ COORDINATES ⍟\n\nPangaea, Earth \n68 Million B.C.E. [Cretaceous Period] \nDimension 46B03 \n\n\nCommencing interdimensional time travel \n\n▁▁▁▂▂▂▃▃▃▃▄▄▄▅▅▅▆▆▆▇▇▇███\n\n\nCaution: Beware of carnivorous dinosaurs. \n\nNote: Your booster suit allows you to leap on top of enemies and reach high above them. \n\nCurrent Weapon Material: Stone \nRange ATK DMG: 5 // Melee ATK DMG: 10 \n\n\n▋▋▋▋▋▋▋▋▋▋ ARRIVED ▋▋▋▋▋▋▋▋▋▋ '
      this.label = this.add.text(95, 95, '', { fontSize: '17px', fill: '#37F121' }).setWordWrapWidth(600);
      this.typewriteText(script);
      ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      enterText = this.add.text(300,530,'[PRESS ENTER TO EXIT SHIP AND BEGIN MISSION]', { fontSize: '15px', fill: '#ffffff'});
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
        this.scene.stop('Storyline1');
        this.scene.launch('Stage1');
      }

      }
}
