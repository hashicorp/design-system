/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class Index extends Component {
  // TODO this is used by us; but there should be also one with `yourOnChangeFunction` for the "how to use" section
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
