/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    let bfs = new BFS();
    let height = bfs.height(root);
    let allLevels = [];
    
    // process.stdout.write("[");
    for (let i=1; i<=height; i++) {
        allLevels.push(bfs.queueLevel(root, i, []));
    }
    
    return allLevels;
};

class BFS {
    constructor() {
        
    }

    queueLevel (root, level, levelVals) {
        if (root === null) {
            return levelVals;
        }
        
        if (level === 1) {
            levelVals.push(root.val);
        } else if (level > 1) {
            levelVals = this.queueLevel (root.left, level - 1, levelVals);
            levelVals = this.queueLevel (root.right, level - 1, levelVals);
        }
        
        return levelVals;
    }


    printLevel (root, level) {
        if (root === null) {
            return;
        }
        
        if (level === 1) {
            process.stdout.write(root.val + ", ");
        } else if (level > 1) {
            this.printLevel (root.left, level - 1);
            this.printLevel (root.right, level - 1);
        }
    }
    
    height(root) {
        if (root === null) {
            return 0;
        }
        
        return 1 + Math.max(this.height(root.left), this.height(root.right));
    }
}