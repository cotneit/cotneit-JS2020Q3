'use strict'

const Keyboard = {
  languages: {
    en: {
      'Backquote': ['`', '~'],
      'Digit1': ['1', '!'],
      'Digit2': ['2', '@'],
      'Digit3': ['3', '#'],
      'Digit4': ['4', '$'],
      'Digit5': ['5', '%'],
      'Digit6': ['6', '^'],
      'Digit7': ['7', '&'],
      'Digit8': ['8', '*'],
      'Digit9': ['9', '('],
      'Digit0': ['0', ')'],
      'Minus': ['-', '_'],
      'Equal': ['=', '+'],

      'KeyQ': ['q'],
      'KeyW': ['w'],
      'KeyE': ['e'],
      'KeyR': ['r'],
      'KeyT': ['t'],
      'KeyY': ['y'],
      'KeyU': ['u'],
      'KeyI': ['i'],
      'KeyO': ['o'],
      'KeyP': ['p'],
      'BracketLeft': ['['],
      'BracketRight': [']'],
      'Backslash': ['\\', '|'],

      'KeyA': ['a'],
      'KeyS': ['s'],
      'KeyD': ['d'],
      'KeyF': ['f'],
      'KeyG': ['g'],
      'KeyH': ['h'],
      'KeyJ': ['j'],
      'KeyK': ['k'],
      'KeyL': ['l'],
      'Semicolon': [';', ':'],
      'Quote': ['\'', '"'],

      'KeyZ': ['z'],
      'KeyX': ['x'],
      'KeyC': ['c'],
      'KeyV': ['v'],
      'KeyB': ['b'],
      'KeyN': ['n'],
      'KeyM': ['m'],
      'Comma': [',', '<'],
      'Period': ['.', '>'],
      'Slash': ['/', '?'],
    },
    ru: {
      'Backquote': ['ё'],
      'Digit1': ['1', '!'],
      'Digit2': ['2', '"'],
      'Digit3': ['3', '№'],
      'Digit4': ['4', ';'],
      'Digit5': ['5', '%'],
      'Digit6': ['6', ':'],
      'Digit7': ['7', '?'],
      'Digit8': ['8', '*'],
      'Digit9': ['9', '('],
      'Digit0': ['0', ')'],
      'Minus': ['-', '_'],
      'Equal': ['=', '+'],

      'KeyQ': ['й'],
      'KeyW': ['ц'],
      'KeyE': ['у'],
      'KeyR': ['к'],
      'KeyT': ['е'],
      'KeyY': ['н'],
      'KeyU': ['г'],
      'KeyI': ['ш'],
      'KeyO': ['щ'],
      'KeyP': ['з'],
      'BracketLeft': ['х'],
      'BracketRight': ['ъ'],
      'Backslash': ['\\', '/'],

      'KeyA': ['ф'],
      'KeyS': ['ы'],
      'KeyD': ['в'],
      'KeyF': ['а'],
      'KeyG': ['п'],
      'KeyH': ['р'],
      'KeyJ': ['о'],
      'KeyK': ['л'],
      'KeyL': ['д'],
      'Semicolon': ['ж'],
      'Quote': ['э'],

      'KeyZ': ['я'],
      'KeyX': ['ч'],
      'KeyC': ['с'],
      'KeyV': ['м'],
      'KeyB': ['и'],
      'KeyN': ['т'],
      'KeyM': ['ь'],
      'Comma': ['б'],
      'Period': ['ю'],
      'Slash': ['.', ','],
    }
  },

  layout: [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', ''],
    ['ControlLeft', 'KeyboardChangeLanguage', 'KeyboardHide', 'KeyboardToggleSound', 'Space', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
  ],

  keyIconNames: {
    'Backspace': 'keyboard_backspace',
    'Tab': 'keyboard_tab',
    'CapsLock': 'keyboard_capslock',
    'Enter': 'keyboard_return',
    'ShiftLeft': 'north',
    'ShiftRight': 'north',
    'ControlLeft': '',
    'ControlRight': '',
    'AltLeft': '',
    'AltRight': '',
    'ArrowUp': 'keyboard_arrow_up',
    'ArrowDown': 'keyboard_arrow_down',
    'ArrowLeft': 'keyboard_arrow_left',
    'ArrowRight': 'keyboard_arrow_right',

    'KeyboardHide': 'keyboard_hide',
    'KeyboardToggleSound': 'volume_up',     // alt: volume_off
    'KeyboardToggleVoiceInput': 'mic_off'   // alt: mic
  },

  properties: {
    language: 'en',
    capsLock: false,
    shift: false,
    target: undefined,
    muted: false
  },

  elements: {
    keyboard: undefined,
    keysContainer: undefined,
    keys: {}
  },

  eventHandlers: {
    
  },

  init() {
    // Create main elements
    this.elements.keyboard = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.keyboard.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(this.createKeys());

    // Add to DOM
    this.elements.keyboard.append(this.elements.keysContainer);
    document.body.append(this.elements.keyboard);

    // Attach keyboard to elements
    document.querySelectorAll('.use-virtual-keyboard').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element);
      })
    });

    class NewMouseEvent extends MouseEvent {
      constructor(event, args) {
        super(event, args);
        this.repeat = args ? args.repeat || false : false;
      }
    }

    // TODO: refactor this, store event handlers.
    document.addEventListener('keydown', (event) => {
      const keyElement = this.elements.keys[event.code];
      const simulatedEvent = new NewMouseEvent('mousedown', {
        repeat: event.repeat
      });

      if (keyElement) {
        switch (event.code) {
          case 'ArrowUp':
          case 'ArrowDown':
            break;
          default:
            event.preventDefault();
            break;
        }
        keyElement.dispatchEvent(simulatedEvent);
      }
    });

    document.addEventListener('keyup', (event) => {
      const keyElement = this.elements.keys[event.code];
      const simulatedEvent = new MouseEvent('mouseup');

      if (keyElement) {
        switch (event.code) {
          case undefined:
            break;
          case 'ShiftRight':
          case 'ShiftLeft':
            this.toggleShift();
            break;
          default:
            break;
        }
        keyElement.dispatchEvent(simulatedEvent);
        event.preventDefault();
      }
    });

    this.layout.flat().forEach((key) => {
      const keyElement = this.elements.keys[key];
      const keyChar = this.languages[this.properties.language][key];

      keyElement.addEventListener('mousedown', (event) => {
        const target = this.properties.target;
        
        if (event.button !== 0) {
          return;
        }

        keyElement.classList.add('keyboard__key--down');
        if (!event.repeat && !this.properties.muted) {
          this.playKeySound(key);
        }
        target.focus();

        switch (key) {
          case 'Space':
            target.setRangeText(' ', target.selectionStart, target.selectionEnd, 'end');
            break;
          case 'Backspace':
            if (target.selectionStart !== target.selectionEnd) {
              target.setRangeText('');
            } else if (target.value.length > 0) {
              target.setRangeText('', target.selectionStart - 1, target.selectionEnd, 'end');
            }
            break;
          case 'Enter':
            target.setRangeText('\n', target.selectionStart, target.selectionEnd, 'end');
            break;
          case 'ShiftLeft':
          case 'ShiftRight':
            if (!event.repeat) {
              this.toggleShift();
            }
            break;
          case 'CapsLock':
            if (!event.repeat) {
              this.toggleCaps();
            }
            break;
          case 'ArrowUp':
            break;
          case 'ArrowDown':
            break;
          case 'ArrowLeft':
            target.selectionStart = target.selectionStart - 1;
            target.selectionEnd = target.selectionStart;
            break;
          case 'ArrowRight':
            target.selectionStart = target.selectionStart + 1;
            target.selectionEnd = target.selectionStart;
            break;
          case 'Tab':
            target.setRangeText('\t', target.selectionStart, target.selectionEnd, 'end');
            break;
          case 'ControlLeft':
          case 'ControlRight':
            break;
          case 'AltLeft':
          case 'AltRight':
            break;
          case 'KeyboardChangeLanguage':
            this.properties.language = this.properties.language === 'en' ? 'ru' : 'en';
            this.changeLanguage(this.properties.language);
            break;
          case 'KeyboardHide':
            break;
          case 'KeyboardToggleSound':
            if (!event.repeat) {
              this.properties.muted = !this.properties.muted;
              const newIconName = this.properties.muted ? 'volume_off' : 'volume_up';
              keyElement.querySelector('.material-icons').replaceWith(this.createIcon(newIconName));
            }
            break;
          default:
            target.setRangeText(keyElement.textContent, target.selectionStart, target.selectionEnd, 'end');
            break;
        }
      })

      keyElement.addEventListener('mouseup', (event) => {
        const target = this.properties.target;
        
        if (event.button !== 0) {
          return;
        }
        
        switch (key) {
          case 'KeyboardHide':
            this.close();
            break;
          default:
            target.focus();
            break;
        }

        keyElement.classList.remove('keyboard__key--down');
      })

      keyElement.addEventListener('mouseout', () => {
        keyElement.classList.remove('keyboard__key--down');
      })

    })
  },

  open(target) {
    this.properties.target = target;
    this.elements.keyboard.classList.remove('keyboard--hidden');
    document.body.style.paddingBottom = `${this.elements.keyboard.offsetHeight}px`;
  },

  close() {
    this.elements.keyboard.classList.add('keyboard--hidden');
    this.properties.target = undefined;
    document.body.style.paddingBottom = '';
  },

  createKey(key) {
    const keyElement = document.createElement('button');
    const iconName = this.keyIconNames[key];
    
    if (iconName) {
      keyElement.append(this.createIcon(iconName));
    }
    
    keyElement.type = 'button';
    keyElement.className = 'keyboard__key';
    this.elements.keys[key] = keyElement;

    switch (key) {
      case 'Backspace':
      case 'Tab':
      case 'Backslash':
      case 'CapsLock':
      case 'Enter':
      case 'ShiftLeft':
      case 'ShiftRight':
      case 'Space':
        keyElement.classList.add('keyboard__key--span');
        break;
      default:
        break;
    }

    return keyElement;
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    this.layout.forEach((keyRow) => {
      const row = document.createElement('div');
      row.classList.add('keyboard__keys-row');

      keyRow.forEach((key) => {
        const keyElement = this.createKey(key, 'en')
        row.append(keyElement);
      });
      
      fragment.append(row);
    });

    this.updateVisualLayout();
    return fragment;
  },

  createIcon(iconName) {
    const iconElement = document.createElement('i');
    iconElement.className = 'material-icons';
    iconElement.textContent = iconName;
    return iconElement;
  },

  changeLanguage(language) {
    this.properties.language = language;
    this.elements.keys['KeyboardChangeLanguage'].textContent = language;

    this.updateVisualLayout();
  },

  toggleCaps() {
    const capsLock = this.elements.keys['CapsLock'];
    this.properties.capsLock = !this.properties.capsLock;

    if (this.properties.capsLock) {
      capsLock.classList.add('keyboard__key--active');
    } else {
      capsLock.classList.remove('keyboard__key--active');
    }

    this.updateVisualLayout();
  },

  toggleShift() {
    const shiftLeft = this.elements.keys['ShiftRight'];
    const shiftRight = this.elements.keys['ShiftLeft'];
    this.properties.shift = !this.properties.shift;

    if (this.properties.shift) {
      shiftLeft && shiftLeft.classList.add('keyboard__key--active');
      shiftRight && shiftRight.classList.add('keyboard__key--active');
    } else {
      shiftLeft && shiftLeft.classList.remove('keyboard__key--active');
      shiftRight && shiftRight.classList.remove('keyboard__key--active');
    }

    this.updateVisualLayout();
  },

  applySpecialVisualLayout(key) {
    const keyElement = this.elements.keys[key];

    switch (key) {
      case 'KeyboardChangeLanguage':
        keyElement.textContent = this.properties.language;
        break;
      case 'ControlLeft':
      case 'ControlRight':
        keyElement.textContent = 'Ctrl';
        break;
      case 'AltLeft':
      case 'AltRight':
        keyElement.textContent = 'Alt';
        break;
      default:
        break;
    }
  },

  updateVisualLayout() {
    const language = this.properties.language;

    this.layout.flat().forEach((key) => {
      const iconName = this.keyIconNames[key];

      if (!iconName) {
        if (this.properties.capsLock && this.properties.shift) {
          this.elements.keys[key].textContent = this.languages[language][key] ? this.languages[language][key][1] || this.languages[language][key][0].toLowerCase() : key;
        } else if (this.properties.shift) {
          this.elements.keys[key].textContent = this.languages[language][key] ? this.languages[language][key][1] || this.languages[language][key][0].toUpperCase() : key;
        } else if (this.properties.capsLock) {
          this.elements.keys[key].textContent = this.languages[language][key] ? this.languages[language][key][0].toUpperCase() : key;
        } else {
          this.elements.keys[key].textContent = this.languages[language][key] ? this.languages[language][key][0].toLowerCase() : key;
        }
      }

      this.applySpecialVisualLayout(key);
    })
  },

  playKeySound(key) {
    switch(key) {
      case 'Space':
        new Audio('./assets/sounds/keyboard_spacebar.mp3').play();
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        new Audio('./assets/sounds/keyboard_shift.mp3').play();
        break;
      case 'Backspace':
        new Audio('./assets/sounds/keyboard_backspace.mp3').play();
        break;
      case 'Enter':
        new Audio('./assets/sounds/keyboard_enter.mp3').play();
        break;
      case 'CapsLock':
        new Audio('./assets/sounds/keyboard_capslock.mp3').play();
        break;
      default:
        if (this.properties.language === 'en') {
          new Audio('./assets/sounds/keyboard_keystroke_en.mp3').play();
        } else if (this.properties.language === 'ru') {
          new Audio('./assets/sounds/keyboard_keystroke_ru.mp3').play();
        }
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
})