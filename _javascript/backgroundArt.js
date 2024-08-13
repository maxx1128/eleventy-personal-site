document.addEventListener('DOMContentLoaded', () => {
  (function() {
    const allLines = Array.from(document.getElementsByClassName('background-art__bar')),
          getRandomNumbersBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
          getRandomColor = () => {
            const colorClasses = ['primary-dark', 'primary-base', 'primary-light', 'action-base'];
            return `fill-${colorClasses[Math.floor(Math.random()*colorClasses.length)]}`;
          }


    allLines.forEach(line => {
      const isVertical = line.classList.contains('background-art__bar--vertical');

      line.classList.remove('fill-primary-base');
      line.classList.add(getRandomColor());
      line.style.transform = `rotate(${getRandomNumbersBetween(-10, 10)}deg)`;
      line.setAttribute(isVertical ? 'width' : 'height', getRandomNumbersBetween(1, 5));
      line.setAttribute(isVertical ? 'x' : 'y', getRandomNumbersBetween(5, 90));
    });
  })();
});
