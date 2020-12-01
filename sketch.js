//Create variables here

//Create variables here
var pet,petImg,happyPet,happyPetImg;
var foodStock;
var food;
var database;
var feed,addFood;
var fedTime,lastFed;
var foodObj

function preload()
{
  //load images here
  petImg=loadImage("images/dogImg.png");
  happyPetImg=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000, 400);

  foodObj= new Food();

  
  
  pet=createSprite(800,200,150,150)
  pet.addImage("dog",petImg)
  pet.scale=0.3;

  foodStock=database.ref('Food')
  foodStock.on("value",readStock) 
  
  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46,139,87) 
  foodObj.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "pm", 350,30);

  }
  else if(lastFed==0){
    text("Lasr Feed : 12 AM" ,350 ,30)
  }
  else {
    text ("Last Feed :"+ lastFed + "am",350,30);
  }

  drawSprites();
}
  
function readStock(data){
  food=data.val();
  foodObj.updateFoodStock(food);
  
}

function feedDog(){
  pet.addImage(happyPetImg);



foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
  
function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  })
}
  
  
  
  
  
  
  
  
  
  
  /*
  if(keyWentDown("space")){
    //console.log("pressed")
    reducefood(food)
    pet.addImage(happyPetImg)
  }
  

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+ food ,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  drawSprites();
  

}



function reducefood(num){
if(num<=0){
 num=0;
}
else{
num=num-1}

    database.ref('/').update({
      Food:num
    })
}
*/



