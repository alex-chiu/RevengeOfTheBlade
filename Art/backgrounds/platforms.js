// PLATFORM CODE FOR EVERY SCENE (can vary speed/number/location of platforms)
// even: vertical, odd: horizontal
var pf1, pf2, pf3, pf4, pf5;
var dir1 = 1;
var dir2 = 1;
var dir3 = 1;
var dir4 = 1;
var dir5 = 1;

// preload() 
    // stage number
	this.load.image('platform1', 'assets/platforms/platform-s1.png');


// create() 
// Moving platforms
    pf1 = this.physics.add.image(50, 470, 'platform1')
        .setImmovable(true);
    pf1.body.collideWorldBounds = true;
    pf1.body.bounce.set(1);
    pf1.body.setAllowGravity(false);

    pf2 = this.physics.add.image(300, 380, 'platform1')
        .setImmovable(true);

    pf3 = this.physics.add.image(150, 170, 'platform1')
        .setImmovable(true);
    pf3.body.collideWorldBounds = true;
    pf3.body.bounce.set(1);
    pf3.body.setAllowGravity(false);

    pf4 = this.physics.add.image(700, 270, 'platform1')
        .setImmovable(true);

    pf5 = this.physics.add.image(600, 280, 'platform1')
        .setImmovable(true);
    pf5.body.collideWorldBounds = true;
    pf5.body.bounce.set(1);
    pf5.body.setAllowGravity(false);
        
    // overlap for enemies
    this.physics.add.overlap(e1, pf1);        
    this.physics.add.overlap(e2, pf1);
    this.physics.add.overlap(e3, pf1);

    this.physics.add.overlap(e1, pf2);
    this.physics.add.overlap(e2, pf2);
    this.physics.add.overlap(e3, pf2);

    this.physics.add.overlap(e1, pf3);
    this.physics.add.overlap(e2, pf3);
    this.physics.add.overlap(e3, pf3);

    this.physics.add.overlap(e1, pf4);
    this.physics.add.overlap(e2, pf4);
    this.physics.add.overlap(e3, pf4);
        
    this.physics.add.overlap(e1, pf5);
    this.physics.add.overlap(e2, pf5);
    this.physics.add.overlap(e3, pf5);
    
// update
// Platform movement
    pf1.setVelocityX(dir1*70);
    if (pf1.body.position.x >= 400){
    	dir1 = -1;
    }
    if (pf1.body.position.x <= 10){
        dir1 = 1;
    }

    pf2.setVelocityY(dir2*60);
    if (pf2.body.position.y >= 500){
        dir2 = -1;
    }
    if (pf2.body.position.y <= 100){
        dir2 = 1;
    }

    pf3.setVelocityX(dir3*70);
    // pf3.setVelocityY(0);
    if (pf3.body.position.x >= 600){
        dir3 = -1;
    }
    if (pf3.body.position.x <= 200){
        dir3 = 1;
    }

    pf4.setVelocityY(dir4*40);
    if (pf4.body.position.y >= 600){
        dir4 = -1;
    }
    if (pf4.body.position.y <= 130){
        dir4 = 1;
    }
        
    pf5.setVelocityX(dir5*70);
    if (pf5.body.position.x >= 600){
        dir5 = -1;
    }
    if (pf5.body.position.x <= 100){
        dir5 = 1;
    }


    // allow player to stand on platforms
    this.physics.world.collide(pf1, player, function () {
        player.setVelocityX(0);
    });

    this.physics.world.collide(pf2, player, function () {
        pf2.setVelocityX(0);
        player.setVelocityX(0);
    });

    this.physics.world.collide(pf3, player, function () {
        player.setVelocityX(0);
    });

    this.physics.world.collide(pf4, player, function () {
        pf4.setVelocityX(0);
        player.setVelocityX(0);
    });

    this.physics.world.collide(pf5, player, function () {
        player.setVelocityX(0);
    });