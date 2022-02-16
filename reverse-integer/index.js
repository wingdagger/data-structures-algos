// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

// Example 1:

// Input: x = 123
// Output: 321
// Example 2:

// Input: x = -123
// Output: -321
// Example 3:

// Input: x = 120
// Output: 21
 

// Constraints:

// -231 <= x <= 231 - 1

const MAX_INT = Math.pow(2, 31) - 1;
const MIN_INT = -1 * Math.pow(2, 31);

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let result = 0;
    
    while (x !== 0) {
        // negatives moded return negatives
        let digit = x % 10;
        x = parseInt(x / 10);

        if ((result > MAX_INT/10) || 
            ((result === MAX_INT/10) && (digit > 7))) {
            return 0;
        } else if ((result < MIN_INT/10) || 
                   ((result === MIN_INT/10) && (digit < -8))) {
            return 0;
        }

        result = result * 10 + digit;
    }
    
    return result;
};

console.log(reverse(-321));