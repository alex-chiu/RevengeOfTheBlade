/*  SCENE WHEN PLAYER KILLED EVERY ENEMY IN STAGE 5

    Scene that appears when the player wins.
    Has options for returning to the menu or affronting the final robot boss.
*/

class Stage5Win extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage5Win' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 210,'Well done. Weapons upgraded to', { fontSize: '23px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 240,'chromium alloy, deal high damage.', { fontSize: '23px', fill: '#37F121' }).setOrigin(0.5);

      const finalBossButton = this.add.text(game.config.width/2, 375, 'FINAL BOSS', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      finalBossButton.setInteractive();
      finalBossButton.on('pointerdown', () => {
        this.scene.stop('Stage5');
        this.scene.stop('Stage5Win');
        robot1Move.stop();
        robot2Move.stop();
        laserE.stop();
        laserR.stop();
        laserL.stop();
        this.scene.start('RobotBossFight');
      });

      const menuButton = this.add.text(game.config.width/2, 300, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.stop('Stage5');
        this.scene.stop('Stage5Win');
        robot1Move.stop();
        robot2Move.stop();
        laserE.stop();
        laserR.stop();
        laserL.stop();
        this.scene.start('MenuStage5C');
      });
    }

    update() {

    }
}
