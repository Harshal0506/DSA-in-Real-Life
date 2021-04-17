let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}



flag=true;

let config={
    type: Phaser.CANVAS,
    width:800,
    height:600,
    backgroundColor:"#FF0000",
    scene:{
        preload:preload,
        create:create,
        update:update
    },
    audio: {
        disableWebAudio: true
    }
}

let game=new Phaser.Game(config);

function preload(){
    // console.log(this);
    console.log("Preload");
    this.load.image('background',"/Assets/back.jpg");
    this.load.image('pin',"/Assets/pin.png");
    this.load.image('stand',"/Assets/stand.png");
    this.load.image('wheel',"/Assets/wheel.png");
    this.load.audio('noise', [
        'Assets/machine_1.wav'
        
    ]);

}

function create(){
    console.log("create");
    let W=game.config.width;
    let H=game.config.height;
    let logKey=(e) => {
        console.log( ` ${e.code}`);
        if(e.code=="Enter"){
            let FunctHelper=spinwheel.bind(this);
            FunctHelper();
        }
    }   
    document.addEventListener('keypress', logKey);

    


    let background=this.add.sprite(W/2,H/2,'background');
    background.setScale(0.20);


    let stand=this.add.sprite(W/2,H/2+250,'stand');
    stand.setScale(0.20);


    this.pin=this.add.sprite(W/2,H/2-230,'pin');
    this.pin.setScale(0.20);
    this.pin.depth=2;

    this.wheel=this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.23);

    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "white",
    }

    this.noise = this.sound.add('noise');

    this.text=this.add.text(2,10,"  Welcome to spin & Win ✨",font_style);

    
}

function spinwheel(){

    if(flag==false){
        return;
    }

    flag=false;
    this.noise.play();
    console.log("You clicked the mouse");
    console.log("Start spinning");

    let rounds=Math.round(Math.random()*5)+2;
    let degrees=Phaser.Math.Between(0,11)*30;

    let total_angle=rounds*360+degrees;

    console.log(total_angle);

    let win=prizes_config.prize_names[ prizes_config.count-(degrees/(360/prizes_config.count))-1];
    
    tween=this.tweens.add({
        targets:this.wheel,
        angle:total_angle,
        
        scale:0.28,
        ease:"Cubic.easeOut",
        duration:4000,
        onStart:()=>{
            this.pin.depth=-1;
        },
        onComplete:()=>{
            
            this.text.setText("   Congrats !! 🎉 "+win);
            console.log("Congrats");
            this.tweens.add({
                targets:this.wheel,
                
                scale:0.23,
                ease:"Cubic.easeOut",
                duration:1000,

            })
            this.pin.depth=2;
            let finalCall=()=>{
                this.text.setText("  Welcome to spin & Win ✨");
                
                flag=true;

            }
            this.noise.stop();
            setTimeout(finalCall,10000);
            
            


        }


    })
}

function update(){
    console.log("update");


}