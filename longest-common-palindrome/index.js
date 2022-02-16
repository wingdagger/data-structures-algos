// 5. Longest Palindromic Substring
// Medium

// 15868

// 934

// Add to List

// Share
// Given a string s, return the longest palindromic substring in s.

 

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"
 

// Constraints:

// 1 <= s.length <= 1000
// s consist of only digits and English letters.


/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
    let longest = s[0];
    
    for (let i=0; i<s.length; i++) {
        let start = i;
        
        for (let j=s.length - 1; j>=0; j--) {
            let end = j;
            
            while (s[i] === s[j]) {
                if ((i === j) || (i === j - 1)) {
                    let potential = s.substring(start, end + 1);
                    if (potential.length > longest.length) {
                        longest = potential;
                    }
                    break;
                } else if (i > j) {
                    break;
                }
                
                i++;
                j--;
            }
            
            i = start;
            j = end;
        }
    }
    
    return longest;
};