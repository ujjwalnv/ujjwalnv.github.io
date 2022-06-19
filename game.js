var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var currentLevel = 0;
var correct = true;

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  if (userClickedPattern.length === 0) currentLevel = 0;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (correct) {
    checkAnswer(currentLevel++);
  } else {
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
});

$(document).keypress(function () {
  level = 0;
  currentLevel = 0;
  correct = true;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  setTimeout(function () {
    if (gameStarted === false) {
      nextSequence();
      gameStarted = true;
    }
  }, 100);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern.length = 0;
      setTimeout(nextSequence, 1000);
    }
  } else {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameStarted = false;
    correct = false;
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);

  //Title and level change
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
