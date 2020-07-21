function whoIsNext(names, r) {
  let amount = names.length,
    total = amount,
    num = 0,
    i = 0;

  while (total < r) {
    total += amount * Math.pow(2, ++num);
  }
  let base = total - amount * Math.pow(2, num);
  for (i = 0; base < r; i++) {
    base += Math.pow(2, num);
  }
  return names[i - 1];
}

const names = ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"];
console.log(whoIsNext(names, 1), "Sheldon");
console.log(whoIsNext(names, 52), "Penny");
console.log(whoIsNext(names, 7230702951), "Leonard");
