export const engine = (n1, op, n2) => {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);

  switch (op) {
    case "/":
      return n1 / n2;
    case "x":
      return n1 * n2;
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    default:
      return n1;
  }
};