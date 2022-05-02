export const getRandomNum = (min, max) => {
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
};

export let randomNum;
