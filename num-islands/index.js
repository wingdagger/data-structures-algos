/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    let count = 0;
    var visited = [];
    
    for (let i=0; i<grid.length; i++) {
        visited[i] = [];
        for (let j=0; j<grid[i].length; j++) {
            visited[i][j] = false;
        }
    }    
    
    for (let i=0; i<grid.length; i++) {
        for (let j=0; j<grid[i].length; j++) {
            if (!visited[i][j]) {
                if (grid[i][j] === "1") {
                    count += dfs(grid, visited, i, j);
                } 
                
                visited[i][j] = true;
            } else {
                // already visisted so go to next node
            }
        }
    }
    
    return count;
};

var dfs = function (grid, visited, i, j) {
    visited[i][j] = true;
    
    if ((i+1 < grid.length) && (!visited[i+1][j])) {
        if (grid[i+1][j] === "1") {
            dfs (grid, visited, i+1, j);
        }
        
        // visited[i+1][j] = true;
    }

    if ((i-1 >= 0) && (!visited[i-1][j])) {
        if (grid[i-1][j] === "1") {
            dfs (grid, visited, i-1, j);
        }
        
        // visited[i-1][j] = true;
    }


    if ((j+1 < grid[i].length) && (!visited[i][j+1])) {
        if (grid[i][j+1] === "1") {
            dfs (grid, visited, i, j+1)
        }
        
        // visited[i][j+1] = true;
    }
    
    if ((j-1 >= 0) && (!visited[i][j-1])) {
        if (grid[i][j-1] === "1") {
            dfs (grid, visited, i, j-1)
        }
        // visited[i][j-1] = true;
    }


    return 1;
}

let ocean = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]];
let num = numIslands(ocean);
console.log("numIslands: " + num);

ocean = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ];

num = numIslands(ocean);
console.log("numIslands: " + num);
