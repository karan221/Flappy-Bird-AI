const CANVAS_HEIGHT=540;
const CANVAS_WIDTH=960;

const POPL=10;
let poles = [];
let birds = [];
let savedBirds = [];
let D=275;
let score=0;
let highScore=0;
let Gen=1;

function setup(){
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
    for(var i=0;i<POPL;i++)
        birds[i]=new Bird();
    poles[0]=new Pole();
}

let bg,pu,pd,gd,bird;

function preload(){
    bg=loadImage("images/bg4.png");
    gd=loadImage("images/ground2.png");
    pu=loadImage("images/poleUP2.png");
    pd=loadImage("images/poleDOWN2.png");
    bd=loadImage("images/bird1.png");
}

function draw(){
    image(bg,0,0);
    if(poles[poles.length-1].x < CANVAS_WIDTH - D)
        poles.push(new Pole());
    i=0;
    for(var brd of birds){
        brd.draw();
    }
    for(i=0;i<birds.length;i++){
        if(birds[i].checkCollision(poles[0]))
            savedBirds.push(birds.splice(i,1)[0]);
    }
    if(birds.length == 0){
        highScore=max(score,highScore);
        Gen++;
        score=0;
        nextGeneration();
        poles=[];
        poles[0]=new Pole();
    }
    //if(poles[0].x <100 )
    for(i=0;i<birds.length;i++){
        birds[i].update();
        if(poles[0].x + 75 > brd.x )
            birds[i].think(poles[0]);
        else
            birds[i].think(poles[1]);
    }
    for(var pole of poles){
        pole.draw();
        pole.update();
    }
    image(gd,0,CANVAS_HEIGHT-120);
    textSize(16);
    text("Alive : "+birds.length,20,450)
    textSize(32);
    text("Gen : "+Gen,10,520);
    textSize(28);
    text("Score : "+score,350,520);
    text("High Score : "+highScore,650,520);
}


function keyPressed() {
  if (key == ' ') {
    birds[0].jump();
    console.log("SPACE");
  }
}