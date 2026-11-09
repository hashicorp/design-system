/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Index extends Component {
  // NOTE: this index.js file is still required because live demos on the guidelines tab have onChange event handlers.
  @action
  onChange(event) {
    const control = event.target;
    const group = control.closest('.hds-form-group__control-fields-wrapper');
    group.querySelectorAll('.hds-form-radio-card').forEach((radioCard) => {
      radioCard.classList.remove('hds-form-radio-card--checked');
    });
    control
      .closest('.hds-form-radio-card')
      .classList.add('hds-form-radio-card--checked');
  }
}
