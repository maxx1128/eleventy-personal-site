(function() {
  const themeRadios = document.getElementsByClassName('theme-switcher__input');

  function addEventListeners() {
    for (var i = 0, max = themeRadios.length; i < max; i++) {
      themeRadios[i].onclick = function(el) {
        const selectedTheme = el['srcElement']['defaultValue'];
        setTheme(selectedTheme);
      }
    }
  }

  function setTheme(theme) {
    const themeRadio = document.getElementById(`theme-${theme}`);
    themeRadio.checked = true;
    localStorage.setItem('theme', theme);
  }

  function init() {
    const pastTheme = localStorage.getItem('theme');
    setTheme((pastTheme ? pastTheme : 'light'));
  }

  init();
  addEventListeners();
})();
