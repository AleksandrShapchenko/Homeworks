let boxSize = 32;
let borderSize = 2;
let gridCount = 13;
let speed = 1000;
let snakeLength = 5;
let currentScore = 0;
let food = createFood();
let direction = 'left';
let messageBox;
let gridContainer;
let startBtn;
let endBtn;
let score;
let processGame;
let snake;

console.log(snake);
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', snakeHandler);

function snakeHandler(event) {
    updateDirection(event);
}

function updateDirection(event) {
    console.log(event.keyCode);
    if (event.keyCode == 37 && direction != 'right')
        direction = 'left';
    if (event.keyCode == 38 && direction != 'down')
        direction = 'up';
    if (event.keyCode == 39 && direction != 'left')
        direction = 'right';
    if (event.keyCode == 40 && direction != 'up')
        direction = 'down';
}

function init() {
    messageBox = find('#message');
    gridContainer = find('#snake-container');
    score = find('.score > b');
    startBtn = find('#start-game');
    endBtn = find('#end-game');

    initGrid(gridCount, gridContainer);

    startBtn.addEventListener('click', startHandler);
    endBtn.addEventListener('click', endHandler);

}

function createSnakeData(cell, row, count) {
    let arr = [];

    for (let index = 0; index < count; index++) {

        arr.push({
            cell: cell + index,
            row
        })
    }

    return arr;
}

function createFood() {
    let food = new Image(boxSize - 7, boxSize - 7);
    food.setAttribute('src', './img/apple.png');
    food.classList.add('snake-food');

    return food;
}

function removeFood() {
    let food = gridContainer.querySelector('.snake-food');
    food.remove();
}

function startHandler() {
    startBtn.style.display = 'none';
    endBtn.style.display = 'inline-block';

    startGame();
}


function endHandler() {
    endBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';

    endGame();
}

function startGame(message = 'Have a nice game!') {
    currentScore = 0;
    score.textContent = currentScore;
    messageBox.textContent = message;
    let randomBox = generateBoxForEat();
    snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), snakeLength);

    updateSnake();
    processGame = setInterval(() => {
        let {
            cell,
            row
        } = snake[0];

        // ----------------------------------
        // Нужно чтобы ф-ция noWallMode (реализует возможность змейки проходить через стены) работала так
        // let {
        //     cell,
        //     row
        // } = noWallMode(snake[0])
        // ----------------------------------

        switch (direction) {
            case 'left': {
                snake.unshift({
                    cell: cell - 1,
                    row
                })
            };
                break;
            case 'up': {
                snake.unshift({
                    cell,
                    row: row - 1
                })
            };
                break;
            case 'right': {
                snake.unshift({
                    cell: cell + 1,
                    row
                })
            };
                break;
            case 'down': {
                snake.unshift({
                    cell,
                    row: row + 1
                })
            };
                break;
        }

        snake.pop()
        console.log(snake[0].cell, snake.length);
        updateSnake();
    }, speed);

    function updateSnake() {
        clearSnake();

        checkOnEated(randomBox.dataset);

        function checkOnEated(dataset) {
            let {
                cell,
                row
            } = snake[0];

            if (cell == dataset.cell && row == dataset.row) {
                score.textContent = `${++currentScore}`;
                snake.push({
                    cell: snake[snake.length - 1].cell,
                    row: snake[snake.length - 1].row,
                })

                removeFood();
                randomBox = generateBoxForEat();
            }
        }

        // ----------------------------------
        // написать ф-цию checkOnTailCrush, которая проверяет врезалась ли голова змейки в себя же, если да - завершить игру
        // checkOnTailCrush();
        // ---------------------------------------

        for (const [index, snakePart] of snake.entries()) {
            let cell = findByCoords(snakePart.cell, snakePart.row);
            if (index == 0) {
                cell.classList.add('snake-head', 'snake');
            } else {
                cell.classList.add('snake-body', 'snake');
            }

        }
    }

    function generateBoxForEat() {
        let cell = getRandomInt(0, gridCount);
        let row = getRandomInt(0, gridCount);
        let randomBox = findByCoords(cell, row);
        randomBox.append(food);
        return randomBox;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


}

function endGame(message = 'Game Over!') {
    messageBox.textContent = message;
    snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), snakeLength);
    direction = 'left';
    clearTimeout(processGame);
    clearSnake();
    removeFood();
}

function clearSnake() {
    let cells = gridContainer.querySelectorAll('.snake');
    for (const cell of cells) {
        cell.className = 'snake-cell';
    }
}

function initGrid(gridCount, target) {
    target.style.width = target.style.height = (boxSize * gridCount) + 'px';

    for (let index = 0; index < gridCount; index++) {
        target.append(createSnakeRow('snake-cell', gridCount, index));
    }
}


function createSnakeRow(snakeClass, gridCount, row) {
    let fragment = new DocumentFragment();

    for (let index = 0; index < gridCount; index++) {
        fragment.append(createSnakeCell(snakeClass, row, index))
    }

    return fragment;
}

function createSnakeCell(snakeClass, row, cell) {
    let div = document.createElement('div');
    div.classList.add(snakeClass);
    div.setAttribute('data-cell', cell);
    div.setAttribute('data-row', row);
    div.style.width = div.style.height = boxSize + 'px';
    return div;
}

function find(selector) {
    return document.querySelector(selector);
}

function findByCoords(cell, row) {
    return document.querySelector(`[data-cell = "${cell}"][data-row = "${row}"]`);
}