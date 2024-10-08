/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width=500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 30;
const enemiesArray =[];


let gameframe = 0;
/*
enemy1 = {
    x:10,
    y:50,
    width : 100,
    height: 100,
}
*/

class Enemy {
    constructor(){
        this.enemyImage = new Image();
        this.enemyImage.src = "image/enemy4.png"; 
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth/2;
        this.height =this.spriteHeight /2;
        this.x = Math.random() * (canvas.width-this.width);
        this.y = Math.random() * (canvas.height-this.height);
        this.newX =  Math.random() * canvas.width
        this.newY =  Math.random() * canvas.height
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 +50);
      
    }

    update(){ // Shared class method ,written once and accessed by all the enemies
        if(gameframe % this.interval == 0){
            this.newX =  Math.random() * (canvas.width-this.width);
            this.newY =  Math.random() * (canvas.height-this.height);
        }
        
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        this.x -=dx/70;
        this.y -=dy/70;
      
        if(this.x + this.width < 0) this.x = canvas.width;

        // animate sprites
        if (gameframe %this.flapSpeed === 0){
             this.frame > 4 ? this.frame = 0: this.frame ++;
        }
       
    }
    draw(){
        //ctx.strokeRect(this.x , this.y , this.width , this.height);
        ctx.drawImage(this.enemyImage ,this.frame * this.spriteWidth, 0,
              this.spriteWidth,this.spriteHeight ,this.x , this.y,this.width,
               this.height);
    }
}



for(let i = 0; i < numberOfEnemies ; i++){
    enemiesArray.push(new Enemy());

}
console.log(enemiesArray);


function animate(){
    ctx.clearRect(0 , 0 ,CANVAS_WIDTH , CANVAS_HEIGHT);
    enemiesArray.forEach(enemy =>{
        enemy.update();
        enemy.draw();
    })
    gameframe ++;
    requestAnimationFrame(animate);
    
}

animate();