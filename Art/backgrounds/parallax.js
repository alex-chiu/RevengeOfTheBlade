// code to add to Scene[number].js

// add to var list

var sky;
var clouds;
var far;
var back;
var mid;
var front;
var ground;



// add to PRELOAD() function
// change stage number for each stage. Asset keys and png names remain the same throughout each stage

this.load.image('sky0', 'assets/backgrounds/stage5/0sky.png');
this.load.image('clouds1', 'assets/backgrounds/stage5/1clouds.png');
this.load.image('far2', 'assets/backgrounds/stage5/2far.png');
this.load.image('back3', 'assets/backgrounds/stage5/3back.png');
this.load.image('mid4', 'assets/backgrounds/stage5/4mid.png');
this.load.image('front5', 'assets/backgrounds/stage5/5front.png');

this.load.image('ground', 'assets/backgrounds/stage5/6platform.png');


// add to CREATE() function


// background elements
sky = this.add.tileSprite(400, 300, 800, 600, 'sky0');
clouds = this.add.tileSprite(400, 300, 800, 600, 'clouds1');
far = this.add.tileSprite(400, 300, 800, 600, 'far2');
back = this.add.tileSprite(400, 300, 800, 600, 'back3');
mid = this.add.tileSprite(400, 300, 800, 600, 'mid4');
front = this.add.tileSprite(400, 300, 800, 600, 'front5');
ground = this.add.tileSprite(400, 300, 800, 600, 'ground');


sky.fixedToCamera = true;


// edit obstacles to platforms 


// add to UPDATE() function

// implement paralllax: define scrolling speed of each background element
clouds.tilePositionX -= 1.2;
far.tilePositionX += 1.8;
back.tilePositionX -= 2.3;
mid.tilePositionX += 2.7;


// add to Player Movement (change tile position changes of front background element and ground)
if (A.isDown) {
  player.setVelocityX(-160);
  player_pre_atk.setVelocityX(-160);
  player_atk.setVelocityX(-160);
  player.anims.play('left', true);
  
  front.tilePositionX -= 3;
  ground.tilePositionX -= 2.7;
            
}

else if (D.isDown) {
  player.setVelocityX(160);
  player_pre_atk.setVelocityX(160);
  player_atk.setVelocityX(160);
  player.anims.play('right', true);
  
  front.tilePositionX += 3;
  ground.tilePositionX += 2.7;
}
