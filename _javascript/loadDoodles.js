const shuffleDoodleImages = () => {
  const doodleLimit = doodleViewboxes.length,
        elements = document.getElementsByClassName('doodle__use'),
        isNoteListing = document.getElementsByClassName('notes-listing').length > 0;

  if (elements) {
    const classIndexes = getIndexes(doodleLimit);

    for (let el of elements) {
      const randomIndex = classIndexes[0],
            alwaysShow = el.parentElement.classList.contains('node-doodle--always-show'),
            chanceOfBeingShown = alwaysShow ? 1 : 0.7,
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

(function() {
  shuffleDoodleImages();
})();
