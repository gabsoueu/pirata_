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
        this.trajeto = [];
    }

    show(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.r,this.r);
        pop();
        if (this.body.velocity.x > 0 && pos.x > 170) {
            var posit = [pos.x, pos.y];
            this.trajeto.push(posit);
        }
        for (var i = 0; i<this.trajeto.length; i = i+1) {
            image (this.image, this.trajeto[i][0],this.trajeto[i][1],5,5);
        }
    }

    atirar(){
        var a1 = canhão.a - 30;
        a1 = a1*(3.14/180);
        var velocity = p5.Vector.fromAngle(a1);
        velocity.mult(0.35);
        Matter.Body.setStatic (this.body,false);
        Matter.Body.setVelocity (this.body, {x:velocity.x*(180/3.14), y:velocity.y*(180/3.14)});
    }

    remove(i){
        setTimeout(() => {
            Matter.World.remove(world, bolas[i].body);
            delete bolas[i];
        }, 500);
    }
}