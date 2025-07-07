/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked updatingRowsExampleData = [
    { id: 1, name: 'Judith Maxene', email: 'j.maxene@randatmail.com' },
    { id: 2, name: 'Elmira Aishah', email: 'e.aishah@randatmail.com' },
  ];
  @tracked maxRowsExampleData = [
    { id: 1, os: 'darwin' },
    { id: 2, os: 'linux' },
    { id: 3, os: 'windows' },
  ];

  @action
  updatingRowsExampleOnAddRow() {
    this.updatingRowsExampleData = [
      ...this.updatingRowsExampleData,
      { name: '', email: '', id: this.updatingRowsExampleData.length + 1 },
    ];
  }

  @action
  updatingRowsExampleOnDeleteRow(rowToDelete) {
    this.updatingRowsExampleData = this.updatingRowsExampleData.filter(
      (item) => item.id !== rowToDelete.id,
    );
  }

  @action
  maxRowsExampleOnAddRow() {
    this.maxRowsExampleData = [
      ...this.maxRowsExampleData,
      { name: '', email: '', id: this.maxRowsExampleData.length + 1 },
    ];
  }

  @action
  maxRowsExampleOnDeleteRow(rowToDelete) {
    this.maxRowsExampleData = this.maxRowsExampleData.filter(
      (item) => item.id !== rowToDelete.id,
    );
  }
}
