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
          entityName='space';
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

