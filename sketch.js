//Create variables here

var dog, dogImage;
var happyDog;
var food;
var foodStock;
var database;


function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}

function readStock(data){
  food=data.val();
}

function draw() {  
background("green");
if(keyWentDown(UP_ARROW)){
  write(food);
  dog.addImage(happyDog);
}
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("food remaining"+food,170,200);
  textSize(13);
  text("Note: Press up arrow key to feed the dog",130,10,300,20);
}

function write(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

