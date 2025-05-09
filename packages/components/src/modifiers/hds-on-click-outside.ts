/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { next } from '@ember/runloop';

import type Owner from '@ember/owner';
import type { ArgsFor, PositionalArgs } from 'ember-modifier';

export interface HdsOnClickOutsideSignature {
  Args: {
    Positional: [() => void];
  };
  Element: HTMLElement;
}

export default class HdsOnClickOutsideModifier extends Modifier<HdsOnClickOutsideSignature> {
  private _element?: HTMLElement = undefined;

  clickOutsideHandler!: (event: MouseEvent) => void;

  constructor(owner: Owner, args: ArgsFor<HdsOnClickOutsideSignature>) {
    super(owner, args);

    registerDestructor(this, () => {
      document.removeEventListener('click', this.clickOutsideHandler);
    });
  }

  modify(
    element: HTMLElement,
    positional: PositionalArgs<HdsOnClickOutsideSignature>
  ): void {
    const [callback] = positional;

    this._element = element;

    this.clickOutsideHandler = (event: MouseEvent) => {
      if (this._element && !this._element.contains(event.target as Node)) {
        callback();
      }
    };

    // eslint-disable-next-line ember/no-runloop
    next(() => document.addEventListener('click', this.clickOutsideHandler));
  }
}
