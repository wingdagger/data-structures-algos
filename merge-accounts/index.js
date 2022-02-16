// Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.

// Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

// After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

 

// Example 1:

// Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Explanation:
// The first and second John's are the same person as they have the common email "johnsmith@mail.com".
// The third John and Mary are different people as none of their email addresses are used by other accounts.
// We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], 
// ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.
// Example 2:

// Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
// Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]

const NAME=0;

class DisjointSet {
    constructor () {
        this.roots = [];
    }
    
    find (node) {
        if (this.roots[node] === undefined) {
            return -1;
        }
        
        let start = node;
        
        while (this.roots[node] !== node) {
            node = this.roots[node];
        }
        
        // compress tree
        this.roots[start] = node;
        
        return node;
    }
    
    union (x, y) {
        if (this.roots[x] === undefined) {
            this.roots[x] = x;
        }

        let rootX = this.find(x);
        let rootY = this.find(y);
        
        if (rootX !== rootY) {
            // connect the roots together
            this.roots[rootY] = rootX;
        } else {
            // already connected
        }
        
        return rootX;
    }
    
    print() {
        console.dir(this.roots);
    }
    
    getRoots() {
        let result = [];
        
        for (let i=0; i<this.roots.length; i++) {
            if (this.roots[i] === i) {
                result.push(i);
            }
        }
        
        // console.log("roots:");
        // console.dir(result);
        return result;
    }
    
//     getChildren(root) {
//         let result = [];
        
//         for (let key in this.roots) {
//             if (this.roots[key] === root) {
//                 result.push(key);
//             }
//         }
        
//         return result;
//     }
}

var makeResults = function (ds, accounts) {
    let results = [];
    let set;
    let groupId;
    let groupToEmail = new Map();
    
    for (let i=0; i<accounts.length; i++) {
        groupId = ds.find(i);
        set = groupToEmail.get(groupId);
        if (set === undefined) {
            set = new Set();
            groupToEmail.set(groupId, set);
        }
        
        for (let j=1; j<accounts[i].length; j++) {
            set.add(accounts[i][j]);
        }
    }
    
    let keys = groupToEmail.keys();
    let key;
    let row;
    
    while ((key = keys.next().value) !== undefined) {
        row = Array.from(groupToEmail.get(key)).sort();
        row.unshift(accounts[key][NAME]);
        results.push(row);
    }
    
    return results;
}

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    let emailToGroup = new Map();
    let ds = new DisjointSet();
    
    // union: set parent for each email
    
    // here we need to visit each email and add it to a group.  If we have already seen
    // the email, then we need to merge the groups.
    for (let i=0; i<accounts.length; i++) {
        // start as own group
        ds.union(i, i);
        
        for (let j=1; j<accounts[i].length; j++) {
            if (!emailToGroup.has(accounts[i][j])) {
                emailToGroup.set(accounts[i][j], i);
            } else {
                // if email already exists, then union the current group w/ matching group
                ds.union(emailToGroup.get(accounts[i][j]), i);
            }
        }
    }
    
    // ds.print();

    return makeResults(ds, accounts);    
}

// Set.prototype.intersect = function (set2) {
//     return new Set(Array.from(this).filter(i => set2.has(i)));
// }

// Set.prototype.union = function (set2) {
//     return new Set([...this, ...set2]);
// }


// /**
//  * @param {string[][]} accounts
//  * @return {string[][]}
//  */
// var accountsMerge = function(accounts) {
//     let tempResult = new Map();
    
//     // loop thru accounts: O(N)
//     for (let i=0; i<accounts.length; i++) {
//         // for each account, see if tempResult; if so, check for merge; it not, add
//         if (tempResult.has(accounts[i][NAME])) {
//             // if intersection, then union, else add to tmpResult as own entry
//             let sets = tempResult.get(accounts[i][NAME]);
//             let unioned = false;
//             let set2 = new Set();
//             for (let j=1; j<accounts[i].length; j++) {
//                 set2.add(accounts[i][j]);
//             }
            
//             for (let k=0; k<sets.length; k++) {
//                 let set1 = sets[k];
            
//                 let intersection = set1.intersect(set2);
//                 // console.log("intersection: ");
//                 // console.log(intersection);
//                 if (intersection.size > 0) {
//                     let union = set1.union(set2);
//                     // console.log("Union:");
//                     // console.log(union);
                    
//                     sets[k] = union;
//                     unioned = true;
//                     // break;
//                 }
//             }
            
//             if (!unioned) {
//                 sets.push(set2);
//             }
//         } else {
//             let set = new Set();
//             for (let j=1; j<accounts[i].length; j++) {
//                 set.add(accounts[i][j]);
//             }
//             tempResult.set(accounts[i][NAME], [set]);
//         }
//     }
    
//     return makeResult(tempResult);
// };

// var makeResult = function (tempResult) {
//     let result = [];
    
//     // construct sorted results
//     let keys = tempResult.keys();
//     let key;
    
//     while (key = keys.next().value) {
//         let sets = tempResult.get(key);
//         for (let i=0; i<sets.length; i++) {
//             let arr = Array.from(sets[i]).sort();
//             arr.unshift(key);
//             result.push(arr);
//         }
//     }

//     return result;
// }

let accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]];
console.dir(accountsMerge(accounts));
console.log();

accounts = [["David","David0@m.co","David1@m.co"],["David","David3@m.co","David4@m.co"],["David","David4@m.co","David5@m.co"],["David","David2@m.co","David3@m.co"],["David","David1@m.co","David2@m.co"]];
console.dir(accountsMerge(accounts));
console.log();

accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]];
console.dir(accountsMerge(accounts));
console.log();
