/*  SCENE WHEN PLAYER DIES IN BOSS 4 SCENE

    Scene that appears when the player dies in Boss4.
    Has options for returning to the menu or trying the stage again.
*/

class Stage4BossDie extends Phaser.Scene {
    constructor() {
        super({ key: 'Stage4BossDie' });
    }

    preload() {

    }

    create() {
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(game.config.width/2, 220,'YOU DIED', { fontSize: '55px', fill: '#ffffff' }).setOrigin(0.5);

      const tryAgainButton = this.add.text(game.config.width/2, 360, '> Revive & Try Again <', { fontSize: '35px', fill: '#b5dbf7' }).setOrigin(0.5);
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => {
        this.scene.restart('Stage4Boss');
        tankMove.stop();
        shooting.stop();
        warzone.stop();
        missile1.stop();
        missile2.stop();
        tankShoot.stop();
        this.scene.start('Stage4Boss');
      });

      const menuButton = this.add.text(game.config.width/2, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => {
        this.scene.restart('Stage4Boss');
        this.scene.stop('Stage4Boss');
        tankMove.stop();
        shooting.stop();
        warzone.stop();
        missile1.stop();
        missile2.stop();
        tankShoot.stop();
        this.scene.start('MenuStage4C');
      });
    }

    update() {

    }
}
