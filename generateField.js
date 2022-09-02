const Field = () => {
  const polyanet = '🪐';
  const cometh = '';
  const space = '🌌';
  const field = [];

  const generateField = (size = 11) => {
    // Size is always square: rows x columns
    for (let rows = 0; rows < size; rows += 1) {
      const row = []; // Create empty array for each row
      for (let columns = 0; columns < size; columns += 1) {
        row.push(space); // Add a space cell to row
      }
      field.push(row);
    }
  };

  const showField = () => {
    const size = field.length;
    console.log();
    for (let row = 0; row < size; row += 1) {
      console.log(...field[row]);
    }
    console.log();
  };

  generateField();
  showField();

  const addPolyanet = (row, column) => {
    // parameters are 1-indexed
    field[row - 1][column - 1] = polyanet;
    showField();
  };

  const resetField = () => {
    field.length = 0;
    generateField();
  };

  const getField = () => field;

  return {
    addPolyanet,
    showField,
    resetField,
    getField,
  };
};
const addPolyanet = (row, column) => {
  request('POST', { row, column });
};

const deletePolyanet = (row, column) => {
  request('DELETE', { row, column });
};

const clearField = () => {
  for (let i = 0; i < 29; i++) {
    for (let j = 0; j < 29; j++) {
      deletePolyanet(i, j);
    }
  }
};

const drawCross = (fieldSize) => {
  const border = 2;
  const left = border;
  const right = fieldSize - border - 1;
  const top = border;
  const bottom = fieldSize - border - 1;

  let point1 = left;
  let point2 = right;
  for (let row = top; row <= fieldSize; row++) {
    if (row > bottom) return;
    if (point1 < left || point2 > right) return;
    addPolyanet(row, point1);
    addPolyanet(row, point2);
    point1++;
    point2--;
  }
};
