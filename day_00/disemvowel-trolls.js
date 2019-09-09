// first pass at this
function disemvowel(str) {
  const vowels = {
    a: 'a',
    e: 'e',
    i: 'i',
    o: 'o',
    u: 'u',
  }
  return str
    .split('')
    .map(char => (typeof vowels[char.toLowerCase()] === 'undefined') ? char : '')
    .join('');
}

// i knew there was a regex solution
function disemvowel(str) {
  return str.replace(/[aeiou]/gi, '');
}

console.log(disemvowel("This website is for losers LOL!"), "Ths wbst s fr lsrs LL!")
