import { a as _defineProperty, _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-KIi_qCIU.js';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';

class AriaDescriptorMap {
  constructor() {
    _defineProperty(this, "_elements", new WeakMap());
  }
  register(obj, element) {
    const elements = this.findOrCreateElementSet(obj);
    elements.add(element);
  }
  unregister(obj, element) {
    const elements = this.findOrCreateElementSet(obj);
    elements.delete(element);
  }
  entries(obj) {
    const elements = this.findOrCreateElementSet(obj);
    return Array.from(elements.values());
  }
  findOrCreateElementSet(obj) {
    if (this._elements.has(obj)) {
      return this._elements.get(obj);
    }
    const elements = new Set();
    this._elements.set(obj, elements);
    return elements;
  }
}
const ariaDescriptorMap = new AriaDescriptorMap();

// essentially a type that says we return a subclass of the given type T
// eslint-disable-next-line @typescript-eslint/no-explicit-any

function ariaDescribedBy(BaseComponent) {
  var _class, _descriptor;
  let EnhancedComponent = (_class = class EnhancedComponent extends BaseComponent {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "__ARIA_DESCRIPTION_IDS__", _descriptor, this);
    }
    get ariaDescribedBy() {
      let descriptors = this.__ARIA_DESCRIPTION_IDS__;
      if (this.args.extraAriaDescribedBy) {
        descriptors = descriptors.concat(this.args.extraAriaDescribedBy);
      }
      return descriptors.join(' ');
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "__ARIA_DESCRIPTION_IDS__", [tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  })), _class);
  return EnhancedComponent;
}
function synchronizeDescriptors(component) {
  if (component.isDestroying || component.isDestroyed) return;
  const descriptors = ariaDescriptorMap.entries(component);
  component.__ARIA_DESCRIPTION_IDS__ = descriptors.map(element => element.id);
}
function registerAriaDescriptionElement(component, element) {
  ariaDescriptorMap.register(component, element);
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}
function unregisterAriaDescriptionElement(component, element) {
  ariaDescriptorMap.unregister(component, element);
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}

export { ariaDescribedBy, registerAriaDescriptionElement, unregisterAriaDescriptionElement };
//# sourceMappingURL=hds-aria-described-by.js.map
