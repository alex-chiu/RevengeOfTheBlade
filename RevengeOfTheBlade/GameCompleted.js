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

      this.add.text(game.config.width/2, 210, 'CONGRATULATIONS', { fontSize: '45px', fill: '#ffffff' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 280, 'YOU WON!', { fontSize: '75px', fill: '#ffffff' }).setOrigin(0.5);

      const menuButton = this.add.text(game.config.width/2, 350, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.stop('RobotBossFight');
        this.scene.stop('GameCompleted');
        this.scene.start('Menu');
      });
    }

    update() {

    }
}
