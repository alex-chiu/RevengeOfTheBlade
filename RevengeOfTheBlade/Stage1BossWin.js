/*  SCENE WHEN PLAYER WINS IN BOSS 1 SCENE

    Scene that appears when the player wins in Boss1.
    Has options for returning to the menu or or going to stage2.
*/

class Stage1BossWin extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage1BossWin' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220,'YOU WON', { fontSize: '75px', fill: '#ffffff' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 260,'the prehistoric age!', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5);

      const tryAgainButton = this.add.text(game.config.width/2, 370, 'STAGE 2', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => {
        this.scene.restart('Stage1Boss');
        this.scene.stop('Stage1Boss');
        this.scene.start('Stage4') // change to Stage2 later on
      });

      const menuButton = this.add.text(game.config.width/2, 300, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Stage1Boss');
        this.scene.stop('Stage1Boss');
        this.scene.start('MenuBoss1C');
      });
    }

    update() {

    }
}
