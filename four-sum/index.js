// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.

 

// Example 1:

// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// Example 2:

// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]
 

// Constraints:

// 1 <= nums.length <= 200
// -109 <= nums[i] <= 109
// -109 <= target <= 109

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
 var fourSum = function(nums, target) {
    nums = nums.sort((a, b) => { return a - b});
    let results = [];
    // let indexes = [];
    let set = new Set();
    
    for (let i=0; i<nums.length - 3; i++) {
        for (let j=i+1; j<nums.length - 2; j++) {
            let lo = j+1;
            let hi = nums.length - 1;
            
            while (lo < hi) {
                let sum = nums[i] + nums[j] + nums[lo] + nums[hi];
                if (sum === target) {
                    if (!set.has(nums[i] + "_" + nums[j] + "_" + nums[lo] + "_" + nums[hi])) {
                        results.push([nums[i], nums[j], nums[lo], nums[hi]]);
                        set.add(nums[i] + "_" + nums[j] + "_" + nums[lo] + "_" + nums[hi]);
                    }
                    // indexes.push([i, j, lo, hi]);
                    hi--;
                } else if (sum < target) {
                    lo++;
                } else {
                    hi--;
                }
            }
        }
    }
    
    // console.dir(indexes);
    
    return results;
};