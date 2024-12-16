import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DSLVWx63.js';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

var _class, _descriptor;
const LOCALSTORAGE_KEY = 'hds-current-theme';
let HdsThemeValues = /*#__PURE__*/function (HdsThemeValues) {
  HdsThemeValues["Auto"] = "auto";
  HdsThemeValues["Light"] = "light";
  HdsThemeValues["Dark"] = "dark";
  return HdsThemeValues;
}({});
const THEMES = Object.values(HdsThemeValues);
let HdsThemingService = (_class = class HdsThemingService extends Service {
  constructor(owner) {
    super(owner);
    _initializerDefineProperty(this, "_currentTheme", _descriptor, this);
    this.initializeTheme();
  }
  initializeTheme() {
    const _initialTheme = localStorage.getItem(LOCALSTORAGE_KEY);
    if (_initialTheme === 'auto' || _initialTheme === 'light' || _initialTheme === 'dark') {
      this.setTheme(_initialTheme);
    }
  }
  getTheme() {
    return this._currentTheme;
  }
  setTheme(theme) {
    // console.log('setting HDS theme', theme);

    if (theme === undefined) {
      localStorage.removeItem(LOCALSTORAGE_KEY);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY, theme);
    }

    // IMPORTANT: for this to work, it needs to be the HTML tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');
    if (rootElement) {
      if (theme === undefined) {
        rootElement.removeAttribute('data-hds-theme');
        this._currentTheme = undefined;
      } else {
        rootElement.setAttribute('data-hds-theme', theme);
        this._currentTheme = theme;
      }
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_currentTheme", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return undefined;
  }
})), _class);

export { HdsThemeValues, LOCALSTORAGE_KEY, THEMES, HdsThemingService as default };
//# sourceMappingURL=hds-theming.js.map
