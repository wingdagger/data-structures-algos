/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
 var connect = function(root) {
    if (root === null) { 
        return root;
    }
   
    let pbt = new PerfectBinaryTree(root);
   let result = pbt.bfs(root);
   pbt.connect();
   // pbt.printResult();

   return root;
};

class PerfectBinaryTree {
   constructor(root) {
       this.queue = [root];
       this.result = [];
       this.cnt = 0;
       this.nextRowEnd = 0;
       this.row = 0;
   }

   printResult() {
       console.log("result: ");
       console.dir(this.result);
   }

   connect() {
       for (let i=0; i<this.result.length; i++) {
           if (i<this.nextRowEnd && i+1 < this.result.length) {
               this.result[i].next = this.result[i+1];
           }
           
           if (i === this.nextRowEnd) {
               this.row++;
               this.nextRowEnd = i + Math.pow(2, this.row);
           }
       }
   }
   
   populateNext(node) {
       this.result.push(node);
   }

   bfs() {
       if (this.queue.length === 0) {
           return;
       }
       
       let node = this.queue.pop();
       this.populateNext(node);
       
       if (!node.left) {
           //
       } else {
           this.queue.unshift(node.left);
           this.queue.unshift(node.right);
       }
       
       this.bfs();
   }
}


// let root = [1,2,3,4,5,6,7];
// connect()