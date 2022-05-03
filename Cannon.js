class Cannon
{
    constructor(x,y,w,h,a)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
    }

    //métodos ou funções
    showTime () {
        rect (this.x, this.y,this.w,this.h) // topo/parte movel do canhão
        push();
        rectMode (CENTER);
        rect (160,200,200,200) // base/parte fixa do canhão
        pop();
    }
}