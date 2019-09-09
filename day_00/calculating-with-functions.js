function zero(n) { return n ? n(0) : 0; }
function one(n) { return n ? n(1) : 1; }
function two(n) { return n ? n(2) : 2; }
function three(n) { return n ? n(3) : 3; }
function four(n) { return n ? n(4) : 4; }
function five(n) { return n ? n(5) : 5; }
function six(n) { return n ? n(6) : 6; }
function seven(n) { return n ? n(7) : 7; }
function eight(n) { return n ? n(8) : 8; }
function nine(n) { return n ? n(9) : 9; }
function plus(n) { return o => o + n;}
function minus(n) { return o => o - n;}
function times(n) { return o => o * n;}
function dividedBy(n) { return o => Math.floor(o / n);}

console.log(seven(times(five())), 35);
console.log(four(plus(nine())), 13);
console.log(eight(minus(three())), 5);
console.log(six(dividedBy(two())), 3);
