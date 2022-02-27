// There is a row of n houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

// The cost of painting each house with a certain color is represented by an n x 3 cost matrix costs.

// For example, costs[0][0] is the cost of painting house 0 with the color red; costs[1][2] is the cost of painting house 1 with color green, and so on...
// Return the minimum cost to paint all houses.

 

// Example 1:

// Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
// Output: 10
// Explanation: Paint house 0 into blue, paint house 1 into green, paint house 2 into blue.
// Minimum cost: 2 + 5 + 3 = 10.
// Example 2:

// Input: costs = [[7,6,2]]
// Output: 2
 

// Constraints:

// costs.length == n
// costs[i].length == 3
// 1 <= n <= 100
// 1 <= costs[i][j] <= 20


const RED=0
const BLUE=1
const GREEN=2
const memo = new Map();

/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostRecur = function(costs) {
    memo.clear();
    
    let min1 = minCostPrime(costs, 0, RED);
    let min2 = minCostPrime(costs, 0, GREEN);
    let min3 = minCostPrime(costs, 0, BLUE);
    
    let min = Math.min(min1, min2, min3);
    return min;
};

function minCostPrime (costs, index, exclude) {
    // base
    if (index === costs.length) {
        return 0;
    }
    
    if (memo.has(index + "_" + exclude)) {
        return (memo.get(index + "_" + exclude));
    } else {
        let cost = costs[index][exclude];
    
        // recurrence relation
        if (exclude === RED) {
            cost += Math.min(minCostPrime(costs, index + 1, BLUE), minCostPrime(costs, index + 1, GREEN));
        } else if (exclude === BLUE) {
            cost += Math.min(minCostPrime(costs, index + 1, RED), minCostPrime(costs, index + 1, GREEN));
        } else {
            cost += Math.min(minCostPrime(costs, index + 1, RED), minCostPrime(costs, index + 1, BLUE));
        }
        
        memo.set(index + "_" + exclude, cost);
        
        return cost;
    }
}

function minCostDP(costs) {
    for (let i=costs.length - 2; i >= 0; i--) {
        costs[i][RED] += Math.min(costs[i+1][GREEN], costs[i+1][BLUE]);
        costs[i][BLUE] += Math.min(costs[i+1][RED], costs[i+1][GREEN]);
        costs[i][GREEN] += Math.min(costs[i+1][RED], costs[i+1][BLUE]);        
    }
    
    return Math.min(costs[0][RED], costs[0][GREEN], costs[0][BLUE]);
}

/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function(costs) {
    return(minCostDP(costs));
}
