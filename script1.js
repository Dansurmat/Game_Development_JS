/** @type {HTMLCanvasElements}*/

let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change' , function(e){
    playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'image/shadow_dog.png';
const spriteWidth =(6876/12 ) + 2;
const spriteHeight = 5230/ 10;

//let frameX = 0;
//let frameY = 0;
let gameFrame = 0;
const staggerFrame = 5;
const spriteAnimation = [];
const animationStates =[
    {
        name: 'idle',
        frames : 7,
    },

    {
        name: 'jump',
        frames : 7,
    },

    {
        name: 'fall',
        frames : 7,
    },

    {
        name: 'run',
        frames : 9,
    },

    {
        name: 'dizzy',
        frames : 11,
    },

    {
        name: 'sit',
        frames : 5,
    },

    {
        name: 'roll',
        frames : 7,
    },

    {
        name: 'bite',
        frames : 7,
    },

    {
        name: 'ko',
        frames : 7,
    },

    {
        name: 'getHit',
        frames : 4,
    }
];

animationStates.forEach((state , index) =>{
    let frames = {
        loc:[],
    }
    for(let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x : positionX , y: positionY});
    }
    spriteAnimation[state.name] = frames;
});

console.log(spriteAnimation);


function animate(){
    ctx.clearRect(0, 0 , CANVAS_WIDTH , CANVAS_HEIGHT);
    //ctx.fillRect(100 , 50 , 100 , 100);
    //ctx.drawImage(image , sx ,sy , sw , sh , dy , dx , dw , dh);
    
    let position = Math.floor(gameFrame /staggerFrame) % spriteAnimation[playerState].loc.length;
    let frameX =spriteWidth* position;
    let frameY = spriteAnimation[playerState].loc[position].y;
    ctx.drawImage(playerImage , frameX ,frameY,spriteWidth, spriteHeight,0 ,0,spriteWidth, spriteHeight);

    gameFrame ++;
    requestAnimationFrame(animate);
   
}

animate();

