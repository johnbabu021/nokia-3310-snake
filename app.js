document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0]
    let direction = 10
    let score = 0

    let speed = 0.8;
    let intervalTime = 0
    let interval = 0


    function startSnake() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0;
        randomApple()
        direction = 10
        scoreDisplay.innerHTML = score
        intervalTime = 500
        currentSnake = [2, 1, 0]
        currentIndex = 0

        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutComes, intervalTime)
    }


    function moveOutComes() {
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) ||//  bottom
            (currentSnake[0] % width === width - 1 && direction == 1) ||//  right 10/9 reminder is 9
            (currentSnake[0] % width === 0 && direction === -1) ||//left
            (currentSnake[0] - width < 0 && direction === -width) ||//top
            squares[currentSnake[0] + direction].classList.contains('snake')//hits itself
        ) {
            alert('oops gone wrong')
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)        //adding the color to new position
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutComes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        }
        while (squares[appleIndex].classList.contains('snake'))
        //this is false first do came then while false makes this loop to break and execute adding class
        //if true the do block executes until the test condition is false and it will make a match inside the snake
        squares[appleIndex].classList.add('apple')
    }



    function control(e) {
        squares[currentIndex].classList.remove('snake')


        if (e.keyCode == 39) {
            direction = 1;//right
        }
        else if (e.keyCode == 38) {
            direction = -width//up
        }
        else if (e.keyCode == 37) {
            direction = -1;//left
        }
        else if (e.keyCode == 40) {
            direction = +width//down
        }

    }
    function start(e) {
        if (e.keyCode == 13) {
            startSnake()

        }
    }
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startSnake)
    document.addEventListener('keyup', start)
})