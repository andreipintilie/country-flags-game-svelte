function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const renderAsList = (array: Array<any>, index: number) => {
  return Object.entries(array).length > 1 &&
    index + 1 !== Object.entries(array).length
    ? ", "
    : "";
};

export { shuffleArray, renderAsList };
