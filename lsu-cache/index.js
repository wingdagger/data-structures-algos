class Node {
    constructor() {
        this.previous = null;
        this.next = null;
        this.key = null;
        this.val = null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.head = null;
    this.tail = null;
    this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let node = this.map.get(key);
    if (node) {
        if (node !== this.head) {
            // console.log("this.head");
            // console.log(this.head);
            // console.log("node:");
            // console.dir(node);
            if (node.previous) {
                node.previous.next = node.next;
            }
        
            if (node.next) {
                node.next.previous = node.previous;
            } else {
                this.tail = node.previous;
                this.tail.next = null;
            }
        
            node.previous = null;
            this.head.previous = node;
            node.next = this.head;
            this.head = node;
        }
        
        return node.val;
    } else {
        return -1;
    }
    
};

LRUCache.prototype.checkForEviction = function() {
    if (this.size >= this.capacity) {
        this.map.delete(this.tail.key);

        // this.printList();
        // console.log("tail:");
        // console.dir(this.tail);
        this.tail = this.tail.previous;
        
        if (this.tail) {
            this.tail.next = null;
        }
        this.size--;
        // console.log("map: ");
        // console.dir(this.map);
        return this.tail;
    } else {
        return null;
    }
}


LRUCache.prototype.printList = function() {
    console.log("linked list:");
    let node = this.head;
    while (node) {
        console.dir(node);
        node = node.next;
    }
}

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let node = this.map.get(key);
    if (!node) {
        if (this.head === null) {
            node = new Node();
            node.key = key;
            node.val = value;
            this.head = node;
            this.tail = node;
            this.map.set(key, node);
            this.size++;
        } else {
            let evicted = this.checkForEviction();
            node = new Node();
            node.key = key;
            node.val = value;
            this.head.previous = node;
            node.next = this.head;
            this.head = node;
            this.map.set(key, node);
            this.size++;
            if (this.size === 1) {
                this.tail = this.head;
            }
            
            // console.log("head:");
            // console.dir(this.head);
            // this.printList();
        }
    } else {
        node.val = value;
        if (node !== this.head) {
            node.previous.next = node.next;
            if (node.next) {
                node.next.previous = node.previous;
            } else {
                this.tail = node.previous;
                this.tail.next = null;
            }
        
            node.previous = null;
            this.head.previous = node;
            node.next = this.head;
            this.head = node;
        }
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


let lru = new LRUCache(2);
lru.put(1,1);
lru.put(2,2);
console.log(lru.get(1));
lru.put(3,3);
console.log(lru.get(2));