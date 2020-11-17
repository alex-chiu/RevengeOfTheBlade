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

      this.add.text(game.config.width/2, 220,'YOU DIED', { fontSize: '55px', fill: '#ffffff' }).setOrigin(0.5);

      const tryAgainButton = this.add.text(game.config.width/2, 375, '> revive & try again <', { fontSize: '35px', fill: '#b5dbf7' }).setOrigin(0.5);
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => {
        this.scene.stop('RobotBossFight');
        this.scene.start('RobotBossFight');
      });

      const menuButton = this.add.text(game.config.width/2, 300, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.stop('RobotBossFight');
        this.scene.start('MenuStage5C');
      });
    }

    update() {

    }
}
