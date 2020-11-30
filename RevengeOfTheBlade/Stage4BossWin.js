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

      this.add.text(game.config.width/2, 210,'Success! Mission Phase II Completed', { fontSize: '22px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 240,'☑ Earth\'s Modern Era', { fontSize: '23px', fill: '#37F121' }).setOrigin(0.5);

      const tryAgainButton = this.add.text(game.config.width/2, 370, 'EARTH\'s FUTURE ERA', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => {
        this.scene.restart('Stage4Boss');
        this.scene.stop('Stage4Boss');
        tankMove.stop();
        shooting.stop();
        warzone.stop();
        missile1.stop();
        missile2.stop();
        tankShoot.stop();
        this.scene.start('Storyline3');
      });

      const menuButton = this.add.text(game.config.width/2, 300, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
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
        this.scene.start('MenuBoss4C');
      });
    }

    update() {

    }
}
