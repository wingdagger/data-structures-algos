class BFS {
    constructor(n, edges, start) {
        this.n = n;
        this.edges = edges;
        this.queue = [];
        this.queue.push(start);
        this.visited = [];
        this.graph = new Map();
        this.initGraph();
    }

    initGraph() {
        for (let i=0; i<this.edges.length; i++) {
            let entry = this.graph.get(this.edges[i][0]);
            if (entry === undefined) {
                entry = [];
                this.graph.set(this.edges[i][0], entry);
            }

            entry.push(this.edges[i][1]);
            
            // bi-directional
            entry = this.graph.get(this.edges[i][1]);
            if (entry === undefined) {
                entry = [];
                this.graph.set(this.edges[i][1], entry);
            }

            entry.push(this.edges[i][0]);
           
        }
    }

    validPath(start, end) {
        if (start === end) {
            return true;
        } else {
            let connections = this.graph.get(start);
            for (let i=0; connections && i<connections.length; i++) {
                if (!this.visited[connections[i]]) {
                    this.queue.push(connections[i]);
                    this.visited[connections[i]] = true;
                }

                let result = this.validPath(this.queue.pop(), end);
                if (result) {
                    return result;
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
     let bfs = new BFS(n, edges, start);
     let result = bfs.validPath(start, end);
     return result;
};


let n = 10;
let edges = [[0,7],[0,8],[6,1],[2,0],[0,4],[5,8],[4,7],[1,3],[3,5],[6,5]];
let start = 7;
let end = 5;

console.log(validPath(n, edges, start, end));