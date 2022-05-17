class Boat
{
    constructor(x,y,w,h,posY,boatAnimation){
              
        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world, this.body);
        //this.image = loadImage("assets/boat.png");
        this.posY = posY;
        this.w = w;
        this.h = h;
        this.speed = 0.05;
        this.animation = boatAnimation;
        this.isBroken = false;
    }

    animate(){
        this.speed +=0.05;
    }

    show(){

        var index = floor(this.speed % this.animation.length);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.posY,this.w, this.h);
        pop();
    }

    remove (i){
        this.animation = brokenBoat;
        this.speed = 0.8;
        this.w = 300;
        this.h = 300;
        this.isBroken = true;
        setTimeout(() => {
            Matter.World.remove(world, barcos[i].body);
            delete barcos[i];
        }, 2000);
    }
}