/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

const STORAGE_KEY = 'website:accordion:item-2-state';
export default class Index extends Component {
  @tracked accordionState = 'close'; // for expand/collapse all example
  @tracked itemState; // for persisting item state example
  @service fastboot;

  // Store Item state in session storage to persist across page reloads
  constructor(owner, args) {
    super(owner, args);
    if (!this.fastboot.isFastBoot) {
      this.itemState = sessionStorage.getItem(STORAGE_KEY) ?? 'open';
    }
  }

  // handle Accordion expand/collapse all
  @action
  toggleAccordionState() {
    this.accordionState = this.accordionState === 'open' ? 'close' : 'open';
  }

  // handle Item toggle and persist state in session storage
  @action
  onItemToggle() {
    this.itemState = this.itemState === 'open' ? 'close' : 'open';
    sessionStorage.setItem(STORAGE_KEY, this.itemState);
  }
}

