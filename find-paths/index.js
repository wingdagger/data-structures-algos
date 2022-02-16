/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
 var allPathsSourceTarget = function(graph) {
    let paths = [];

    // find paths to last node only
    findPaths(graph, paths, [], 0, graph.length - 1);
    
    return paths;
};

var findPaths = function (graph, paths, path, index, target) {
    if (index === target) {
        path.push(index);
        // store a clone as we can have multiple paths and arrays are pass by reference
        paths.push(path.slice());
        // backtrack; diverge down multiple paths
        path.pop();
        
        return;
    }
    
    
    for (let i=0; i< graph[index].length; i++) {
            path.push(index);
            findPaths(graph, paths, path, graph[index][i], target);
            // backtrack; diverge down multiple paths
            path.pop();
        // }
    }    
}



let graph = [[2],[3],[1],[]];
console.log(allPathsSourceTarget(graph));
console.log();
console.log();

graph = [[4,3,1],[3,2,4],[],[4],[]];
console.log(allPathsSourceTarget(graph));
console.log();
console.log();

graph = [[3,1],[4,6,7,2,5],[4,6,3],[6,4],[7,6,5],[6],[7],[]];
console.log(allPathsSourceTarget(graph));
console.log();

