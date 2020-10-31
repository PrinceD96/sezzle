export const numbers = [
  { label: 7, className: "number" },
  { label: 8, className: "number" },
  { label: 9, className: "number" },
  { label: 4, className: "number" },
  { label: 5, className: "number" },
  { label: 6, className: "number" },
  { label: 1, className: "number" },
  { label: 2, className: "number" },
  { label: 3, className: "number" },
  { label: 0, className: "number" },
  { label: '00', className: "number" },
  { label: '.', className: "number" },
];

export const operators1 = [
  { label: "C", className: "operator1" },
  { label: "+/-", className: "operator1" },
  { label: "%", className: "operator1" },
  { label: "/", className: "operator2" }
];

export const operators2 = [
  { label: "x", className: "operator2" },
  { label: "-", className: "operator2" },
  { label: "+", className: "operator2" },
  { label: "=", className: "equal" },
];


export const buttonMapper = (array, op, callback) =>
  array.map(({ label, className }, index) => (
    <button
      value={label}
      key={index}
      className={className}
      onClick={callback}
    >
      {label}
    </button>
  ))

export const isParenthesesNeeded = (op, value) => {
  if (!op) {
    return false;
  }

  if (op === value) {
    return false;
  }

  switch (value) {
    case "+":
    case "-":
      return !(op === "+" || op === "-");
    case "/":
    case "*":
      return !(op === "/" || op === "*");
    default:
      return true;
  }
};
