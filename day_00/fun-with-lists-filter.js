function Node(data, next = null) {
  this.data = data;
  this.next = next;
}

function filter(head, p) {
  if (head) {
    if (p(head.data)) {
      return (head.next !== null) ? new Node(head.data, filter(head.next, p)) : new Node(head.data);
    }
    return (head.next !== null) ? filter(head.next, p) : null;
  }
  return null;
}

console.log(null, x => false, null);
console.log(filter(new Node(1, new Node(2, new Node(3))), x => true), new Node(1, new Node(2, new Node(3))));
console.log(filter(new Node(1, new Node(2, new Node(3))), x => x >= 2), new Node(2, new Node(3)));
console.log(filter(new Node(1, new Node(2, new Node(3))), x => x === 1), new Node(1));
