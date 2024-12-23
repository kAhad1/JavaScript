let lives = 3;
let randomNumber = Math.floor(Math.random() * 10) + 1;
const guessBtn = document.getElementById('guessBtn');
const guessInput = document.getElementById('guessInput');
const livesElement = document.getElementById('lives');
const messageElement = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

function updateLives() {
    livesElement.textContent = '❤️'.repeat(lives);
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        messageElement.textContent = 'Please enter a number between 1 and 10.';
        return;
    }

    if (userGuess === randomNumber) {
        messageElement.textContent = '🎉 You guessed correctly! You win!';
        guessInput.disabled = true;
        guessBtn.disabled = true;
        restartBtn.style.display = 'inline-block';
    } else {
        lives--;
        updateLives();

        if (lives > 0) {
            messageElement.textContent = userGuess > randomNumber ? 'Too high! Try again.' : 'Too low! Try again.';
        } else {
            messageElement.textContent = '😞 Game Over! You ran out of lives.';
            guessInput.disabled = true;
            guessBtn.disabled = true;
            restartBtn.style.display = 'inline-block';
        }
    }
}

function restartGame() {
    lives = 3;
    randomNumber = Math.floor(Math.random() * 10) + 1;
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessInput.value = '';
    updateLives();
    messageElement.textContent = 'Guess a number between 1 and 10!';
    restartBtn.style.display = 'none';
}

guessBtn.addEventListener('click', checkGuess);