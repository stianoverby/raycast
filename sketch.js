let walls = [];
let ray;
let particle; 

let xOffset = 0;
let yOffset = 10000;

let boxHeight;
let boxWidth;
const numberOfBoxes = 10;

function setup() {
	createCanvas(1400, 1000);

	boxHeight = height / numberOfBoxes;
	boxWidth = width / numberOfBoxes;

	/* Generate a 'maze'. Will switch this one with a maze generation algorithm */
	//walls = generateMaze();

	/* Randomly generate 5 walls */
	for (let i = 0; i < 5; i++){
		let x1 = random(width);
		let x2 = random(width);
		let y1 = random(height);
		let y2 = random(height);
		walls.push(new Wall(x1, x2, y1, y2));
	}

	/* Add walls around the box */
	walls.push(new Wall(0, 0, width, 0));
	walls.push(new Wall(width, 0, width, height));
	walls.push(new Wall(width, height, 0 , height));
	walls.push(new Wall(0, height, 0, 0));
	
	particle = new Particle();
	particle.setPosition(100,100);
}

function draw() {
	background(0);
	walls.forEach(wall => wall.show());

	/* Move particle to mouse position */
	console.log(mouseX);
	particle.updatePosition(mouseX, mouseY);

	/* Move particle randomly */
	//particle.updatePosition(noise(xOffset) * width, noise(yOffset) * height)

	particle.show();
	particle.pointAt(walls);

	xOffset += 0.005;
	yOffset += 0.005;

}

function generateMaze(){
	
	maze = [];

	/* Add vertical and horizontal walls to the meze */
	for(let x = 0; x < width; x += boxWidth){

		let x1 = x;
		let x2 = x + boxWidth;

		for(let y = 0; y < height; y += boxHeight){

			let y1 = y;
			let y2 = y + boxHeight;

			const verticalWall 		= new Wall(x1, y1, x1, y2); 
			const horizontalWall 	= new Wall(x1, y1, x2, y1);

			maze.push(verticalWall);
			maze.push(horizontalWall);
		}
	}

	/* Randomly remove walls */
	return maze.filter(wall => Math.floor(random(2)) == 1);

}



