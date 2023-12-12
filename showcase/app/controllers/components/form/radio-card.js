/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FormRadioCardController extends Controller {
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
