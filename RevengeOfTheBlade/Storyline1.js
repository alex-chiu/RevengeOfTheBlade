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

      script = '⍟ COORDINATES ⍟\n\nPangea, Earth \n65 Million BCE [Prehistoric Era] \nDimension 46B03 \n\n\nCommencing intergalactic time travel \n\n▁▁▁▂▂▂▃▃▃▃▄▄▄▅▅▅▆▆▆▇▇▇███\n\n\nMessage: Beware of carnivourous dinosaurs. \n\nCurrent weapon material: Stone \n\n\n▋▋▋▋▋▋▋▋▋▋ ARRIVED ▋▋▋▋▋▋▋▋▋▋ '
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
        delay: 55
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
        opendoor.play();
        cutscene0.stop();
        this.scene.stop('Storyline1');
        this.scene.launch('Stage1');
      }

      }
}
