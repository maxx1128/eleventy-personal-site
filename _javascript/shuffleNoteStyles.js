(function() {
  const noteElements = document.getElementsByClassName('note-styler');

  function removeNoteStyleClass(el) {
    var regx = new RegExp('\\b' + 'note-coloring--' + '.?\\b', 'g');
    el.className = el.className.replace(regx, '');
  }

  if (noteElements) {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    const numberOfPalettes = 15,
          classIndexes     = shuffle([...Array(numberOfPalettes).keys()]);

    for (let note of noteElements) {
      removeNoteStyleClass(note);
      note.classList.add(`note-coloring--${classIndexes[0]}`);
      classIndexes.shift();
    }
  }
})();
