var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var cone, hole, nail
var car1

var coneG, holeG, nailG, carG

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  cone = loadImage ("obstacle1.png");
  hole = loadImage ("obstacle2.png");
  nail = loadImage ("obstacle3.png");
  car1 = loadImage ("car1.png")
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist

mainCyclist.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

coneG = new Group();
holeG = new Group();
nailG = new Group();
carG = new Group();


}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,7));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    }
    else if (select_oppPlayer == 3){
      cones();
    }
    else if (select_oppPlayer == 4){
      nails();
    }
    else if (select_oppPlayer == 5){
      holes();
    }
    else if (select_oppPlayer == 6){
      cars();
    }
    else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
    if (coneG.isTouching(mainCyclist)||nailG.isTouching(mainCyclist)||holeG.isTouching(mainCyclist))
    {
      gameState = END
    }
    if (carG.isTouching(mainCyclist))
    {
      gameState = END;
    }

}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    coneG.setVelocityXEach(0);
    coneG.setLifetimeEach(-1);

    holeG.setVelocityXEach(0);
    holeG.setLifetimeEach(-1);

    nailG.setVelocityXEach(0);
    nailG.setLifetimeEach(-1);

    carG.setVelocityXEach(0);
    carG.setLifetimeEach(-1);

    if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function cones(){
obstacle1 = createSprite (1100, Math.round(random(50,250)));
obstacle1.scale = 0.1;
obstacle1.velocityX = -(6 + 2*distance/150);
obstacle1.addImage ("cone", cone);
obstacle1.setLifetime = 170;
coneG.add(obstacle1);
}

function holes(){
  obstacle2 = createSprite (1100, Math.round(random(50,250)));
  obstacle2.scale = 0.1;
  obstacle2.velocityX = -(6 + 2*distance/150);
  obstacle2.addImage ("hole", hole);
  obstacle2.setLifetime = 170;
  holeG.add(obstacle2)
}

function nails(){
  obstacle3 = createSprite (1100, Math.round(random(50,250)));
  obstacle3.scale = 0.1;
  obstacle3.velocityX = -(6 + 2*distance/150);
  obstacle3.addImage ("nail", nail);
  obstacle3.setLifetime = 170;
  nailG.add(obstacle3)
}

function cars() {
  obstacle4 = createSprite (1100, Math.round(random(50,250)));
  obstacle4.scale = 0.3;
  obstacle4.velocityX = -(6 + 2*distance/150);
  obstacle4.addImage ("car", car1);
  obstacle4.setLifetime = 170;
  carG.add(obstacle4)
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  nailG.destroyEach();
  holeG.destroyEach();
  coneG.destroyEach();
  
  distance = 0;
 }
