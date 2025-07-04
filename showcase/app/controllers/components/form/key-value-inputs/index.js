/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

const DEFAULT_DATA = [
  {
    id: 1,
    key: {
      text: 'enterprise',
    },
    value: {
      text: '',
    },
  },
  {
    id: 2,
    key: {
      text: 'prod',
    },
    value: {
      text: 'This is a production tag',
    },
  },
  {
    id: 3,
    key: {
      text: 'beta',
    },
    value: {
      text: 'Feature includes beta',
    },
  },
];

const EMPTY_KVI_DROPDOWN_FILTER_DATA = [{ id: 1, key: '', value: '' }];

export default class KeyValueInputsController extends Controller {
  @tracked showHighlight = false;

  emptyData = [];
  sampleData = DEFAULT_DATA;
  @deepTracked kviDropdownFilterData = this.emptyKviDropdownFilterItem;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  onInputUpdateModel(rowData, kviField, e) {
    rowData[kviField] = e.target.value;
  }

  @action
  kviDropdownFilterOnDeleteRowClick(rowIndex) {
    // this.kviDropdownFilterData = this.kviDropdownFilterData.filter(
    //   (obj) => obj !== rowData,
    // );
    if (rowIndex === 0 && this.kviDropdownFilterData.length == 1) {
      this.kviDropdownFilterData = this.emptyKviDropdownFilterItem;
    } else {
      // Remove the item at the specific index
      this.kviDropdownFilterData.splice(rowIndex, 1);
    }
  }

  @action
  kviDropdownFilterOnAddRowClick() {
    this.kviDropdownFilterData.push({
      ...this.emptyKviDropdownFilterItem,
      id: this.kviDropdownFilterData.length + 1,
    });
  }

  @action
  kviDropdownFilterOnApply() {
    console.log(this.kviDropdownFilterData);
    console.log(JSON.stringify(this.kviDropdownFilterData, null, 2));
  }

  @action
  kviDropdownFilterOnReset() {
    this.kviDropdownFilterData = this.emptyKviDropdownFilterItem;
  }

  get kviDropdownFilterCanDeleteRow() {
    return this.kviDropdownFilterData.length > 1;
  }

  get emptyKviDropdownFilterItem() {
    return structuredClone(EMPTY_KVI_DROPDOWN_FILTER_DATA);
  }
}
