/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width=500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
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
        this.enemyImage.src = "image/enemy2.png"; 
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth/2;
        this.height =this.spriteHeight /2;
        this.x = Math.random() * (canvas.width-this.width);
        this.y = Math.random() * (canvas.width-this.width); 
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    update(){ // Shared class method ,written once and accessed by all the enemies
        this.x =-this.speed;
        this.y +=Math.random() * 5 -2.5;

        // animate sprites
        if (gameframe %this.flapSpeed == 0){
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