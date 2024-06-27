/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';

class AriaDescribedByAttributes {
  _attributes = new WeakMap();

  findOrCreateAttributes(obj) {
    if (this._attributes.has(obj)) {
      return this._attributes.get(obj);
    }

    let attributes = new Map();
    this._attributes.set(obj, attributes);
    return attributes;
  }

  register(obj, element) {
    let attrs = this.findOrCreateAttributes(obj);
    attrs.set(element, element.id);
  }

  unregister(obj, element) {
    let attrs = this.findOrCreateAttributes(obj);
    attrs.delete(element);
  }

  entries(obj) {
    let attrs = this.findOrCreateAttributes(obj);
    return Array.from(attrs.values());
  }
}

let ariaDescribedByAttributes = new AriaDescribedByAttributes();

export function ariaDescribedBy(klass) {
  return class extends klass {
    @tracked __ARIA_DESCRIPTION_IDS__ = [];

    get ariaDescribedBy() {
      let descriptors = this.__ARIA_DESCRIPTION_IDS__;

      if (this.args.extraAriaDescribedBy) {
        descriptors = descriptors.concat(this.args.extraAriaDescribedBy);
      }

      return descriptors.join(' ');
    }
  };
}

function synchronizeDescriptors(component) {
  if (component.isDestroying || component.isDestroyed) return;
  let descriptors = ariaDescribedByAttributes.entries(component);
  component.__ARIA_DESCRIPTION_IDS__ = descriptors;
}

export function registerAriaDescriptionElement(component, element) {
  ariaDescribedByAttributes.register(component, element);
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}

export function unregisterAriaDescriptionElement(component, element) {
  ariaDescribedByAttributes.unregister(component, element);
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}
