const shufflePokePalettes = () => {
  const elements = document.getElementsByClassName('poke-coloring'),
        colorClassLimit = 29;

  function removeElStyleClass(el) {
    var regx = new RegExp('\\b' + 'poke-coloring' + '--' + '.?\\b', 'g');

    el.className = el.className.replace(regx, '');
  }

  if (elements) {
    const classIndexes = getIndexes(colorClassLimit);

    for (let el of elements) {
      const randomIndex = classIndexes[0];

      removeElStyleClass(el);
      el.classList.add(`poke-coloring--${randomIndex}`);
      classIndexes.shift();
    }
  }
}

(function() {
  shufflePokePalettes();
})();
