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

      this.add.text(200,190,'CONGRATULATIONS', { fontSize: '45px', fill: '#ffffff' });
      this.add.text(230,240,'YOU WON!', { fontSize: '75px', fill: '#ffffff' });

      const menuButton = this.add.text(350, 330, 'MENU', { fontSize: '40px', fill: '#8db9d9' });
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('RobotBossFight');
        this.scene.stop('RobotBossFight');
        this.scene.start('Menu');
      });
    }

    update() {

    }
}
