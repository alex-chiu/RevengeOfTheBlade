/*  SCENE WHEN PLAYER KILLED EVERY ENEMY IN STAGE 5

    Scene that appears when the player wins.
    Has options for returning to the menu or affronting the final robot boss.
*/

class Stage5Win extends Phaser.Scene{
    constructor() {
        super({ key: 'Stage5Win' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(220,180,'YOU WON', { fontSize: '75px', fill: '#ffffff' });

      const finalBossButton = this.add.text(290, 360, 'FINAL BOSS', { fontSize: '40px', fill: '#b5dbf7' });
      finalBossButton.setInteractive();
      finalBossButton.on('pointerdown', () => {
        this.scene.restart('Stage5');
        this.scene.stop('Stage5');
        this.scene.start('RobotBossFight');
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
