/*  MAIN JAVASCRIPT FILE FOR GAME

    Sets config settings and physics.
    Starts the game from the menu scene.
*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Preload, Menu, MenuStage1C, MenuBoss1C, MenuBoss5C, MenuStage5C, TutorialCompletedS5C, TutorialS5C, InstructionsS5C, Instructions, Tutorial, TutorialCompleted, TutorialS1C, TutorialB1C, InstructionsS1C, InstructionsB1C, TutorialCompletedS1C, TutorialCompletedB1C, Stage1, Stage1Die, Stage1Win, Stage1Boss, Stage1BossDie, Stage1BossWin, Stage5, Stage5Die, Stage5Win, RobotBossFight, GameOver, GameCompleted],

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
