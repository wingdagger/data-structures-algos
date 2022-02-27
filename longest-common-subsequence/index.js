class LCS {
    constructor(text1, text2) {
        this.text1 = text1;
        this.text2 = text2;
        this.map = new Map();
    }
    
    recurse (i, j) {
        if ((i >= this.text1.length) || (j >= this.text2.length)) {
            return 0;
        }
        
        if (!this.map.has(i+" "+j)) {
            let a = this.text1.substring(i, i+1);
            let b = this.text2.substring(j, j+1);
        
            if (a === b) {
                let cnt = 1 + this.recurse(i+1, j+1);
                this.map.set(i+" "+j, cnt);
            } else {
                let cnt = Math.max(this.recurse(i, j+1),
                                  this.recurse(i+1, j));
                this.map.set(i+" "+j, cnt);
            }
        }
            
        return this.map.get(i+" "+j);
    }
}

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    let lcs = new LCS(text1, text2);
    let result = lcs.recurse(0, 0);
    
    return result;
}




// var longestCommonSubsequence = function(text1, text2) {
//     let text3 = text1;
//     text1 = text2;
//     text2 = text3;
//     let i1 = 0;
//     let i2 = 0;
//     let c1;
//     let c2;
//     let cnt = 0;
//     let i1min = 0;
//     let i2min = 0;
    
//     let maxCnt = 0;
    
//     while (i1<text1.length - maxCnt) {
//         if (cnt > maxCnt) {
//             maxCnt = cnt;
//         }
//         cnt = 0;
//         i2 = 0;
//         i2min = 0;
//         console.log("");

        
//         for (i1=i1min; i1<text1.length - maxCnt;) {
//             for (i2=i2min; i2<text2.length; i2++) {
//                 c1 = text1.substring(i1, i1+1);
//                 c2 = text2.substring(i2, i2+1);
//                 if (c1 === c2) {
//                     console.log(c1);
//                     cnt++;
//                     i1++;
//                     // i2++;
//                     i2min = i2;
//                 } else {
//                     // i2++;
//                     if (i2 > text2.length) {
//                         i2 = i2min;
//                         i1++;
//                     }
//                 }
//             }
//         }
        
//         i1 = ++i1min;
//     }
    
//     if (cnt > maxCnt) {
//         maxCnt = cnt;
//     }
    
//     return maxCnt;
// };