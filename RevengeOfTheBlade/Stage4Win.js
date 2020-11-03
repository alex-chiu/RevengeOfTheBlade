/*  SCENE WHEN PLAYER KILLED EVERY ENEMY IN STAGE 4

    Scene that appears when the player wins Stage4.
    Has options for returning to the menu or affronting the stage4 boss.
*/

class Stage4Win extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage4Win' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220,'YOU WON', { fontSize: '75px', fill: '#ffffff' }).setOrigin(0.5);

      const finalBossButton = this.add.text(game.config.width/2, 360, 'BOSS 4', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      finalBossButton.setInteractive();
      finalBossButton.on('pointerdown', () => {
        this.scene.restart('Stage4');
        this.scene.stop('Stage4');
        this.scene.start('Stage4Boss');
      });

      const menuButton = this.add.text(game.config.width/2, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Stage4');
        this.scene.stop('Stage4');
        this.scene.start('MenuStage4C');
      });
    }

    update() {

    }
}
