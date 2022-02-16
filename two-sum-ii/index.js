/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(numbers, target) {
    let i=0;
    let j=numbers.length - 1;
    
    while (i < j) {
        let sum = numbers[i] + numbers[j];
        if (sum < target) {
            i++;
        } else if (sum > target) {
            j--;
        } else {
            return [i+1, j+1];
        }
    }
};

let numbers = [2,7,11,15];
let target = 9;
console.log(twoSum(numbers, target));

numbers = [-1,0];
target = -1;
console.log(twoSum(numbers, target));
