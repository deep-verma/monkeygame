var GS, PLAY, END;PLAY = 1; GS = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup, invisibleground
var score,ground, gimage;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gimage = loadImage("ground.PNG");

}



function setup() {
 createCanvas(600, 500);
 
  
  
   ground = createSprite(400,250,600,500);
   ground.addImage("ground",gimage);
   ground.scale = 2.0
  
    
   invisibleground = createSprite(250,500,600,20);
  
 
  monkey = createSprite(100,500)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  invisibleground.visible = false;
 
 score = 0;
  
}


function draw() {
//background(180);
   
 
  ground.velocityX = -3 
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(GS === PLAY){
    monkey.changeAnimation("running",monkey_running);
     //score
  text("Survival time : "+ score, 400,20);
  text.depth = 11;
    ground.depth = 0;
    //console.log(ground.depth);
    //score = Math.ceil(frameCount/frameRate())
   Obstacles();
   food();
    
    if(keyDown("space")&& monkey.y >= 400) {
        monkey.velocityY = -20; 
  }
    if(monkey.isTouching(foodGroup)){
    score = score+1;
    foodGroup.destroyEach();
   
  }}
  
  
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleground);
  
   if(obstaclesGroup.isTouching(monkey)){
      GS = END;
    }
  if(GS === END){
    reset();   
  }
   if(keyDown("R")){
     GS = PLAY;
   }
    
   drawSprites();
  
}

function Obstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,470);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
   // var rand = Math.round(random(1,100));
  
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
 
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
    }

function food() {
  //write code here to spawn the clouds
 if (frameCount % 100 === 0) {
    var banana = createSprite(600,120,40,10);
    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
   
    
    //add each cloud to the group
    foodGroup.add(banana);
  
}
}
function reset(){
  ground.velocityX = 0;
  background.velocityX = 0;
  foodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  text("press space", 300,300);
}
