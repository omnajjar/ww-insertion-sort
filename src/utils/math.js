export function generateRandomIntNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function generateRandomIntNumberArray(length, max) {
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    arr.push(generateRandomIntNumber(max));
  }
  return arr;
}

export function shuffleArray(arr) {
  return arr.sort(() => (Math.floor(Math.random() - 0.5) === 0 ? 1 : -1));
}
