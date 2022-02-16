class LinkedList {
    constructor () {
        this.key;
        this.val;
        this.next;
    }
}


var MyHashMap = function() {
    let initSize = 2069;
    this.tbl = [];
    this.tbl.length = initSize;

    this.count = 0;    
};


MyHashMap.prototype.getHash = function (key) {
//     key = key.toString();
//     let utf = 0;
//     for (let i=0; i<key.length; i++) {
//         utf += key.charCodeAt(i);
//     }
 
//     return utf % this.tbl.length;
    return key % this.tbl.length;
}

MyHashMap.prototype.size = function () {
    return this.count;
}

MyHashMap.prototype.print = function () {
    console.dir(this.tbl);
}



/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
        let hash = this.getHash(key);
        let ll = this.tbl[hash];
        let prev;
            
        while (ll) {
            if (ll.key === key) {
                // count--;
                ll.val = value;
                return;
            } else {
                prev = ll;
                ll = ll.next;
            }
        }

        ll = new LinkedList();
        ll.key = key;
        ll.val = value;

        if (prev) {
            prev.next = ll;
        } else {
            this.tbl[hash] = ll;
        }

        this.count++;    
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
        let index = this.getHash(key);

        // if (index === 1970) {
        //     console.log("get: " + key);
        //     console.dir(this.tbl[index]);
        // }
            // if (key === 47488) {
            //     console.log("key: " + key);
            //     console.log("index: " + index);
            //     console.dir(this.tbl[index]);
            //     // this.print();
            // }


        if (index !== undefined) {
            let ll = this.tbl[index];
            while (ll) {
                if (ll.key === key) {
                    return ll.val
                } else {
                    ll = ll.next;
                }
            }
        } 

        return -1;
        // throw Error("Get failed. key not found: " + key);
    
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
        let index = this.getHash(key);
        let prev;
    
        // if (index === 1970) {
        //     console.log("delete: " + key);
        //     console.dir(this.tbl[index]);
        // }

    

        if (index !== undefined) {
            let ll = this.tbl[index];
            while (ll) {
                if (ll.key === key) {
                    if (prev) {
                        prev.next = ll.next;
                    } else {
                        this.tbl[index] = ll.next;
                    }
                    
                    this.count--;
                    return;
                } else {
                    prev = ll;
                    ll = ll.next;
                }
            }
        }

        // throw Error("Cannot delete.  key not found: " + key);    
};

/** 
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

// Tests
let hTbl = new MyHashMap();
hTbl.put("hello", "world");
hTbl.put("foo", "foo2");
hTbl.put("bang", "bang3");
hTbl.put("bar", "bar2");
hTbl.put("baz", "baz3");
// hTbl.print();
if (hTbl.size() === 5) {
    console.log("set test passed");
} else {
    throw Error("test failed. size() method expected 5, got: " + hTbl.size());
}
var result = hTbl.get("bang");
if (result === "bang3") {
    console.log("get test passed");
} else {
    throw Error("test failed. get(), expected world. got: " + result);
}
hTbl.remove("hello");
if (hTbl.size() === 4) {
    console.log("delete test passed");
} else {
    throw Error("test failed. delete(). expected size 0. got: " + hTbl.size());
}

// hTbl.remove("foo");

console.log(hTbl.get("bar"));

hTbl.put(1, 1);
hTbl.put(0, 5);
hTbl.print();
hTbl.put(2, 2);
hTbl.put(3, 0);
hTbl.put(2070, 2);
console.log(hTbl.get(0));
console.log(hTbl.get(2070));
hTbl.remove(2070);
console.log(hTbl.get(2070));
console.log(hTbl.get(0));