class DisjointSet {
    constructor() {
        this.sets = [];
        this.rank = [];
    }

    findRoot(item) {
        if (this.sets[item] === undefined) {
            return -1;
        }

        let originalItem = item;

        while (this.sets[item] !== item) {
            item = this.sets[item];
        }

        // compress the tree so you can find the root quickly next time
        this.sets[originalItem] = item;

        return item;
    }

    union(item1, item2) {
        if ((this.sets[item1] === undefined) || (this.sets[item1] < 0)) {
            this.sets[item1] = item1;
        }

        let rx = this.findRoot(item1);
        let ry = this.findRoot(item2);

        if (rx !== ry) {
            this.sets[item2] = item1;
        }
    }

    connected(item1, item2) {
        let r1 = this.findRoot(item1);
        let r2 = this.findRoot(item2);

        return (r1 === r2);
    }
}

// Tests
let ds = new DisjointSet();
ds.union(1, 2);
ds.union(2, 5);
ds.union(5, 6);
ds.union(6, 7);
ds.union(3, 8);
ds.union(8, 9);

console.log(ds.connected(1, 5));
console.log(ds.connected(5, 7));
console.log(ds.connected(4, 9));

ds.union(9, 4);
console.log(ds.connected(4, 9));
