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
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'assets/img-background.svg');
    this.load.image('button', 'assets/img-start-button.png');
    this.load.image('pride', 'assets/img-tribe-face.png');
    let font = new FontFaceObserver('Afolkalips');
    font.load().then(function(){
        game.add.text(75,10, "TRIBE PRide", { fontFamily: "Afolkalips", fontSize: 70 });
    text.setStroke('#000000', 4);
    })
    
}

function create ()
{
    
    this.physics.world.setBounds(0, 0, 320, 480);
    var background = this.add.image(0, 0, 'background').setOrigin(0).setScale(1);
    
    //   heading text
     
    //  Apply the gradient fill.
    const gradient = text.context.createLinearGradient(0, 0, 0, text.height);
    gradient.addColorStop(0, '#ae8430');
    gradient.addColorStop(.5, '#492801');
    text.setFill(gradient);
    
//   subhead text
    const text2 = this.add.text(0,80, "PLAY TO WIN EXCITING PRIZES",{fontFamily: 'CircularStd, sans serif',fontSize: 14,color: '#a07729',fontWeight: 500,textAlign:'center',display:'block',margin:'0 auto'});
    
    
    
    
    
    prideFace = this.add.image(game.canvas.width/2,260,'pride');
    
    var button = this.add.image(game.canvas.width/2, 450, 'button').setInteractive();
    button.on('pointerup', openExternalLink, this);
    const buttonTxt = this.add.text(150,441,'start',{fontFamily: 'Cloudsters', color: '#ffffff',fontSize: '14px',lineHeight: 22,textAlign: 'center'});
   
    

    
}

function openExternalLink ()
{
    var tweet = 'I am testing a button from within a Phaser example';
    var url = 'ingame.html' ;
    var s = window.open(url, '_self');
    if (s && s.focus)
    {
        s.focus();
    }
    else if (!s)
    {
        window.location.href = url;
    }
}
