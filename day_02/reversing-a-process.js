function decode(r) {
  const proc = r.match(/[0-9]*/)[0];
  const data = r.slice(proc.length);
  const dict = [];
  for (let i = 0; i < 26; i++) {
    dict.push((i * proc) % 26);
  }
  const uniq = dict.filter((v, i, s) => s.indexOf(v) === i);
  if (uniq.length < 26) return 'Impossible to decode';

  let dec = '';
  for (let i = 0; i < data.length; i++) {
    dec += String.fromCharCode(dict.findIndex(v => v === data.charCodeAt(i) - 97) + 97)
  }
  return dec;
}

console.log(decode("1273409kuqhkoynvvknsdwljantzkpnmfgf"), "uogbucwnddunktsjfanzlurnyxmx");
console.log(decode("1544749cdcizljymhdmvvypyjamowl"), "mfmwhbpoudfujjozopaugcb");
console.log(decode("105860ymmgegeeiwaigsqkcaeguicc"), "Impossible to decode");
console.log(decode("1122305vvkhrrcsyfkvejxjfvafzwpsdqgp"), "rrsxppowmjsrclfljrajtybwviqb");
