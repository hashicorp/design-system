/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export interface SelectableItem {
  id: number;
  lorem: string;
  ipsum: string;
  dolor: string;
  isSelected: boolean;
}

const selectableItems: SelectableItem[] = [
  {
    id: 1,
    lorem: '1',
    ipsum: 'Cell Content',
    dolor: 'Cell Content',
    isSelected: false,
  },
  {
    id: 2,
    lorem: '2',
    ipsum: 'Cell Content',
    dolor: 'Cell Content',
    isSelected: true,
  },
  {
    id: 3,
    lorem: '3',
    ipsum: 'Cell Content',
    dolor: 'Cell Content',
    isSelected: false,
  },
  {
    id: 4,
    lorem: '4',
    ipsum: 'Cell Content',
    dolor: 'Cell Content',
    isSelected: false,
  },
];

export default selectableItems;
