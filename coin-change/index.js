// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

const map = new Map();

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    map.clear();
    return recur(coins, amount); 
};

var recur = function (coins, amount) {
    if (amount < 0) {
        return -1;
    } else if (amount === 0) {
        return 0;
    }
    
    if (map.get(amount) !== undefined) {
        return map.get(amount);
    }
    
    let minCount = Number.MAX_SAFE_INTEGER;
    for (let i=0; i<coins.length; i++) {
        let count = recur (coins, amount - coins[i]);
        if (count !== -1) {
            minCount = Math.min(count + 1, minCount);
        }
    }
    
    minCount = minCount === Number.MAX_SAFE_INTEGER ? -1 : minCount;
    map.set(amount, minCount);
    
    return minCount;
}

let coins = [1,2,5];
let amount = 11;
console.log(coinChange(coins, amount));