const doodleViewboxes = [
  "0 0 80 64",   // Espeon
  "0 0 160 150", // Margaret
  "0 0 100 142", // Winter hat
  "0 0 260 360", // Among Us
  "0 0 277 525", // Crying Chibi
  "0 0 600 650", // Crying Fancy
  "0 0 633 705", // Determined wild hair
  "0 0 466 572", // Embarassed blush
  "0 0 500 470", // Flowers
  "0 0 488 617", // Glaceon ice cream
  "0 0 437 820", // Glasses doctor
  "0 0 491 538", // Headscarf
  "0 0 725 705", // Karen heart hold
  "0 0 415 665", // Lyle glance
  "0 0 391 388", // Octopus doll
  "0 0 513 643", // Older glasses
  "0 0 397 481", // Shy scarf
  "0 0 275 382", // Silly wave
  "0 0 644 683", // Super glomp
  "0 0 540 528"  // Sword headband
];

(function() {
  const noteLimit = 15;
  const getIndexes = (arrayLength) => shuffle([...Array(arrayLength).keys()]);
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffleColoringClasses = () => {
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

  const shuffleDoodleImages = () => {
    const doodleLimit = doodleViewboxes.length,
          elements = document.getElementsByClassName('note-doodle__use'),
          isNoteListing = document.getElementsByClassName('notes-listing').length > 0;

    if (elements) {
      const classIndexes = getIndexes(doodleLimit);

      for (let el of elements) {
        const randomIndex = classIndexes[0],
              chanceOfBeingShown = isNoteListing ? 0.2 : 0.85,
              hasRemainingDoodles = classIndexes.length > 0;

        if (hasRemainingDoodles && Math.random() < chanceOfBeingShown) {  // 55% chance of being shown
          el.parentElement.classList.remove("hidden");

          el.parentElement.setAttribute('viewBox', doodleViewboxes[randomIndex]);
          el.setAttribute('href', `/assets/images/doodles/all.svg#doodle-${randomIndex}`);
          classIndexes.shift();
        }
      }
    }
  }

  shuffleColoringClasses();
  // TODO: enable once more images are added in
  // shuffleDoodleImages();
})();
