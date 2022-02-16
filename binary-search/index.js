/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
    let lower = 0;
    let upper = nums.length - 1;
    let pivot;
    
    while (lower <= upper) {
        pivot = lower + Math.round(upper - lower / 2);
        if (nums[pivot] === target) {
            return pivot;
        }
        if (target < nums[pivot]) {
            upper = pivot - 1;
        } else {
            lower = pivot + 1;
        }
    }
    
    return -1;
};

let nums = [-1,0,3,5,9,12];
let target = 3;
console.log(search (nums, target));