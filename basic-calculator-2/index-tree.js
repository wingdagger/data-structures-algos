/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
    let tree = new Tree(s);
    tree.buildTree(s);
    tree.print();
};

class Node {
    constructor() {
        this.val;
        this.left;
        this.right;
    }
}

class Tree {
    constructor(str) {
        this.str = str;
        this.delimiters = '/|*|+|-';
        this.delimitersArray = ['/', '*', '+', '-'];
        this.root = new Node();
    }
    
    buildTree(str) {
        let words = str.split(this.delimiters);
        let node = this.root;
        for (let i=0; i<words.length; i++) {
            if (this.delimitersArray.includes(words[i].trim())) {
                node.val = words[i].trim();
                node.left = new Node();
                node.left.val = words[i-1].trim();
                node.right = new Node();
                node.right.val = words[i+1].trim();
                node = node.right;
            }
        }
    }

    print() {
        this.inOrderPrint(this.root);
    }

    inOrderPrint (node) {
        if (!node) {
            return;
        }
        
        this.inOrderPrint(node.left);
        console.log(node.val);
        this.inOrderPrint(node.right);
    }
}