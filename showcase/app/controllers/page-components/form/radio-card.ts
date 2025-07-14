/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsFormRadioCardModel } from 'showcase/routes/page-components/form/radio-card';

export default class PageComponentsFormRadioCardController extends Controller {
  declare model: PageComponentsFormRadioCardModel;

  @action
  onChange(event: Event) {
    const control = event.target as HTMLInputElement;
    const group = control.closest('.hds-form-group__control-fields-wrapper');
    group?.querySelectorAll('.hds-form-radio-card').forEach((radioCard) => {
      radioCard.classList.remove('hds-form-radio-card--checked');
    });
    control
      ?.closest('.hds-form-radio-card')
      ?.classList.add('hds-form-radio-card--checked');
  }
}
