

let config={
    type:Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.FIT,
        height:600,
        width:800,

    },
    backgroundColor:'0xffff11',
    scene:{
        preload:preload,
        create:create,
        update:update,
    },
    physics:{
        default:"arcade",
        arcade:{
            gravity:{
                y:1000,
            },
            debug:false,
        }
    }
}
let game= new Phaser.Game(config);


function preload(){
    console.log('preload');
    this.load.image('ground',"Assets/topground.png");
    this.load.spritesheet("dude","Assets/dude.png",{frameWidth:32,frameHeight:48});
    this.load.image('background',"Assets/background.png");
    this.load.image('apple', 'Assets/apple.png');
    this.load.image('ray', 'Assets/ray.png');
    this.load.spritesheet('fullscreen', 'Assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
}

function create(){
    W=game.config.width;
    H=game.config.height;


    this.score = 0;
    this.scoreText = this.add.text(W-700, 100, 'score: 0', { fontSize: '20px', fill: '#000' });
    this.scoreText.depth=10;
    this.scoreText.setScrollFactor(0);
    console.log('create');
    
    let ground=this.add.tileSprite(0,H-128,W,128,'ground');
    ground.setOrigin(0,0);
    ground.depth=1;
    let background=this.add.sprite(0,0,'background');
    background.setOrigin(0,0);
    background.displayWidth = W;
    background.displayHeight = H-128;
    background.depth=0;

    platforms = this.physics.add.staticGroup();


    platforms.create(500, 368, 'ground').setDepth(1).setScale(1.5,0.3).refreshBody();
    platforms.create(300, 268, 'ground').setDepth(1).setScale(0.7,0.3).refreshBody();
    platforms.create(500, 168, 'ground').setDepth(1).setScale(1.5,0.3).refreshBody();
    platforms.create(150, 168, 'ground').setDepth(1).setScale(0.3,0.4).refreshBody();
    platforms.add(ground);


     rays=[];
    for(let i=-10;i<=10;i++){
        ray = this.add.sprite(400,H-128, 'ray');
        ray.setOrigin(0.5,1);

        ray.alpha=0.3;
        ray.displayHeight=H+5;
        
        
        ray.angle=i*15;
        rays.push(ray);


    }
    tween=this.tweens.add({
        targets:rays,
        angle:"+=15",
        
        
        
        
        
        ease:"linear",
        duration:8000,
        repeat:-1
    })
    
    
    




    


    player=this.physics.add.sprite(100,100,'dude',4);
    console.log(ground);
    this.physics.add.existing(ground);
    ground.body.immovable=true;
    ground.body.allowGravity = false;
    player.setCollideWorldBounds(true);
    player.setBounce(0.5);
    this.physics.world.setBounds(0, 0, W, H);

    this.cameras.main.setBounds(0, 0, W, H);
    this.cameras.main.startFollow(player, true, 0.09, 0.09);
    this.cameras.main.setZoom(1.3);




    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20,
        
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    apples = this.physics.add.group({
        key: 'apple',
        repeat: 11,
        setScale: { x: 0.2, y: 0.2},
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    apples.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        


    });




    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(apples, platforms);
    // this.physics.add.collider(player, apples);
    this.physics.add.overlap(player, apples, collectApple, null, this);
    
    
    var button = this.add.image(W-100, 100, 'fullscreen', 0).setDepth(11).setOrigin(1, 0).setInteractive().setScrollFactor(0).setScale(0.5);

    button.on('pointerup', function () {

        if (this.scale.isFullscreen)
        {
            button.setFrame(0);
            


            this.scale.stopFullscreen();
            this.cameras.main.setZoom(1.3);
        }
        else
        {
            button.setFrame(1);
            

            this.scale.startFullscreen();
            this.cameras.main.setZoom(1);
        }

    }, this);
    


    

}
function update(){
    console.log('update');
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
   
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }

}

function collectApple (player, apple)
{
    this.score+=5;
    this.scoreText.setText('Score: ' + this.score);
    apple.disableBody(true, true);
}