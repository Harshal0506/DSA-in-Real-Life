function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 66;
	game_over = false;
	score = 5;


	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){

			for(var i=1;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}

            pen.beginPath();
            // console.log(this.cells[0].x +"Snake Hiss")
            pen.arc(this.cells[0].x*cs+33, this.cells[0].y*cs+33, 31 , 0, 2 * Math.PI, false);
            pen.fillStyle = "blue";
            pen.fill();
            pen.lineWidth = 5;
            pen.strokeStyle = '#003300';
            pen.stroke();
		},

		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;

			}
			else
			{
				this.cells.pop();
			}

			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}
            this.cells.forEach(element => {
                if(element.x==nextX && element.y==nextY){
                    pen.fillStyle = "grey";
				    pen.fillRect(nextX*cs,nextY*cs,cs-3,cs-3);
                    game_over=true;
                }
            });

			this.cells.unshift({x: nextX,y:nextY});

			/*Write a Logic that prevents snake from going out*/
			var last_x = Math.floor(W/cs)-1;
			var last_y = Math.floor(H/cs)-1;

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                
                pen.beginPath();
                
                pen.arc(this.cells[1].x*cs+33, this.cells[1].y*cs+33, 31 , 0, 2 * Math.PI, false);
                pen.fillStyle = "grey";
                pen.fill();
                pen.lineWidth = 5;
                pen.strokeStyle = '#003300';
                pen.stroke();
				

				game_over = true;
			}

		}

	};

	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight" && snake.direction!="left"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft" && snake.direction!="right"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown" && snake.direction!="up"){
			snake.direction = "down";
		}
		else if(e.key=="ArrowUp" && snake.direction!="down"){
			snake.direction = "up";
		}
		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed) ;
	
}


function draw(){
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,18,20,cs*1.5,cs*1.5);
	pen.fillStyle = "blue";
	pen.font = "30px Roboto"
	pen.fillText(score,50,50);

	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food

}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
        clearInterval(t);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

function toungueMaker(){
    pen.fillStyle = "red";
    let toungueX;
    let toungueY;

    if(snake.direction=="right"){
        toungueX=snake.cells[0].x+1;
        toungueY=snake.cells[1].y;
        pen.fillRect(toungueX*cs,toungueY*cs+33,cs-33,cs-53);

    }else if(snake.direction=="left"){
        toungueX=snake.cells[0].x;
        toungueY=snake.cells[1].y;
        pen.fillRect(toungueX*cs,toungueY*cs+33,-(cs-33),cs-53);
        

    }else if(snake.direction=="up"){
        
        toungueX=snake.cells[0].x;
        toungueY=snake.cells[1].y;
        pen.fillRect(toungueX*cs+33,toungueY*cs,cs-53,-(cs-33));


    }else{
        
        toungueX=snake.cells[0].x;
        toungueY=snake.cells[1].y+1;
        pen.fillRect(toungueX*cs+33,(toungueY)*cs,cs-53,cs-33);


    }
	


}

init();

var f = setInterval(gameloop,100);

var t=setInterval(toungueMaker,1000);
