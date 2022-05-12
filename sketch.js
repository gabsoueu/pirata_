//namespace
//módulos da biblioteca Matter
const Engine = Matter.Engine; //mecanismo de física
const World = Matter.World; //mundo
const Bodies = Matter.Bodies; //corpos
const Constraint = Matter.Constraint; //restrição, ainda não vamos usar neste jogo
var engine, world; //meu mecanismo, meu mundo
var backgroundImg, towerImg; //variáveis das imagens
var ground, tower; //variáveis dos corpos
var canhão, angulo = 0;
var bola, bolas = [];
var barco, barcos = [];


function preload() 
{
  backgroundImg = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");

 
}

function setup() {

  angleMode(DEGREES);

  canvas = createCanvas(1200, 600); //tela
  engine = Engine.create(); //cria o mecanismo de física
  world = engine.world; //cria o nosso mundo
  canhão = new Cannon (190, 170, 200, 200, angulo);

 options=
  {
    isStatic:true,
  }
  
  //criação do corpo do solo
  ground = Bodies.rectangle(0,height-1, width*2,1,options);
  //adição do corpo ao mundo
  World.add(world,ground);

   //criação do corpo da torre
   tower = Bodies.rectangle(160,350,160,310,options);
   //adição do corpo ao mundo
   World.add(world,tower);

   
 
}

function draw() {

  //background(189);
  image(backgroundImg,0,0,1200,600);

  //atualização do mecanismo de física
  Engine.update(engine);
 
  //desenho do solo
  rect(ground.position.x, ground.position.y,width*2,1);  

  //desenho da torre
  push();
  imageMode(CENTER);
  image(towerImg,tower.position.x, tower.position.y,160,310);
  pop();
  for (var i = 0; i < bolas.length; i = i+1) {
    showBalls (bolas [i],i)
    collisionWithBoat(i);
  }
  
  //mostrar o canhão
  canhão.showTime();

  showBarcos ();
  
}

function keyPressed () {
  if (keyCode === DOWN_ARROW) {
   bola = new CannonBall(canhão.x,canhão.y);
   bolas.push (bola);
  }
}

function showBalls (bola,i) {
  if (bola) {
    //mostrar a bola
    bola.show();
    if (bola.body.position.y > height-50 || bola.body.position.x > width ) {
      bola.remove (i)
    }
  }
}

function keyReleased () {
  if (keyCode === DOWN_ARROW) {
    bola.atirar ();
  }
}

function showBarcos () {
  if (barcos.length > 0) {
    if (barcos [barcos.length -1] === undefined || barcos[barcos.length -1].body.position.x < width-500 ) {
      var posit = [-80, -90, -75, -50];
      var positC = random (posit)
      barco = new Boat(width-80,height-60,170,170,positC);
      barcos.push (barco);
    }
    for (var i = 0; i < barcos.length; i = i+1) {
      if (barcos [i]) {
        //dar velocidade para o barco
        Matter.Body.setVelocity(barco.body,{
        x: -1,
        y: 0
        });

        //mostrar o barco
        barcos[i].show();
      }
    }
  }

 else {
   //criando o objeto barco a partir da classe
   barco = new Boat(width-80,height-60,170,170,-80);
   barcos.push (barco);
  }
}

function collisionWithBoat(index){
  for(var i=0; i<barcos.length; i+=1)
  {
    if(bolas[index] != undefined && barcos[i] != undefined){
      var collision = Matter.SAT.collides(bolas[index].body, barcos[i].body);

      if(collision.collided){
        barcos[i].remove (i);
        //bolas[index].remove (index);
        Matter.World.remove(world, bolas[index].body);
        delete bolas[index];
      }

    }
  }
}
