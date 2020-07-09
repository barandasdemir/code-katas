function binarySwap(input) {
  if (typeof input === 'function') {
    return binarySwap(input());
  }

  if (typeof input === 'object') {
    return (input.length > 1)
      ? input.map(e => binarySwap(e))
      : binarySwap(input[0]);
  }

  return (Number(input) + 1) % 2;
}

console.log(binarySwap(0), 1);
console.log(binarySwap(1), 0);
console.log(binarySwap('0'), 1);
console.log(binarySwap('1'), 0);
console.log(binarySwap([1, 0]), [0, 1]);
console.log(binarySwap(['1', 0, '0', 1]), [0, 1, 1, 0]);
console.log(binarySwap([1, [0, ['1', ['0', [1]]]]]), [0, [1, [0, [1, 0]]]]);
console.log(binarySwap(function () {
  return function () {
    return function () {
      return function () {
        return '0';
      }
    }
  }
}), 1);
