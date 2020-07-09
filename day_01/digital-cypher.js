function encode(str, n) {
  return str.split('').map((c, i) => {
    const nx = n.toString().split('');
    return Number(nx[i % nx.length]) + (c.charCodeAt(0) - 96);
  });
}

console.log(encode("scout", 1939), [20, 12, 18, 30, 21]);
console.log(encode("masterpiece", 1939), [14, 10, 22, 29, 6, 27, 19, 18, 6, 12, 8]);
