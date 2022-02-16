class BinaryMatrix {
    constructor(grid) {
        this.grid = grid;
        this.root = {x: 0, y: 0};
        this.finish = {x: this.grid.length - 1, y: this.grid.length - 1};
        this.queue = [[this.root]];
        this.visited = [];
        for (let i=0; i<this.grid.length; i++) {
            this.visited[i] = [];
            this.visited[i].length = this.grid.length;
        }
    }
    
    getNeighbors(node) {
        let neighbors = [];
    
        if ((node.y + 1 < this.grid.length) &&
            (node.x + 1 < this.grid.length)) {
            if (this.grid[node.x+1][node.y+1] === 0) {
                neighbors.push({x: node.x+1, y: node.y+1});
            }
        }

        
        if ((node.y + 1 < this.grid.length) && 
            (this.grid[node.x][node.y+1] === 0)) {
            neighbors.push({x: node.x, y: node.y+1});
        }
            

        if ((node.x + 1 < this.grid.length) &&
            (this.grid[node.x+1][node.y] === 0)) {
            // then try to go right
            neighbors.push({x: node.x+1, y: node.y});
        }

        if ((node.y - 1 >= 0) &&
            (this.grid[node.x][node.y-1] === 0)) {
                neighbors.push({x: node.x, y: node.y-1});
        }
        
        if ((node.x - 1 >= 0) &&
            (this.grid[node.x-1][node.y] === 0)) {
            // then try to go right
            neighbors.push({x: node.x-1, y: node.y});
        }

        if ((node.y - 1 >= 0) && (node.x -1 >= 0) &&
            (this.grid[node.x-1][node.y-1] === 0)) {
            neighbors.push({x: node.x-1, y: node.y-1});
        }

        if ((node.y + 1 < this.grid.length) &&
            (node.x - 1 >= 0) &&
            (this.grid[node.x-1][node.y+1] === 0)) {
            neighbors.push({x: node.x-1, y: node.y+1});
        }

        if ((node.x + 1 < this.grid.length) &&
            (node.y - 1 >= 0) &&
            (this.grid[node.x+1][node.y-1] === 0)) {
            neighbors.push({x: node.x+1, y: node.y-1});
        }


        
        // console.log("neighbors:");
        // console.dir(neighbors);
        // console.log();

        return neighbors;
    }
    
    findPath() {
        // console.log("queue:");
        // console.dir(this.queue);
        // console.log();
        
        if (this.queue.length === 0) {
            // nothing else to process so no route
            return -1;
        }

        let path = this.queue.pop();
        // console.log('path:');
        // console.log(path);
        let start = path[path.length - 1];
        // console.log('start:');
        // console.log(start);

        
        if (!this.visited[start.x][start.y]) {
            this.visited[start.x][start.y] = true;
        
            if (start.x === this.finish.x && start.y === this.finish.y) {
                // got to the finish
                return path.length;
            } else {
                let neighbors = this.getNeighbors(start);
            
                for (let i=0; i<neighbors.length; i++) {
                    if (!this.visited[neighbors[i].x][neighbors[i].y]) {
                        // copy the array and add the next neighbor
                        let nextPath = path.slice();
                        nextPath.push(neighbors[i]);
                        this.queue.unshift(nextPath);
                    }
                }
            
            }
        }
        
        return this.findPath();
    }
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
    console.log("start");

    if (grid[0][0] === 1) {
        return -1;
    }
    
    let bm = new BinaryMatrix(grid);
    let result = bm.findPath();
    // console.log('result: ' + result);
    return result;
};

let matrix = [[0,1,1,0,0,0],[0,1,0,1,1,0],[0,1,1,0,1,0],[0,0,0,1,1,0],[1,1,1,1,1,0],[1,1,1,1,1,0]];
console.log(shortestPathBinaryMatrix(matrix));
