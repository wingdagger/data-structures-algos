/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
    nums = nums.sort(function (a, b) { return a - b });
    let minDiff = Number.MAX_SAFE_INTEGER;
    let closestSum;

    for (let i=0; i<nums.length; i++) {
        let lo = i+1;
        let hi = nums.length - 1;
        while (lo < hi) {
            sum = nums[i] + nums[lo] + nums[hi];
            if (sum < target) {
                lo++;
            } else if (sum > target) {
                hi--;
            }
            
            if (Math.abs(target - sum) < minDiff) {
                minDiff = Math.abs(target-sum);
                closestSum = sum;
            }
        
            if (minDiff === 0) {
                break;
            }
        }
    }

    return closestSum;
};


let nums = [-1,2,1,-4];
let target = 1;
console.log(threeSumClosest(nums, target));
nums = [0,0,0];
target = 1;
console.log(threeSumClosest(nums, target));
