// Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

 

// Example 1:

// Input: nums = [1,0,1,1,0]
// Output: 4
// Explanation: Flip the first zero will get the maximum number of consecutive 1s. After flipping, the maximum number of consecutive 1s is 4.
// Example 2:

// Input: nums = [1,0,1,1,0,1]
// Output: 4
 

// Constraints:

// 1 <= nums.length <= 105
// nums[i] is either 0 or 1.
 

// Follow up: What if the input numbers come in one by one as an infinite stream? In other words, you can't store all numbers coming from the stream as it's too large to hold in memory. Could you solve it efficiently?

/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMaxConsecutiveOnes = function(nums) {
    flipped = false;
    count = 0;
    countSinceFlipped = 0;
    maxCount = 0;
    
    for (let i=0; i<nums.length; i++) {
        if (nums[i] === 0) {
            if (!flipped) {
                count++;
            } else {
                count = countSinceFlipped + 1;
            }
            
            flipped = true;
            countSinceFlipped = 0;
        } else {
            count++;
            if (flipped) {
                countSinceFlipped++;
            }
        }
        
        maxCount = Math.max(maxCount, count);
    }
    
    return maxCount;
};

let nums = [1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0];
console.log(findMaxConsecutiveOnes(nums));