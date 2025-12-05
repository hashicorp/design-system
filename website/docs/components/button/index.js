/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked isLoading = false;
  @tracked timer;

  @action
  toggleIsLoading() {
    this.isLoading = !this.isLoading;

    clearTimeout(this.timer);
    // make it go back to the idle state
    this.timer = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  @action
  alertOnClick() {
    alert('Hello from Helios!');
  }
}
