/*  STORYLINE SCENE (before Tutorial)


*/

var moveOnAlive = false;
var ENTER;
var script;
var enterText;
var cutsceneT, opendoor;

class StorylineT extends Phaser.Scene {
    constructor() {
        super({ key: 'StorylineT' });
    }

    preload() {
        this.load.audio('cutsceneT', ['assets/audio/soundtrack/cutsceneT.mp3']);
        this.load.audio('opendoor', ['assets/audio/soundeffects/opendoor.wav']);

    }

    create() {
        cutsceneT = this.sound.add('cutsceneT', {volume: 0.35, loop: true});
        cutsceneT.play();

        opendoor = this.sound.add('opendoor', {volume: 0.35});

        script = '✧ Welcome to the Intergalactic Space Force [ISF] ⇴ Weapons Training Arena\n\n\nAgent Name: Blade \n▹ Weapons: Sword and Daggers \n▹ Material: Steel \n▹ Strength: Medium\n\n\nLoading Training Simulation \n▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋▒▋ 100%  \n\n↗ Fellow ISF comrades report higher rates of mission success after completing training.'
        this.label = this.add.text(80, 80, '', { fontSize: '23px', fill: '#37F121'}).setWordWrapWidth(600);
        this.typewriteText(script);
        ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        enterText = this.add.text(170,515,'[PRESS ENTER TO VIEW INSTRUCTIONS & BEGIN TRAINING]', { fontSize: '19px', fill: '#ffffff'});
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
            delay: 25 * text.length,
            callback: () => {
                enterText.visible = true;
            }
        })

        }

    update() {
        if (ENTER.isDown && enterText.visible) {
            opendoor.play();
            cutsceneT.stop();
            this.scene.stop('StorylineT');
            this.scene.launch('Instructions');
        }

        }
}
