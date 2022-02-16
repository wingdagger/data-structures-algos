var dfs = function (isConnected, visited, i) {
    for (let j=0; j<isConnected[i].length; j++) {
        if ((isConnected[i][j] === 1) && (!visited[j])) {
            visited[i] = 1;
            dfs(isConnected, visited, j);
        }
    }
}


/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    let visited = [];
    let count = 0;
    
    for (let i=0; i<isConnected.length; i++) {
        if (!visited[i]) {
            dfs(isConnected, visited, i);
            count++;
        }
    }

    return count;
};

let matrix = [
    [1,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,1,1,0,0,0,0],
    [0,0,0,1,0,1,0,0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,1,0,1,0,0,0,0,1,0],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,1,0],
    [0,0,0,0,1,0,0,0,0,1,0,1,0,0,1],
    [0,0,0,0,1,1,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,1,0,1,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,1]
];

let count = findCircleNum(matrix);
console.log('count should be 3: ' + count);

console.log();

matrix = [[1,0,0,1,1],[0,1,1,0,0],[0,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1]];
count = findCircleNum(matrix);
console.log('count should be 2: ' + count);

console.log();

matrix = [[1,0,0],[0,1,0],[0,0,1]];
count = findCircleNum(matrix);
console.log('count should be 3: ' + count);

console.log();

matrix = [[1,1,0],[1,1,0],[0,0,1]];
count = findCircleNum(matrix);
console.log('count should be 2: ' + count);

