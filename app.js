/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- set the target(winning score) using an input field where player can set the winning score,so that they can change predefined score.
-as player reach the winningScore,hold button and roll dice button should become disabled.
-as player reach the winningScore ,hide the dice image and input field(that is used to set winning Score),and even active class.
-as player reach the winningScore,replace the name of player who win by "Winner".
-on pressing new Game button,Game should start from beginning.
-on pressing new Game button,display the dice image,input field,replace "winner" by name of player,set active class on activePlayer,enable roll and hold button and set all score(round and total) to be equal to "0" like it was in beginning.
*/


//display message
alert("Please set Winning Score Before You Start Game.");

//define current player variable
var currentPlayer = 0;
var randomNumber1;

//set winningScore(give as input)
var winner = document.querySelector(".winningscore");


//define target variable
var newButton = document.querySelector(".btn-new");
var rollButton = document.querySelector(".btn-roll");
var holdButton = document.querySelector(".btn-hold");


//define addEventListener
rollButton.addEventListener("click",rollDiceFn);
holdButton.addEventListener("click",holdGameFn);
newButton.addEventListener("click",newGameFn);


//rollDiceFn(function to be executed on pressing rollButton)
function rollDiceFn(){
    var roundScorePlayer = document.getElementById("current-"+currentPlayer);
    //create random number from 1 to 6
    var randomNumber = Math.floor(Math.random()*6+1);
    //changing diceNumber on rolling dice everytimes
    document.querySelector(".dice").setAttribute("src","dice-"+randomNumber+".png");
 
    //change currentScore if randomNumber is !=1
    if(randomNumber !==1){
        roundScorePlayer.textContent = parseInt(roundScorePlayer.textContent)+randomNumber;
    }
    //change  player turn and set currentScore = 0
    else{
        roundScorePlayer.textContent = "0";
        //change player turn
        nextPlayer();
        // to toggle active class
        toggler();
    }
}


//holdGameFn(function to be executed on pressing holdButton)
function holdGameFn(){
    //roundScore(currentScore)
    var roundScorePlayer = document.getElementById("current-"+currentPlayer);
//scorePlayer(totalScore)
     var scorePlayer = document.getElementById("score-"+currentPlayer);
     //add roundScore to totalScore(scorePlayer)
    scorePlayer.textContent = parseInt(scorePlayer.textContent)+parseInt(roundScorePlayer.textContent);

    //decide winner 
    if(scorePlayer.textContent>=parseInt(winner.value)){
        //toggle textContent of currentPlayer by "Winner"
        document.querySelector("#name-"+currentPlayer).textContent = "Winner!";
        //add winner class to player who wins the game
document.querySelector(".player-"+currentPlayer+"-panel").classList.add("winner");
        console.log("You won");
        //remove active class from currentPlayer(winner)
        document.querySelector(".player-"+currentPlayer+"-panel").classList.remove("active");
        //hide dice image as player win the game.
    document.querySelector(".dice").style.display = "none";
    //disable rollButton and holdButton after player wins the game
          rollButton.disabled = true;
          holdButton.disabled = true;
          //hide winningscore button
          winner.style.display="none";
    }
    //if yet winner is not decided then else condition
    else{
        roundScorePlayer.textContent = "0";
        //toggle active class
    toggler();
    //change player turn
    nextPlayer();
    }
}




//nextPlayer function to change currentPlayer
function nextPlayer(){
    if(currentPlayer === 0){
        currentPlayer =1;
    }
    else{
        currentPlayer = 0;
    }
}


//toggler function for toggling active class
function toggler (){
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}


//start function(to be called when new Game button is clicked)
function startGame(){
    //initialising all score(final and round) to be 0
    document.querySelector("#score-0").textContent = "0";
    document.querySelector("#score-1").textContent = "0";
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    //display the dice image
    document.querySelector(".dice").style.display = "block";
    //display the winner(winningScore) button
    winner.style.display="block";
    //set winnerValue as placeholder;
    // winner.value="WinningScore";
    winner.setAttribute("placeholder","WinningScore");
    winner.value="0";
    alert("Please set Winning Score Before You Start New Game.");

}


//newGameFn(function to be executed on pressing new Game button)
function newGameFn(){
//call startGame function
         startGame();
     //remove winner class from winner player
    document.querySelector(".player-"+currentPlayer+"-panel").classList.remove("winner");
    //add active class to winner player
    document.querySelector(".player-"+currentPlayer+"-panel").classList.add("active");
    //enable rollButton and holdButton
    rollButton.disabled = false;
    holdButton.disabled = false;
    //set the name of Players
    if(currentPlayer === 0){
        document.querySelector("#name-"+currentPlayer).textContent = "Player 1";
    }
    else{
        document.querySelector("#name-"+currentPlayer).textContent = "Player 2";
    }
}
