const NODE_X=0;
const NODE_Y=1;
const WEIGHT=2;

class SPFA {
    constructor(weights, numNodes, start) {
        this.weights = weights;
        this.numNodes = numNodes;
        this.start = start;

        this.weightMap = new Map();
        this.initMap();

        this.queue = [this.start];
        this.totals = [0];
        for (let i=1; i<this.numNodes; i++) {
            this.totals[i] = Infinity;
        }
    }

    initMap() {
        let edges;
        for (let i=0; i<this.weights.length; i++) {
            edges = this.weightMap.get(this.weights[i][NODE_X]);
            if (!edges) {
                edges = [];
                this.weightMap.set(this.weights[i][NODE_X], edges);
            }

            edges.push({ nodeY: this.weights[i][NODE_Y], weight: this.weights[i][WEIGHT]});
        }

        console.log("weightMap:");
        console.dir(this.weightMap);
    }

    detectNegativeCycle() {

    }

    shortestPath() {
        while (this.queue.length > 0) {
            let nodeX = this.queue.pop();
            let edges = this.weightMap.get(nodeX);
            for (let i=0; i<edges.length; i++) {
                let candidateDistance = this.totals[nodeX] + edges[i].weight; // distance to X + distance to Y
                if (candidateDistance < this.totals[edges[i].nodeY]) {
                    this.totals[edges[i].nodeY] = candidateDistance;  // update with lesser distance
                    this.queue.unshift(edges[i].nodeY);  // node Y was updated so we need to re-calculate everything downstream, so enqueue for (re-)processing
                }
            }
        }

        return (this.totals);
    }
}

run = (edges, numNodes, start) => {
    let spfa = new SPFA(edges, numNodes, start);
    let totals = spfa.shortestPath();

    return totals;
}


let edges = [[0, 1, 100], [0, 2, 500], [0, 3, 200], [1, 2, 100], [2, 3, 100], [3, 1, -150]];
let numNodes = 4;
let start = 0;

let result = run(edges, numNodes, start)
console.log();
console.log();
console.log(result);