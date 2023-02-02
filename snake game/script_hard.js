// GAME JAVASCRIPT
//script.js

$(function () {

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');

    var cHeight = canvas.height;
    var cWidth = canvas.width;
    var snakeHeight = 10;
    var snakeWidth = 10;
    var blockSize = 10;
    var score = 0;
    var keyPressed = 40;
    var keyPressPending = false;
    var count = 1;
    var snake = [{
        x: 200,
        y: 40,
        oldX: 0,
        oldY: 0,
        drawn: false
    },
    {
        x: 200,
        y: 30,
        oldX: 0,
        oldY: 0,
        drawn: false
    },
    {
        x: 200,
        y: 20,
        oldX: 0,
        oldY: 0,
        drawn: false
    },
    {
        x: 200,
        y: 10,
        oldX: 0,
        oldY: 0,
        drawn: false
    },
    ];
    var food = {
        x: 50,
        y: 50,
        eaten: false
    };

    var game;

    startGame();

    function startGame() {
        game = setInterval(gameLoop, 100);
    }

    function stopGame() {
        clearInterval(game);
        window.location.replace("Snake Game.html");
        console.log('Game over');
    }

    function gameLoop() {
        clearCanvas();
        drawFood();
        moveSnake(keyPressed);
        drawSnake();
    }

    function drawSnake() {
        $.each(snake, function (index, value) {
            ctx.fillStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'white';
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            ctx.strokeRect(value.x, value.y, snakeWidth, snakeHeight);
            snake[index].drawn = true;
            if (index == 0) {
                ctx.fillStyle = 'yellow';
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'white';
                ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
                ctx.strokeRect(value.x, value.y, snakeWidth, snakeHeight);
                snake[index].drawn = true;
                if (collided(value.x, value.y)) {
                    stopGame();
                    alert("GAME OVER");
                } else {
                    if (caughtFood(value.x, value.y)) {
                        updateScore();
                        updateFoodEatenFlag();
                        makeSnakeBigger();
                    }
                }
            }
            if (index == snake.length - 1) {
                keyPressPending = false;
            }
        });
    }

    function updateScore() {
        score++;
        count++;
        console.log("count: ", count);
        console.log("score: ", score);
        if(score%5==0){
            score=score+1
            count=count+1
        }
        $('#score').text(score);
    }

    function updateFoodEatenFlag() {
        food.eaten = true;
    }

    function makeSnakeBigger() {
        snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y
        });
    }

    function collided(x, y) {
        return snake.filter((item, index) => {
            return index != 0 && item.x == x && item.y == y
        }).length > 0 || x < 0 || x > cWidth-1 || y < 0 || y > cHeight-1;
    }

    function caughtFood(x, y) {
        return (x == food.x && y == food.y);
    }

    function drawFood() {
        if(count%5==0 && score!=0){
            ctx.fillStyle = 'blue';
        }
        else{
        ctx.fillStyle = 'red';
        }
        let xy = getPositionForFood();
        food = {
            x: xy.x,
            y: xy.y,
            eaten: false
        };

        ctx.fillRect(food.x, food.y, snakeWidth, snakeHeight);
    }

    function getPositionForFood() {
        let xy;
        if (food.eaten == true) {
            let xArray = yArray = [];
            $.each(snake, function (index, value) {
                if ($.inArray(value.x, xArray) == -1) {
                    xArray.push(value.x);
                }
                if ($.inArray(value.y, yArray) == -1) {
                    yArray.push(value.y);
                }
            });
            xy = getEmptyBlock(xArray, yArray);
        } else {
            xy = food;
        }
        return xy;
    }

    function getEmptyBlock(xArray, yArray) {
        let newXY = {};
        newX = getRandomNumber(cWidth - 10, 10);
        newY = getRandomNumber(cHeight - 10, 10);
        if ($.inArray(newX, xArray) == -1 && $.inArray(newY, yArray) == -1) {
            newXY.x = newX;
            newXY.y = newY;
            return newXY;
        } else {
            return getEmptyBlock(xArray, yArray);
        }
    }

    function getRandomNumber(max, multipleOf) {
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result % 10);
        return result;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, cWidth, cHeight);
    }

    $(document).keydown(function (e) {
        if ($.inArray(e.which, [37, 38, 39, 40]) != -1) {
            keyPressed = checkKeyAllowed(e.which);
            if (keyPressPending == false) {
                moveSnake(keyPressed);
            }
        }
    });

    function checkKeyAllowed(tempKey) {
        let key;
        if (tempKey == 40) {
            key = (keyPressed != 38) ? tempKey : keyPressed;
        } else if (tempKey == 38) {
            key = (keyPressed != 40) ? tempKey : keyPressed;
        } else if (tempKey == 37) {
            key = (keyPressed != 39) ? tempKey : keyPressed;
        } else if (tempKey == 39) {
            key = (keyPressed != 37) ? tempKey : keyPressed;
        }
        return key;
    }

    function moveSnake(keyPressed) {
        keyPressPending = true;
        $.each(snake, function (index, value) {
            if (snake[index].drawn == true) {
                snake[index].oldX = value.x;
                snake[index].oldY = value.y;
                if (index == 0) {
                    if (keyPressed == 40) {
                        snake[0].y = snake[0].y + blockSize;
                    } else if (keyPressed == 38) {
                        snake[0].y = snake[0].y - blockSize;
                    } else if (keyPressed == 37) {
                        snake[0].x = snake[0].x - blockSize;
                    } else if (keyPressed == 39) {
                        snake[0].x = snake[0].x + blockSize;
                    }
                } else {
                    snake[index].x = snake[index - 1].oldX;
                    snake[index].y = snake[index - 1].oldY;
                }
                snake[index].drawn = false;
            }

        });
    }

});