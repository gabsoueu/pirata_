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
        image(this.topo,this.x, this.y,this.w,this.h) // topo/parte movel do canhão
        push();
        imageMode (CENTER);
        image(this.base,170,130,200,200) // base/parte fixa do canhão
        pop();
    }
}