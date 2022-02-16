class UnionFind {
    constructor(n) {
        this.nodes = [];
        this.nodes.length = n;
    }
    
    find(x) {
        let origX = x;
        
        while (x !== this.nodes[x]) {
            x = this.nodes[x];
        }
        
        // compress tree.. path to root
        this.nodes[origX] = x;
        
        return x;
    }
    
    union(x, y) {
        if (this.nodes[x] === undefined) {
            this.nodes[x] = x;
        }
        
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        if (rootX === rootY) {
            // do nothing.. already connected
        } else {
            if (rootY === undefined) {
                this.nodes[y] = rootX;
            } else {
                this.nodes[rootY] = rootX;
            }
        }
    }
    
    isConnected(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        return (rootX === rootY);
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
var validPath = function(n, edges, start, end) {
    let uf = new UnionFind(n);
    
    for (let i=0; i<edges.length; i++) {
        uf.union(edges[i][0], edges[i][1]);
    }
    
    let result = uf.isConnected(start, end);
    
    return result;
};


let result =validPath (200000, largeTest, 62749, 104478);
console.log(result);