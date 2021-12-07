// function preload (){
//     this.load.image('')
// }

var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 480,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update

    }
};
new Phaser.Game(config);
var Bow;
var graphics;
var Arrow;
var sprite;
var group;
var angle = 0;

function preload() {
    this.load.image('arrow', 'assets/img-arrows.png')
    this.load.image('bow', 'assets/img-bow.png')
    this.load.image('red', 'assets/img-virus-red.png')
    this.load.image('yellow', 'assets/ic-virus-yellow.png')
    
}

function create() {

    this.anims.create({ 
        key: 'fly', 
        frames: this.anims.generateFrameNumbers('Arrow', [0, 1, 2, 3]), 
        frameRate: 500, 
        repeat: -1 
    });

  graphics = this.add.graphics();

   
  Bow = this.physics.add.image(160,420, 'bow');
  Bow.body.setAllowGravity(false);
  Bow.body.setImmovable(true);


  Arrow =this.physics.add.image(160,360, 'arrow').setDepth(1);
  Arrow.body.setAllowGravity(false);
  Arrow.body.setImmovable(false);


sprite = this.physics.add.image(200,-300, 'red').setVelocity(-102,0).setBounce(1).setCollideWorldBounds(true);
// scene.matter.world.setBounds(x, y, width, height);
// console.log(sprite);


this.physics.add.overlap(sprite,Arrow);
var t = this.Arrow;
this.input.on('pointermove', f, this);
this.input.on('pointerup', k, this);


// const vec = this.physics.velocityFromRotation(Arrow,50);
// console.log(vec);

group = this.physics.add.group({
    defaultKey: 'yellow',
    bounceX: 1,
    bounceY: 1,
    setCollideWorldBounds: true
    
});


// group = this.physics.add.image(100,320, 'yellow').setVelocity(-120,0).setBounce(1).setCollideWorldBounds(true);.
    group.playAnimation('yellow', 12);
    group.create(100, 100).setVelocity(100, 0).setBounce(1).setCollideWorldBounds(true);
    group.create(420, 80).setVelocity(100, 0).setBounce(1).setCollideWorldBounds(true);
    group.create(300, 100).setVelocity(60, 0).setBounce(1).setCollideWorldBounds(true);
    group.create(420, 130).setVelocity(-30, 0).setBounce(1).setCollideWorldBounds(true);
    this.physics.world.step(0);
    

}


var f = function(pointer){
    console.log(angle);
    var angle = Phaser.Math.Angle.BetweenPoints(Arrow, pointer);
    // var angle = Phaser.Math.RotateAround(0,)
    Arrow.rotation=angle;

}
var k = function(){
    Arrow.enableBody(true,Arrow.x, Arrow.y -400, true, true);
    Arrow.play('fly');
    this.physics.velocityFromRotation(angle, 600, Arrow.body.velocity);
    // console.log(Arrow.play);
}


function update(){
    this.physics.world.collide(200,120);
    this.physics.world.step(0);
    graphics.clear();
    draw(sprite);
    draw(Arrow);
    sprite.rotation += 0.01;
    group.rotation += 0.01;


}


function draw(obj){
    graphics.lineStyle(5, 0xffff00, 0.8);
    drawFaces(obj.body, obj.body.touching);
    graphics.lineStyle(5, 0xff0000, 0.8);
    drawFaces(obj.body, obj.body.blocked);

}
function drawFaces(body, faces)
{
    if (faces.left)
    {
        graphics.lineBetween(body.left, body.top, body.left, body.bottom);
        //  Arrow.body.setAllowGravity(true);
    }

    if (faces.up)
    {
        graphics.lineBetween(body.left, body.top, body.right, body.top);
    }

    if (faces.right)
    {
        graphics.lineBetween(body.right, body.top, body.right, body.bottom);
    }

    if (faces.down)
    {
        graphics.lineBetween(body.left, body.bottom, body.right, body.bottom);
    }
}
