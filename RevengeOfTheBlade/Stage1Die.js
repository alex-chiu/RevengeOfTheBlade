/*  SCENE WHEN PLAYER DIES IN STAGE 1

    Scene that appears when the player dies in Satge1.
    Has options for returning to the menu or trying the stage again.
*/

class Stage1Die extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage1Die' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220,'YOU DIED', { fontSize: '55px', fill: '#ffffff' }).setOrigin(0.5);

      const tryAgainButton = this.add.text(game.config.width/2, 360, '> revive & try again <', { fontSize: '35px', fill: '#b5dbf7' }).setOrigin(0.5);
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => {
        this.scene.restart('Stage1');
        this.scene.start('Stage1');
      });

      const menuButton = this.add.text(game.config.width/2, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Stage1');
        this.scene.stop('Stage1');
        this.scene.start('Menu');
      });
    }

    update() {

    }
}
