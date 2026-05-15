let playerScore = 0;
let computerScore = 0;

// NEW: Load saved high score from browser memory right when game starts
let highScore = localStorage.getItem('rpsHighScore') || 0;
document.getElementById('high-score').innerText = highScore;

function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    const McChatComputerChoice = choices[randomNumber];

    document.getElementById('player-choice').innerText = `Your Choice: ${playerChoice.toUpperCase()}`;
    document.getElementById('computer-choice').innerText = `Computer Choice: ${McChatComputerChoice.toUpperCase()}`;

    let result = "";
    let resultClass = "";

    if (playerChoice === McChatComputerChoice) {
        result = "It's a tie! 👔";
        resultClass = "tie";
    } else if (
        (playerChoice === 'rock' && McChatComputerChoice === 'scissors') ||
        (playerChoice === 'paper' && McChatComputerChoice === 'rock') ||
        (playerChoice === 'scissors' && McChatComputerChoice === 'paper')
    ) {
        result = "You win this round! 🎉";
        resultClass = "win";
        playerScore++;
    } else {
        result = "Computer wins this round! 🤖";
        resultClass = "lose";
        computerScore++;
    }

    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;

    const resultElement = document.getElementById('game-result');
    resultElement.innerText = result;
    resultElement.className = resultClass;

    // NEW: Check if anyone won the best of 5 match (reached 3 points)
    if (playerScore === 3 || computerScore === 3) {
        endMatch();
    }
}

// NEW: Handles the end of a match
function endMatch() {
    const resultElement = document.getElementById('game-result');
    
    if (playerScore === 3) {
        resultElement.innerText = "MATCH OVER: YOU ARE THE CHAMPION! 🏆";
        resultElement.className = "win";
        
        // NEW: Check and update the high score memory
        if (playerScore > highScore) {
            highScore = playerScore; // In a basic game, saving current session win works
            // If tracking consecutive wins, you would increase highScore here instead
            localStorage.setItem('rpsHighScore', highScore);
            document.getElementById('high-score').innerText = highScore;
        }
    } else {
        resultElement.innerText = "MATCH OVER: COMPUTER WINS THE MATCH! ❌";
        resultElement.className = "lose";
    }

    // NEW: Disable choice buttons so player cannot keep playing after match ends
    const buttons = document.getElementById('choices-container').getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('player-choice').innerText = "Your Choice: -";
    document.getElementById('computer-choice').innerText = "Computer Choice: -";
    
    const resultElement = document.getElementById('game-result');
    resultElement.innerText = "First to 3 points wins!";
    resultElement.className = "";

    // NEW: Enable choice buttons back for a fresh game
    const buttons = document.getElementById('choices-container').getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = false;
    }
}
