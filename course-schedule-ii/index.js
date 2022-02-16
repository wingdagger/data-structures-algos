// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

const NEXT_COURSE=0;
const PREREQ=1;

class TopoSort {
    constructor (numCourses, prereqs) {
        this.numCourses = numCourses;
        this.prereqs = prereqs;
        this.prereqsMap = new Map();
        this.nextMap = new Map();
        this.inDegree = new Map();
        this.queue = [];
        this.initPrereqsMap();
        this.result = [];
        this.visited = new Set();
    }
    
    initPrereqsMap () {
        for (let i=0; i<this.prereqs.length; i++) {
            let prereqCourses = this.prereqsMap.get(this.prereqs[i][NEXT_COURSE]);
            if (!prereqCourses) {
                prereqCourses = new Set();
                this.prereqsMap.set(this.prereqs[i][NEXT_COURSE], prereqCourses);
            }
            prereqCourses.add(this.prereqs[i][PREREQ]);
            
            let nextCourses = this.nextMap.get(this.prereqs[i][PREREQ]);
            if (!nextCourses) {
                nextCourses = new Set();
                this.nextMap.set(this.prereqs[i][PREREQ], nextCourses);
            }
            nextCourses.add(this.prereqs[i][NEXT_COURSE]);
        }
        
        let keys = this.prereqsMap.keys();
        for (let i=0; i<this.numCourses; i++) {
            let incount = this.prereqsMap.get(i) ? this.prereqsMap.get(i).size : 0;
            // initialize queue.  if a course has no prereqs, then 
            // add it to the initial queue.
            if (incount === 0) {
                this.queue.unshift(i);
            }
            
            this.inDegree.set(i, incount);
        }
    }
    
    isCycle(item, stack) {
        this.visited.add(item);
        stack.push(item);
        
        let nextCourses = this.nextMap.get(item);
        if (nextCourses) {
            let keys = nextCourses.keys();
        
            while ((item = keys.next().value) !== undefined) {
                if (this.visited.has(item) && stack.indexOf(item) > -1) {
                    return true;
                } else {
                    if (this.isCycle(item, stack)) {
                        return true;
                    }
                }
                
                stack.pop();
            }
        }
        
        return false;
    }
    
    detectCycles() {
        for (let i=0; i<this.numCourses; i++) {
            this.visited.clear();
            if (this.isCycle(i, [])) {
                return true;
            }
        }
        
        return false;
    }

    sort() {
        var key;
        
        while (this.queue.length > 0) {
            let course = this.queue.pop();
            this.result.push(course);
            let nextCourses = this.nextMap.get(course);
            
            if (nextCourses) {
                let keys = nextCourses.keys();
                while((key = keys.next().value) !== undefined) {
                    // remove 1 from the in count
                    let newInCount = this.inDegree.get(key) - 1;
                    this.inDegree.set(key, newInCount);
                    if (newInCount === 0) {
                        this.queue.unshift(key);
                    }
                }
            }
        }
        
        // detect cycles
        for (let i=0; i<this.numCourses; i++) {
            if (this.inDegree.get(i) !== 0) {
                return [];
            }
        }
        
        return this.result;
    }
}

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    let topoSort = new TopoSort(numCourses, prerequisites);
    // let hasCycle = topoSort.detectCycles();
    // if (hasCycle) {
    //     return [];
    // } else {
        let result = topoSort.sort();
        return result;
    // }
};

let numCourses = 4;
let prereqs = [[0,1],[3,1],[1,3],[3,2]];
console.log(findOrder(numCourses, prereqs));

numCourses = 3;
prereqs = [[1,0],[1,2],[0,1]];
console.log(findOrder(numCourses, prereqs));

numCourses = 2;
prereqs = [[1,0]];
console.log(findOrder(numCourses, prereqs));

numCourses = 4;
prereqs = [[1,0],[2,0],[3,1],[3,2]];
console.log(findOrder(numCourses, prereqs));

numCourses = 1;
prereqs = [];
console.log(findOrder(numCourses, prereqs));
