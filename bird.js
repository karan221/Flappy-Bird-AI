class Bird{
    constructor(brain){
        this.W=25;
        this.H=19;
        this.y=random()*(CANVAS_HEIGHT-this.H-120);
        this.x=75;

        this.gravity=0.15;
        this.velocity=0;
        this.jmp=20;

        this.score=0;
        this.fitness=0.0;
        if(brain){
            this.brain =brain.copy();
        }
        else{
            this.brain = new NeuralNetwork(5,8,2);
        }
    }
    draw(){
        image(bd,this.x,this.y);
    }
    jump(){
            this.velocity=0;
            this.y-=this.jmp;
    }
    update(){
        this.score++;

        this.velocity+=this.gravity;
        this.y+=this.velocity;
        // if(this.y > CANVAS_HEIGHT- 120-this.H){
        //     this.y= CANVAS_HEIGHT-120-this.H;
        //     this.velocity=0;
        //     //this.jump();
        // }
        // if(this.y < 0){
        //     this.y= 0;
        //     this.velocity=0;
        // }
    }
    mutate(){
        this.brain.mutate(.1);
    }
    dispose() {
        this.brain.dispose();
      }
    think(pole){
        let input = [];
        input[0] = pole.x / CANVAS_WIDTH;
        input[1] = (pole.y) / CANVAS_HEIGHT;
        input[2] = this.y / (CANVAS_HEIGHT-120-this.H);
        input[3] = (pole.y+pole.gap) / (CANVAS_HEIGHT) ;
        input[4] = this.velocity / 100;

        let output = this.brain.predict(input);
        if(output[1] < output[0] )
            this.jump();
    }
    checkCollision(pole){
        //  || 
        if((this.y > CANVAS_HEIGHT - 120 || this.y < 0))
            {
                this.score-= 20;
                return true;
            }
        if((((this.x >= pole.x && this.x < pole.x+40) && 
            (this.y <= pole.y || this.y >=pole.x + pole.gap)) ))
            return true;
        else
            return false;
    }

}