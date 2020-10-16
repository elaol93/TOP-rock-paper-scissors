//Write 'Make your choice!'

//listen to a clicking event, delay of 2 seconds

//computer plays its round and highlights the choice

//waits for Next to be clicked

//adds score

//if score == 5 hides next button and broadcasts 'You won/lost!'

let playerChoice, computerChoice, result;
let playerScore = 0;
let computerScore = 0;

const buttonbox = document.querySelectorAll('#player .button')

//listens to player's input (the three buttons)
for (let i = 0; i < 3; i++) {
    buttonbox[i].addEventListener('click', function (e) {
        computerChoice = computerTurn();
        
        playerChoice = e.target.name;
        turnOnOff('player', playerChoice);

        document.getElementById('instructions').textContent = "Please click 'Next'!";
        document.getElementById('next').disabled = false;
        turnOnOff('next', 'next');

        disableButtons('disable');
    })
}

document.querySelector('#next').addEventListener('click', function () {
    //returns the result of a game
    result = singleGame(playerChoice, computerChoice);

    //turns elements off (disables shine)
    turnOnOff('player', playerChoice);
    turnOnOff('computer', computerChoice);
    turnOnOff('next', 'next');

    //changes score
    if (result == 'won') {
        playerScore += 1; 
        document.getElementById('player-score').textContent = `Player: ${playerScore}`;
    }
    else if (result == 'lost') {
        computerScore += 1;
        document.getElementById('computer-score').textContent = `Computer: ${computerScore}`;
    }

    //tests if score =< 5 and prints the winner
    if (playerScore >= 5) {
        document.getElementById('instructions').textContent = 'YOU WON!';
        disableButtons('all');
    }
    else if (computerScore >= 5) {
        document.getElementById('instructions').textContent = 'YOU LOST!';
        disableButtons('all');
    }
    else {
        document.getElementById('instructions').textContent = 'Please choose rock, paper, or scissors!'; 
        disableButtons('reset');
    }

    //disables next button 
    document.getElementById('next').disabled = true;
})

function computerTurn() {
    //randomly chooses rock, paper or scissors 
    //lights up the choice

    let validWords = ["rock", "paper", "scissors"];
    let choice = validWords[Math.floor(Math.random()*validWords.length)];
    turnOnOff('computer', choice);

    return choice;
}

function turnOnOff(buttonID, buttonClass) {
    //toggles box shadows (turns shine on or off). Marks player's and computer's choices
    if (buttonClass == 'rock') {
        document.querySelector(`#${buttonID} .rock`).classList.toggle("neon-rock"); 
    }
    else if (buttonClass == 'scissors') {
        document.querySelector(`#${buttonID} .scissors`).classList.toggle("neon-scissors");  
    }
    else if (buttonClass == 'paper') {
        document.querySelector(`#${buttonID} .paper`).classList.toggle("neon-paper"); 
    }
    else if (buttonClass == 'next') {
        document.getElementById('next').classList.toggle("neon-next"); 
    } 
}

function singleGame(player, computer) {
    let turn = player + ', ' + computer;
    let winIf = ['rock, scissors', 'scissors, paper', 'paper, rock'];
    let tieIf = ['paper, paper', 'scissors, scissors', 'rock, rock'];

    if (tieIf.includes(turn)) {
        return 'tie';
    }

    return (winIf.includes(turn)) ? 'won' : 'lost';
}

function disableButtons(command) {
    //prevents other buttons from being clicked
    let choices = ['rock', 'paper', 'scissors'];

    //disables all buttons and removes shine from the other two options
    if (command == 'disable') {    
        for (let i = 0; i < 3; i++) {
            document.querySelector(`#player .${choices[i]}`).disabled = true;
        }

        for (let i = 0; i < 3; i++) {
            if (playerChoice != choices[i]) {
                document.querySelector(`#player .${choices[i]}`).classList.toggle(`${choices[i]}-shine`)
            }
        }
    }

    //enables all buttons and returns shine to all of them
    else if (command == 'reset') {
        for (let i = 0; i < 3; i++) {
            document.querySelector(`#player .${choices[i]}`).disabled = false;
        }

        for (let i = 0; i < 3; i++) {
            if (playerChoice != choices[i]) {
                document.querySelector(`#player .${choices[i]}`).classList.toggle(`${choices[i]}-shine`)
            }
        }
    }

    //disables all buttons and removes shine from all of them
    else if (command == 'all') {
        for (let i = 0; i < 3; i++) {
            document.querySelector(`#player .${choices[i]}`).disabled = true;
            document.querySelector(`#player .${choices[i]}`).classList.remove(`${choices[i]}-shine`)
        }
    }
}