/*  Completed Tutorial SCENE

    Scene that appears when the player destroys both targets.
    Has options for returning to the menu or trying the tutorial again: when boss4 Completed
*/

class TutorialCompletedB4C extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialCompletedB4C' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220 ,'TUTORIAL COMPLETED', { fontSize: '40px', fill: '#ffffff' }).setOrigin(0.5);

      const practiceAgainButton = this.add.text(game.config.width/2, 360, 'PRACTICE AGAIN', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      practiceAgainButton.setInteractive();
      practiceAgainButton.on('pointerdown', () => {
        this.scene.stop('TutorialB4C');
        this.scene.stop('TutorialCompletedB4C');
        this.scene.start('TutorialB4C');
      });

      const menuButton = this.add.text(game.config.width/2, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);;
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.stop('TutorialB4C');
        this.scene.stop('TutorialCompletedB4C');
        this.scene.start('MenuBoss4C');
      });
    }

    update() {

    }
}