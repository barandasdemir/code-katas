String.prototype.toJadenCase = function () {
  return this.replace(/(^\w|\s[a-z])/g, c => c.toUpperCase());
};

console.log("How can mirrors be real if our eyes aren't real".toJadenCase(), "How Can Mirrors Be Real If Our Eyes Aren't Real");
