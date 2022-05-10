class Boat
{
    constructor(x,y,w,h,posY){
              
        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world, this.body);
        this.image = loadImage("assets/boat.png");
        this.posY = posY;
        this.w = w;
        this.h = h;
    }

    show(){
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image,0,this.posY,this.w, this.h);
        pop();
    }
}