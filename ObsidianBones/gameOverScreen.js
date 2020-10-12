class GameOverScreen extends Phaser.Scene{
    constructor() {
        super({ key: 'GameOverScreen' });
    }

    preload(){

    }

    create(){
      this.background = this.add.graphics()
      this.background.fillRoundedRect(150, 175, 500, 250, 25)
      this.background.fillStyle('#9ba3a0')

      this.add.text(220,180,'YOU DIED', { fontSize: '75px', fill: '#ffffff' });

      const tryAgainButton = this.add.text(290, 360, 'TRY AGAIN', { fontSize: '40px', fill: '#b5dbf7' });
      tryAgainButton.setInteractive();
      tryAgainButton.on('pointerdown', () => { this.tryAgain(); });

      const menuButton = this.add.text(350, 290, 'MENU', { fontSize: '40px', fill: '#8db9d9' });
      menuButton.setInteractive();
      menuButton.on('pointerdown', () => { this.menu(); });

    }

    tryAgain(){
      //this.scene.setVisible(false);
      this.scene.stop('GameOverScreen');
      this.scene.stop('RobotBossFight');
      this.scene.start('RobotBossFight');
    }

    menu(){
      //this.scene.stop();
      this.scene.stop('GameOverScreen');
      this.scene.stop('RobotBossFight');
      this.scene.start('Menu');
    }

    update(){

    }

}
