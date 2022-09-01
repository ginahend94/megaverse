import fetch from 'node-fetch';

const candidateId = '6a98f65e-7883-4566-a536-1670d5be5964';
const url = 'https://challenge.crossmint.io/api/';

const request = async (args) => {
  const { entity, id, ...rest } = { ...args }; // pull out only body args
  const res = await fetch(`${url}${entity}s`, {
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
  if (!res.ok) {
    console.log(res);
    const data = await res.json();
    console.log(data);
    console.log(args);
    throw new Error(`Error: ${res.status}, ${res.statusText}`);
  } else {
    console.log('success', id);
  }
};

const goal = await (async () => {
  const res = await fetch(`${url}map/${candidateId}/goal`);
  const data = await res.json();
  if (!res.ok) console.error('Error: ', res.status, res.statusText);
  return data.goal;
})();

let count = 0; // test
const callers = goal.reduce((callers, row, i) => {
  // iterates through each row in goal
  const currentRow = row.reduce((filtered, item, j) => {
    item = item.toLowerCase();
    if (item == 'space') {
      return filtered; // filters out space entities
    }
    // iterates through each item in row
    const itemArr = item.split('_'); // split each item by underscore
    const argsObj = {
      // object that will be returned
      row: i,
      column: j,
      id: count,
    };
    let entity;
    if (itemArr.length > 1) {
      entity = itemArr[1];
      // Create direction or color argument
      if (entity == 'cometh') argsObj.direction = itemArr[0];
      if (entity == 'soloon') argsObj.color = itemArr[0];
    } else entity = itemArr[0];
    argsObj.entity = entity;
    filtered.push(argsObj);
    count++;
    return filtered;
  }, []);
  if (currentRow.length) callers.push(currentRow); // filters out empty arrays
  return callers;
}, []);
// console.log(callers);

// const callAPI = () => {
//   callers.forEach((caller) => {
//     caller.forEach((item) =>
//       setTimeout(() => {
//         request(item);
//       }, 5000)
//     );
//   });
// };

// const interval = setInterval(() => {
//   callAPI();
//   console.log('calling api...');
// }, 10000);
// setTimeout(() => {
//   clearInterval(interval), console.log('stopping interval');
// }, 120000);

// DELETION CODE

const deleteEntity = async (args) => {
  const { entity, id, ...rest } = { ...args }; // pull out only body args
  if (entity == 'space') {
    console.log('space');
    return;
  }
  const res = await fetch(`${url}${entity}s`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      candidateId,
      row: args.row,
      column: args.column,
    }),
  });
  if (!res.ok) {
    console.log(res);
    const data = await res.json();
    console.log(args);
    throw new Error(data);
  } else {
    console.log('success', id);
  }
};

const writeId = async (item) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
      console.log(item.id);
    }, 2000)
  })
}

const deleteAll = () => {
  callers.forEach(async (row) => {
    // console.log(row);
    for (const caller of row) {
      await writeId(caller)
      // console.log(caller)
      // await deleteEntity(caller);
    }
  });
};

deleteAll();

const leftURL =
  'https://raw.githubusercontent.com/ginahend94/megaverse/main/leftovers.json?token=GHSAT0AAAAAABYFSVQSS6NLOYC6UWT2OM36YYP7LSQ';
const leftovers = await (async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
});

// console.log(leftovers)

// leftovers.forEach((item) =>
//   setTimeout(() => {
//     deleteEntity(item);
//   }, 5000)
// );

// const deleteAll = (row, col) => {
//   deleteEntity('polyanet', row, col);
//   deleteEntity('soloon', row, col);
//   deleteEntity('cometh', row, col);
// };

// const clearMegaverse = () => {
//   for (let i = 0; i < 30; i++) {
//     for (let j = 0; j < 30; j++) {
//       console.log(i, j);
//       // deleteAll(i, j);
//     }
//   }
// };

// clearMegaverse();

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
