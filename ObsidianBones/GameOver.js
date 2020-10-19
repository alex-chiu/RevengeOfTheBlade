/*  GAME OVER SCENE

    Scene that appears when the player dies.
    Has options for returning to the menu or trying the stage again.
*/

class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
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
        this.scene.restart('RobotBossFight');
        this.scene.start('RobotBossFight');
      });

      const menuButton = this.add.text(350, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' });
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.stop('RobotBossFight');
        this.scene.restart('RobotBossFight');
        this.scene.start('Menu');
      });
    }

    update() {

    }
}
