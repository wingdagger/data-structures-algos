// Using Strings
// var isPalindrome = function(x) {
//     if (x < 0) {
//         return false;
//     } else {
//         let s = x.toString();
//         let i = 0;
//         let j = s.length - 1;
        
        
//         while (i < j) {
//             if (s.substring(i, i+1) == s.substring(j, j+1)) {
//                 // keep going
//                 i++;
//                 j--;
//             } else {
//                 return false;
//             }
//         }
        
//         return true;
//     }
// };

// Without Strings
var isPalindrome = function(x) {
    if ((x < 0) || ((x % 10 == 0) && (x > 0))) {
        return false;
    } else {
        let inverted = 0;
        let y = x;
        while (x > inverted) {
            inverted = inverted * 10 + y % 10;
            y = Math.floor(y / 10);
        }
        
        // console.log(inverted);
        // console.log(x);
        let result = (inverted === x);
        // console.log(result);
        
        return (inverted == x);
    }   
}


let result = isPalindrome(10);
console.log(result);