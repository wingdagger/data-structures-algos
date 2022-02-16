class Heap {
    constructor(size) {
        this.heap = [];

        // if (size && size > 0) {
        //     for (let i=0; i<size; i++) {
        //         this.heap[i] = null;
        //     }
        // }
    }

    populate(values) {
        for (let i=0; i<values.length; i++) {
            this.insert(values[i]);
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        let parent = this.getParent(index);
        if ((parent !== undefined) && (this.heap[index] > this.heap[parent])) {
            this.swap(index, parent);
            this.heapifyUp(parent);
        }
    }

    heapifyDown(index) {
        let left = this.getLeft(index);
        let right = this.getRight(index);

        if ((left > this.heap.length - 1) && (right > this.heap.length - 1)) {
            return;
        }

        // console.log("index: " + index);
        // console.log("left: " + left);
        // console.log("right: " + right);
        // console.log("heap size: " + this.heap.length);
        // console.log("index value: " + this.heap[index]);
        // console.log("left value: " + this.heap[left]);
        // console.log("right value: " + this.heap[right]);

        if ((this.heap[index] < this.heap[left]) ||
            (this.heap[index] < this.heap[right])) {
                if ((right > this.heap.length -1) || (this.heap[left] > this.heap[right])) {
                    this.swap(index, left);
                    this.heapifyDown(left);
                } else {
                    this.swap(index, right);
                    this.heapifyDown(right);
                }
        }

        // let largestIndex = index;

        // if ((left < this.heap.length) && (this.heap[index] < this.heap[left])) {
        //     largestIndex = left;
        // } 
        
        // if ((right < this.heap.length) && (this.heap[index] <= this.heap[right])) {
        //     largestIndex = right;
        // }

        // if (largestIndex !== index) {
        //     this.swap(index, largestIndex);
        //     this.heapifyDown(largestIndex);
        // }

    }

    swap (a, b) {
        let tmp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = tmp;
    }

    popMax() {
        let head = this.heap[0];
        let end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown(0);
        }

        return head;
    }

    getLeft(index) {
        let lIndex = 2*index + 1;
        return lIndex;
    }

    getRight(index) {
        let rIndex = 2*index + 2;
        return rIndex;
    }

    getParent(index) {
        if (index === 0) {
            return;
        }

        let parent = Math.floor((index - 1) / 2);
        return parent;
    }

    isLeaf(index) {

    }

    printMax () {
        console.log(this.heap[0]);
    }

    print() {
       console.log(this.heap);
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

let heap = new Heap();
heap.populate([3,7,2]);
while(!heap.isEmpty()) {
    heap.print();
    console.log(heap.popMax());
    sleep(300);
}


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}