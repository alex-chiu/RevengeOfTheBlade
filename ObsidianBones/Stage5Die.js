/*  SCENE WHEN PLAYER DIES IN STAGE 5

    Scene that appears when the player dies.
    Has options for returning to the menu or trying the stage again.
*/

class Stage5Die extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage5Die' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(220,180,'YOU DIED', { fontSize: '75px', fill: '#ffffff' });

      const tryAgainButton = this.add.text(290, 360, 'TRY AGAIN', { fontSize: '40px', fill: '#b5dbf7' });
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => {
        this.scene.restart('Stage5');
        this.scene.start('Stage5');
      });

      const menuButton = this.add.text(350, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' });
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Stage5');
        this.scene.stop('Stage5');
        this.scene.start('Menu');
      });
    }

    update() {

    }
}
