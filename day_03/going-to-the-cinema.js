function movie(card, ticket, perc) {
  let a = ticket,
    lastTicket = (ticket * perc),
    b = card + lastTicket,
    n = 1;

  while (Math.ceil(b) >= a) {
    a += ticket;
    b += lastTicket * perc;
    lastTicket *= perc;
    n++;
  }
  return n;
};

console.log(movie(500, 15, 0.9), 43)
console.log(movie(100, 10, 0.95), 24)
