// Given an array of n integers nums and an integer target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.

// Example 1:

// Input: nums = [-2,0,1,3], target = 2
// Output: 2
// Explanation: Because there are two triplets which sums are less than 2:
// [-2,0,1]
// [-2,0,3]
// Example 2:

// Input: nums = [], target = 0
// Output: 0
// Example 3:

// Input: nums = [0], target = 0
// Output: 0


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumSmaller = function(nums, target) {
    nums = nums.sort((a, b) => { return a - b });
    let count = 0;
    
    for (let i=0; i<nums.length - 2; i++) {
        let lo = i+1;
        let hi = nums.length - 1;
        
        while (lo < hi) {
            let sum = nums[i] + nums[lo] + nums[hi];
            if (sum < target) {
                count += hi - lo;
                lo++;
            } else {
                hi--;
            }
        }
    }
    
    return count;
};
