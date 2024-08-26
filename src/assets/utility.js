// Returns random number in range 1-6
export function random() {
  return Math.floor(Math.random() * 6) + 1;
}

// returns 10 random numbers in the range 1-6
export function tenRandomValues() {
  const newArr = [];
  for (let i = 0; i < 10; i++) {
    newArr.push(random());
  }
  return newArr;
}

// generates object arrray made of random numbers for the state of dice
export function reinitialiseDice() {
  const newArr = tenRandomValues().map((val) => {
    return {
      value: val,
      selected: false,
    };
  });
  return newArr;
}
