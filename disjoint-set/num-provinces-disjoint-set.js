class DisjointSet2 {
    constructor() {
        this.sets = [];
    }
    
    print() {
        console.log("sets:");
        console.log(this.sets);
    }
    
    find(item) {
        let originalItem = item;
        
        while (item !== this.sets[item]) {
            item = this.sets[item];
        }
        
        // compress tree
        this.sets[originalItem] = item;
        
        return item;
    }
    
    union(item1, item2) {
        if (this.sets[item1] === undefined) {
            this.sets[item1] = item1;
        }
        
        let r1 = this.find(item1);
        let r2 = this.find(item2);
        
        if (r1 !== r2) {
            if (r2 === undefined) {
                this.sets[item2] = r1;
            } else {
                this.sets[r2] = r1;
            }
        }
        // this.print();
    }
    
    connected(item1, item2) {
        let r1 = this.find(item1);
        let r2 = this.find(item2);
        
        return (r1 === r2);
    }
    
    countParents() {
        let cnt = 0;
        
        for (let i=0; i<this.sets.length; i++) {
            if (this.sets[i] === i) {
                console.log("root: " + i);
                cnt++;
            }
        }
        
        return cnt;
    }
}

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    let ds = new DisjointSet2();
    for (let i=0; i<isConnected.length; i++) {
        for (let j=0; j<isConnected[i].length; j++) {
            if (isConnected[i][j] === 1) {
                ds.union(i, j);
            }
        }
    }
    
    ds.print();
    return ds.countParents();
};

let matrix = [
    [1,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,1,1,0,0,0,0],
    [0,0,0,1,0,1,0,0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,1,0,1,0,0,0,0,1,0],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,1,0],
    [0,0,0,0,1,0,0,0,0,1,0,1,0,0,1],
    [0,0,0,0,1,1,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,1,0,1,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,1]
];

let count = findCircleNum(matrix);
console.log('count should be 3: ' + count);

console.log();

matrix = [[1,0,0,1,1],[0,1,1,0,0],[0,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1]];
count = findCircleNum(matrix);
console.log('count should be 2: ' + count);

console.log();

matrix = [[1,0,0],[0,1,0],[0,0,1]];
count = findCircleNum(matrix);
console.log('count should be 3: ' + count);

console.log();

matrix = [[1,1,0],[1,1,0],[0,0,1]];
count = findCircleNum(matrix);
console.log('count should be 2: ' + count);

