class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu' });
    }

    preload(){
      this.add.text(80,100,'OBSIDIAN BONES', { fontSize: '75px', fill: '#ffffff' });

      const tutorialButton = this.add.text(350, 250, 'TUTORIAL', { fontSize: '20px', fill: '#0f0' });
      tutorialButton.setInteractive();
      tutorialButton.on('pointerdown', () => { this.scene.start('Tutorial'); });

      const playButton = this.add.text(310, 350, 'PLAY', { fontSize: '75px', fill: '#0f0' });
      playButton.setInteractive();
      playButton.on('pointerdown', () => { this.scene.start('RobotBossFight'); });

    }

    create(){

    }

    update(){

    }
}
