const ABC = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
];

class Node {
    constructor() {
        this.map = new Map();
        this.isaWord = false;
    }

    hasChar(ch) {
        return this.map.has(ch);
    }

    getCharNode(ch) {
        return this.map.get(ch);
    }

    addChar(ch) {
        this.map.set(ch, new Node());
        return this.map.get(ch);
    }

    setIsWord(b) {
        this.isaWord = b;
    }

    print() {
        console.dir(this);
    }

    isWord() {
        return this.isaWord;
    }

    getCharKeys() {
        return this.map.keys();
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    dfsPrime(requestedCount, words, word, node) {
        if(words.length === requestedCount) {
            return;
        }

        if(node.isWord()) {
            words[words.length] = word;
        }

        for (let i=0; i<ABC.length; i++) {
            if (node.getCharNode(ABC[i]) !== undefined) {
                this.dfsPrime(requestedCount, words, word + ABC[i], node.getCharNode(ABC[i]));
            }
        }

        return;
    }

    dfs(requestedCount, node, prefix) {
        let words = [];
        this.dfsPrime(requestedCount, words, prefix, node);

        return words;
    }

    addWord (word) {
        let node = this.root;
        let prevNode;

        for (let i=0; i<word.length; i++) {
            prevNode = node;
            node = node.getCharNode(word[i]);
            if (node === undefined) {
                node = prevNode.addChar(word[i]);
            }
        }

        node.setIsWord(true);
    }

    print() {
        this.root.print();
    }

    getWordsStartingWith(requestedCount, prefix) {
        let node = this.root;
        for (let i=0; i<prefix.length; i++) {
            let next = node.getCharNode(prefix[i]);
            if (next === undefined) {
                return [];
            } else {
                node = next;
            }
        }

        return this.dfs(requestedCount, node, prefix);
    }

    findForTypedLetters(requestedCount, prefix) {
        let results = [];
        for (let i=1; i<=prefix.length; i++) {
            results.push(this.getWordsStartingWith(requestedCount, prefix.substring(0, i)));
        }

        return results;
    }

    hasWord (word) {
        let node = this.root;

        for (let i=0; i<word.length; i++) {
            node = node.getCharNode(word[i]);
            if (node === undefined) {
                return false;
            }
        }

        if (node.isWord()) {
            return true;
        } else {
            // console.log("looped through Trie to find word but it is not set as a word.");
            return false;
        }
    }
}


/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {
    let trie = new Trie();

    for (let i=0; i<products.length; i++) {
        trie.addWord(products[i]);
    }

    return trie.findForTypedLetters(3, searchWord);
};

// let trie = new Trie();
// // trie.addWord("hello");
// // trie.addWord("world");
// // trie.addWord("hel");
// // trie.addWord("pie");
// // trie.print();
// // console.log("world is a word: " + trie.hasWord("world"));
// // console.log("foo is a word: " + trie.hasWord("foo"));
// // console.log("hel is a word: " + trie.hasWord("hel"));
// // console.log("helo is a word: " + trie.hasWord("helo"));
// // console.log("hello is a word: " + trie.hasWord("hello"));
// // console.log("he is a word: " + trie.hasWord("he"));


// let products = ["mobile","mouse","moneypot","monitor","mousepad"];
// for (let i=0; i<products.length; i++) {
//     trie.addWord(products[i]);
// }

// let searchWord = "mobile";
// console.log(trie.hasWord(searchWord));
// console.log(trie.findForTypedLetters(3, "moni"));
