// There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

// You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

const SRC = 0;
const DEST = 1;
const COST = 2;

class BellmanFordAlgo {
    constructor (n, flights, src, dest, stops) {
        this.n = n;
        this.flights = flights;
        this.src = src;
        this.dest = dest;
        this.stops = stops;
        
        this.previous = [];
        for (let i=0; i<n; i++) {
            this.previous[i] = Infinity;
        }
        this.previous[this.src] = 0;
        
        this.next = [];
        for (let i=0; i<n; i++) {
            this.next[i] = Infinity;
        }
        this.next[this.src] = 0;
    }
    
    find () {
        let start = this.start;

        for (let iter=0; iter <= this.stops; iter++) {
            for (let i=0; i<this.flights.length; i++) {
                    this.next[this.flights[i][DEST]] = Math.min(this.next[this.flights[i][DEST]], this.previous[this.flights[i][SRC]] + this.flights[i][COST]);
            }
        
            this.previous = this.next;
            this.next = [];
            for (let i=0; i<this.n; i++) {
                this.next[i] = Infinity;
            }
            this.next[this.src] = 0;        
        }
        
        return this.previous[this.dest];
    }
}

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    let bf = new BellmanFordAlgo(n, flights, src, dst, k);
    let result = bf.find();
    
    // console.dir(result);

    if (result === Infinity) {
        return -1;
    }
    
    return result;
};

let n = 3;
let flights = [[0,1,100],[1,2,100],[0,2,500]];
let src = 0;
let dst = 2;
let k = 1;

console.log(findCheapestPrice(n, flights, src, dst, k));

n = 3;
flights = [[0,1,2],[1,2,1],[2,0,10]];
src = 1;
dst = 2;
k = 1;

console.log(findCheapestPrice(n, flights, src, dst, k));
