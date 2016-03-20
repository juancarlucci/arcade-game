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
// http://www.w3schools.com/jsref/prop_style_visibility.asp
document.getElementById('talk1').hidden = true;
document.getElementById('talk2').hidden = true;
document.getElementById('talk3').hidden = true;
document.getElementById('talk4').hidden = true;
// Enemies our player must avoid
//The constructor function takes in arguments for the aspects that
//will be different about each enemy. Here blank, ()
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 10;
    this.y = 20 + (Math.floor((Math.random() * 3)) * this.yInterval);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.yBase = 60;
    this.yInterval = 87;
    this.speed = enemySpeed + Math.floor((Math.random() * 100) + 1);
};
// checks if enemy collided with player
//adapted from shttps://discussions.udacity.com/t/trying-to-identify-collisions-but-how-do-i-compare-enemy-x-with-player-x/29930/9
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y + 40 &&
        60 + player.y > this.y) {
        this.x = -10;
        this.speed = +enemySpeed + Math.floor((Math.random() * 100) + 1) + 100;
        this.sprite = 'images/enemy-bug-hit.png';
        player.lives--;
        player.sprite = 'images/player-bang.png';
        setTimeout(function() {
            player.sprite = 'images/player-hit.png';
        }, 100);
        player.resetPlayer();
        document.getElementById("elLives").innerHTML = 'Lives: ' + player.lives;
        player.score -= 50;
        document.getElementById("elScore").innerHTML = 'Score: ' + player.score;
        player.collisionCount += 1;
        document.getElementById('talk' + player.collisionCount).hidden = false;
        if (player.lives === 0) {
            // Player is out of lives, show the game over
            game.gameOver = true;
        }
    }
    var win = true;
    if (player.score >= 1000) {
    } else {
        // Set the win flag to false
        win = false;
    }
    // If the player has won, display the gameWin
    if (win) {
        game.gameWin = true;
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
    this.checkCollision = false;
    this.gameOver = false;
    this.hasGem = false;
    this.collisionCount = 1;
    // this.speech = '';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // I think this function is taken care of by handleInput
    // Check to see if the player has won the game
};

Player.prototype.resetPlayer = function() {
    if (this.lives === 0) {
        player.gameOver = true;
    } else {
        this.x = xStart;
        this.y = yStart;
        document.getElementById('talk' + player.collisionCount).hidden = true;
    }
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
var Gem = function(x, y) {
    //the gems appears in random location
    // this.height = 20;
    // this.width = 20;
    this.x = Math.floor(Math.random() * (505 - this.width));
    // //limits gem, not over water or grass
    this.y = Math.floor(Math.random() * (303 - this.height));
    if (this.y < 200) {
        this.y += 100;
    }
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
Gem.prototype.setGemLocation = function() {
    var random = Math.floor(Math.random() * 90) + 3;
    if (random >= 75) {
        this.sprite = 'images/Gem-Blue.png';
        gemLocation.call(this);
        this.value = 25;
    } else if (random < 75 && random > 20) {
        this.sprite = 'images/Gem-Green.png';
        gemLocation.call(this);
        this.value = 50;
    } else {
        this.sprite = 'images/Gem-Orange.png';
        gemLocation.call(this);
        this.value = 100;
    }
};

Gem.prototype.collision = function() {
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
};

// Draw the gem on the screen.
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 1; i < 7; i++) {
    allEnemies.push(new Enemy(this.x, (i * 83) - 30, this.speed * 100 * i));
}
// Place the player object in a variable called player
var player = new Player();
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
