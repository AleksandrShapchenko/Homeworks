let boxSize = 32;
let borderSize = 2;
let gridCount = 13;
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

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', snakeHandler);

function snakeHandler(event) {
    updateDirection(event);
}

function updateDirection(event) {
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
    snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), snakeLength);
    let speed = document.querySelector('#stacked-state').value;
    let randomBox = generateBoxForEat();

    updateSnake();
    processGame = setInterval(() => {
        let {
            cell,
            row
        } = noWallMode(snake[0]);

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

        updateSnake();
    }, speed);

    function noWallMode({ cell, row }) {
        cell = (cell == 0 && direction == 'left') ? gridCount :
            (cell == gridCount && direction == 'right') ? -1 : cell;

        row = (row == 0 && direction == 'up') ? gridCount :
            (row == gridCount && direction == 'down') ? -1 : row;

        return { cell, row };
    }

    function updateSnake() {
        clearSnake();

        checkOnEated(randomBox.dataset);
        checkOnTailCrush();

        function checkOnEated(dataset) {
            let {
                cell,
                row
            } = snake[0];

            if (cell == dataset.cell && row == dataset.row) {
                score.textContent = `${++currentScore}`;

                removeFood();
                randomBox = generateBoxForEat();
                console.log('яблоко сьедено, длина: +1, очки: +1');
            } else {
                snake.pop();
            }
        }

        function checkOnTailCrush() {
            let snakeHead = snake[0];

            snake.slice(1).forEach(elem => {
                if (snakeHead.cell == elem.cell && snakeHead.row == elem.row) {
                    endGame();
                }
            });
        }

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

        while (checkCoordsOnSnake(cell, row)) {
            console.log('Поиск новых координат для яблока');
            cell = getRandomInt(0, gridCount);
            row = getRandomInt(0, gridCount);
        };

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

function checkCoordsOnSnake(cell, row) {
    let result = false;
    for (const part of snake) {
        if (part.cell == cell && part.row == row) {
            result = true
        }
    }

    return result;
}

function find(selector) {
    return document.querySelector(selector);
}

function findByCoords(cell, row) {
    return document.querySelector(`[data-cell = "${cell}"][data-row = "${row}"]`);
}