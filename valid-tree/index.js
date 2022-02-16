class DisjointSet {
    constructor() {
        this.nodes = [];
    }
    
    find(x) {
        let originalX = x;
        
        while (x !== this.nodes[x]) {
            x = this.nodes[x];
        }
        
        // compress tree
        this.nodes[originalX] = x;
        
        return x;
    }
    
    union(x, y) {
        if (this.nodes[x] === undefined) {
            this.nodes[x] = x;
        }
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        if (rootX === rootY) {
            // same parent; therefore it's already in the tree
            return false;
        } else {
            if (rootY === undefined) {
                this.nodes[y] = rootX;
            } else {
                this.nodes[rootY] = rootX;
            }
        }
        
        return true;
    }
    
    countRoots() {
        let cnt = 0;
        
        for (let i=0; i < this.nodes.length; i++) {
            if (this.nodes[i] === i) {
                cnt++;
            }
        }
        
        // console.log("num roots: " + cnt);
        return cnt;
    }
    
    size() {
        return this.nodes.length;
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}x
 */
var validTree = function(n, edges) {
    if (n - 1 !== edges.length) {
        // graph theory
        // tree must have nodeCount === edges - 1
        return false;
    }
    
    let ds = new DisjointSet();
    
    for (let i=0; i<edges.length; i++) {
        if (ds.union(edges[i][0], edges[i][1]) === false) {
            return false;
        }
    }
    
    if (ds.size() === 0 || ds.countRoots() === 1) {
        return true;
    } else {
        return false;
    }
    
};

console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]]));
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]]));
console.log(validTree(1, []));