var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
   if (!started) {
// The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
     $("#level-title").text("level " + level);
     nextSequence();
     started = true;
   }
});




$(".btn").click(function(){

var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);
// Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
checkAnswer(userClickedPattern.length-1);

});
// reset the values of level, gamePattern and started variables.


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function() {
      $("body").removeClass("game-over");
      }, 200);
      

      startOver();
    }
  }



function nextSequence() {
   // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
  // Inside of nextSequence() increased by 1 every time the function run
   level++;

   $("#level-title").text("Level " + level);

    // The random Number for boxes
    var randomNumber = Math.floor(Math.random() * 4);
    // the var is an array with random numbers to choose
    var randomChosenColour = buttonColours[randomNumber];
    // we put into game pattern from randomChosenColour colors (randomNumber)
    gamePattern.push(randomChosenColour);
    // choosing id randomChosenColour to make the effect of toggle fadeOut - in
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // this function it gives the names of files with randomChosenColour to play the sounds
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}