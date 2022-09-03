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
    const data = await res.json();
    console.log(data);
    console.log(args);
    throw new Error(`Error: ${res.status}, ${res.statusText}`);
  }
};

const goal = await (async () => {
  // get goal map array
  const res = await fetch(`${url}map/${candidateId}/goal`);
  const data = await res.json();
  if (!res.ok) console.error('Error: ', res.status, res.statusText);
  return data.goal;
})();

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
  await sendRequest(argsObj);
};

const postAll = async () => {
  for (const row of callers) {
    for (const caller of row) {
      await postEntitiy(caller);
    }
  }
};

postAll();

// To delete entities
const deleteEntity = async (args) => {
  const argsObj = {
    ...args,
    method: 'DELETE',
  };
  await sendRequest(argsObj);
};
const deleteAll = async () => {
  for (const row of callers) {
    for (const caller of row) {
      await deleteEntity(caller);
    }
    console.log('Finished row');
  }
  console.log('done');
};
