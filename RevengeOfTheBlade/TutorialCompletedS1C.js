/*  Completed Tutorial SCENE

    Scene that appears when the player destroys both targets.
    Has options for returning to the menu or trying the tutorial again: when Stage1 Completed
*/

class TutorialCompletedS1C extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialCompletedS1C' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220 ,'TRAINING COMPLETED', { fontSize: '30px', fill: '#37F121' }).setOrigin(0.5);

      const practiceAgainButton = this.add.text(game.config.width/2, 360, 'TRAIN AGAIN', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      practiceAgainButton.setInteractive();
      practiceAgainButton.on('pointerdown', () => {
        this.scene.stop('TutorialS1C');
        this.scene.stop('TutorialCompletedS1C');
        this.scene.start('TutorialS1C');
      });

      const menuButton = this.add.text(game.config.width/2, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);;
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.stop('TutorialS1C');
        this.scene.stop('TutorialCompletedS1C');
        this.scene.start('MenuStage1C');
      });
    }

    update() {

    }
}
