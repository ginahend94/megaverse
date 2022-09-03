import fetch from 'node-fetch';

const candidateId = '6a98f65e-7883-4566-a536-1670d5be5964';
const url = 'https://challenge.crossmint.io/api/';

const sendRequest = async (args) => {
  const { entity, id, method, ...rest } = { ...args }; // pull out only body args
  const res = await fetch(`${url}${entity}s`, {
    method,
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
  // get goal map array
  const res = await fetch(`${url}map/${candidateId}/goal`);
  const data = await res.json();
  if (!res.ok) console.error('Error: ', res.status, res.statusText);
  else console.log('success, goal received');
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
      id: count, //test
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
    count++; // test
    return filtered;
  }, []);
  if (currentRow.length) callers.push(currentRow); // filters out empty arrays
  return callers;
}, []);

// console.log(callers);

const postEntitiy = async (args) => {
  const argsObj = {
    ...args,
    method: 'POST',
  };
  await sendRequest(argsObj)
}

const postAll = async () => {
  for (const row of callers) {
    for (const caller of row) {
      await postEntitiy(caller);
    }
  }
}

postAll();

// FAKE API for TESTING
const random = () => Math.floor(Math.random() * 10);
const writeId = async (item) => {
  const rand = random();
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(item);
      resolve();
      console.log(`Resolved after ${rand} seconds.`);
    }, 1000 * rand);
  });
};

// DELETION CODE

const deleteEntity = async (args) => {
  const argsObj = {
    ...args,
    method: 'DELETE',
  };
  await sendRequest(argsObj);
};

const test = [
  [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ],
  [
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ],
];

const deleteAll = async () => {
  for (const row of callers) {
    for (const caller of row) {
      await deleteEntity(caller);
    }
    console.log('Finished row');
  }
  console.log('done');
};
