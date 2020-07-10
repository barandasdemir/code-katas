function capitalize(s, arr) {
  const str = s.split('');
  arr.forEach(i => {
    str[i] = (str[i]) ? str[i].toUpperCase() : '';
  });
  return str.join('');
};

// technically the same but better-ish way to do
function capitalize(s, arr) {
  return s.split('').map((c, i) => arr.includes(i) ? c.toUpperCase() : c).join('');
};

console.log(capitalize("abcdef", [1, 2, 5]), 'aBCdeF');
console.log(capitalize("abcdef", [1, 2, 5, 100]), 'aBCdeF');
console.log(capitalize("codewars", [1, 3, 5, 50]), 'cOdEwArs');
console.log(capitalize("abracadabra", [2, 6, 9, 10]), 'abRacaDabRA');
console.log(capitalize("codewarriors", [5]), 'codewArriors');
console.log(capitalize("indexinglessons", [0]), 'Indexinglessons');
