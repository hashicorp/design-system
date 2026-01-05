/**
 * Copyright IBM Corp. 2021, 2025
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

  get canDeleteRowUpdatingRowsExample() {
    return this.updatingRowsExampleData.length > 1;
  }

  get canDeleteRowMaxRowsExample() {
    return this.maxRowsExampleData.length > 1;
  }

  @action
  updatingRowsExampleOnAddRow() {
    this.updatingRowsExampleData = [
      ...this.updatingRowsExampleData,
      { name: '', email: '', id: this.updatingRowsExampleData.length + 1 },
    ];
  }

  @action
  updatingRowsExampleOnDeleteRow(rowToDelete) {
    if (this.updatingRowsExampleData.length === 1) {
      this.updatingRowsExampleData = [
        { id: 1, name: '', email: '' },
      ];
    } else {
      this.updatingRowsExampleData = this.updatingRowsExampleData.filter(
        (item) => item.id !== rowToDelete.id,
      );
    }
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
    if (this.maxRowsExampleData.length === 1) {
      this.maxRowsExampleData = [
        { id: 1, os: '' },
      ];
    }
    else {
    this.maxRowsExampleData = this.maxRowsExampleData.filter(
      (item) => item.id !== rowToDelete.id,
    );
  }
  }
}
