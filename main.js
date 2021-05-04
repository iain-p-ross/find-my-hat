const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    this.gameOver = false;
  }

generateField(height, width, prob) {
  //probabilistic hole generator function
  var holeGen = function() {
    if(Math.random() > prob) {
    return fieldCharacter;
  } else {
    return hole;
  }};

  //create multidimensional array
  this.field = new Array(height);
  for (var x = 0; x < height; x++) {
    this.field[x] = new Array(width);
  }
  for(var i = 0; i < this.field.length; i++) {
    for(var j = 0; j < this.field[i].length; j++) {
      this.field[i][j] = holeGen();
    }
  }
  //set starting position
  this.field[0][0] = pathCharacter;

  //set hat position (offset so as to avoid starting cell)
  this.field[Math.floor(Math.random()*(height-1))+1][Math.floor(Math.random()*(width-1))+1] = hat;

}

print() {
  console.clear();
  let printField = [[]];
  for(var i = 0; i < this.field.length; i++) {
    printField[i] = this.field[i].join('');
  }
  printField = printField.join('\n');
  console.log(printField);
}
}


const myField = new Field ([[]]);
myField.generateField(15, 30, 0.3);

while(myField.gameOver == false) {
  console.clear();
  myField.print();
  let move = prompt('Which direction would you like to move?');
  move = move.toUpperCase()
  switch(move) {
    case 'L':
      if(myField.positionX>0){
        myField.positionX--;
      } 
    break;

    case 'R': 
    if(myField.positionX < (myField.field[0].length-1)){
      myField.positionX++;
    } 
    break;

    case 'D': 
    if(myField.positionY < (myField.field.length-1)){
      myField.positionY++;
    }     
    break;

    case 'U': 
    if(myField.positionY>0){
      myField.positionY--;
    } 
    break;
  }

  //test if hole and end game if so
  if(myField.field[myField.positionY][myField.positionX] === 'O') {
    console.log('YOU FELL IN A HOLE... GAME OVER');
    myField.gameOver = true;
  }

  //test if hat and end game if so
  if(myField.field[myField.positionY][myField.positionX] === '^') {
    console.log('WELL DONE! YOU FOUND YOUR HAT.');
    myField.gameOver = true;
  }

//move path
myField.field[myField.positionY][myField.positionX] = pathCharacter;
}
