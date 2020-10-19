/*  MAIN JAVASCRIPT FILE FOR GAME

    Sets config settings and physics.
    Starts the game from the menu scene.
*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Preload, Menu, Instructions, Tutorial, RobotBossFight, GameOver, TutorialCompleted, Stage5, Stage5Die, Stage5Win, GameCompleted],

    scale: {
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
game.scene.start('Preload');
