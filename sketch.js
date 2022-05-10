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
var barco;


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

   //criando o objeto barco a partir da classe
   barco = new Boat(width-80,height-60,170,170,-80);
 
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
  }
  
  //mostrar o canhão
  canhão.showTime();

  //dar velocidade para o barco
  Matter.Body.setVelocity(barco.body,{
    x: -3,
    y: 0
  });

  //mostrar o barco
  barco.show();
}

function keyPressed () {
  if (keyCode === DOWN_ARROW) {
   bola = new CannonBall(canhão.x,canhão.y);
   bolas.push (bola);
  }
}

function showBalls (b,i) {
  if (b) {
  //mostrar a bola
  bola.show();

  }
}

function keyReleased () {
  if (keyCode === DOWN_ARROW) {
    bola.atirar ();
  }
}
