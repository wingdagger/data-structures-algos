const MAPPING = [
    [], // 0
    [], // 1
    ['a', 'b', 'c'],  // 2
    ['d', 'e', 'f'],  // 3
    ['g', 'h', 'i'],  // 4
    ['j', 'k', 'l'],  // 5
    ['m', 'n', 'o'],  // 6
    ['p', 'q', 'r', 's'],  // 7
    ['t', 'u', 'v'],  // 8
    ['w', 'x', 'y', 'z'],  // 9
];

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    let result = [];
    let index = 0;
    
    recur(digits, "", index, result);
    
    return result;
};

var recur = function (digits, path, index, result) {
    if (index > digits.length - 1) {
        if (path !== "") {
            result.push(path);
        }
        return;
    }
    
    let ch = parseInt(digits.substring(index, index+1));
    let row = MAPPING[ch];
    for (let i=0; i<row.length; i++) {
        recur(digits, path + row[i], index + 1, result);
    }
}

console.log(letterCombinations("23"));
console.log(letterCombinations(""));
console.log(letterCombinations("2"));
console.log(letterCombinations("4567"));
console.log(letterCombinations("5555"));
