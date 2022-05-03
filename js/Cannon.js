class Cannon
{
    constructor(x,y,w,h,a)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
        this.base = loadImage("assets/cannonBase.png");
        this.topo = loadImage("assets/canon.png");
    }

    //métodos ou funções
    showTime () {
        if (keyIsDown (RIGHT_ARROW) && this.a<40) {
            this.a += 1
        }
        if (keyIsDown (LEFT_ARROW) && this.a>-40) {
            this.a -= 1
        }
        push ();
        translate (this.x, this.y);
        rotate (this.a);
        imageMode (CENTER);
        image(this.topo,0, 0,this.w,this.h) // topo/parte movel do canhão
        pop ();
        push();
        imageMode (CENTER);
        image(this.base,170,130,200,200) // base/parte fixa do canhão
        pop();
    }
}