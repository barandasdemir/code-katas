function score(dice) {
  let point = 0;
  const amounts = dice.reduce((o, v) => {
    if (o[v]) {
      o[v]++;
    } else {
      o[v] = 1;
    }
    return o;
  }, {});
  Object.keys(amounts).forEach(d => {
    if (amounts[d] >= 3) {
      point += (d == 1) ? 1000 : d * 100;
      amounts[d] -= 3;
    }
  });
  if (amounts['5'] < 3) point += 50 * amounts['5'];
  if (amounts['1'] < 3) point += 100 * amounts['1'];
  return point;
}

console.log(score([1, 1, 1, 1, 2]), 1100);
console.log(score([4, 4, 4, 3, 3]) === 400);
console.log(score([2, 4, 4, 5, 4]) === 450);
