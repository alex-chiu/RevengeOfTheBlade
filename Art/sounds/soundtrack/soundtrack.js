// adding soundtrack in phaser

// under preload() function

this.load.audio('stage<number>', ['assets/audio/soundtrack/stage<number>.wav'])


var soundtrack;

// under create() function

soundtrack = this.add.audio('stage<number>');

soundtrack.play();
soundtrack.setVolume(<volumenumber>);
