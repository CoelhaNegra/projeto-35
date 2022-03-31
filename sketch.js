var balao, database;
var position;
var balaoImg;
var fundo;

function preload() {
 balaoImg = loadImage("balaoQuente.png");
 fundo = loadImage("cidade.png");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1200,800);

  balao = createSprite(250,250,10,10);
  balao.addImage(balaoImg);
  balao.scale = 0.5;


  var balaopos = database.ref('balao/pos');
  balaopos.on("value", readPosition, showError);
}

function draw(){
  background(fundo);
     if(position != undefined) {

     
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
}
}

function writePosition(x,y){
  database.ref("balao/pos").set({ 
    "x": position.x+x,
    "y": position.y+y })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balao.x = position.x;
  balao.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
