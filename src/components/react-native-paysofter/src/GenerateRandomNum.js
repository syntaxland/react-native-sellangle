// GenerateRandomNum.js
export const generateRandomNum = (digits) => {
  let num = "";
  for (let i = 0; i < digits; i++) {
    num += Math.floor(Math.random() * 10).toString();
  }
  return num;
};
