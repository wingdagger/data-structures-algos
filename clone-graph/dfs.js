const map = new Map();

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    if (node === null) {
        return null;
    }
    
    if (map.get(node.val) !== undefined) {
        return map.get(node.val);
    }

    let result = new Node(node.val, []);
    map.set(node.val, result);
    let neighbor;
    
    for (let i=0; i<node.neighbors.length; i++) {
        neighbor = cloneGraph(node.neighbors[i]);       
        result.neighbors.push(neighbor);
    }
    
    // console.dir(result);
    
    return result;
};

