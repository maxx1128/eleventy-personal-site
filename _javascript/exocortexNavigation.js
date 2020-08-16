var toggleButtonMenu = function(button, willClose) {
  willClose = typeof willClose !== 'undefined' ? willClose : false;

  var expandedState = button.getAttribute('aria-expanded'),
        parentElement = button.parentElement;

  if (expandedState === "true" || willClose) {
    button.setAttribute("aria-expanded", "false");
    parentElement.classList.remove("exocortex-menu__list-item--active");
  } else {
    button.setAttribute("aria-expanded", "true");
    parentElement.classList.add("exocortex-menu__list-item--active");
  }
};

var fullButtonToggle = function(button) {
  closeAll = typeof closeAll !== 'undefined' ? closeAll : false;

  var isButtonLevel1 = button.classList.contains('exocortex-menu__button--level-1'),
        buttonLevel = isButtonLevel1 ? '1' : '2',
        buttonClass = 'exocortex-menu__button--level-' + buttonLevel,
        allButtons = document.getElementsByClassName(buttonClass);

  for (var i = 0, max = allButtons.length; i < max; i++) {
    var isClickedButton = allButtons[i] === button;

    toggleButtonMenu(allButtons[i], !isClickedButton);
  };
};

var focusOutClose = function(event, targetClass, unfocusClass) {
  var unfocusEl = event["srcElement"],
        targetEl  = event["relatedTarget"];

  if (targetEl) {
    var targetAnchor = targetClass === 'A',
          plainAnchor = (targetEl.tagName === 'A')
                          && (!targetEl.className.includes('exocortex-menu__button'))
                          && (!targetEl.className.includes('exocortex-menu__link')),
          isTargetElement = targetAnchor ? plainAnchor : (targetEl.className.includes(targetClass)),
          wasUnfocusedElement = unfocusEl.classList.contains(unfocusClass);

    if (isTargetElement && wasUnfocusedElement) {
      var targetClasses = targetClass;

      if (plainAnchor) {
        if (unfocusClass === 'exocortex-menu__link') {
          targetClasses = 'exocortex-menu__button--level-2';
        } else {
          targetClasses = 'exocortex-menu__button--level-1';
        }
      }

      var targetElements = document.getElementsByClassName(targetClasses);
      for (var i = 0, max = targetElements.length; i < max; i++) {
        toggleButtonMenu(targetElements[i], true);

        if ((targetClasses === 'exocortex-menu__button--level-2') && plainAnchor) {
          var topButtons = document.getElementsByClassName('exocortex-menu__button--level-1')
          toggleButtonMenu(topButtons[topButtons.length - 1]);
        }
      }
    }
  }
};

(function() {
  var exoLayoutWrapper = document.getElementsByClassName('exocortex-layout__wrapper')[0];

  if (exoLayoutWrapper) {
    exoLayoutWrapper.classList.add('exocortex-layout__wrapper--js');

    var exocortexMenuButtons = document.getElementsByClassName('exocortex-menu__button'),
          exocortexMenuLinks   = document.getElementsByClassName('exocortex-menu__link');

    document.addEventListener('click', function(event) {
      var isClickInside = document.getElementById('exocortex-menu').contains(event.target);

      if (!isClickInside) {
        for (var i = 0, max = exocortexMenuButtons.length; i < max; i++) {
          toggleButtonMenu(exocortexMenuButtons[i], true);
        }
      }
    });

    for (var i = 0, max = exocortexMenuButtons.length; i < max; i++) {
      exocortexMenuButtons[i].onclick = function(el) { fullButtonToggle(el["srcElement"]); }

      exocortexMenuButtons[i].addEventListener("blur", function(e) {
        focusOutClose(e, 'exocortex-menu__button--level-1', 'exocortex-menu__button--level-2');
      });

      if (i === (max - 1)) {
        exocortexMenuButtons[i].addEventListener("blur", function(e) {
          focusOutClose(e, 'A', 'exocortex-menu__button--level-2');
        });
      }
    }

    for (var i = 0, max = exocortexMenuLinks.length; i < max; i++) {
      exocortexMenuLinks[i].addEventListener("blur", function(e) {
        focusOutClose(e, 'exocortex-menu__button--level-2', 'exocortex-menu__link');
        focusOutClose(e, 'exocortex-menu__button--level-1', 'exocortex-menu__link');
      });

      if (i === (max - 1)) {
        exocortexMenuLinks[i].addEventListener("blur", function(e) {
          focusOutClose(e, 'A', 'exocortex-menu__link');
        });
      }
    }
  }
})();
