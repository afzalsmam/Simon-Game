var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggleStart = true;
var level = 0;
var hintHidden = true;

$(document).on("keypress", function(){
  if(toggleStart == true){
      nextSequence();
  }
  toggleStart = false;
  $("h1").text("Level "+level);

});

$("p").hide();
$("button").on("click", function(){
  if(hintHidden == true){
    $("p").fadeToggle();    //I used to put $("p").hide() here and then again fadeToggle() at the bottom so they were contradicting each other. So if you figure out the logic you will come up with new strategies to solve the problem of first hiding the text and then only show it when the button is pressed the hintHidden Boolean helped solve this.  
  }
  hintHidden == false;


})

function nextSequence(){
  var randomNumber = (Math.random()) * 4;
  randomNumber = Math.floor(randomNumber);
  // console.log(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level = level + 1;
  $("h1").text("Level "+level);
}

$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  pressedAnimation(userChosenColor);
  var currentLevelLength = (userClickedPattern.length) - 1;  //If I hadn't substracted it by 1 it would give the length i,e 1 and arrays start counting from 0 so the result would be undefined

  checkAnswer(currentLevelLength);
});

function playSound(theSound){
  var audio = new Audio("sounds/"+theSound+".mp3");
  audio.play();
}

function pressedAnimation(currentColor){
        //From Stackoverflow
  // var pressedItem = $("."+currentColor);
  //
  // pressedItem.addClass("pressed");
  // setTimeout( function(){
  //    pressedItem.removeClass("pressed"); }, 100 );

                      //my version
    $("."+currentColor).addClass("pressed");

    setTimeout(function(){
      $("."+currentColor).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      // console.log("success");
      if(userClickedPattern.length == gamePattern.length){
        console.log("level finished");
        setTimeout(function(){
          nextSequence();
        }, 1000);
        userClickedPattern.length = 0;

      }
    }
    else{
      console.log("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 500);

      $("h1").text("Game over. You reached level "+level);
      $("h2").show();
      $("h2").text("Press any key to restart");
      var gameOver = new Audio("sounds/wrong.mp3");
      gameOver.play();
      startOver();

    }
  }

  function startOver(){
    //Note: I had put this variables and arrays to be reset inside the keypress callback function but it didnt work. And now when I have put them outside the keypress they are working. Strange!
    toggleStart = true;
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    level = 0;
    $(document).on("keypress", function(){
      $("h2").hide();
      console.log(userClickedPattern);
      if(toggleStart == true){

        nextSequence();
        $("h1").text("Level "+level);
      }
        toggleStart = false;
        console.log(gamePattern);
    });
  }
