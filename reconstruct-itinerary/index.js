class Itinerary {
    constructor(tickets) {
        this.tickets = tickets;
        this.map = new Map();
        this.initMap();
        this.sortMap();
        this.visited = new Map();
        // console.log(this.map);
    }
    
    initMap() {
        let routes;
        
        for (let i=0; i<this.tickets.length; i++) {
            routes = this.map.get(this.tickets[i][0]);    
            if (routes === undefined) {
                routes = [];
            } 

            routes.push(this.tickets[i][1]);
            this.map.set(this.tickets[i][0], routes);
        }
    }
    
    sortMap() {
        let keys = this.map.keys();
        let key = keys.next();
        let values;
        
        while (key.value) {
            // console.log('key: ' + key.value);
            values = this.map.get(key.value);
            // console.log('values:');
            // console.dir(values);
            values.sort();  // sort abc
            key = keys.next();
        }
    }
    
//     allVisited(destinations) {
//         for (let i=0; i<destinations.length; i++) {
//             if (!this.visited[destinations]) {
//                 return false;
//             }
//         }
        
//         return true;
//     }
    
    findAllItineraries(all, itin, start) {
        // console.log("enter findAllItineraries: " + start);
        let destinations = this.map.get(start);
        // console.log("destinations:");
        // console.dir(destinations);
        
        if (itin.length === (this.tickets.length + 1)) {  // add 1 to account for the start city
            // clone the array so that we can backtrack
            all.push(itin.slice());
            
            return true;
        }
        
        if (destinations === undefined) {
            return false;
        }
        
        for (let i=0; i < destinations.length; i++) {
                if (!this.visited.get(start + "_" + i)) {
                    // console.log("searching destination: " + i + ": " + destinations[i]);
                    this.visited.set(start + "_" + i, true);
                    itin.push(destinations[i]);
                    let res = this.findAllItineraries(all, itin, destinations[i]);
                    // backtrack to find next set of possible paths
                    itin.pop();
                    this.visited.set(start + "_" + i, false);
                    
                    if (res) {
                        return res;
                    }
                }
            }
        
        return false;
    }
    
//     pathToString(path) {
//         let str = "";
//         for (let i=0; i<path.length; i++) {
//             str += path[i];
//         }
        
//         return str;
//     }
    
//     findShortestPath(itineraries) {
//         if (itineraries.length > 0) {
//             let shortestIndex = 0;
//             let shortestSize = Number.MAX_SAFE_INTEGER;
//             let shortestString;

//             for (let i=0; i<itineraries.length; i++) {
//                 if (itineraries[i].length < shortestSize) {
//                     shortestSize = itineraries[i].length;
//                     shortestIndex = i;
//                     shortestString = this.pathToString(itineraries[i]);
//                 } else if (itineraries[i].length === shortestSize) {
//                     let pathStr = this.pathToString(itineraries[i]);
//                     if ((shortestString === undefined) || (pathStr < shortestString)) {
//                         shortestString = pathStr;
//                         shortestIndex = i;
//                         shortestSize = itineraries[i].length;
//                     }
//                 }
//             }
            
//             return itineraries[shortestIndex];
//         } else {
//             return [];
//         }
//     }
}

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
    let it = new Itinerary(tickets);
    let all = []
    it.findAllItineraries(all, ['JFK'], 'JFK');
    // console.log("all: ");
    // console.dir(all);
    // let shortest = it.findShortestPath(all);
    let shortest = all[0];
    
    return shortest;
};

let tickets = [["EZE","AXA"],["TIA","ANU"],["ANU","JFK"],["JFK","ANU"],["ANU","EZE"],["TIA","ANU"],["AXA","TIA"],["TIA","JFK"],["ANU","TIA"],["JFK","TIA"]];
console.log(findItinerary(tickets));
