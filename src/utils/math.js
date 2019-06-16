const generateRandomIntNumber = max => Math.floor(Math.random() * Math.floor(max));

const generateRandomIntNumberArray = (length, max) => {
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    arr.push(generateRandomIntNumber(max));
  }
  return arr;
};

const shuffleArray = arr => arr.sort(() => (Math.floor(Math.random() - 0.5) === 0 ? 1 : -1));

export {generateRandomIntNumber, generateRandomIntNumberArray, shuffleArray};
