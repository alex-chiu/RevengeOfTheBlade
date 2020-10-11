/*  MAIN JAVASCRIPT FILE FOR GAME 
    
    Sets config settings and physics.
    Starts the game from the menu scene.
*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Menu, Tutorial1, Tutorial2, RobotBossFight, GameOver],

    scale:{
        autoCenter: Phaser.Scale.CENTER_HORIZONALLY,
        mode: Phaser.Scale.FIT
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
game.scene.start('Menu');
