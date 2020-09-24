---
title: "How to Make an Accessible Ember Dropdown Component"
date: ""
excerpt: ""
tags: ["javascript"]
---

## Custom Toggle and Menu Elements

### The Basic Markup

```hbs
<!-- wrapper.hbs -->
<div class="relative {{@class}}">
  {{yield
    (hash
      toggle=(component this.toggleComponent
        isOpen=this.isOpen
      )
      menu=(component this.menuComponent
        isOpen=this.isOpen
      )
    )
  }}
</div>
```

```typescript
// wrapper.ts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Dropdown extends Component {
  toggleComponent = 'dropdown/toggle';
  menuComponent = 'dropdown/menu';

  @tracked isOpen = false;
}
```

```hbs
<!-- toggle.hbs -->
<button
  class="dropdown__toggle cursor {{@class}} {{if @isOpen "dropdown__toggle--active"}}"
>
  {{yield}}
</button>
```

```hbs
<!-- menu.hbs -->
<ul
  class="dropdown__menu absolute abs-t-100 abs-r-none list-none m-none p-none bg-mono-blank box-shadow-2 color-mono-darker {{if @isOpen '' 'hidden'}}"
>
  {{yield}}
</ul>
```

```scss
// dropdown.scss
.dropdown__menu {
  min-width: 160px;
  z-index: 4000;
}

.dropdown__toggle {
  border-width: 0;
}
```

```hbs
<!-- example.hbs -->
<Dropdown::Wrapper as |dd|>
  <dd.toggle>
    Menu Toggle
  </dd.toggle>

  <dd.menu>
    <li>
      Menu Item 1
    </li>
    <li>
      Menu Item 2
    </li>
  </dd.menu>
</Dropdown::Wrapper>
```

### Aria Tags

```hbs
<!-- toggle.hbs -->
<button
  type="button"
  class="dropdown__toggle cursor {{@class}} {{if @isOpen "dropdown__toggle--active"}}"
  aria-haspopup="true"
  aria-controls={{@id}}
  aria-expanded={{if @isOpen "true" "false"}}
>
  {{yield}}
</button>
```

```hbs
<!-- menu.hbs -->
<ul
  aria-labelledby={{@id}}
  class="dropdown__menu absolute abs-t-100 abs-r-none list-none m-none p-none bg-mono-blank box-shadow-2 color-mono-darker {{if @isOpen '' 'hidden'}}"
>
  {{yield}}
</ul>
```

```hbs
<!-- wrapper.hbs -->
<div class="relative {{@class}}" {{did-insert this.getElements}}>
  {{yield
    (hash
      toggle=(component this.toggleComponent
        id=@id
        isOpen=this.isOpen
      )
      menu=(component this.menuComponent
        id=@id
        isOpen=this.isOpen
      )
    )
  }}
</div>
```

## Opening and Closing

### Button Events

```typescript
// wrapper.ts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Dropdown extends Component {
  toggleComponent = 'dropdown/toggle';
  menuComponent = 'dropdown/menu';
  toggleElement!: HTMLElement | null;
  menuElement!: HTMLElement | null;

  @tracked isOpen = false;

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
  }

  @action
  closeDropdown() {
    this.isOpen = false;
  }
}
```

### Custom Keyboard Events

This will likely need to be broken down into subsections

#### Basic Key Events

#### Close Events

#### Managing Event Listeners

```typescript
// wrapper.ts
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
<!-- wrapper.hbs -->
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
<!-- toggle.hbs -->
<button
  type="button"
  class="dropdown__toggle cursor {{@class}} {{if @isOpen "dropdown__toggle--active"}}"
  aria-haspopup="true"
  aria-controls={{@id}}
  aria-expanded={{if @isOpen "true" "false"}}
  {{on "click" @toggleDropdown}}
  {{on "keydown" @onKeyDown}}
>
  {{yield}}
</button>
```

## Menu and Divider Components

Before I set it up, one thing I realized is a disadvantage to a fully custom menu - I'd have to copy the needed styling for each list item each time. Solved with another component.

### A Menu Component

```hbs
<!-- item.hbs -->
<li class="dropdown__item">
  {{yield}}
</li>
```

```scss
// dropdown.scss
.dropdown__item {
  & > * {
    display: block;
    padding: 0.33rem 1rem;
    white-space: nowrap;
  }
}
```

### A Seperator Component

```hbs
<!-- seperator.hbs -->
<li role="separator" class="dropdown__separator my-half mx-none bg-mono-muted"></li>
```

```scss
// dropdown.scss
.dropdown__separator {
  height: 1px;
  overflow: hidden;
}
```

## Wrapping Up

```hbs
<!-- example.hbs -->
<Dropdown::Wrapper
  @id="menu-new"
  @class="inline-flex flex-align-center mr-base"
as |dd|>
  <dd.toggle @class="mdc-button">
    Menu Toggle
  </dd.toggle>

  <dd.menu>
    <Dropdown::Item>
      <a href="#">
        Link 1
      </a>
    </Dropdown::Item>
    <Dropdown::Item>
      <a href="#">
        Link 2
      </a>
    </Dropdown::Item>
    <Dropdown::Separator />
    <Dropdown::Item>
      <a href="#">
        Link 3
      </a>
    </Dropdown::Item>
  </dd.menu>
</Dropdown::Wrapper>
```

* Gist url = https://gist.github.com/maxx1128/51862efc8b30fb46c33e2200e05187f2
