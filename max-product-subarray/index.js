// Brute Force

/**
 * @param {number[]} nums
 * @return {number}
 */
// var maxProduct = function(nums) {
//     let prod = 1;
//     let maxProd = Number.MIN_SAFE_INTEGER;
    
//     for (let i=0; i<nums.length; i++) {
//         prod = nums[i];
//         maxProd = Math.max(maxProd, prod);
//         for (let j=i+1; j<nums.length; j++) {
//             prod = prod * nums[j];
//             maxProd = Math.max(prod, maxProd);
//         }
//     }
    
//     return maxProd;
// };


function maxProductPrime(nums) {
    let product = 1;  // multiplicate identity
    let maxProd = Number.MIN_SAFE_INTEGER;
    
    for (let i=0; i<nums.length; i++) {
        product *= nums[i];
        maxProd = Math.max(product, maxProd);
        if (product === 0) {
            product = 1;  // multiplicative identity
        }
    }
    
    return maxProd;
}


function maxProduct(nums) {
    let result = Math.max(maxProductPrime(nums), maxProductPrime(nums.reverse()));
    return result;
}

let nums = [3, -1, 4];
console.log(maxProduct(nums));