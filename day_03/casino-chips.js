// passes all test but times out for some reason
// appearantly there's an O(1) solution but i'm kinda bad at math

function solve(arr) {
  let day = 0;
  while (arr.length > 1) {
    arr = arr.sort((a, b) => a - b);
    arr[0] -= 1;
    arr[arr.length - 1] -= 1;
    arr = arr.filter(v => v !== 0);
    day++;
  }
  return day;
}

console.log(solve([1, 1, 1]), 1);
console.log(solve([1, 2, 1]), 2);
console.log(solve([4, 1, 1]), 2);
console.log(solve([8, 2, 8]), 9);
console.log(solve([8, 1, 4]), 5);
console.log(solve([7, 4, 10]), 10);
console.log(solve([12, 12, 12]), 18);
console.log(solve([1, 23, 2]), 3);
console.log(solve([10, 5, 1]), 6);
