import Deck from "./deck.js"

const cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "Jack": 11,
    "Queen": 12,
    "King": 13,
    "Ace": 14
}

const CPU_Score = document.getElementById('CPU_Score');
const CPU_Card = document.getElementById('CPU_Card');

const Player_Score = document.getElementById('Player_Score');
const Player_Card = document.getElementById('Player_Card');

const Middle_Row = document.getElementById('draw');
const button = document.getElementById('clicker');
const lead = document.getElementById('lead');

let isPlaying = false;
let playerDeck, cpuDeck, warDeck;

window.advance = () => {
    if (!isPlaying) {
        start();
    } else {
        playRound();
    }
}

function start() {
    const deck = new Deck();
    deck.newDeck();
    deck.shuffle();
    console.log(deck.cards);

    const half = deck.numberOfCards / 2;
    playerDeck = new Deck(deck.cards.slice(0, half));
    cpuDeck = new Deck(deck.cards.slice(half, deck.numberOfCards));
    warDeck = new Deck(); //stores the disputed cards in event of war

    console.log(playerDeck.cards);
    console.log(cpuDeck.cards);

    button.innerHTML = "Next Move";

    isPlaying = true;
}

function playRound() {
    let playerCard = playerDeck.cards.shift();
    let cpuCard = cpuDeck.cards.shift();
    let warCard;

    //console.log(cpuCard);
    //console.log(playerCard);

    Player_Card.innerHTML = playerCard.unicode;
    CPU_Card.innerHTML = cpuCard.unicode;
    Middle_Row.innerHTML = "&nbsp;";

    if (playerCard.color === "RED") {
        Player_Card.style.color = 'red';
    } else {
        Player_Card.style.color = 'black';
    }

    if (cpuCard.color === "RED") {
        CPU_Card.style.color = 'red';
    } else {
        CPU_Card.style.color = 'black';
    }

    if (cardValues[playerCard.name] > cardValues[cpuCard.name]) {
        playerDeck.cards.push(playerCard);
        playerDeck.cards.push(cpuCard);
        playerDeck.cards = playerDeck.cards.concat(warDeck.cards);
        warDeck.cards = [];
    } else if (cardValues[playerCard.name] < cardValues[cpuCard.name]) {
        cpuDeck.cards.push(playerCard);
        cpuDeck.cards.push(cpuCard);
        cpuDeck.cards = cpuDeck.cards.concat(warDeck.cards);
        warDeck.cards = [];
    } else if ((cardValues[playerCard.name] === cardValues[cpuCard.name])) {
        Middle_Row.innerHTML = "🂠🂠🂠🂠🂠🂠";
        warDeck.cards.push(playerCard);
        warDeck.cards.push(cpuCard);
        for (let i = 0; i < 3; i++) {
            playerCard = playerDeck.cards.shift();
            cpuCard = cpuDeck.cards.shift();
            warDeck.cards.push(playerCard);
            warDeck.cards.push(cpuCard);
        }
        console.log(warDeck.cards);
    }

    Player_Score.innerHTML = playerDeck.numberOfCards;
    CPU_Score.innerHTML = cpuDeck.numberOfCards;

    if (playerDeck.numberOfCards > cpuDeck.numberOfCards) {
        lead.innerHTML = " < ";
    } else if (cpuDeck.numberOfCards > playerDeck.numberOfCards) {
        lead.innerHTML = " > ";
    } else {
        lead.innerHTML = " = ";
    }

    if (playerDeck.numberOfCards === 0) {
        Middle_Row.innerHTML = "You Lose";
        button.innerHTML = "Start";
        isPlaying = false;
    }
    if (cpuDeck.numberOfCards === 0) {
        Middle_Row.innerHTML = "You Win";
        button.innerHTML = "Start";
        isPlaying = false;
    }
}

