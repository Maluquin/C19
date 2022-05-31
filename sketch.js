var fundoEstrelasImg, fundoEstrelas;
var asteroideImg, asteroide, grupoAsteroides;
var fogueteImg, foguete;
var startImg, start;
var estadoJogo = "parar";
var pontos = 0;

function preload(){
  fundoEstrelasImg = loadImage("fundo-céu.png");
  asteroideImg = loadImage("asteroide.png");
  fogueteImg = loadImage("foguete.png");
  startImg = loadImage("start.png")

}

function setup() {
  createCanvas(600, 600);

  fundoEstrelas = createSprite(300,300);
  fundoEstrelas.addImage("fundoEstrelas",fundoEstrelasImg);
  

  foguete = createSprite(300, 330);
  foguete.addImage("foguete", fogueteImg);
  foguete.scale = 0.3;
  foguete.visible = false;
  foguete.debug = false;
  foguete.setCollider("circle", 0, 0, 150);

  start =  createSprite(300, 300);
  start.addImage("start", startImg);
  start.scale = 0.6;

  grupoAsteroides = new Group();
}


function draw() {
  background(200);
  text("pontos: " + pontos, 550, 50);
  if(mousePressedOver(start)){
    estadoJogo = "jogar";
  }

  if (fundoEstrelas.y > 600){
    fundoEstrelas.y = 300
  }

  if(estadoJogo === "jogar"){
    foguete.visible = true;
    start.visible = false;

    fundoEstrelas.velocityY = 1.5;

    criarAsteroides();
  
    if(keyDown("right_arrow")){
      foguete.x += 4;
      foguete.rotation = 30;
    }

    if(keyDown("left_arrow")){
      foguete.x -= 4;
      foguete.rotation = 330;
    }
  
    if(foguete.x > 570){
      foguete.x = 570
    }

    if(foguete.x < 30){
      foguete.x = 30
    }

  }

  if(estadoJogo === "parar"){
    grupoAsteroides.velocityXEach = 0;
    grupoAsteroides.velocityYEach = 0;
    grupoAsteroides.visible = false;
    start.visible = true;
    foguete.visible = false;
    grupoAsteroides.destroyEach();
  }

  if(grupoAsteroides.isTouching(foguete)){
    estadoJogo = "parar";
  }


  pontos += Math.round (frameRate()/ 60);


  drawSprites();
}

function criarAsteroides(){
  if (frameCount % 70 === 0){
    asteroide = createSprite(550, 50);
    asteroide.x = Math.round(random(50, 550));
    asteroide.addImage("asteroide", asteroideImg);
    asteroide.scale = 0.14;
    asteroide.velocityY = 4;

    grupoAsteroides.add(asteroide);

    if(asteroide.x > 300){
      asteroide.velocityX = -4;
    }
  
    if(asteroide.x < 300){
      asteroide.velocityX = 4;
    }

  }

  if(estadoJogo === "parar"){
    grupoAsteroides.visible = false;
    asteroides.depth = fundoEstrelas.depth;
    fundoEstrelas.depth += 1;
  }
  
}