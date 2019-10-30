class Pole{
    constructor(){
        this.gap=150;
        this.length=288;
        this.x=CANVAS_WIDTH;
        this.y=random()*(256)+32;
        this.velocity=-10;
    }
    draw(){
        image(pd,this.x,this.y-this.length,50,288);
        image(pu,this.x,this.y+this.gap,50,288)
    }
    update(){
        this.x+=this.velocity;
        if(this.x==24)
            score++;
        if(this.x < -75 )
            poles.shift();
    }
}