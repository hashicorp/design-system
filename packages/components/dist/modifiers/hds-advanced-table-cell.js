import { c as _classPrivateMethodInitSpec, a as _defineProperty, d as _assertClassBrand } from '../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { didInsertGridCell, updateTabbableChildren } from './hds-advanced-table-cell/dom-management.js';
import { handleGridCellKeyPress } from './hds-advanced-table-cell/keyboard-navigation.js';

function cleanup(instance) {
  const {
    _observer
  } = instance;
  if (_observer) {
    _observer.disconnect();
  }
}
var _HdsAdvancedTableCellModifier_brand = /*#__PURE__*/new WeakSet();
class HdsAdvancedTableCellModifier extends Modifier {
  constructor(owner, args) {
    super(owner, args);
    _classPrivateMethodInitSpec(this, _HdsAdvancedTableCellModifier_brand);
    // have a copy of shouldTrapFocus internally so the correct value is used when update tabbable children
    _defineProperty(this, "_shouldTrapFocus", false);
    _defineProperty(this, "_didSetup", false);
    _defineProperty(this, "_observer", undefined);
    registerDestructor(this, cleanup);
  }
  modify(element, positional, named) {
    this._shouldTrapFocus = named.shouldTrapFocus;
    if (!this._didSetup) {
      _assertClassBrand(_HdsAdvancedTableCellModifier_brand, this, _setupObserver).call(this, element, positional, named);
      named.setCellElement(element);
      this._didSetup = true;
    }
  }
}
function _setupObserver(element, _positional, named) {
  const {
    handleEnableFocusTrap
  } = named;
  didInsertGridCell(element);
  element.addEventListener('keydown', event => {
    handleGridCellKeyPress(event, handleEnableFocusTrap);
  });
  this._observer = new MutationObserver(() => {
    updateTabbableChildren(element, this._shouldTrapFocus);
  });
  this._observer.observe(element, {
    childList: true,
    subtree: true
  });
}

export { HdsAdvancedTableCellModifier as default };
//# sourceMappingURL=hds-advanced-table-cell.js.map
