/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import type Component from '@glimmer/component';
import type { HdsFormFieldSignature } from '../components/hds/form/field/';
import type { HdsFormFieldsetSignature } from '../components/hds/form/fieldset/';
import type { HdsFormKeyValueInputsFieldSignature } from '../components/hds/form/key-value-inputs/field';
import type { HdsFormKeyValueInputsSignature } from '../components/hds/form/key-value-inputs/index';

type ElementSet = Set<HTMLElement>;

class AriaDescriptorMap {
  private _elements = new WeakMap<AriaDescribedByComponent, ElementSet>();

  register(obj: AriaDescribedByComponent, element: HTMLElement): void {
    const elements = this.findOrCreateElementSet(obj);
    elements.add(element);
  }

  unregister(obj: AriaDescribedByComponent, element: HTMLElement): void {
    const elements = this.findOrCreateElementSet(obj);
    elements.delete(element);
  }

  entries(obj: AriaDescribedByComponent): HTMLElement[] {
    const elements = this.findOrCreateElementSet(obj);
    return Array.from(elements.values());
  }

  private findOrCreateElementSet(obj: AriaDescribedByComponent): ElementSet {
    if (this._elements.has(obj)) {
      return this._elements.get(obj) as ElementSet;
    }

    const elements: ElementSet = new Set();
    this._elements.set(obj, elements);
    return elements;
  }
}

const ariaDescriptorMap = new AriaDescriptorMap();

type AriaDescribedByArgs =
  | HdsFormFieldSignature
  | HdsFormFieldsetSignature
  | HdsFormKeyValueInputsFieldSignature
  | HdsFormKeyValueInputsSignature;

export interface AriaDescribedByComponent
  extends Component<AriaDescribedByArgs> {
  __ARIA_DESCRIPTION_IDS__?: string[];
  ariaDescribedBy?: string;
}

// essentially a type that says we return a subclass of the given type T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassOf<T> = new (owner: unknown, ...args: any[]) => T;

export function ariaDescribedBy(
  BaseComponent: ClassOf<AriaDescribedByComponent>
): ClassOf<AriaDescribedByComponent> {
  class EnhancedComponent extends BaseComponent {
    @tracked __ARIA_DESCRIPTION_IDS__: string[] = [];

    get ariaDescribedBy(): string {
      let descriptors = this.__ARIA_DESCRIPTION_IDS__;

      if (this.args.extraAriaDescribedBy) {
        descriptors = descriptors.concat(this.args.extraAriaDescribedBy);
      }

      return descriptors.join(' ');
    }
  }
  return EnhancedComponent;
}

function synchronizeDescriptors(component: AriaDescribedByComponent): void {
  if (component.isDestroying || component.isDestroyed) return;
  const descriptors = ariaDescriptorMap.entries(component);
  component.__ARIA_DESCRIPTION_IDS__ = descriptors.map(
    (element): string => element.id
  );
}

export function registerAriaDescriptionElement(
  component: AriaDescribedByComponent,
  element: HTMLElement
): void {
  ariaDescriptorMap.register(component, element);
  // eslint-disable-next-line ember/no-runloop
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}

export function unregisterAriaDescriptionElement(
  component: AriaDescribedByComponent,
  element: HTMLElement
): void {
  ariaDescriptorMap.unregister(component, element);
  // eslint-disable-next-line ember/no-runloop
  scheduleOnce('afterRender', component, synchronizeDescriptors, component);
}
