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

      this.add.text(game.config.width/2, 210,'Mission Phase I Part I Complete', { fontSize: '23px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 240,'Weapon Upgraded: Iron', { fontSize: '23px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 270,'Range ATK DMG: 6 // Melee ATK DMG: 12', { fontSize: '22px', fill: '#37F121' }).setOrigin(0.5);


      const finalBossButton = this.add.text(game.config.width/2, 390, 'CONTINUE TO BOSS', { fontSize: '35px', fill: '#b5dbf7' }).setOrigin(0.5);
      finalBossButton.setInteractive();
      finalBossButton.on('pointerdown', () => {
        this.scene.restart('Stage1');
        this.scene.stop('Stage1');
        this.scene.start('Stage1Boss');
      });

      const menuButton = this.add.text(game.config.width/2, 330, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
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
