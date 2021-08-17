var buzz, buzz_running, buzz_collided;
var ground, invisibleGround,groundImage;
var planetsGroup,planetsImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3,obstacle4, obstacle5, obstacle6, restart, gameOver, restart1, gameOver1;

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
buzz_running = loadAnimation("buzz1.jpg","buzz2.jpg");
buzz_collided = loadImage("buzz_collided.jpg");

groundImage = loadImage("ground2.png");

planetsImage = loadImage("[planets.jpg");

obstacle1 = loadImage("obstacle1.jpg");
obstacle2 = loadImage("obstacle2.jpg");
obstacle3 = loadImage("obstacle3.jpg");
obstacle4 = loadImage("obstacle4.jpg");
obstacle5 = loadImage("obstacle5.jpg");
obstacle6 = loadImage("obstacle6.jpg");



restart1 = loadImage("restart.png");
gameOver1 = loadImage("gameOver.jpg");

}

function setup(){
    createCanvas(600,200);

    buzz = createSprite(50,180,20,50);
    buzz.addAnimatoin("running", buzz_running);
    buzz.scale = 0.5

    buzz.addImage("collided", trex_collided)
    
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -(4 + 3 * score/100);
    
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
  
    planetsGroup = new Group();
    obstaclesGroup = new Group();

    restart = createSprite(300,140);
  gameOver = createSprite(300,100);
  
  restart.addImage(restart1);
  gameOver.addImage(gameOver1);
  
  restart.scale = 0.5;
  gameOver.scale = 0.5;
  
  restart.visible = false;
  gameOver.visible = false;
  
  
  score = 0;
}

function draw(){
    background(180);

    Camera.x = buzz.x

    gameOver.position.x = restart.position.x = camera.x

    text("Score: "+ score, 500,50);
    
    if(gameState === PLAY){
      
      score = score + Math.round(getFrameRate()/60);
      
      if(keyDown("space")) {
      buzz.velocityY = -10;
    }
      buzz.velocityY = trex.velocityY + 0.8
      
      if (ground.x < 0){
      ground.x = ground.width/2;
    }

}
    buzz.collide(invisibleGround);

    spawnPlanets();
    spawnObstacles();

    if(obstaclesGroup.isTouching(buzz)){
       
        gameState = END;
        }
   
    else if(gameState === END){
     gameOver.visible = true;
     restart.visible = true;
     
     ground.velocityX = 0;
     buzz.velocityY = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     planetsGroup.setVelocityXEach(0);
     
     buzz.changeAnimation("collided", buzz_collided);
     
     obstaclesGroup.setLifetimeEach(-1);
     planetsGroup.setLifetimeEach(-1);
     
     if(mousePressedOver(restart)){
        reset();
   }
   obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     
     if(mousePressedOver(restart)) {
       reset();
     }
 }
   
   drawSprites();
 }
 function reset(){
    gameState = PLAY;
    
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    planetsGroup.destroyEach();
    
    buzz.changeAnimation("running", buzz_running);
    
    score = 0;
  }
  function spawnPlanets() {
    
    if (frameCount % 60 === 0) {
      var planet = createSprite(600,120,40,10);
      planet.y = Math.round(random(80,120));
      planet.addImage(planetImage);
      planet.scale = 0.5;
      planet.velocityX = -3;
      
      
      planet.lifetime = 200;
      
     
      planet.depth = buzz.depth;
      buzz.depth = buzz.depth + 1;
      
      
      planetsGroup.add(planet);
    }
    
  }
  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -4;
      
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
        default: break;
      }
      
            
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
     
      obstaclesGroup.add(obstacle);
    }
  }