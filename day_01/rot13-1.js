function rot13(message) {
  return message.split('').map(char => {
    let c = char.charCodeAt(0);
    if (c >= 65 && c <= 90) {
      c = (c + 13) % 91;
      c = (c <= 65) ? c + 65 : c;
    } else if (c >= 97 && c <= 122) {
      c = (c + 13) % 123;
      c = (c <= 97) ? c + 97 : c;
    }
    return String.fromCharCode(c);
  }).join('');
}
// definitely can be better

console.log("grfg" == rot13("test"), "output: " + rot13("test"));
console.log("Grfg" == rot13("Test"), "output: " + rot13("Test"));
