* Figure out how I'm breaking down the progression of the article
* Remove all the Sass functions?
* Create a GIST of all the final code

1. Allow custom toggle and menu items
  * Needs to pass in two yields
2. Set up basic open and close functionality
  * Passed from the wrapper to the components
3. Add needed aria tags
4. Add accessible keyboard functionality
  * Mention a lot of this is taken from the Ember bootstrap dropdown, with the extra stuff taken out
  * Include last bits for killing the listening events as needed
5. Save time with menu and divider components

```javascript
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const ESCAPE_KEYCODE = 27;
const SPACE_KEYCODE = 32;
const TAB_KEYCODE = 9;
const ARROW_UP_KEYCODE = 38;
const ARROW_DOWN_KEYCODE = 40;
const SUPPORTED_KEYCODES = [ESCAPE_KEYCODE, SPACE_KEYCODE, ARROW_DOWN_KEYCODE, ARROW_UP_KEYCODE];

export default class Dropdown extends Component {
  toggleComponent = 'dropdown/toggle';
  menuComponent = 'dropdown/menu';
  toggleElement!: HTMLElement | null;
  menuElement!: HTMLElement | null;

  @tracked isOpen = false;

  willDestroy() {
    this.stopListeningForEvents();
  }

  @action
  getElements(el: any) {
    this.toggleElement = el.querySelector('.dropdown__toggle');
    this.menuElement = el.querySelector('.dropdown__menu');
  }

  @action
  toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  @action
  openDropdown() {
    this.isOpen = true;
    this.startListeningForEvents();
  }

  @action
  closeDropdown() {
    this.isOpen = false;
    this.stopListeningForEvents();
  }

  @action
  closeHandler(e: any) {
    const tabbingOutsideTheMenu = e.type === 'keyup' && e.which === TAB_KEYCODE && this.menuElement && !this.menuElement.contains(e.target),
          clickingOutsideTheMenu = e.type === 'click' && this.toggleElement && !this.toggleElement.contains(e.target),
          closingEvent = tabbingOutsideTheMenu || clickingOutsideTheMenu;

    if (!this.isDestroyed && closingEvent) {
      this.closeDropdown();
    }
  }

  @action
  handleKeyEvent(event: any) {
    if (!SUPPORTED_KEYCODES.includes(event.which)) { return; }

    event.preventDefault();
    event.stopPropagation();

    if (!this.isOpen) {
      this.openDropdown();
      return;
    } else if (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE) {
      this.closeDropdown();
      this.toggleElement?.focus();
      return;
    }

    let items = [].slice.call(this.menuElement?.querySelectorAll('.dropdown__item a:not(.disabled):not(:disabled)'));

    if (items.length === 0) {
      return;
    }

    let index = items.indexOf(event.target);

    if (event.which === ARROW_UP_KEYCODE && index > 0) {
      // Up
      index--;
    }

    if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
      // Down
      index++;
    }

    if (index < 0) {
      index = 0;
    }

    items[index].focus();
  }

  @action
  startListeningForEvents() {
    document.addEventListener('keydown', this.handleKeyEvent);
    document.addEventListener('click', this.closeHandler);
    document.addEventListener('keyup', this.closeHandler);
  }

  @action
  stopListeningForEvents() {
    document.removeEventListener('keydown', this.handleKeyEvent);
    document.removeEventListener('click', this.closeHandler);
    document.removeEventListener('keyup', this.closeHandler);
  }
}
```

```hbs
<div class="relative {{@class}}" {{did-insert this.getElements}}>
  {{yield
    (hash
      toggle=(component this.toggleComponent
        id=@id
        isOpen=this.isOpen
        toggleDropdown=this.toggleDropdown
        onKeyDown=this.handleKeyEvent
      )
      menu=(component this.menuComponent
        id=@id
        isOpen=this.isOpen
        toggleDropdown=this.toggleDropdown
      )
    )
  }}
</div>
```

```hbs
<button
  type="button"
  class="dropdown__toggle border-a-w-none cursor {{@class}} {{if @isOpen "dropdown__toggle--active"}}"
  aria-haspopup="true"
  aria-controls={{@id}}
  aria-expanded={{if @isOpen "true" "false"}}
  {{on "click" @toggleDropdown}}
  {{on "keydown" @onKeyDown}}
>
  {{yield}}
</button>
```

```hbs
<ul
  aria-labelledby={{@id}}
  class="dropdown__menu absolute abs-t-100 abs-r-none list-none m-none p-none bg-mono-blank box-shadow-2 color-mono-darker {{if @isOpen '' 'hidden'}}"
>
  {{yield}}
</ul>
```

```hbs
<li class="dropdown__item">
  {{yield}}
</li>
```

```hbs
<li role="separator" class="dropdown__separator my-half mx-none bg-mono-muted"></li>
```

```scss
.dropdown__toggle {
  background-color: rgba(0, 0, 0, 0);
}

.dropdown__toggle-image {
  max-width: 26px;
  max-height: 26px;
}

.dropdown__toggle--nav.dropdown__toggle--active {
  background-color: color(primary, darker);
}

.dropdown__menu {
  min-width: 160px;

  z-index: z-index(dropdown);
}

.dropdown__item {
  & > * {
    display: block;
    padding: spacing(third) spacing();
    line-height: type(line-height, p);
    white-space: nowrap;
  }

  a {
    color: color(mono, darker);

    @include hovers() {
      background-color: color(mono, light);
    }
  }
}

.dropdown__separator {
  height: 1px;
  overflow: hidden;
}
```
