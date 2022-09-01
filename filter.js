const rows = [...document.querySelectorAll('div')];

const ye = rows
  .reduce((filtered, row, i) => {
    const cells = [...row.children].reduce((arr, cell, j) => {
      const entity = cell.textContent;
      let entityName;
      switch (entity) {
        case '🪐':
          entityName = 'polyanet';
          break;
        case '☄️':
          entityName = 'cometh';
          break;
        case '🌕':
          entityName = 'soloon';
          break;
        default:
          entityName = 'space';
      }
      const args = {
        entity: entityName,
        row: i,
        column: j,
      };
      if (entity != '🌌') arr.push(args);
      return arr;
    }, []);
    if (cells.length) filtered.push(cells);
    return filtered;
  }, [])
  .flat();
console.log(ye);

const random = () => Math.ceil(Math.random() * 100);

const arr = (() => {
  let array = [];
  for (let i = 0; i < 100; i++) {
    array.push(random());
  }
  return array;
})();

console.log(arr);

const respond = async (num) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${num}`);
  const data = await res.json();
  return data;
};

const responses = arr.map((num, i) => {
  return { res: respond(num), id: i };
});
console.log(responses);
