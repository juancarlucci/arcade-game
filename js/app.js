//Game state
// Speed in pixels per second. From jlongster on github
var playerSpeed = 200;
var enemySpeed = 100;
var xStart = 200;
var yStart = 385;
// var score = 0;




// Sets the edges of the gems and enemy bugs.
// function Edges() {
//     this.halfBoxHeight = 37;
//     this.halfBoxWidth = 50;
//     this.boxUp = this.y - this.halfBoxHeight;
//     this.boxDown = this.y + this.halfBoxHeight;
//     this.boxLeft = this.x - this.halfBoxWidth;
//     this.boxRight = this.x + this.halfBoxWidth;
// }


// Enemies our player must avoid
//The constructor function takes in arguments for the aspects that
//will be different about each enemy. Here blank, ()
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 10;
    this.y = 20;
    // this.speed = enemySpeed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.yBase = 60;
    this.yInterval = 87;
    // this.y = this.yBase + (Math.floor((Math.random() * 3)) * this.yInterval); // get random number between 1 - 3; multiply by pixels to determine starting row of enemy
    this.speed = enemySpeed + Math.floor((Math.random() * 100) + 1);

};
//adapted from shttps://discussions.udacity.com/t/trying-to-identify-collisions-but-how-do-i-compare-enemy-x-with-player-x/29930/9
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        player.reset();
        this.x = -1;
        player.lives= -1;
        // player.updateScore(-50);
        document.getElementById("elScore").innerHTML = player.score;
        // player.lives--;
        document.getElementById("elLives").innerHTML = player.score;

    }
};
// Enemy.prototype.bugReset = function () {
//     for (var i = 0; i < allEnemies.length; i++)
//         allEnemies[i].x = -200;
// };

// Reset enemy location at endpoint
Enemy.prototype.bugReset = function() {
   if (this.x >= 505) {
        this.x = -101;

    }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.checkCollision(player);
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
    this.lives = 3;
    this.collide = false;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ctx.width) {
        this.reset();
    }
    if(this.collide === true) {
    for(var i=0;i<allEnemies.length;i++) {
        allEnemies[i].bugReset();   // calling the method on the object, not the class
    }
}
};

// Updates the score.
Player.prototype.updateScore = function() {
  this.score = -50;
  document.getElementById("elScore").innerHTML = player.score;

};

Player.prototype.reset = function() {
    this.x = xStart;
    this.y = yStart;
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
        document.getElementById("elScore").innerHTML = player.score;
        player.reset();
    }


    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 50;
    }
};


// Player.prototype.handleInput = function(keyPressed) {
//
//   switch (keyPressed) {
//     case "left":
//       if (this.x !== 0) {
//         this.x = this.x - this.moveX;
//       }
//       break;
//     case "right":
//       if (this.x < 400) {
//         this.x = this.x + this.moveX;
//       }
//       break;
//     case "up":
//       if (this.y === 45) {
//         Game.updateScore(1);
//       } else {
//         this.y = this.y - this.moveY;
//       }
//       break;
//     case "down":
//       if (this.y < 385) {
//         this.y = this.y + this.moveY;
//       }
//       break;
//   }
// };


// Player.prototype.handleInput = function(keyPressed) {
//
//   switch (keyPressed) {
//     case "left":
//       if (this.x !== 0) {
//         this.x = this.x - this.moveX;
//       }
//       break;
//     case "right":
//       if (this.x < 400) {
//         this.x = this.x + this.moveX;
//       }
//       break;
//     case "up":
//       if (this.y === 45) {
//         Game.updateScore(1);
//       } else {
//         this.y = this.y - this.moveY;
//       }
//       break;
//     case "down":
//       if (this.y < 385) {
//         this.y = this.y + this.moveY;
//       }
//       break;
//   }
// };



// Player.prototype.handleInput = function(keyPressed) {
//     switch (keyPressed) {
//         case 'left':
//             if (this.x > this.width) {
//                 this.x -= 101;
//             }
//             if (this.y === 0) {
//                 player.reset();
//             }
//             break;
//         case 'right':
//             if (this.x + 101 < 505 - this.width) {
//                 this.x += 101;
//             }
//             if (this.y === 0){
//                 player.reset();
//             }
//             break;
//         case 'up':
//             if (this.y > this.height) {
//                 this.y -= 83;
//             } else if (this.y === this.height) {
//                 this.y = 0;
//                 this.score += 100;
//                 document.getElementById("elScore").innerHTML=player.score;
//             } else {
//                 player.reset();
//                 }
//             break;
//         case 'down':
//             if (this.y < (498 - this.height) && this.y !== 0) {
//                 this.y += 83;
//             }
//             if (this.y === 0){
//                 player.reset();
//             }
//             break;
//     }
// };
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 1; i < 5; i++) {
    allEnemies.push(new Enemy(this.x, (i * 83) - 30, this.speed * 100 * i));
}
// Place the player object in a variable called player
var player = new Player();
// var enemy = new Enemy();



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
