document.addEventListener('DOMContentLoaded', () => {
    const gridSize = 20;
    const board = document.getElementById('game-board');
    const cells = [];
    let snake = [{ row: 10, col: 10 }];
    let direction = 'right';
    let food = {};

    function createGameBoard() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cells.push(cell);
                board.appendChild(cell);
            }
        }
    }

    function drawSnake() {
        cells.forEach(cell => cell.classList.remove('snake'));

        snake.forEach(segment => {
            const index = segment.row * gridSize + segment.col;
            cells[index].classList.add('snake');
        });
    }

    function drawFood() {
        const index = food.row * gridSize + food.col;
        cells[index].classList.add('food');
    }

    function generateFood() {
        const index = food.row * gridSize + food.col;
        cells[index].classList.remove('food'); // Remove food class from previous cell

        food = {
            row: Math.floor(Math.random() * gridSize),
            col: Math.floor(Math.random() * gridSize)
        };

        // Make sure food doesn't appear on the snake
        while (snake.some(segment => segment.row === food.row && segment.col === food.col)) {
            food = {
                row: Math.floor(Math.random() * gridSize),
                col: Math.floor(Math.random() * gridSize)
            };
        }
    }

    function moveSnake() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case 'up':
                head.row = (head.row - 1 + gridSize) % gridSize;
                break;
            case 'down':
                head.row = (head.row + 1) % gridSize;
                break;
            case 'left':
                head.col = (head.col - 1 + gridSize) % gridSize;
                break;
            case 'right':
                head.col = (head.col + 1) % gridSize;
                break;
        }

        snake.unshift(head);

        // Check for collision with food
        if (head.row === food.row && head.col === food.col) {
            generateFood();
            drawFood(); // Call drawFood after generating new food
        } else {
            // Remove the last segment if no food is eaten
            const tail = snake.pop();
            const tailIndex = tail.row * gridSize + tail.col;
            cells[tailIndex].classList.remove('snake');
        }

        // Remove food class from the cell
        const foodIndex = food.row * gridSize + food.col;
        cells[foodIndex].classList.remove('food');

        // Check for collision with self
        if (snake.slice(1).some(segment => segment.row === head.row && segment.col === head.col)) {
            alert('Game Over! You collided with yourself.');
            resetGame();
        }

        drawSnake();
    }

    function resetGame() {
        snake = [{ row: 10, col: 10 }];
        direction = 'right';
        const foodIndex = food.row * gridSize + food.col;
        cells[foodIndex].classList.remove('food'); // Remove food class from current food cell
        generateFood();
        drawSnake();
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    createGameBoard();
