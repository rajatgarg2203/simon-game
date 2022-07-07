var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("level-title").text("Level"+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    var randomNumber = Math.floor((4*Math.random())%4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level)

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    // animatePress(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(currentLevel == gamePattern.length-1){
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 2000);
        var answer = "Correct Pattern was: ";
        for(var i = 0; i < gamePattern.length; i++){
            answer += (gamePattern[i][0]).toUpperCase();
        }
        answer += "\nPress A key to Start again";
        $("#level-title").text(answer);
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


