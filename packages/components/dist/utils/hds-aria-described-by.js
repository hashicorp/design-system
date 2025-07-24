import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { g, i } from 'decorator-transforms/runtime';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class AriaDescriptorMap {
  _elements = new WeakMap();
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
  class EnhancedComponent extends BaseComponent {
    static {
      g(this.prototype, "__ARIA_DESCRIPTION_IDS__", [tracked], function () {
        return [];
      });
    }
    #__ARIA_DESCRIPTION_IDS__ = (i(this, "__ARIA_DESCRIPTION_IDS__"), void 0);
    get ariaDescribedBy() {
      let descriptors = this.__ARIA_DESCRIPTION_IDS__;
      if (this.args.extraAriaDescribedBy) {
        descriptors = descriptors.concat(this.args.extraAriaDescribedBy);
      }
      return descriptors.join(' ');
    }
  }
  return EnhancedComponent;
}
function synchronizeDescriptors(component) {
  if (component.isDestroying || component.isDestroyed) return;
  const descriptors = ariaDescriptorMap.entries(component);
  component.__ARIA_DESCRIPTION_IDS__ = descriptors.map(element => element.id);
}
function registerAriaDescriptionElement(component, element) {
  ariaDescriptorMap.register(component, element);
  // eslint-disable-next-line ember/no-runloop
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}
function unregisterAriaDescriptionElement(component, element) {
  ariaDescriptorMap.unregister(component, element);
  // eslint-disable-next-line ember/no-runloop
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}

export { ariaDescribedBy, registerAriaDescriptionElement, unregisterAriaDescriptionElement };
//# sourceMappingURL=hds-aria-described-by.js.map
