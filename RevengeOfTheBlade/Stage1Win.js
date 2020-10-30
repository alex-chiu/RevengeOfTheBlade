/*  SCENE WHEN PLAYER KILLED EVERY ENEMY IN STAGE 1

    Scene that appears when the player wins Stage1.
    Has options for returning to the menu or affronting the boss.
*/

class Stage1Win extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage1Win' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220,'YOU WON', { fontSize: '75px', fill: '#ffffff' }).setOrigin(0.5);

      const finalBossButton = this.add.text(game.config.width/2, 360, 'BOSS 1', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      finalBossButton.setInteractive();
      finalBossButton.on('pointerdown', () => {
        this.scene.restart('Stage1');
        this.scene.stop('Stage1');
        this.scene.start('Stage1Boss');
      });

      const menuButton = this.add.text(game.config.width/2, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Stage1');
        this.scene.stop('Stage1');
        this.scene.start('MenuStage1C');
      });
    }

    update() {

    }
}
