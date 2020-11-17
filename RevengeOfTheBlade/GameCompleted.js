/*  SCENE WHEN PLAYER KILLED EVERY ENEMY IN STAGE 5

    Scene that appears when the player wins.
    Has options for returning to the menu or affronting the final robot boss.
*/

class GameCompleted extends Phaser.Scene {
    constructor() {
        super({ key: 'GameCompleted' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 210, 'Well done, Comrade.', { fontSize: '30px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 240, 'Earth thanks you.', { fontSize: '30px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 310, 'MISSION COMPLETED', { fontSize: '40px', fill: '#37F121' }).setOrigin(0.5);

      const menuButton = this.add.text(game.config.width/2, 375, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.stop('RobotBossFight');
        this.scene.start('MenuBoss5C');
      });
    }

    update() {

    }
}
