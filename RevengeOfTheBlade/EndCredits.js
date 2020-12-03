/*  END CREDITS SCENE

*/

var moveOnAlive = false;
var ENTER;
var script;
var enterText;
var creditstrack, opendoor;

class EndCredits extends Phaser.Scene {
    constructor() {
        super({ key: 'EndCredits' });
    }

    preload() {
        this.load.audio('creditstrack', ['assets/audio/soundtrack/credits.wav']);
        this.load.audio('opendoor', ['assets/audio/soundeffects/opendoor.wav']);

    }

    create() {
        creditstrack = this.sound.add('creditstrack', {volume: 0.35, loop: true});
        creditstrack.play();

        opendoor = this.sound.add('opendoor', {volume: 0.35});

        script = '▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋\n Revenge of the Blade \n\nby SPACKE Games \n\n PROGRAMMERS   Alex Chiu \n                     Edoardo Palazzi \n                      Kristina Salazar \n\n     CONCEPT CREATOR   Kristina Salazar  \n\n   LEVEL DESIGNERS   Edoardo Palazzi \n                      Kristina Salazar \n\n   NARRATIVE WRITER   Kristina Salazar \n\nMECHANICS ENGINEER   Alex Chiu       \n\n      VISUAL ARTIST   Kristina Salazar \n\n             AUDIO CREATORS   NeoSpica ✧ josepharaoh99 \n                          harman94 ✧ GameAudio \n                            Mr._Fritz_ ✧ Scrampunk \n                              Sirkoto51 ✧ plasterbrain \n                               tyops ✧ PatrickLieberkind \n\n  PLAYTESTERS   Rafael Soto \n                      Christopher Perry \n              Abhay Ram \n                Ian McIntosh\n                Yvonne Wang \n            Eric Ji \n             Suyun Ha \n                  Uzair Saleem  \n\nSPECIAL THANKS TO   Dr. Toprac      \n               Gahwon Lee \n                  Biswajit Saha \n\n      SOFTWARES & ENGINES   Phaser 3                \n            itch.io \n            Aseprite'
        this.label = this.add.text(190, 30, '', { fontSize: '12px', fill: '#37F121', align: 'center'}).setWordWrapWidth(650);  
        this.typewriteText(script);
        ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        enterText = this.add.text(560,565,'[PRESS ENTER TO RETURN TO MENU]', { fontSize: '10px', fill: '#ffffff'});
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
            delay: 25
        })

        this.time.addEvent({
            delay: 6000,
            callback: () => {
                enterText.visible = true;
            }
        })

        }

    update() {
        if (ENTER.isDown) {
            opendoor.play();
            creditstrack.stop();
            this.scene.stop('EndCredits');
            this.scene.launch('Menu');
        }

        }
}
