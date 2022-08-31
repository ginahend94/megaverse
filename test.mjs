import fetch from 'node-fetch';

const candidateId = '6a98f65e-7883-4566-a536-1670d5be5964';
// const url = 'https://challenge.crossmint.io/api/';
const url = 'https://jsonplaceholder.typicode.com/posts/';

const request = async (args) => {
  if (args.entity == 'space') return; // no need to call api
  const { entity, ...rest } = { ...args }; // pull out only body args
  // console.log(`${url}${entity.toLowerCase()}s`);
  // const res = await fetch(`${url}${entity}s`, {
  const res = await fetch(`${url}`, {
    // TEST
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      candidateId,
      ...rest,
    }),
  });
  console.log(await res.json());
  if (!res.ok) {
    console.log(args);
    throw new Error(`Error: ${res.status}, ${res.statusText}`);
    // console.error(res.status, res.statusText);
  }
};

const goal = await (async () => {
  // const res = await fetch(`${url}map/${candidateId}/goal`);
  const res = await fetch(
    `https://challenge.crossmint.io/api/map/${candidateId}/goal`
  );
  const data = await res.json();
  return data.goal;
})();

const callers = goal
  .map((row, i) => {
    // iterates through each row in goal
    return row.map((item, j) => {
      item = item.toLowerCase();
      // iterates through each item in row
      const itemArr = item.split('_'); // split each item by '_'
      const argsObj = {
        // object that will be returned
        row: i,
        column: j,
      };
      let entity;
      if (itemArr.length > 1) {
        entity = itemArr[1];
        // Create direction or color argument
        if (entity == 'cometh') argsObj.direction = itemArr[0];
        if (entity == 'soloon') argsObj.color = itemArr[0];
      } else entity = itemArr[0];
      argsObj.entity = entity;
      return argsObj;
    });
  })
  .flat(); // flatten nested arrays

callers.forEach((caller) => request(caller));
// console.log(callers[37])

console.log(); // separates old code

// const Field = () => {
//   const polyanet = '🪐';
//   const cometh = '';
//   const space = '🌌';
//   const field = [];

//   const generateField = (size = 11) => {
//     // Size is always square: rows x columns
//     for (let rows = 0; rows < size; rows += 1) {
//       const row = []; // Create empty array for each row
//       for (let columns = 0; columns < size; columns += 1) {
//         row.push(space); // Add a space cell to row
//       }
//       field.push(row);
//     }
//   };

//   const showField = () => {
//     const size = field.length;
//     console.log();
//     for (let row = 0; row < size; row += 1) {
//       console.log(...field[row]);
//     }
//     console.log();
//   };

//   generateField();
//   showField();

//   const addPolyanet = (row, column) => {
//     // parameters are 1-indexed
//     field[row - 1][column - 1] = polyanet;
//     showField();
//   };

//   const resetField = () => {
//     field.length = 0;
//     generateField();
//   };

//   const getField = () => field;

//   return {
//     addPolyanet,
//     showField,
//     resetField,
//     getField,
//   };
// };
// const addPolyanet = (row, column) => {
//   request('POST', { row, column });
// };

// const deletePolyanet = (row, column) => {
//   request('DELETE', { row, column });
// };

// const clearField = () => {
//   for (let i = 0; i < 29; i++) {
//     for (let j = 0; j < 29; j++) {
//       deletePolyanet(i, j);
//     }
//   }
// };

// const drawCross = (fieldSize) => {
//   const border = 2;
//   const left = border;
//   const right = fieldSize - border - 1;
//   const top = border;
//   const bottom = fieldSize - border - 1;

//   let point1 = left;
//   let point2 = right;
//   for (let row = top; row <= fieldSize; row++) {
//     if (row > bottom) return;
//     if (point1 < left || point2 > right) return;
//     addPolyanet(row, point1);
//     addPolyanet(row, point2);
//     point1++;
//     point2--;
//   }
// };
