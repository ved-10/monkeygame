var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
var score
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas =(600,600)
  
  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  
   //create Obstacle and Cloud Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
 
  
  
  
  
  
  score = 0
  
}


function draw() {
  background("white")
  
  if(gameState === PLAY){
    stroke("white");
    textSize(20);
    fill("black");
    text("score"+score,290,50)
   
    
    
   stroke("white");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survival Time" + survivalTime,0,50)
    
    ground.velocityX = -4;
     if (ground.x < 0){
      ground.x = ground.width/2;
    }  
    
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
       monkey.velocityY = -12;
    
    }
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1;
    } 
    
    //add gravity
     monkey.velocityY =monkey.velocityY +0.9
    
     //spawn obstacles on the ground
    spawnobstacle();
    
    //spawn bannana 
    spawnbannana();
    
    monkey.collide(ground);
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.velocity = -12 ;
      gameState = END
      
    }
  
    
    
    
    
  }
else if (gameState === END){
   ground.velocityX = 0;
    monkey.velocityY = 0
  
  
  
   monkey.collide(ground);
  
  
  
}
  
  
  
  
  
   
  
  
drawSprites();
  
}





function spawnbannana(){
  
if (frameCount % 60 === 0) {
     banana = createSprite(600,100,40,10);
  banana.addImage(bananaImage);
  
   banana.y = Math.round(random(150,160));
     banana.velocityX =-20
  banana.scale = 0.1;
  
  FoodGroup.add(banana);
}
  
}
function spawnobstacle(){
  if (frameCount % 60 === 0){
     obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
       obstacle.velocityX = -16;
    obstacle.scale = 0.1 
    
   
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300; 
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}



