class DFS {
    constructor(n, edges) {
        this.n = n;
        this.edges = edges;
        this.map = new Map();
        this.initMap();
        this.visited = [];
        
        // console.dir(this.map);
    }

    
    initMap() {
        for (let i=0; i<this.edges.length; i++) {
            let myEdges = this.map.get(this.edges[i][0]);
            if (myEdges === undefined) {
                this.map.set(this.edges[i][0], [this.edges[i][1]]);
            } else {
                myEdges.push(this.edges[i][1]);
                this.map.set(this.edges[i][0], myEdges);
            }
            
            myEdges = this.map.get(this.edges[i][1]);
            if (myEdges === undefined) {
                this.map.set(this.edges[i][1], [this.edges[i][0]]);
            } else {
                myEdges.push(this.edges[i][0]);
                this.map.set(this.edges[i][1], myEdges);
            }
        }
    }
    
    traverse(start, end, count) {
        console.log("start: " + start + ", end:" + end + ", count: " + count);
        if (start === end) {
            return true;
        }
        
        let edges = this.map.get(start);
        
        for (let i=0; edges !== undefined && i<edges.length; i++) {
            if(!this.visited[edges[i]]) {
                this.visited[edges[i]] = true;
                if (this.traverse(edges[i], end, ++count)) {
                    return true;
                }
            }
        }
        
        return false;
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
    let dfs = new DFS(n, edges);
    let result = dfs.traverse(start, end, 0);
    
    return result;
};







let result =validPath (200000, largeTest, 62749, 104478);
console.log(result);