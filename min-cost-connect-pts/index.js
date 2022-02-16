class MinCostConnectPoints {
    constructor(points) {
        this.points = points;
        this.edges = [];
        this.makeEdges();
        this.minSpanTree = [];
        this.treeMap = new Map();
        this.cost = 0;
        this.usedPoints = new Set();
    }
    
    makeEdges() {
        let edge; 
        
        for (let i=0; i<this.points.length - 1; i++) { // no need to do the last one since that is handled in the inner loop
            for (let j=i+1; j<this.points.length; j++) {
                edge = {
                    start: this.points[i],
                    end: this.points[j],
                    distance: this.manhattanDistance(this.points[i], this.points[j])
                };
            
                // could sort here?  
                this.edges.push(edge);
            }
        }
            
        this.edges = this.edges.sort(function (a, b) {
            return a.distance - b.distance;
        });
        
        // console.log("edges:");
        // console.dir(this.edges);
    }
    
    manhattanDistance(pt1, pt2) {
        return Math.abs(pt1[0] - pt2[0]) + Math.abs(pt1[1] - pt2[1]);
    }

    dfs(point, end, visited) {
        visited.add(point);
        let pointMap = this.treeMap.get(point);

        for (let i=0; pointMap && i<pointMap.length; i++) {
            if (pointMap[i] === end) {
                return true;
            }
            
            if (visited.has(pointMap[i])) {
                // continue
            } else {
                if (this.dfs(pointMap[i], end, visited)) {
                    return true;
                } 
            }
        }

        return false;
    }
    
    checkForLoop(edge) {
        // console.log("checkForLoop: ");
        // console.log(edge);

        let visited = new Set();
        
        let start = edge.start[0] + "_" + edge.start[1];
        let end = edge.end[0] + "_" + edge.end[1];
        let isLoop = this.dfs(start, end, visited);
        if (isLoop) {
            return isLoop;
        } else {
            return this.dfs(end, start, visited);
        }
    }

    updateTreeMap(edge) {
        let pointMap = this.treeMap.get(edge.start[0] + "_" + edge.start[1]);
        if (!pointMap) {
            pointMap = [];
        }
        pointMap.push(edge.end[0] + "_" + edge.end[1]);
        this.treeMap.set(edge.start[0] + "_" + edge.start[1], pointMap);

        pointMap = this.treeMap.get(edge.end[0] + "_" + edge.end[1]);
        if (!pointMap) {
            pointMap = [];
        }
        pointMap.push(edge.start[0] + "_" + edge.start[1]);
        this.treeMap.set(edge.end[0] + "_" + edge.end[1], pointMap);
    }
    
    findMinSpanTree() {
        // console.log('minSpanTree.length: ' + this.minSpanTree.length + ", thi")
        for (let i=0; this.minSpanTree.length < this.points.length - 1 && i<this.edges.length; i++) {
            if (!this.checkForLoop(this.edges[i])) {
                // console.log("adding edge: " + this.edges[i].start + "_" + this.edges[i].end);

                this.minSpanTree.push(this.edges[i]);

                this.updateTreeMap(this.edges[i]);

                this.cost += this.edges[i].distance;
                // this is to check for loops later
                this.usedPoints.add(this.edges[i].start[0] + "_" + this.edges[i].start[1]);
                this.usedPoints.add(this.edges[i].end[0] + "_" + this.edges[i].end[1]);
            } else {
                // console.log("edge would make loop: " + this.edges[i].start + "_" + this.edges[i].end);
            }
        }

        // console.log("minSpanTree length: " + this.minSpanTree.length);
        
        if (this.minSpanTree.length === this.points.length - 1) {
            return this.cost;
        } else {
            return -1;
        }
    }
        
    printEdges() {
        console.log("edges");
        console.dir(this.edges);
    }
}

/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    let mccp = new MinCostConnectPoints(points);
    // mccp.printEdges();
    let result = mccp.findMinSpanTree();
    
    return result;
};




let points = [[2,-3],[-17,-8],[13,8],[-17,-15]];
// expect 53
console.log(minCostConnectPoints(points));

points = [[3,12],[-2,5],[-4,1]];
// expect 18
console.log(minCostConnectPoints(points));

points = [[0,0],[2,2],[3,10],[5,2],[7,0]];
// expect 20
console.log(minCostConnectPoints(points));
