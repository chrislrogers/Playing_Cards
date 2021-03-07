const card = document.getElementById('card');
const color = document.getElementById('color');
const name = document.getElementById('name');

import Deck from "./deck.js";

const deck = new Deck();
console.log(deck.cards);
deck.shuffle();

window.printCard = () => {
    let random = Math.floor(Math.random() * 52);
    let aCard = deck.cards[random];

    card.innerHTML = aCard.unicode;
    name.innerHTML = aCard.name;
    if (aCard.color === "RED") {
        card.style.color = 'red';
        color.innerHTML = "Red";
    }
    if (aCard.color === "BLACK") {
        card.style.color = 'black';
        color.innerHTML = "Black";
    }
}
