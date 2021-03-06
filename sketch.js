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
var backgroundmp3, cannonExplosion, cannonWater, pirateLaugh;

var boatAnimation = [];
var boatPNG, boatJSON;

var brokenBoat = [];
var brokenPNG, brokenJSON;

var waterSplash = [];
var waterSplashPNG, waterSplashJSON;

var isGameOver = false;
var isLaughing = false;


function preload() 
{
  backgroundImg = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");
  boatJSON = loadJSON("assets/boat/boat.json");
  boatPNG = loadImage("assets/boat/boat.png");
  brokenPNG = loadImage("assets/boat/brokenBoat.png");
  brokenJSON = loadJSON("assets/boat/brokenBoat.json");
  backgroundmp3 = loadSound("assets/background_music.mp3");
  cannonExplosion = loadSound("assets/cannon_explosion.mp3");
  cannonWater = loadSound("assets/cannon_water.mp3");
  pirateLaugh = loadSound("assets/pirate_laugh.mp3");
  waterSplashJSON = loadJSON("assets/waterSplash/waterSplash.json");
  waterSplashPNG = loadImage("assets/waterSplash/waterSplash.png");
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

   //animação do barco inteiro
   var boatFrames = boatJSON.frames;
   for(var i=0; i<boatFrames.length; i++){
     var pos = boatFrames[i].position;
     var img = boatPNG.get(pos.x,pos.y,pos.w,pos.h);
     boatAnimation.push(img);
   }
    //animação do barco inteiro
    var brokenFrames = brokenJSON.frames;
    for(var i=0; i<brokenFrames.length; i++){
      var pos = brokenFrames[i].position;
      var img = brokenPNG.get(pos.x,pos.y,pos.w,pos.h);
      brokenBoat.push(img);
   }

   //animação da bola caindo na água
   var waterSplashFrames = waterSplashJSON.frames;
   for(var i=0; i<waterSplashFrames.length; i++){
     var pos = waterSplashFrames[i].position;
     var img = waterSplashPNG.get(pos.x,pos.y,pos.w,pos.h);
     waterSplash.push(img);
  }
}
   


function draw() {

  //background(189);
  image(backgroundImg,0,0,1200,600);

  //background(son);
  if (!backgroundmp3.isPlaying()) {
    backgroundmp3.play();
    backgroundmp3.setVolume(0.1);
  }

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
    if (bola.body.position.y > height-50 || bola.body.position.x > width + 100 ) {
      cannonWater.play();
      bola.remove (i);
    }
  }
}

function keyReleased () {
  if (keyCode === DOWN_ARROW) {
    bola.atirar ();
    cannonExplosion.play();
    cannonExplosion.setVolume(0.1);
  }
}

function showBarcos () {
  if (barcos.length > 0) {
    if (barcos [barcos.length -1] === undefined || barcos[barcos.length -1].body.position.x < width-500 ) {
      var posit = [-80, -90, -75, -50];
      var positC = random (posit)
      barco = new Boat(width-80,height-60,170,170,positC,boatAnimation);
      barcos.push (barco);
    }
    for (var i = 0; i < barcos.length; i = i+1) {
      if (barcos [i]) {
        //dar velocidade para o barco
        Matter.Body.setVelocity(barcos[i].body,{
        x: -1,
        y: 0
        });

        //mostrar o barco
        barcos[i].show();
        //animação do barco
        barcos[i].animate();
        var collision = Matter.SAT.collides(tower,barcos[i].body);
        if(collision.collided && !barcos[i].isBroken){
          if (!isLaughing && !pirateLaugh.isPlaying()) {
            pirateLaugh.play();
            isLaughing = true;
          }
          gameOver();
          isGameOver = true;
        }
      }
    }
  }

 else {
   //criando o objeto barco a partir da classe
   barco = new Boat(width-80,height-60,170,170,-80,boatAnimation);
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

function gameOver(){
  //sweet alert
  swal({
    title: 'Fim de Jogo!',
    text: 'Obrigada por jogar',
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Jogar Novamente"
    }, 
    function(isConfirm){
      if(isConfirm){
        location.reload();
      }
    }
  );
}
