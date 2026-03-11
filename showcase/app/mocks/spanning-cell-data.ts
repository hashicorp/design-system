/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
export interface SpanningCellValue {
  text?: string;
  rowspan?: number;
  colspan?: number;
}

export interface SpanningCell {
  id: number;
  name?: SpanningCellValue;
  service?: SpanningCellValue;
  description?: SpanningCellValue;
  email?: string;
}

const spanningCells: SpanningCell[] = [
  {
    id: 1,
    name: {
      text: "Scope Row with rowspan='3'",
      rowspan: 3,
    },
    service: { text: 'Cell content' },
    description: { text: 'Cell content' },
    email: 'Cell content',
  },
  {
    id: 11,
    service: {
      text: "Cell Content with colspan='2'",
      colspan: 2,
    },
    email: 'Cell content',
  },
  {
    id: 12,
    service: {
      text: "Cell Content with colspan='3'",
      colspan: 3,
    },
  },
  {
    id: 2,
    name: {
      text: "Scope Row with rowspan='2'",
      rowspan: 2,
    },
    service: { text: 'Cell content' },
    description: {
      text: "Scope Row with rowspan='3'",
      rowspan: 3,
    },
    email: 'Cell content',
  },
  {
    id: 21,
    service: { text: 'Cell content' },
    email: 'Cell content',
  },
  {
    id: 22,
    name: { text: 'Cell content' },
    service: { text: 'Cell content' },
    email: 'Cell content',
  },
  {
    id: 22,
    name: { text: 'Cell content' },
    description: { text: 'Cell content' },
    service: { text: 'Cell content' },
    email: 'Cell content',
  },
];

export default spanningCells;
