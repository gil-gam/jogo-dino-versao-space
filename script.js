const alien = document.querySelector('.alien');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;


function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
            salto();
        }        
    }
}


function music() {
    var audio = new Audio('music.mp3');
    audio.addEventListener('canplaythrough', function() {
    audio.play();
});
};

function salto() {
    var audio = new Audio('jump.wav');
    audio.addEventListener('canplaythrough', function() {
    audio.play();
});
};

function over() {
    var audio = new Audio('over.wav');
    audio.addEventListener('canplaythrough', function() {
    audio.play();
});

};

function shot() {
    var audio = new Audio('shot.flac');
    audio.addEventListener('canplaythrough', function() {
    audio.play();
});
};

function jump() {
    isJumping = true;
    
    let upInterval = setInterval(() => {
        if(position >= 180) {
            clearInterval(upInterval);      
            
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                 clearInterval(downInterval); 
                 isJumping = false;  
                } else {
                    position -= 10;
                    alien.style.bottom = position + 'px';
                }
            }, 20);

        } else {
            //subindo
            position += 10;
            alien.style.bottom = position + 'px';
        }
    }, 20);
}

function createFire() {    
    const fire = document.createElement('div');
    let firePosition = 1400;
    let randomTime = Math.random() * 6000;
    shot();

    fire.classList.add('fire');
    fire.style.left = 1400 + 'px';
    background.appendChild(fire);

    let leftInterval = setInterval(() => {        
        if(firePosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(fire);
            
        } else if (firePosition > 0 && firePosition < 60 && position < 60) {
        
            // game over
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='game-over'>Game Over</h1>";
            over();
                        
        } else {
            firePosition -= 10;
            fire.style.left = firePosition + 'px';

        }
    }, 20);
    setTimeout(createFire, randomTime);
}

createFire();
document.addEventListener('keyup', handleKeyUp);

