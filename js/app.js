//Game state
// Create the game constructor to store the game variables
var Game = function() {
	this.gameOver = false;
	this.gameWin = false;
	this.game = false;
};
// Speed in pixels per second. From jlongster on github
var playerSpeed = 200;
var enemySpeed = 100;
var xStart = 200;
var yStart = 385;
// var score = 0;



// Enemies our player must avoid
//The constructor function takes in arguments for the aspects that
//will be different about each enemy. Here blank, ()
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 10;
    // this.y = 20;
    this.y = 20 + (Math.floor((Math.random() * 3)) * this.yInterval);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.yBase = 60;
    this.yInterval = 87;
    // this.y = this.yBase + (Math.floor((Math.random() * 3)) * this.yInterval); // get random number between 1 - 3; multiply by pixels to determine starting row of enemy
    this.speed = enemySpeed + Math.floor((Math.random() * 100) + 1);

};
// checks if enemy collided with player
//adapted from shttps://discussions.udacity.com/t/trying-to-identify-collisions-but-how-do-i-compare-enemy-x-with-player-x/29930/9
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y + 40 &&
        60 + player.y > this.y) {
        // player.resetPlayer();

        this.x = -10;
				this.speed = +enemySpeed + Math.floor((Math.random() * 100) + 1) + 100;
				// this.sprite = 'images/enemy-bug-hit.png';
        player.lives--;

				// Wait 1 second then resetPlayer
				player.sprite = 'images/player-bang.png';
			     setTimeout( function() {
		          // player.resetPlayer();
		          player.sprite = 'images/player-hit.png';
		          // player.sprite = 'images/Rock.png';
							  // this.x = -1;
			     }, 100);
				// player.sprite = 'images/player-hit.png';

				player.resetPlayer();
				// Change player sprite
        document.getElementById("elLives").innerHTML = 'Lives: ' + player.lives;

        player.score -= 50;
        document.getElementById("elScore").innerHTML = 'Score: ' + player.score;
        if (player.lives === 0) {
        			// Player is out of lives, show the game over
        			game.gameOver = true;

        		}
    }
    var win = true;
      if (player.score === 1000) {

      } else {
        // Set the win flag to false
        win = false;
      }

    // If the player has won, display the game winning image
    if (win) {
      game.gameWin = true;
    }

    // Reset the player to her original location & image
    // player.resetPlayer();

};
// Enemy.prototype.bugReset = function () {
//     for (var i = 0; i < allEnemies.length; i++)
//         allEnemies[i].x = -200;
//         // break;
// };


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.checkCollision(player);
		// gem.collision();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // enemy.sprite.update(dt); //this does not allow enemies to be seen! keep it off.
    this.x = this.x + this.speed * dt;


         if (this.x >= 505) {
          this.x = -101;
          this.y = this.yBase + (Math.floor((Math.random() * 3)) * this.yInterval); // get random number between 1 - 3; multiply by pixels to determine starting row of enemy

    }

};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 385;
    this.score = 0;
    this.moveY = 83;
    this.moveX = 101;
    this.lives = 15;
    this.checkCollision = false;
    this.gameOver = false;
		this.hasGem = false;
		this.collistionCount = 0;
		this.speech = '';
};


Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // I think this function is taken care of by handleInput
    // if (this.x > ctx.width) {
    //     // this.resetPlayer();
    // }
    // if (this.checkCollision) {
    //   Enemy.bugReset();
    //   this.resetPlayer();
    // }
    // Check to see if the player has won the game

};
/**
 * Minus player life and change sprite when player gets hit
 * @memberOf Player
 */
// Player.prototype.gotHit = function() {
//     // Save current 'this' to pass to global function
//     // var self = this;
//
//     // Change player sprite
//     // this.displayImage = 'Hit';
//     // this.displayTimer = (Date.now() / 1000) + 1.1; // 1.1 seconds
//     //
//     // // Freeze the player
//     // this.hit = true;
//
//     // Minus life
//     if(this.lives > 0) this.lives--;
//     document.getElementById("elLives").innerHTML = player.score;
//
//     // Wait 1.1 seconds then reset player position
//     setTimeout( function() {
//         self.restart();
//     }, 1100);
// };
// Updates the score.
// Player.prototype.updateScore = function() {
//   this.score = -50;
//   document.getElementById("elScore").innerHTML = player.score;
//
// };

Player.prototype.resetPlayer = function() {
    if (this.lives === 0) {
        player.gameOver = true;
    } else {
        this.x = xStart;
        this.y = yStart;
    }
};

Player.prototype.collisionCount = function () {
		if (player.collistionCount === 1) {
			this.speech = 'ouch';
		}
		if (player.collistionCount === 3) {
			this.speech = 'that hurt';
		}
};

Player.prototype.gameOver = function() {
    this.gameOver = true;
    allEnemies = [];
    player.resetPlayer();
    //make the player disappear
    this.x = -200;
    // document.getElementById("elGameOver").innerHTML='Game Over!...Please refresh the page to restart the game';
};

Player.prototype.gameReset = function() {
    resetPlayer(); // return player to starting position
    this.gameOver = true;
    enemy.x = 10;
    };


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 25) {
        this.x -= 101;
    }
    if (direction === 'up' && this.y > 10) {
        this.y -= 48;
    } else if (this.y < 10) {
        this.score += 100;
        document.getElementById("elScore").innerHTML = 'Score: ' + player.score;
				player.sprite = 'images/char-horn-girl.png';
        player.resetPlayer();
    }


    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 50;
    }
};


//Gem class
var Gem = function(x,y) {
    //the gems appears in random location
    // this.height = 20;
    // this.width = 20;
    this.x = Math.floor(Math.random() * (505 - this.width));
    // //limits gem, not over water or grass
    this.y = Math.floor(Math.random() * (303 - this.height));
    if (this.y < 200) {
        this.y += 100;
    }


// };
// //
// // Creates a gem and places it on a random stone block with setGemLocation().
// var Gem = function()
 {
    this.setGemLocation();
		this.incrementer = 0;
		this.startX = this.x;
		this.startY = this.y;
}
};

// Sets the location of the gem when called in setGemLocation.
function gemLocation() {
    this.x = (Math.floor(Math.random() * 5)) * 90 + 25;
    this.y = (Math.floor(Math.random() * 3) + 1) * 80 + 60;
		 if (this.y < 100) {
        this.y += 100;
    }
}
// Sets the location of a gem.
// Blue will appear most often, then green, then orange.
Gem.prototype.setGemLocation = function() {
    var random = Math.floor(Math.random() * 100) + 3;

    if (random >= 60) {
        this.sprite = 'images/Gem-Blue.png';
        gemLocation.call(this);
        this.value = 20;
    } else if (random < 60 && random > 10) {
        this.sprite = 'images/Gem-Green.png';
        gemLocation.call(this);
        this.value = 50;
    } else {
        this.sprite = 'images/Gem-Orange.png';
        gemLocation.call(this);
        this.value = 100;
    }
};
Gem.prototype.collision = function(){
		if (player.x < this.x + 80 &&
			player.x + 80 > this.x &&
			player.y < this.y + 80 &&
			80 + player.y > this.y) {
			player.hasGem = true;
		 this.setGemLocation();
		 player.score += gem.value;
		 document.getElementById("elScore").innerHTML = 'Score: ' + player.score;
	 }
};

Gem.prototype.update = function() {
	this.collision();
	// if (player.x < this.x + 75 &&
	// 	player.x + 65 > this.x &&
	// 	player.y < this.y + 50 &&
	// 	70 + player.y > this.y) {
	// 	player.hasGem = true;
	//  this.x = 0;
	//  this.y = 600;
	// }
// m-coding mentioned this. adapted from {http://www.kirupa.com/html5/introduction_to_easing_in_javascript.htm | Oscillation Formula}
// oscillats the gems
	//  this.incrementer += 0.05;
	//  this.x += (Math.cos(this.incrementer)/4);
	//  this.y += (Math.sin(this.incrementer)/4);
	//  if(this.incrementer >= 6.28) {
	// 		 this.incrementer = 0;
	// 		 this.x = this.startX;
	// 		 this.y = this.startY;
	//  }
};

// Draw the gem on the screen.
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 1; i < 2; i++) {
    allEnemies.push(new Enemy(this.x, (i * 83) - 30, this.speed * 100 * i));
}
// Place the player object in a variable called player
var player = new Player();
// var enemy = new Enemy();
var gem = new Gem();
// -- Instantiate the game --
var game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
