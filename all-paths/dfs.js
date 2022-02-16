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