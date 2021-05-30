const doodleViewboxes = [
  "0 0 510 532", // Spiral braids
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
  "0 0 540 528", // Sword headband
  "0 0 480 561", // Abbi
  "0 0 678 621", // Angel glasses
  "0 0 727 753", // Angel
  "0 0 585 711", // Bourbon
  "0 0 496 816", // Cuddle hug
  "0 0 363 470", // Jane Deering
  "0 0 674 595", // Dragon
  "0 0 470 860", // Eevee samurai
  "0 0 488 820", // NLBC
  "0 0 455 448"  // Sad side look
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
              alwaysShow = el.parentElement.classList.contains('node-doodle--always-show'),
              chanceOfBeingShown = alwaysShow ? 1 : (isNoteListing ? 0.2 : 0.7),
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
  shuffleDoodleImages();
})();
