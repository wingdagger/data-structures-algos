// Shuffle a deck of cards
const NUM_CARDS = 52;

const CARDS = new Map();
const SUITS = ["Clubs", "Hearts", "Spades", "Diamonds"];

class Cards {
    constructor() {
        let k = 1;
        for (let j=0; j<SUITS.length; j++) {
            for (let i=2; i<=10; i++) {
                CARDS.set(k++, SUITS[j] + "-" + i);
            }

            CARDS.set(k++, SUITS[j] + "-" + "Jack");
            CARDS.set(k++, SUITS[j] + "-" + "Queen");
            CARDS.set(k++, SUITS[j] + "-" + "King");
            CARDS.set(k++, SUITS[j] + "-" + "Ace");
        }
    }

    shuffle() {
        this.cards = [];
        let sum1 = 0;
        let sum2 = 0;
        let dealtCards = new Set();
        for (let i=1; i<=NUM_CARDS; i++) {
            this.cards.push(i);
        }

        for (let cardsLeft=NUM_CARDS; cardsLeft > 0; cardsLeft--) {
            let rnd = Math.floor(Math.random() * cardsLeft);
            // console.log("rnd: " + rnd);
            let card = this.cards[rnd];
            // sum1 += card;
            // sum2 += cardsLeft;
            // console.log("card: " + card + ", " + cardsLeft);
            console.log("card: " + CARDS.get(card));
            if (dealtCards.has(CARDS.get(card))) {
                throw Exception("WTF? The card has already been dealt!??!!");
            } else {
                dealtCards.add(CARDS.get(card));
            }

            this.cards.splice(rnd, 1);
        }

        // console.log("sum1: " + sum1);
        // console.log("sum2: " + sum2);
    }

}

let cards = new Cards();
cards.shuffle();