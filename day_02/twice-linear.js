function dblLinear(n) {
  const set = new Set([1]);
  let arr = [];
  while (set.size < n * 5) {
    set.forEach(x => {
      arr.push(2 * x + 1);
      arr.push(3 * x + 1);
    });
    arr.forEach(x => {
      set.add(x);
    });
    arr = [];
  }
  return [...set].sort((a, b) => a - b)[n];
}

console.log(dblLinear(10), 22);
console.log(dblLinear(20), 57);
console.log(dblLinear(30), 91);
console.log(dblLinear(50), 175);
console.log(dblLinear(100), 447);
