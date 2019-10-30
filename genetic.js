function nextGeneration(){
    console.log('next generation');
    calculateFitness();
    for (let i = 0; i < POPL; i++) {
        birds[i] = pickOne();
    }
    // for (let i = 0; i < POPL; i++) {
    //     savedBirds[i].dispose();
    // }
    savedBirds = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r = r - savedBirds[index].fitness;
      index++;
    }
    index--;
    let bird = savedBirds[index];
    let child = new Bird(bird.brain);
    child.mutate();
    return child;
  }

function calculateFitness(){
    var sum=0;
    for(var brd of savedBirds){
        sum+=brd.score;
    }
    for(var brd of savedBirds ){
        brd.fitness = brd.score/ sum;
    }
}