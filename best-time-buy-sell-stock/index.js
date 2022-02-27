/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    if (prices.length < 2) {
        return 0;
    }
    
    let max = 0;

    // Brute force
    // for (let i=0; i<prices.length; i++) {
    //     for (let j=i+1; j<prices.length; j++) {
    //         max = Math.max(prices[j] - prices[i], max);
    //     }
    // }
    
    let min = Number.MAX_SAFE_INTEGER;
    
    for (let i=0; i<prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i];
        } else if (prices[i] - min > max) {
            max = prices[i] - min;
        }
    }
    
    return max;

};

let prices = [2,1,2,1,0,1,2];
console.log(maxProfit(prices));
prices = [7,1,5,3,6,4];
console.log(maxProfit(prices));
prices = [7,6,4,3,1];
console.log(maxProfit(prices));
