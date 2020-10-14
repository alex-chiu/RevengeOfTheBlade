/*  Completed Tutorial SCENE

    Scene that appears when the player destroys both targets.
    Has options for returning to the menu or trying the tutorial again.
*/

class TutorialCompleted extends Phaser.Scene{
    constructor() {
        super({ key: 'TutorialCompleted' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(220,180,'TUTORIAL COMPLETED', { fontSize: '75px', fill: '#ffffff' });

      const practiceAgainButton = this.add.text(290, 360, 'PRACTICE AGAIN', { fontSize: '40px', fill: '#b5dbf7' });
      practiceAgainButton.setInteractive();
      practiceAgainButton.on('pointerdown', () => {
        this.scene.restart('Tutorial');
        this.scene.start('Tutorial');
      });

      const menuButton = this.add.text(350, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' });
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Tutorial');
        this.scene.stop('Tutorial');
        this.scene.start('Menu');
      });
    }

    update() {

    }
}
