// Word lists for different languages and difficulties
const wordLists = {
    ENG: {
        easy: ['cat', 'dog', 'bird', 'fish', 'tree', 'book', 'pen', 'house', 'car', 'sun', 'moon', 'star', 'apple', 'ball', 'game'],
        medium: ['python', 'javascript', 'computer', 'development', 'window', 'keyboard', 'monitor', 'internet', 'server', 'network', 'database', 'function', 'variable', 'algorithm', 'program'],
        hard: ['intelligence', 'programming', 'architecture', 'representation', 'application', 'infrastructure', 'documentation', 'implementation', 'organization', 'communication', 'responsibility', 'development', 'environment', 'calculation', 'dictionary']
    },
    BG: {
        easy: ['кот', 'куче', 'птица', 'риба', 'дърво', 'книга', 'химикал', 'къща', 'кола', 'слънце', 'луна', 'звезда', 'ябълка', 'топка', 'игра'],
        medium: ['пътон', 'компютър', 'разработка', 'прозорец', 'клавиатура', 'монитор', 'интернет', 'сървър', 'мрежа', 'база', 'функция', 'променлива', 'алгоритъм', 'програма', 'система'],
        hard: ['интелигентност', 'програмиране', 'архитектура', 'представяне', 'приложение', 'инфраструктура', 'документация', 'реализация', 'организация', 'комуникация', 'отговорност', 'разработка', 'среда', 'изчисление', 'речник']
    }
};

// Image progression based on wrong guesses
const imageProgression = {
    0: 'Pictures/Begin_Picture.png',
    1: 'Pictures/Begin_Picture.png',
    2: 'Pictures/Begin_Picture.png',
    3: 'Pictures/Are_You_Serious_Picture.png',
    4: 'Pictures/Are_You_Serious_Picture.png',
    5: 'Pictures/Are_You_Serious_Picture.png',
    6: 'Pictures/Are_You_Serious_Picture.png'
};

// Game state
const gameState = {
    word: '',
    guessedLetters: new Set(),
    wrongLetters: new Set(),
    currentLives: 6,
    maxLives: 6,
    gameStarted: false,
    gameOver: false,
    won: false,
    language: 'ENG',
    difficulty: 'medium',
    wrongGuesses: 0,
    lastGuessWasCorrect: false,
    consecutiveCorrect: 0,
    showLetHimCook: false
};

// DOM elements
const setupPanel = document.getElementById('setupPanel');
const gamePanel = document.getElementById('gamePanel');
const startBtn = document.getElementById('startBtn');
const languageSelect = document.getElementById('languageSelect');
const difficultySelect = document.getElementById('difficultySelect');
const letterInput = document.getElementById('letterInput');
const guessBtn = document.getElementById('guessBtn');
const wordDisplay = document.getElementById('wordDisplay');
const guessedLettersDisplay = document.getElementById('guessedLetters');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const livesCount = document.getElementById('livesCount');
const hangmanImage = document.getElementById('hangmanImage');
const gameOverModal = document.getElementById('gameOverModal');
const gameOverTitle = document.getElementById('gameOverTitle');
const gameOverMessage = document.getElementById('gameOverMessage');
const restartBtn = document.getElementById('restartBtn');

// Event listeners
startBtn.addEventListener('click', startGame);
guessBtn.addEventListener('click', makeGuess);
letterInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') makeGuess();
});
restartBtn.addEventListener('click', resetGame);

// Start game
function startGame() {
    gameState.language = languageSelect.value;
    gameState.difficulty = difficultySelect.value;

    // Select random word from the chosen language and difficulty
    const words = wordLists[gameState.language][gameState.difficulty];
    gameState.word = words[Math.floor(Math.random() * words.length)].toUpperCase();

    // Reset game state
    gameState.guessedLetters = new Set();
    gameState.wrongLetters = new Set();
    gameState.currentLives = gameState.maxLives;
    gameState.gameStarted = true;
    gameState.gameOver = false;
    gameState.won = false;
    gameState.wrongGuesses = 0;
    gameState.lastGuessWasCorrect = false;
    gameState.consecutiveCorrect = 0;
    gameState.showLetHimCook = false;

    // Update UI
    setupPanel.classList.add('d-none');
    gamePanel.classList.remove('d-none');
    gameOverModal.classList.add('d-none');

    // Clear input
    letterInput.value = '';
    letterInput.focus();

    // Update displays
    updateDisplay();
    updateHangmanImage();
}

// Make a guess
function makeGuess() {
    if (gameState.gameOver || !gameState.gameStarted) return;

    const input = letterInput.value.toUpperCase().trim();
    letterInput.value = '';

    // Validate input
    if (!input) return;

    let isCorrectGuess = false;
    let gameEnded = false;

    // Check if it's a single letter or full word
    if (input.length === 1) {
        // Single letter guess
        if (gameState.guessedLetters.has(input) || gameState.wrongLetters.has(input)) {
            alert('Вече сте опитали тази буква!');
            return;
        }

        if (gameState.word.includes(input)) {
            gameState.guessedLetters.add(input);
            isCorrectGuess = true;
        } else {
            gameState.wrongLetters.add(input);
            gameState.wrongGuesses++;
            gameState.currentLives--;
            isCorrectGuess = false;
        }
    } else {
        // Full word guess
        if (input === gameState.word) {
            // Won!
            gameState.guessedLetters = new Set(gameState.word);
            gameEnded = true;
            endGame(true);
        } else {
            // Wrong word guess - costs a life
            gameState.wrongLetters.add(input);
            gameState.wrongGuesses++;
            gameState.currentLives--;
            isCorrectGuess = false;
        }
    }

    // If word was guessed, don't continue
    if (gameEnded) return;

    // Track consecutive correct guesses
    if (isCorrectGuess) {
        if (gameState.lastGuessWasCorrect) {
            gameState.consecutiveCorrect++;
            // After 2 consecutive correct guesses, show Let_Him_Cook_Picture
            if (gameState.consecutiveCorrect >= 1) { // >= 1 means 2 consecutive
                gameState.showLetHimCook = true;
            }
        } else {
            gameState.consecutiveCorrect = 0;
        }
        gameState.lastGuessWasCorrect = true;
    } else {
        gameState.lastGuessWasCorrect = false;
        gameState.consecutiveCorrect = 0;
        gameState.showLetHimCook = false; // Reset if wrong guess
    }

    updateDisplay();
    updateHangmanImage();

    // Check win condition BEFORE playing sounds
    if (isGameWon()) {
        endGame(true);
        return;
    }
    // Check lose condition BEFORE playing sounds
    if (gameState.currentLives <= 0) {
        endGame(false);
        return;
    }

    // Only play letter sounds if game didn't end
    if (isCorrectGuess) {
        playCorrectGuessSound();
    } else {
        playWrongGuessSound();
    }

    letterInput.focus();
}

// Check if game is won
function isGameWon() {
    return gameState.word.split('').every(letter => gameState.guessedLetters.has(letter));
}

// Update display
function updateDisplay() {
    // Update word display with guessed letters
    const displayWord = gameState.word
        .split('')
        .map(letter => gameState.guessedLetters.has(letter) ? letter : '_')
        .join(' ');
    wordDisplay.textContent = displayWord;

    // Update guessed letters
    if (gameState.guessedLetters.size === 0) {
        guessedLettersDisplay.innerHTML = '-';
    } else {
        guessedLettersDisplay.innerHTML = Array.from(gameState.guessedLetters)
            .sort()
            .map(letter => `<span class="letter-badge">${letter}</span>`)
            .join('');
    }

    // Update wrong letters
    if (gameState.wrongLetters.size === 0) {
        wrongLettersDisplay.innerHTML = '-';
    } else {
        wrongLettersDisplay.innerHTML = Array.from(gameState.wrongLetters)
            .sort()
            .map(letter => `<span class="letter-badge">${letter}</span>`)
            .join('');
    }

    // Update lives
    livesCount.textContent = gameState.currentLives;
}

// Update hangman image based on wrong guesses and game events
function updateHangmanImage() {
    // Determine which image to show
    const index = Math.min(gameState.wrongGuesses, 6);
    
    if (gameState.showLetHimCook && !gameState.gameOver) {
        hangmanImage.src = 'Pictures/Let_Him_Cook_Picture.png';
    } else {
        hangmanImage.src = imageProgression[index];
    }
}

// Play correct guess sound
function playCorrectGuessSound() {
    const audio = document.getElementById('correctGuessAudio');
    audio.currentTime = 0;
    audio.play().catch(() => {
        console.log('Could not play correct guess sound. Please ensure music/Check mark sound effect.mp3 exists.');
    });
}

// Play wrong guess sound
function playWrongGuessSound() {
    const audio = document.getElementById('wrongGuessAudio');
    audio.currentTime = 0;
    audio.play().catch(() => {
        console.log('Could not play wrong guess sound. Please ensure music/Fart with reverb sound effect.mp3 exists.');
    });
}

// Play win sound
function playWinSound() {
    const audio = document.getElementById('winAudio');
    audio.currentTime = 0;
    audio.play().catch(() => {
        console.log('Could not play win sound. Please ensure music/Giga Chad - Can You Feel My Heart.mp3 exists.');
    });
}

// Play lose sound
function playLoseSound() {
    const audio = document.getElementById('loseAudio');
    audio.currentTime = 0;
    audio.play().catch(() => {
        console.log('Could not play lose sound. Please ensure music/Old Church Bell Sound Effect (HD) _ How to.mp3 exists.');
    });
}

// End game
function endGame(won) {
    gameState.gameOver = true;
    gameState.won = won;
    
    const gameOverImage = document.getElementById('gameOverImage');

    if (won) {
        gameOverTitle.textContent = '🎉 ПОБЕДА!';
        gameOverMessage.textContent = `Поздравления! Открихте думата: ${gameState.word}`;
        playWinSound();
        gameOverImage.src = 'Pictures/GigaChad_Picture.png';
    } else {
        gameOverTitle.textContent = '😔 ЗАГУБА!';
        gameOverMessage.textContent = `Жалко! Думата беше: ${gameState.word}`;
        playLoseSound();
        gameOverImage.src = 'Pictures/Dead_Picture.png';
    }

    gameOverModal.classList.remove('d-none');
}

// Reset game
function resetGame() {
    // Stop all audio
    const wrongGuessAudio = document.getElementById('wrongGuessAudio');
    const correctGuessAudio = document.getElementById('correctGuessAudio');
    const winAudio = document.getElementById('winAudio');
    const loseAudio = document.getElementById('loseAudio');
    
    wrongGuessAudio.pause();
    wrongGuessAudio.currentTime = 0;
    correctGuessAudio.pause();
    correctGuessAudio.currentTime = 0;
    winAudio.pause();
    winAudio.currentTime = 0;
    loseAudio.pause();
    loseAudio.currentTime = 0;
    
    setupPanel.classList.remove('d-none');
    gamePanel.classList.add('d-none');
    gameOverModal.classList.add('d-none');
    letterInput.value = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hangman Game Loaded Successfully');
    console.log('Monaca Project Structure is ready');
});
