(function() {
  const tables = document.getElementsByTagName('table');

  if (tables) {
    for (var i = 0, max = tables.length; i < max; i++) {
      const table = tables[i],
            parent = table.parentNode,
            wrapper = document.createElement('div');

      table.classList.add('table--with-js');
      wrapper.classList.add('table-wrapper');

      parent.insertBefore( wrapper, table);
      wrapper.appendChild(table);
    }
  }
})();
