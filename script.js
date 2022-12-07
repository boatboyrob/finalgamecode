//Create a class called "Entity" taht can have a position x and y
class Entity {
    x;
    y;
  }
  
  //Create a class "Character" that takes the characteristic of having a position x and y
  class Character extends Entity {
    //Create variables for the name of the character and the velocity of it as it moves
    name;
    vx=0;
    vy=0;
    lx=0;
    ly=0;
    constructor(myName, x, y) {
        super(x,y)
        this.name = myName;
        this.x = x
        this.y = y
    }
    //Create a Character function for when certain coordinates sent into the function hit the Character
    hit(x, y) {
        let distance = dist(x, y, this.x, this.y)
        console.log("hit ran")
        return (distance < 80)
    }
    //Create a function for when the mouse position is touching the Character
    click() {
      //if the mouse is on the character, return true else return false
        if(this.hit(mouseX, mouseY)) {
          return true 
          //console.log("You are close to me!")
        }
        return false
    }
    //Create a function to see if player is near a bobcharacter
    near(playerx, playery) {
      if (playerx >= this.x - 50 && playerx <= this.x + 50 && playery >= this.y - 50 && playery <= this.y + 50){
      return true
      } else {
        return false
      }
    }
  
    //Create a function for when the Character is moved
    move() {
        //Add horizontal velocity to the x value and add vertical velocity to the y
        this.x += this.vx;
        this.y += this.vy;
        //Check if the Character is on the wall and if they are moving into the wall -> stop the velocity
        for (let i=0; i < mazegrid.length; i++){
          if (mazegrid[i][2] == 1){
            //start of a barrier, x
            //not allowing the player character to move right past a barrier
           if (playerCharacter.x == (mazegrid[i][0]*50)-25 && playerCharacter.y >= (mazegrid[i][1]*50)-25 && playerCharacter.y <= (mazegrid[i][1]*50)+45){
              playerCharacter.x-=this.vx
            }
            //not allowing the player character to move left past a barrier
            if (playerCharacter.x == (mazegrid[i][0]*50)+45 && playerCharacter.y >= (mazegrid[i][1]*50)-25 && playerCharacter.y <= (mazegrid[i][1]*50)+45){
              playerCharacter.x-=this.vx
            }
            //not allowing the player character to move down through a barrier
            if (playerCharacter.y == (mazegrid[i][1]*50)-25 && playerCharacter.x >= (mazegrid[i][0]*50)-25 && playerCharacter.x <= (mazegrid[i][0]*50)+45){
              playerCharacter.y-=this.vy
            }
            //not allowing the player character to move up through a barrier
            if (playerCharacter.y == (mazegrid[i][1]*50)+45 && playerCharacter.x >= (mazegrid[i][0]*50)-25 && playerCharacter.x <= (mazegrid[i][0]*50)+45){
              playerCharacter.y-=this.vy
            }
          }
        }
        
    }
    //Create a function for drawing the character and adding an image for the character
    draw() {
        fill(255)
        fill ("black")
        //If the character is named "Me" draw and add an image for the main character -megaman
        if (this.name == "Me") {
          //square(this.x, this.y, 30)
          image(imgplayer,this.x, this.y, 60, 60)
        }
        // else draw and add an image for the NPC - peenywise
        else {
          image(imgbob,this.x, this.y, 50, 50)
          
          // fill ("blue")
          // square(this.x, this.y, 45)
          // fill ("white")
          // text(this.name, this.x,this.y+30)
        }
    }
  }
  
  //Create a class for the Riddler that will ask questions and borrows the functions from the Character class
  class Riddler extends Character {
    //create a function for the Riddler asking questions
    question () {
      //Create a dictionary for the questions. The key is the id of the question and the value is an array containing the question at index 0 and the answer at index 1
      //let riddles = {1:["What goes up and does not come \n down?","age"]}
      let riddles = {1:["What goes up and does not come \n down?","age"], 2:["What has four fingers and a \n thumb but isn’t alive?","glove"], 3:["What gets wet when drying?","towel"], 4:["What two words, added together, \n contain the most letters?","post office"], 5:["What can you hold in your  \n left-hand but not your right?","right elbow"], 6:["What kind of band never plays \n music?","rubber band"], 7:["It stalks the countryside with \n ears that can’t hear. What is it?","corn"], 8:["What kind of coat is best put \n on wet?","paint"], 9:["What has a bottom at the top?","legs"], 10:["What has a bottom at the top?","eyes"], 11:["It cannot be seen, it weighs nothing, \n but when put into a barrel, \n it makes it lighter. What is it?","hole"], 12:["This is easy to lift but hard \n to throw. What is it?","feather"]}
      //randomly pick a riddle between the 12 by randomly picking a number from 1 to 12
      let numrid = 0
      //create an array (list) for the 12 ids of the questions
      let keyofriddles = [1,2,3,4,5,6,7,8,9,10,11,12]
      //Pick a random id from the above array
      numrid = random(keyofriddles)
  
      //Set the game text to the the question asked by the Riddler
      gametext = this.name +" asks: "+riddles[numrid][0]
      //gametext = "Bob asks: "+riddles[numrid][0]
      // return the number of the riddle
      return numrid
    }
    //create a function for the Riddler for supplying the answer to a question
    answer (questionnumber) {
      // questionnumber = 1
      //let riddles = {1:["What goes up and does not come \n down?","age"]}
      let riddles = {1:["What goes up and does not come \n down?","age"], 2:["What has four fingers and a thumb \n but isn’t alive?","glove"], 3:["What gets wet when drying?","towel"], 4:["What two words, added together, \n contain the most letters?","post office"], 5:["What can you hold in your left-hand \n but not your right?","right elbow"], 6:["What kind of band never plays music?","rubber band"], 7:["It stalks the countryside with ears that can’t hear.\n What is it?","corn"], 8:["What kind of coat is best put on wet?","paint"], 9:["What has a bottom at the top?","legs"], 10:["What has a bottom at the top?","eyes"], 11:["It cannot be seen, it weighs nothing, but when put into \n a barrel, it makes it lighter. What is it?","hole"], 12:["This is easy to lift but hard to throw. What is it?","feather"]}
      
      //return the answer of the riddle. its the value in index 1
      return riddles[questionnumber][1]
    }
  }
  
  //Create a Player class that borrows from the Character class. This character the player will control
  class Player extends Character {
    //Create a function to for the character to interact
    interact() {
        for(let i = 0; i < people.length; i++) {
            if(people[i] !== this) {
                if(dist(this.x+this.lx*10,this.y+this.ly*10,people[i].x,people[i].y) < 40) {
                    console.log(people[i].name)
                }
            }
        }
    }
    //Create a function to move the player character
    move() {
        super.move()
        // making hitting the arrow keys on the keyboard give the player velocity
        if(keyIsPressed) {
        switch(keyCode) {
            case UP_ARROW:
                this.vy=-5;
                this.ly=-5
                break;
                case DOWN_ARROW:
                    this.vy=5;
                    this.ly=5
                    break;
                    case LEFT_ARROW:
                        this.vx=-5;
                        this.lx=-5
                        break;
                        case RIGHT_ARROW:
                            this.vx=5;
                            this.lx=5
                break;
        }
    } else {
      //kill the velocity if the player isnt pressing a key
      this.vy=0;
      this.vx=0
    }
    }
  }
  
  //variable for the people
  let people = []
  
  // create a variable to store the input
  let input
  
  //preloading the image of the background
  let img;
  function preload() {
    img = loadImage('brickground.jpg');
    //load the image of megaman the main character
    imgplayer = loadImage('player.png');
    //load the image of peenywise the riddler
    imgbob = loadImage('bob.png');
    // imgbob2 = loadImage('bob2.png');
    // imgbob3 = loadImage('bob3.png');
    // imgbob4 = loadImage('bob4.png');
    // imgbob5 = loadImage('bob5.png');
    imgwall = loadImage('backgroundtitle.PNG');
  }
  
  //function to setup the game
  function setup() {
    //create the canvas
    createCanvas(1200, 1300);
    //Create the NPC Bob and place him
    bobCharacter = new Riddler("Bob", 430, 300)
    people.push(bobCharacter)
    //Create the NPC Bob and place him
    bobCharacter2 = new Riddler("Bob2", 320, 725)
    people.push(bobCharacter2)
    //Create the NPC Bob and place him
    bobCharacter3 = new Riddler("Bob3", 880, 150)
    people.push(bobCharacter3)
    //Create the NPC Bob and place him
    bobCharacter4 = new Riddler("Bob4", 740, 600)
    people.push(bobCharacter4)
    //Create the NPC Bob and place him
    bobCharacter5 = new Riddler("Bob5", 900, 880)
    people.push(bobCharacter5)
    //Create the NPC Bob and place him
    //Create the Player character
    playerCharacter = new Player("Me", 110, 60)
    people.push(playerCharacter)
  
    //Create the input box for answers
    input = createInput('');
    input.position(780, 1240);
    input.size(200);
    input.input(myInputEvent);
  
    //create the submit button for the answers
    button = createButton('submit');
    button.position(input.x + input.width, 1240);
    button.mousePressed(lockin)
  }
  
  //Makes the grid using an array. The first 2 are the x and y coordinates of the potential block. 
  //The third is whether that block exists or not.
  let mazegrid = [[1,0,1],[2,0,1],[3,0,1],[4,0,1],[5,0,1],[6,0,1],[7,0,1],[8,0,1],[9,0,1],[10,0,1],[11,0,1],[12,0,1],[13,0,1],[14,0,1],[15,0,1],[16,0,1],[17,0,1],[18,0,1],[19,0,1],[20,0,1],[1,1,1],[2,1,0],[3,1,1],[4,1,1],[5,1,1],[6,1,1],[7,1,1],[8,1,1],[9,1,1],[10,1,0],[11,1,0],[12,1,0],[13,1,0],[14,1,0],[15,1,0],[16,1,0],[17,1,0],[18,1,0],[19,1,0],[20,1,1],[1,2,1],[2,2,0],[3,2,1],[4,2,1],[5,2,0],[6,2,0],[7,2,0],[8,2,0],[9,2,0],[10,2,0],[11,2,0],[12,2,0],[13,2,0],[14,2,0],[15,2,0],[16,2,1],[17,2,0],[18,2,0],[19,2,0],[20,2,1],[1,3,1],[2,3,0],[3,3,1],[4,3,1],[5,3,1],[6,3,0],[7,3,1],[8,3,1],[9,3,1],[10,3,1],[11,3,1],[12,3,1],[13,3,1],[14,3,0],[15,3,1],[16,3,1],[17,3,0],[18,3,0],[19,3,0],[20,3,1],[1,4,1],[2,4,0],[3,4,1],[4,4,1],[5,4,0],[6,4,0],[7,4,1],[8,4,1],[9,4,1],[10,4,1],[11,4,1],[12,4,0],[13,4,0],[14,4,0],[15,4,0],[16,4,1],[17,4,0],[18,4,0],[19,4,1],[20,4,1],[1,5,1],[2,5,0],[3,5,1],[4,5,1],[5,5,0],[6,5,1],[7,5,1],[8,5,0],[9,5,0],[10,5,1],[11,5,1],[12,5,0],[13,5,1],[14,5,1],[15,5,0],[16,5,1],[17,5,0],[18,5,0],[19,5,0],[20,5,1],[1,6,1],[2,6,0],[3,6,1],[4,6,1],[5,6,0],[6,6,0],[7,6,1],[8,6,0],[9,6,0],[10,6,1],[11,6,1],[12,6,0],[13,6,0],[14,6,0],[15,6,0],[16,6,1],[17,6,0],[18,6,1],[19,6,1],[20,6,1],[1,7,1],[2,7,0],[3,7,1],[4,7,1],[5,7,1],[6,7,0],[7,7,0],[8,7,0],[9,7,0],[10,7,1],[11,7,1],[12,7,1],[13,7,1],[14,7,0],[15,7,0],[16,7,1],[17,7,0],[18,7,1],[19,7,1],[20,7,1],[1,8,1],[2,8,0],[3,8,1],[4,8,1],[5,8,1],[6,8,1],[7,8,1],[8,8,1],[9,8,1],[10,8,1],[11,8,1],[12,8,0],[13,8,0],[14,8,0],[15,8,0],[16,8,1],[17,8,0],[18,8,0],[19,8,0],[20,8,1],[1,9,1],[2,9,0],[3,9,1],[4,9,1],[5,9,1],[6,9,1],[7,9,1],[8,9,1],[9,9,1],[10,9,1],[11,9,1],[12,9,0],[13,9,1],[14,9,1],[15,9,1],[16,9,1],[17,9,0],[18,9,1],[19,9,1],[20,9,1],[1,10,1],[2,10,0],[3,10,0],[4,10,0],[5,10,1],[6,10,0],[7,10,0],[8,10,0],[9,10,0],[10,10,0],[11,10,0],[12,10,0],[13,10,0],[14,10,0],[15,10,0],[16,10,1],[17,10,0],[18,10,1],[19,10,1],[20,10,1],[1,11,1],[2,11,0],[3,11,0],[4,11,0],[5,11,0],[6,11,0],[7,11,1],[8,11,1],[9,11,1],[10,11,1],[11,11,1],[12,11,0],[13,11,0],[14,11,0],[15,11,0],[16,11,1],[17,11,0],[18,11,0],[19,11,0],[20,11,1],[1,12,1],[2,12,0],[3,12,0],[4,12,0],[5,12,0],[6,12,0],[7,12,1],[8,12,1],[9,12,1],[10,12,1],[11,12,1],[12,12,0],[13,12,0],[14,12,0],[15,12,0],[16,12,1],[17,12,0],[18,12,1],[19,12,1],[20,12,1],[1,13,1],[2,13,0],[3,13,0],[4,13,0],[5,13,1],[6,13,0],[7,13,1],[8,13,1],[9,13,1],[10,13,1],[11,13,1],[12,13,0],[13,13,0],[14,13,0],[15,13,1],[16,13,1],[17,13,0],[18,13,1],[19,13,1],[20,13,1],[1,14,1],[2,14,0],[3,14,0],[4,14,0],[5,14,0],[6,14,0],[7,14,0],[8,14,0],[9,14,0],[10,14,0],[11,14,0],[12,14,0],[13,14,0],[14,14,0],[15,14,1],[16,14,1],[17,14,0],[18,14,0],[19,14,0],[20,14,1],[1,15,1],[2,15,0],[3,15,0],[4,15,0],[5,15,0],[6,15,0],[7,15,0],[8,15,0],[9,15,0],[10,15,0],[11,15,0],[12,15,0],[13,15,0],[14,15,0],[15,15,1],[16,15,1],[17,15,0],[18,15,1],[19,15,1],[20,15,1],[1,16,1],[2,16,1],[3,16,1],[4,16,1],[5,16,1],[6,16,1],[7,16,0],[8,16,0],[9,16,0],[10,16,0],[11,16,0],[12,16,0],[13,16,0],[14,16,0],[15,16,1],[16,16,1],[17,16,0],[18,16,1],[19,16,1],[20,16,1],[1,17,1],[2,17,1],[3,17,1],[4,17,1],[5,17,1],[6,17,1],[7,17,0],[8,17,0],[9,17,0],[10,17,0],[11,17,0],[12,17,0],[13,17,0],[14,17,0],[15,17,1],[16,17,1],[17,17,0],[18,17,0],[19,17,0],[20,17,1],[1,18,1],[2,18,1],[3,18,1],[4,18,1],[5,18,1],[6,18,1],[7,18,0],[8,18,1],[9,18,1],[10,18,1],[11,18,0],[12,18,0],[13,18,0],[14,18,0],[15,18,0],[16,18,0],[17,18,0],[18,18,0],[19,18,0],[20,18,1],[1,19,1],[2,19,1],[3,19,1],[4,19,1],[5,19,1],[6,19,1],[7,19,1],[8,19,1],[9,19,1],[10,19,1],[11,19,1],[12,19,1],[13,19,1],[14,19,1],[15,19,1],[16,19,1],[17,19,1],[18,19,1],[19,19,1],[20,19,1]]
  
  //Create the varibles for the gamestate and and score tracker
  let gamestate = "GAME ON"
  let score = 0
  let gametext = "You are in an maze. Talk to the tricky Riddlers \n to escape!"
  
  //function to see if the mouse is in a certain button
  function mouseIn(x,y,button) {
    return (x > button.x - button.width
    && y > button.y - button.height
    && x < button.x + button.width
    && y < button.y + button.height)
  }
  
  //function if the mousemoves
  function mouseMoved() {
    //console.log(mouseX+" "+mouseY)
  }
  
  //function if the mouse get clicked
  function mouseClicked() {
    //the variable for questionasked is 0 (meaning no question as been asked) and the player character is near a Riddler, ask the question of the Riddler
    if (questionasked == 0) {
    //check if the player is near the bob NPC
    for (let i=0; i < people.length-1; i++){
      console.log(people[i])
      console.log(people[i].near(playerCharacter.x,playerCharacter.y))
    if (people[i].near(playerCharacter.x,playerCharacter.y)){
    //if (playerCharacter.x >= bobCharacter.x - 50 && playerCharacter.x <= bobCharacter.x + 50 && playerCharacter.y >= bobCharacter.y - 50 && playerCharacter.y <= bobCharacter.y + 50){
      console.log("You are near the above ^")
      //if you click the NPC and are closer enough, have them ask you a question
      if (people[i].click()){
        questionasked = people[i].question()
      }
    }
  }
  }
    
  }
  
  //function to draw all of the objects and images
  function draw() {
  //make the background grey
  background('grey');
  //put the blue stone tile background
  image(img, 0, 0, 1200, 1300 );
  
  //create the game message
  fill("black")
  rect(800, 1025, 180, 80)
  fill("white")
  textSize(25);
  text(gamestate, 820, 1055);
  
  //create the score tracker
  textSize(30);
  text("Score: "+String(score)+"/5", 820, 1090);
  
  //create the dialogue box
  fill("black")
  rect(600, 1110, 580, 120)
  fill("white")
  textSize(25);
  text(gametext, 620, 1155);
  
  //Loop through the maze array and draw out the blocks at the coordinates.
  for (let i=0; i < mazegrid.length; i++){
    if (mazegrid[i][2] == 1){
      fill('black')
      //place the grey block image where the mazegrid has blocks existing
      image(imgwall,mazegrid[i][0]*50, mazegrid[i][1]*50, 50, 50)
    }
  }
  
  //draw the people last
  for(let i = 0; i < people.length; i++) {
    people[i].draw()
    people[i].move()
  }
  
  noStroke()
  fill(0)
  
  }
  
  //create a function for taking in the input of the player
  function myInputEvent() {
    let test =  this.value()
  }
  
  //craete a function to submit the answer of the player
  function lockin(){
      //if no question is asked, have the player find a riddler
      if (questionasked == 0){
        console.log("You are not near a riddler. Go find one.")
        gametext = "You are not near a riddler. Go find one."
      } 
      //if a question is asked, take the input of the player as the answer
      else {
        const answer = input.value();
      //if the answer is equal to the answer of the question asked, they get the point. (This calls the Riddler answer function)
      for (let i=0; i < people.length-1; i++){
      if (people[i].near(playerCharacter.x,playerCharacter.y)){
      if (answer.toLowerCase()  === people[i].answer(questionasked)) {
        gametext = "YOU ARE CORRECT PROCEED!"
        score = score + 1
        questionasked = 0
         
        if(score === 5){
          gamestate = "YOU WIN"
          gametext = "You have successfully beaten the RIDDLERS!"
        }
  
      } 
      //if the answer is not equal to teh answer of the question asked, the game resets
      else {
        gametext = "INCORRECT!"
        questionasked = 0
      }
    }
  }
      
  }
  //empty the answer box after you submit the current answer
  input.value('');
  }
  
  //create the value for the questionasked. If it is 0, there has been no question asked
  let questionasked = 0