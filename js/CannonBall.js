class CannonBall
{
    constructor(x,y){
        this.r = 30;
        var options = {
            isStatic: true,
        }        
        this.body = Bodies.circle(x,y,this.r,options);
        World.add(world, this.body);
        this.image = loadImage("assets/cannonball.png");
    }

    show(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.r,this.r);
        pop();
    }

}