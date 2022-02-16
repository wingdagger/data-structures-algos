/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let l3 = new ListNode();
    let head = l3;
    let nextVal = 0;
    while ((l1 && (l1.val !== undefined)) || (l2 && (l2.val !== undefined))) {
        if (l3.next) l3 = l3.next;

        let l1Val = (l1 && l1.val) ? l1.val : 0;
        let l2Val = (l2 && l2.val) ? l2.val : 0;
        let result = +l1Val + +l2Val + +nextVal;
        l3.val = result % 10;
        nextVal = Math.floor(result / 10);
        l3.next = new ListNode();
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    if (nextVal > 0) {
        l3.next.val = nextVal;
    } else {
        l3.next = null;
    }
    
    return head;
};


var l1 = new ListNode(2, new ListNode (4, new ListNode(3)));
var l2 = new ListNode(5, new ListNode (6, new ListNode(4)));

let l3 = addTwoNumbers(l1, l2);

process.stdout.write(l3.val.toString());
while (l3.next) {
    l3 = l3.next;
    process.stdout.write(l3.val.toString());
}
