var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 320,
    height: 480,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
                    player: null,
                    healthpoints: null,
                    reticle: null,
                    moveKeys: null,
                    playerBullets: null,
                    enemyBullets: null,
                    time: 0,
                }
    }
};

var game = new Phaser.Game(config);

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 0.4;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(10, 10, true);
        
    },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }
        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

function preload ()
{
    // Load in images and sprites
    this.load.spritesheet('player_handgun', 'assets/img-arrows.svg',
        { frameWidth: 15, frameHeight: 120 }
    ); // Made by tokkatrain: https://tokkatrain.itch.io/top-down-basic-set
    this.load.image('bullet', 'assets/img-arrows.svg');
    this.load.image('target', 'assets/dot.png');
    // this.load.image('background', 'assets/skies/underwater1.png');
    this.load.image('virus', 'assets/img-virus-red.png');
    this.load.image('bow', 'assets/img-bow.png');
     this.load.image('yellow', 'assets/ic-virus-yellow.png');
    this.load.image('redhit', 'assets/img-virus-2.png');
   
    
}

function create ()
{
    // Set world bounds
    this.physics.world.setBounds(0, 0, 320, 480);
    



    
    Bow = this.physics.add.image(160,420, 'bow');
    // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: false });

    // Add background player, enemy, reticle, healthpoint sprites
    // var background = this.add.image(0, 0, 'background');
   
    player = this.physics.add.image(160, 360, 'player_handgun');
    enemy = this.physics.add.sprite(100, 0, 'virus');
    yellowenemy = this.physics.add.sprite(160, 0, 'yellow');
    yellowenemy2 = this.physics.add.sprite(35, 0, 'yellow');
    enemy1 = this.physics.add.sprite(220, 0, 'virus');
    enemy2 = this.physics.add.sprite(280, 0, 'virus');
    reticle = this.physics.add.sprite(160, 0, 'target');
   
    hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
    hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
    hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);

    // Set image/sprite properties
    // background.setOrigin(0.5, 0.5).setDisplaySize(320, 480);
   
    player.setCollideWorldBounds(true);
    yellowenemy.setVelocityY(90).setCollideWorldBounds(true).setBounce(1).setGravityY(-30);
    yellowenemy2.setVelocityY(-90).setCollideWorldBounds(true).setBounce(1).setGravityY(-40);
    enemy.setVelocityY(80).setCollideWorldBounds(true).setBounce(1).setGravityY(-40);
    enemy1.setVelocityY(-90).setCollideWorldBounds(true).setBounce(1).setGravityY(-40);
    enemy2.setVelocityY(90).setCollideWorldBounds(true).setBounce(1).setGravityY(-30);
    reticle.setCollideWorldBounds(true);
  
   
    // Set sprite variables
    
    yellowenemy.health =10;
    yellowenemy2.health =10;
    enemy.health = 10;
    enemy1.health = 10;
    enemy2.health = 10;
    player.health = 3;
    enemy.lastFired = 0;
    enemy1.lastFired = 0; 
    enemy2.lastFired = 0; 
    // Set camera properties
    // this.cameras.main.zoom = 0.5;
    // this.cameras.main.startFollow(player);

    // Creates object for input with WASD kets
//    moveKeys = this.input.keyboard.addKeys({
//        'up': Phaser.Input.Keyboard.KeyCodes.W,
//        'down': Phaser.Input.Keyboard.KeyCodes.S,
//        'left': Phaser.Input.Keyboard.KeyCodes.A,
//        'right': Phaser.Input.Keyboard.KeyCodes.D
//    });

    // Enables movement of player with WASD keys
//    this.input.keyboard.on('keydown_W', function (event) {
//        player.setAccelerationY(-800);
//    });
//    this.input.keyboard.on('keydown_S', function (event) {
//        player.setAccelerationY(800);
//    });
//    this.input.keyboard.on('keydown_A', function (event) {
//        player.setAccelerationX(-800);
//    });
//    this.input.keyboard.on('keydown_D', function (event) {
//        player.setAccelerationX(800);
//    });

    // Stops player acceleration on uppress of WASD keys
//    this.input.keyboard.on('keyup_W', function (event) {
//        if (moveKeys['down'].isUp)
//            player.setAccelerationY(0);
//    });
//    this.input.keyboard.on('keyup_S', function (event) {
//        if (moveKeys['up'].isUp)
//            player.setAccelerationY(0);
//    });
//    this.input.keyboard.on('keyup_A', function (event) {
//        if (moveKeys['right'].isUp)
//            player.setAccelerationX(0);
//    });
//    this.input.keyboard.on('keyup_D', function (event) {
//        if (moveKeys['left'].isUp)
//            player.setAccelerationX(0);
//    });
    
    
    
   

    
    

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (player.active === false)
            return;
        
        // Get bullet from bullets group
        var bullet = playerBullets.get().setActive(true).setVisible(true);
        var bullet1 = playerBullets.get().setActive(true).setVisible(true);
        if (bullet)
        {
            bullet.fire(player, reticle);
            this.physics.add.collider(enemy, bullet, enemyHitCallback);
            this.physics.add.collider(enemy1, bullet, enemyHitCallback);
            this.physics.add.collider(enemy2, bullet, enemyHitCallback);
        }
        if (bullet1)
        {
            bullet.fire(player, reticle);
            this.physics.add.collider(yellowenemy, bullet, enemyHitCallbackYellow);
            this.physics.add.collider(yellowenemy2, bullet, enemyHitCallbackYellow);
        }
    }, this);

    // Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            reticle.x += pointer.movementX; 
            reticle.y += pointer.movementY;
        }
    }, this);

}

function enemyHitCallback(enemyHit, bulletHit)
{   
     player.setActive(false).setVisible(false);
     
   
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        enemyHit.health = enemyHit.health - 1;
        console.log("Enemy hp: ", enemyHit.health);

        // Kill enemy if health <= 0
        if (enemyHit.health <= 0)
        {
            
           enemyHit.setActive(false).setVisible(false); 
             
            var img = document.createElement('img');
            img.src='assets/img-virus-2.png';
            img.style.position='absolute';
            img.style.zIndex=1000;
            img.style.top=enemyHit.y+10;
            img.style.left=enemyHit.x-15;
            document.body.appendChild(img);
            setTimeout(function() {
                document.body.appendChild(img).style.display='none';
                player.setActive(true).setVisible(true);
                
            },1000);
            
            setTimeout(function(){
                enemyHit.setActive(true).setVisible(true);
            },5000);
         
        }

        // Destroy bullet
        bulletHit.setActive(true).setVisible(true);
    }
    
}
function enemyHitCallbackYellow(enemyHit, bulletHit)
{
    player.setActive(false).setVisible(false);
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        enemyHit.health = enemyHit.health - 1;
        // Kill enemy if health <= 0
        if (enemyHit.health <= 0)
        {
            
           enemyHit.setActive(false).setVisible(false); 
             var img = document.createElement('img');
            img.src='assets/img-virus-2.png';
            img.style.position='absolute';
            img.style.zIndex=1000;
            img.style.top=enemyHit.y+10;
            img.style.left=enemyHit.x-15;
            document.body.appendChild(img);
            setTimeout(function() {
                document.body.appendChild(img).style.display='none';
                player.setActive(true).setVisible(true);
                
            },1000);
            setTimeout(function(){
                enemyHit.setActive(true).setVisible(true);
            },5000);
        }

        // Destroy bullet
        bulletHit.setActive(true).setVisible(true);
    }
}

function playerHitCallback(playerHit, bulletHit)
{
    // Reduce health of player
    if (bulletHit.active === true && playerHit.active === true)
    {
        playerHit.health = playerHit.health - 1;
        console.log("Player hp: ", playerHit.health);

        // Kill hp sprites and kill player if health <= 0
        if (playerHit.health == 2)
        {
            hp3.destroy();
        }
        else if (playerHit.health == 1)
        {
            hp2.destroy();
        }
        else
        {
            hp1.destroy();
            // Game over state should execute here
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}

function enemyFire(enemy, player, time, gameObject)
{
    if (enemy.active === false)
    {
        return;
    }

    if ((time - enemy.lastFired) > 1000)
    {
        enemy.lastFired = time;

        // Get bullet from bullets group
        var bullet = enemyBullets.get().setActive(true).setVisible(false);

        if (bullet)
        {
            bullet.fire(enemy, player);
            // Add collider between bullet and player
            gameObject.physics.add.collider(player, bullet, playerHitCallback);
        } 
    }
}

// Ensures sprite speed doesnt exceed maxVelocity while update is called
function constrainVelocity(sprite, maxVelocity)
{
    if (!sprite || !sprite.body)
      return;

    var angle, currVelocitySqr, vx, vy;
    vx = sprite.body.velocity.x;
    vy = sprite.body.velocity.y;
    currVelocitySqr = vx * vx + vy * vy;

    if (currVelocitySqr > maxVelocity * maxVelocity)
    {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
    }
}

// Ensures reticle does not move offscreen
function constrainReticle(reticle)
{
    var distX = reticle.x-player.x; // X distance between player & reticle
    var distY = reticle.y-player.y; // Y distance between player & reticle

    // Ensures reticle cannot be moved offscreen (player follow)
    if (distX > 800)
        reticle.x = player.x+800;
    else if (distX < -800)
        reticle.x = player.x-800;

    if (distY > 600)
        reticle.y = player.y+600;
    else if (distY < -600)
        reticle.y = player.y-600;
}


function update (time, delta)
{
    
    
    // Rotates player to face towards reticle
    player.rotation =  Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y)  - 4.71;
   
    // Rotates enemy to face towards player
    enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    enemy1.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    //Make reticle move with player
    reticle.body.velocity.x = player.body.velocity.x;
    reticle.body.velocity.y = player.body.velocity.y;

    // Constrain velocity of player
    constrainVelocity(player, 500);

    // Constrain position of constrainReticle
    constrainReticle(reticle);

    // Make enemy fire
    enemyFire(enemy, player, time, this);
   
}


