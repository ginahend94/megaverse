const polyanet = '🪐';
const space = '🌌';
const field = [];

const showField = () => {
  const size = field.length;
  for (let row = 0; row < size; row += 1) {
    console.log(...field[row]);
  }
};

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

generateField();
showField();

const addPolyanet = (row, column) => {
  field[row - 1][column - 1] = polyanet;
  showField();
};
console.log();
addPolyanet(3, 2);

export default addPolyanet;
