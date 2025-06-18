/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULT_DATA = [
  {id: 1, name: "Judith Maxene", email: "j.maxene@randatmail.com"},
  {id: 2, name: "Elmira Aishah", email: "e.aishah@randatmail.com"}
]

export default class Index extends Component {
  @tracked updatingRowsExampleData = DEFAULT_DATA;


  @action
  updatingRowsExampleOnAddRow() {
    this.updatingRowsExampleData = [
      ...this.updatingRowsExampleData,
      { name: '', email: '', id: this.updatingRowsExampleData.length + 1 },
    ];
  }

  @action
  updatingRowsExampleOnRemoveRow(rowToRemove) {
    this.updatingRowsExampleData = this.updatingRowsExampleData.filter((item) => item.id !== rowToRemove.id);
  }
}
