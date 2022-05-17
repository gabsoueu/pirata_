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
        setTimeout(() => {
            Matter.World.remove(world, barcos[i].body);
            delete barcos[i];
        }, 500);
    }
}