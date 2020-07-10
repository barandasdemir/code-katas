function uniq(a) {
  if (a.length === 1) return a;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === a[i+1]) {
      a[i] = '\0';
    }
  }
  return a.filter(x => x !== '\0');
}

// one-liner
function uniq(a) {
  return a.filter((v, i) => i === 0 || v !== a[i - 1]);
}

// actually a real one-liner would be
// const uniq = (a) => a.filter((v, i) => i === 0 || v !== a[i - 1]);

console.log(uniq(['a', 'a', 'b', 'b', 'c', 'a', 'b', 'c', 'c']), "['a', 'b', 'c', 'a', 'b', 'c']");
console.log(uniq(['a', 'a', 'a', 'a', 'a',]), "['a']");
console.log(uniq([undefined]), "[undefined]");
