class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu' });
    }

    preload(){
      this.add.text(80,100,'OBSIDIAN BONES', { fontSize: '75px', fill: '#ffffff' });

      const tutorialButton = this.add.text(350, 250, 'TUTORIAL', { fontSize: '20px', fill: '#b5dbf7' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => { this.scene.start('Tutorial1'); });

      const playButton = this.add.text(310, 350, 'PLAY', { fontSize: '75px', fill: '#8db9d9' });
      playButton.setInteractive();
      playButton.on('pointerdown', () => { this.scene.start('RobotBossFight'); });

    }

    create(){

    }

    update(){

    }
}
