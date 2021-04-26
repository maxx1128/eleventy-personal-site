const doodleViewboxes = [
  "0 0 79.5 63.5",   // Espeon
  "0 0 160 150", // Margaret
  "0 0 100 142"  // Winter hat
];

(function() {
  const noteLimit = 15;
  const getIndexes = (arrayLength, itemLimit) => shuffle([...Array(arrayLength).keys()]).map(index => index % itemLimit);
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffleColoringClasses = () => {
    const elements = document.getElementsByClassName('note-styler');

    function removeElStyleClass(el) {
      var regx = new RegExp('\\b' + 'note-coloring' + '--' + '.?\\b', 'g');

      el.className = el.className.replace(regx, '');
    }

    if (elements) {
      const classIndexes = getIndexes(noteLimit, noteLimit);

      for (let el of elements) {
        const randomIndex = classIndexes[0];

        removeElStyleClass(el);
        el.classList.add(`note-coloring--${randomIndex}`);
        classIndexes.shift();
      }
    }
  }

  const shuffleDoodleImages = () => {
    const doodleLimit = doodleViewboxes.length;
    const elements = document.getElementsByClassName('note-doodle__use');

    if (elements) {
      const classIndexes = getIndexes(noteLimit * 6, doodleLimit);

      for (let el of elements) {
        const randomIndex = classIndexes[0];
        el.parentElement.classList.remove("hidden");

        if (Math.random() < 0.2) {
          el.parentElement.classList.add("hidden");
        }

        el.parentElement.setAttribute('viewBox', doodleViewboxes[randomIndex]);
        el.setAttribute('href', `/assets/images/doodles/all.svg#doodle-${randomIndex}`);
        classIndexes.shift();
      }
    }
  }

  shuffleColoringClasses();
  // TODO: enable once more images are added in
  // shuffleDoodleImages();
})();
