/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// prettier-ignore
const daysOfChristmas = [
  { key: 'one', quantity: 1, type: 'bird', line: 'A partridge in a pear tree' },
  { key: 'two', quantity: 2, type: 'bird', line: 'Two turtle doves' },
  { key: 'three', quantity: 3, type: 'bird', line: 'Three french hens' },
  { key: 'four', quantity: 4, type: 'bird', line: 'Four calling birds' },
  { key: 'five', quantity: 5, type: 'jewelry', line: 'Five gold rings' },
  { key: 'six', quantity: 6, type: 'more bird', line: 'Six geese a-laying' },
  { key: 'seven', quantity: 7, type: 'bird again', line: 'Seven swans a-swimming' },
  { key: 'eight', quantity: 8, type: 'servant', line: 'Eight maids a-milking' },
  { key: 'nine', quantity: 9, type: 'maybe royalty', line: 'Nine ladies dancing' },
  { key: 'ten', quantity: 10, type: 'definitely royalty', line: 'Ten lords a-leaping' },
  { key: 'eleven', quantity: 11, type: 'musician', line: 'Eleven pipers piping' },
  { key: 'twelve', quantity: 12, type: 'musician, technically', line: 'Twelve drummers drumming' },
];

export default class extends Controller {
  @tracked showTable = false;
  @tracked lyrics = daysOfChristmas.slice();

  @action dirtyModel() {
    // Deep copy to destroy references
    this.lyrics = this.lyrics.map((r) => ({ ...r }));
  }

  printSelection = (selection) =>
    console.log('Printing selection:', selection.selectedRowsKeys);
}
