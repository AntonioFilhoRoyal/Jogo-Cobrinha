
let canvas = document.getElementById('areaSnake'); // Captura area do canvas
let context = canvas.getContext('2d'); // criar area em 2D
let box = 32;  // box do tamanho da cobra e da area
let snake = []; // snake
// obj snake X= largura Y= altura
snake[0] = {
    x: 8 * box, // largura
    y: 8 * box, // altura
}
let direction = "right";

    // criação da comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
    // função criar area canvas
function criarArea(){
    context.fillStyle = "yellowgreen"; // cor
    context.fillRect(0, 0, 16 * box, 16 * box); // tamanho do canvas
}

    // função criar snake
function criarSnake(){
    // for tamanho da cobra
    for(let i = 0;i<snake.length;i++){
        context.fillStyle = "rgb(4, 121, 29)"; // cor em rgb da cobra
        context.fillRect(snake[i].x, snake[i].y, box, box) // tamanho da cobra
    }
}

    // função criar comida
function criarFood(){
    context.fillStyle = "chocolate";
    context.fillRect(food.x, food.y, box, box);
}

    // captura o click do teclado
document.addEventListener('keydown', mover);

function mover(e){

     // reverso
    if(e.keyCode == 37 && direction != 'right') direction = 'left';
    if(e.keyCode == 38 && direction != 'down') direction = 'up';
    if(e.keyCode == 39 && direction != 'left') direction = 'right';
    if(e.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){

    // Crescer
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 15 * box;

    // Death
    for(let i = 1;i<snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(iniciarJogo);
            alert("GAME OVER");
        }
    }

    criarArea();
    criarSnake();
    criarFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // direção
    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

     // come o alimento
    if(food.y != snakeY || food.x != snakeX){
        snake.pop();
    } else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newH = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newH);
}

    // Iniciar jogo
let jogo = setInterval(iniciarJogo, 100);
