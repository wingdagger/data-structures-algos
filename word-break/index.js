class ABCUtil {
    constructor() {
        this.letters = [];
        
        for (let i='a'.charCodeAt(0); i<='z'.charCodeAt(0); i++) {
            this.letters.push(String.fromCharCode(i));
        }
    }
    
    letterToIndex(letter) {
        return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    }
    
    print() {
        console.log(this.letters);
    }
}

const ABC = new ABCUtil();


class Node {
    static idCounter = 0;

    constructor(letter) {
        if (letter === undefined) {
            letter = "<root>";
        }
        this.letter = letter;
        this.children = [];
        this.isWordBool = false;
        this.id = Node.idCounter++;
    }
    
    getId() {
        return this.id;
    }
    
    getChildren() {
        return this.children;
    }
    
    setWord(isWordBool) {
        this.isWordBool = isWordBool;
    }
    
    isWord() {
        return (this.isWordBool);
    }
    
    addChild(letter) {
        let index = ABC.letterToIndex(letter);
        this.children[index] = new Node(letter);
        return this.children[index];
    }
    
    getChild(letter) {
        return this.children[ABC.letterToIndex(letter)];
    }
    
    getLetter() {
        return this.letter;
    }
}

class Trie {
    static runCounter = 1;

    constructor(wordDict) {
        this.root = new Node();
        this.map = new Map();

        for (let i=0; i<wordDict.length; i++) {
            this.addWord(wordDict[i]);
        }
    }

    wordBreak(str) {
        return this.wordBreakPrimitive(str, 0, this.root);
    }
    
    wordBreakPrimitive(str, index, node) {
        // console.log(Trie.runCounter++ + ": index: " + index + ", node: " + node.getLetter());

        if ((node !== undefined) && (this.map.has(index + "_" + node.getId()))) {
            // console.log("result was memoized");
            return this.map.get(index +  "_" + node.getId());
        }
        
        let letter;

        for (; index<str.length; index++) {
            letter = str[index];
            node = node.getChild(letter);
            if (node === undefined) {
                return false;
            }
            
            if (node.isWord()) {
                // we need to explore 2 paths:
                // 1. the node ends a word, so go back to the root and explore new words
                // 2. the node extends to another word or words, so explore that path
                let result = this.wordBreakPrimitive(str, index + 1, this.root) ||
                    this.wordBreakPrimitive(str, index + 1, node);
                // memoize
                this.map.set(index + "_" + node.getId(), result);
                return result;
            }
        }

        return node.isWord();
    }
    
    addWord(word) {
        let node = this.root;
        let prevNode;
        
        for (let i=0; i<word.length; i++) {
            prevNode = node;
            node = node.getChild(word[i]);
            if (node === undefined) {
                // console.log("adding child with letter: " + word[i]);
                node = prevNode.addChild(word[i]);
            }
        }
        
        node.setWord(true);
    }
    
    print() {
        let node = this.root;
        this.printPrimitive(node);
    }
    
    printPrimitive(node) {
        for (let i=0; i<node.getChildren().length; i++) {
            let child = node.getChildren()[i];
            if (child !== undefined) {
                process.stdout.write(child.getLetter() + " . ");
                if (child.isWord()) {
                    console.log("> word");
                }
                this.printPrimitive(child);
            }
        }
    }
}

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let trie = new Trie(wordDict);
    // trie.print();

    return trie.wordBreak(s);
};

let word = "leetcode";
let wordDict = ["leet", "code"];
// true
console.log(wordBreak(word, wordDict));

word = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab";
wordDict = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"];
// false
console.log(wordBreak(word, wordDict));
