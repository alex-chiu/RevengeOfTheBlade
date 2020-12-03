/*  MAIN JAVASCRIPT FILE FOR GAME

    Sets config settings and physics.
    Starts the game from the menu scene.
*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Preload, Menu, StorylineT, Storyline0, Storyline1, Storyline2, Storyline3, EndCredits, EndCreditsGC, MenuStage1C, MenuBoss1C, MenuBoss4C, MenuBoss5C, MenuStage5C, MenuStage4C, TutorialS4C, InstructionsS4C, TutorialCompletedS4C, TutorialS5C, InstructionsS5C, TutorialCompletedS5C, Instructions, Tutorial, TutorialCompleted, InstructionsB4C, TutorialB4C, TutorialCompletedB4C, TutorialS1C, TutorialB1C, InstructionsS1C, InstructionsB1C, TutorialCompletedS1C, TutorialCompletedB1C, Stage1, Stage1Die, Stage1Win, Stage1Boss, Stage1BossDie, Stage1BossWin, Stage4, Stage4Boss, Stage4BossDie, Stage4BossWin, Stage4Win, Stage4Die, Stage5, Stage5Die, Stage5Win, RobotBossFight, GameOver, GameCompleted],

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
