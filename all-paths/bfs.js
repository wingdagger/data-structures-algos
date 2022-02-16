class BFS {
    constructor(graph, all) {
        this.graph = graph;
        this.all = all;
        this.queue = [];
        this.queue.push(0);
        // this.visited = [];
    }

    bfs(start, end, path) {
        // console.log("path: ");
        // console.dir(path);
        if (this.queue.length === 0) {
            return;
        } else {
            if (start === end) {
                // at the end
                this.all.push(path);
            } else {
                let children = this.graph[start];
                for (let i=0; children && i<children.length; i++) {
                    let newpath = path.slice();
                    newpath.push(children[i]);
                    // console.log("newpath: ");
                    // console.dir(newpath);
                    this.queue.unshift(newpath);
                }
            }
            
            let next = this.queue.shift();
            this.bfs(next[next.length - 1], end, next);
        }
    }
}

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
 var allPathsSourceTarget = function(graph) {
     let all = [];
     let bfs = new BFS(graph, all);
     bfs.bfs(0, graph.length - 1, [0]);
     
     // console.dir(all);
     
     return all;
};


let graph = [[4,3,1],[3,2,4],[],[4],[]];
// expected output: [[0,4],[0,3,4],[0,1,3,4],[0,1,4]]
console.dir(allPathsSourceTarget(graph));