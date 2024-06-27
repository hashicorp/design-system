/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import type Component from '@glimmer/component';

type ElementIDMap = Map<HTMLElement, string>;

class AriaDescribedByAttributes {
  private _attributes = new WeakMap<AriaDescribedByComponent, ElementIDMap>();

  findOrCreateAttributes(obj: AriaDescribedByComponent): ElementIDMap {
    if (this._attributes.has(obj)) {
      return this._attributes.get(obj) as ElementIDMap;
    }

    const attributes: ElementIDMap = new Map();
    this._attributes.set(obj, attributes);
    return attributes;
  }

  register(obj: AriaDescribedByComponent, element: HTMLElement) {
    const attrs = this.findOrCreateAttributes(obj);
    attrs.set(element, element.id);
  }

  unregister(obj: AriaDescribedByComponent, element: HTMLElement) {
    const attrs = this.findOrCreateAttributes(obj);
    attrs.delete(element);
  }

  entries(obj: AriaDescribedByComponent) {
    const attrs = this.findOrCreateAttributes(obj);
    return Array.from(attrs.values());
  }
}

const ariaDescribedByAttributes = new AriaDescribedByAttributes();

interface AriaDescribedByArgs {
  Args: {
    extraAriaDescribedBy: string;
  };
}

interface AriaDescribedByComponent extends Component<AriaDescribedByArgs> {
  __ARIA_DESCRIPTION_IDS__: string[];
  ariaDescribedBy: string;
}

// essentially a type that says we return a subclass of the given type T
type ClassOf<T> = new () => T;

export function ariaDescribedBy(
  klass: ClassOf<AriaDescribedByComponent>
): ClassOf<AriaDescribedByComponent> {
  class X extends klass {
    @tracked __ARIA_DESCRIPTION_IDS__: string[] = [];

    get ariaDescribedBy() {
      let descriptors = this.__ARIA_DESCRIPTION_IDS__;

      if (this.args.extraAriaDescribedBy) {
        descriptors = descriptors.concat(this.args.extraAriaDescribedBy);
      }

      return descriptors.join(' ');
    }
  }
  return X;
}

function synchronizeDescriptors(component: AriaDescribedByComponent) {
  if (component.isDestroying || component.isDestroyed) return;
  const descriptors = ariaDescribedByAttributes.entries(component);
  component.__ARIA_DESCRIPTION_IDS__ = descriptors;
}

export function registerAriaDescriptionElement(
  component: AriaDescribedByComponent,
  element: HTMLElement
) {
  ariaDescribedByAttributes.register(component, element);
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}

export function unregisterAriaDescriptionElement(
  component: AriaDescribedByComponent,
  element: HTMLElement
) {
  ariaDescribedByAttributes.unregister(component, element);
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}
