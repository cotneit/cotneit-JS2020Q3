/* eslint-disable import/prefer-default-export */
function appendZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

export {
  appendZero,
};
