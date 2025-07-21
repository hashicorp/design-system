/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

import type { PageComponentsFormBaseElementsModel } from '../../../routes/page-components/form/base-elements';

export default class PageComponentsFormBaseElementsController extends Controller {
  declare model: PageComponentsFormBaseElementsModel;

  @tracked showHighlight = false;
  @deepTracked values = {
    value1: '',
    value2: 'cl',
    value3: '',
    value4: 'cluster',
    value5: 'cluster-length-is-longer-',
    value6: 'cluster-length-is-longer-than',
    value7: '',
    value8: 'c',
    value9: 'clu',
    value10: '',
    value11: 'c',
    value12: 'cluster',
    value13: 'cluster-length-is-longer-than',
    value14: 'Lorem ipsum dolor',
  };

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  updateValue(propName: keyof typeof this.values, event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.values[propName] = value;
  }
}
