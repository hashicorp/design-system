/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const STORAGE_KEY = 'website:accordion:item-2-state';
export default class Index extends Component {
  @tracked accordionState = 'close';
  @tracked itemState;

  // Store Item state in session storage to persist across page reloads
  constructor(owner, args) {
    super(owner, args);

    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      const saved = sessionStorage.getItem(STORAGE_KEY);
        this.itemState = saved ?? 'open';
      }
  }

  @action
  toggleAccordionState() {
    this.accordionState = this.accordionState === 'open' ? 'close' : 'open';
  }

  @action
  onItemToggle() {
    this.itemState = this.itemState === 'open' ? 'close' : 'open';
     if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, this.itemState);
    }
  }
}

