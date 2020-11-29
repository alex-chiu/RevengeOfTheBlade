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

      this.add.text(game.config.width/2, 210,'Mission Phase II Part I completed.', { fontSize: '23px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 240,'Weapon upgraded from Steel to Titanium.', { fontSize: '21px', fill: '#37F121' }).setOrigin(0.5);
      this.add.text(game.config.width/2, 270,'Range ATK DMG: 9 // Melee ATK DMG: 17', { fontSize: '22px', fill: '#37F121' }).setOrigin(0.5);


      const finalBossButton = this.add.text(game.config.width/2, 390, 'MODERN ERA BOSS', { fontSize: '40px', fill: '#b5dbf7' }).setOrigin(0.5);
      finalBossButton.setInteractive();
      finalBossButton.on('pointerdown', () => {
        this.scene.restart('Stage4');
        this.scene.stop('Stage4');
        this.scene.start('Stage4Boss');
      });

      const menuButton = this.add.text(game.config.width/2, 330, 'MENU', { fontSize: '40px', fill: '#8db9d9' }).setOrigin(0.5);
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
