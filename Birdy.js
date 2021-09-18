const webCamElement =  document.getElementById("videoCam");
const webcam = new Webcam(webCamElement, "user");
webcam.start();


score = 0;
cross = true;

//Variables assigned to the audio files
var audio = new Audio('Audio/BgTune.mp3');
var audiogo = new Audio('Audio/GameOver.mp3');
var heliSound = new Audio('Audio/HeliSound.mp3');
var missileSound = new Audio('Audio/MissileSound.mp3');



obstacleWait = document.querySelector('.obstacle');
obstacleWait.classList.remove('obstacleAnimation');

heliWait = document.querySelector('.heli');
heliWait.classList.remove('heliAnimation');

missileWait = document.querySelector('.missile');
missileWait.classList.remove('missileAnimation');

document.onkeydown = function (event) {
    if (event.keyCode == 32) {
        audio.play();
        introRemove = document.querySelector('.intro');
        introRemove.style.visibility = 'hidden';
        obstacleWait.classList.add('obstacleAnimation');

        /* Next View and speed up  */
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.4;
            obstacle.style.animationDuration = newDur+'s';
        }, 18895);

        setTimeout(() => {
            heliWait.classList.add('heliAnimation');
            heliSound.play();
        }, 25000);
        setTimeout(() => {
            missileWait.classList.add('missileAnimation');
            missileSound.play();
        }, 40000);

    }
    if (event.keyCode == 40) {

        bird = document.querySelector('.Bird_Div');
        bird.classList.add("animateBirdDown");
        setTimeout(() => {
            bird.classList.remove('animateBirdDown')
        }, 700);
    }

    else if (event.keyCode == 38) {
        bird = document.querySelector('.Bird_Div');
        bird.classList.add("animateBirdUp");
        setTimeout(() => {
            bird.classList.remove('animateBirdUp')
        }, 700);
    }
    else if (event.keyCode == 39) {
        bird = document.querySelector('.Bird_Div');
        birdX = parseInt(window.getComputedStyle(bird, null).getPropertyValue('left'));
        bird.style.left = birdX + 100 + "px";

    }
    else if (event.keyCode == 37) {
        bird = document.querySelector('.Bird_Div');
        birdX = parseInt(window.getComputedStyle(bird, null).getPropertyValue('left'));
        bird.style.left = (birdX - 100) + "px";

    }
}


/* Collision */
setInterval(() => {
    bird = document.querySelector('.Bird_Div');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    heli = document.querySelector('.heli');
    missile = document.querySelector('.missile');

    Bx = parseInt(window.getComputedStyle(bird, null).getPropertyValue('left'));   /* Bird position*/
    By = parseInt(window.getComputedStyle(bird, null).getPropertyValue('top'));

    Ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));   /* Obstacle position*/
    Oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    Hx = parseInt(window.getComputedStyle(heli, null).getPropertyValue('left'));   /* Obstacle position*/
    Hy = parseInt(window.getComputedStyle(heli, null).getPropertyValue('top'));

    Rx = parseInt(window.getComputedStyle(missile, null).getPropertyValue('left'));   /* Obstacle position*/
    Ry = parseInt(window.getComputedStyle(missile, null).getPropertyValue('top'));

    offsetX = Math.abs(Bx - Ox);
    offsetY = Math.abs(By - Oy);

    heliOffsetX = Math.abs(Bx-Hx);
    heliOffsetY = Math.abs(By-Hy);

    rocketOffsetX = Math.abs(Bx-Rx);
    rocketOffsetY = Math.abs(By-Ry);

    //Condition for game over
    if (offsetX < 120 && offsetY < 45 || heliOffsetX<90 && heliOffsetY<30 || rocketOffsetX<90 && rocketOffsetY<55) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAnimation');
        missile.classList.add('missileAnimation');
        missile.classList.remove('missileAnimation');
        heli.classList.remove('heliAnimation');
        
        audio.pause();
        heliSound.pause();
        missileSound.pause();
        audiogo.play(); 
        setTimeout(() => {
            audiogo.pause();
        }, 5000);
    }
    //Updates score
    else if (offsetX < 140 && cross) {
        score += 1;
        UpdateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
    }

}, 10);

function UpdateScore(score) {
    scoreContent = document.querySelector(".scoreContent");
    scoreContent.innerHTML = "Your Score: " + score;
}



