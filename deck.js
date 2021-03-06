const suits = ['SPADES', 'DIAMONDS', 'HEARTS', 'CLUBS'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export default class Deck {
    constructor(cards) {
        if (typeof cards != 'undefined') {
            this.cards = cards;
        } else {
            this.cards = [];
        }
    }

    newDeck() {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                let card = new Card(suits[i], values[j]);
                this.cards.push(card);
            }
        }
        return this.cards;
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        let j, temp;
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            j = Math.floor(Math.random() * i);
            temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        if (this.suit === "SPADES" || this.suit === "CLUBS") {
            return "BLACK";
        } else { return "RED"; }
    }

    get name() {
        if (this.value === "A") {
            return "Ace";
        }
        if ((Number(this.value) > 1) && (Number(this.value) < 11)) {
            return this.value;
        }
        if (this.value === "J") {
            return "Jack";
        }
        if (this.value === "Q") {
            return "Queen";
        }
        if (this.value === "K") {
            return "King";
        }
    }

    get unicode() {
        /**
         * SPADES   = 0x1F0A
         * HEARTS   = 0x1F0B
         * DIAMONDS = 0x1F0C
         * CLUBS    = 0x1F0D
         */
        let unicode = "0x1F0";
        if (this.suit === "SPADES") {
            unicode = unicode + "A";
        }
        if (this.suit === "HEARTS") {
            unicode = unicode + "B";
        }
        if (this.suit === "DIAMONDS") {
            unicode = unicode + "C";
        }
        if (this.suit === "CLUBS") {
            unicode = unicode + "D";
        }
        /**
         * 1   = Ace
         * 2-9 = 2-9
         * A   = 10
         * B   = Jack
         * D   = Queen
         * E   = King
         */
        for (let i = 0; i < values.length; i++) {
            if (this.value === "A") {
                unicode = unicode + "1";
                break;
            }
            if ((Number(this.value) > 1) && (Number(this.value) < 10)) {
                unicode = unicode + this.value;
                break;
            }
            if (this.value === "10") {
                unicode = unicode + "A";
                break;
            }
            if (this.value === "J") {
                unicode = unicode + "B";
                break;
            }
            if (this.value === "Q") {
                unicode = unicode + "D";
                break;
            }
            if (this.value === "K") {
                unicode = unicode + "E";
                break;
            }
        }
        return String.fromCodePoint(unicode);
    }
}
