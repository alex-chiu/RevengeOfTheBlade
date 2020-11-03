/*  SCENE WHEN PLAYER WINS IN BOSS 4 SCENE

    Scene that appears when the player wins in Boss4.
    Has options for returning to the menu or or going to stage5.
*/

class Stage4BossWin extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage4BossWin' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220,'YOU WON', { fontSize: '75px', fill: '#ffffff' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 260,'the current modern era!', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5);

      const tryAgainButton = this.add.text(game.config.width/2, 370, 'STAGE 5', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => {
        this.scene.restart('Stage4Boss');
        this.scene.stop('Stage4Boss');
        this.scene.start('Stage5');
      });

      const menuButton = this.add.text(game.config.width/2, 300, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Stage4Boss');
        this.scene.stop('Stage4Boss');
        this.scene.start('MenuBoss4C');
      });
    }

    update() {

    }
}
