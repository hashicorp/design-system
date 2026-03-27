/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export interface Policy {
  id: number;
  name: string;
  description: string;
  status: string;
  isOpen?: boolean;
  children?: Policy[];
}

const policies: Policy[] = [
  {
    id: 1,
    name: 'Policy set 1',
    status: 'PASS',
    description: '',
    children: [
      {
        id: 11,
        name: 'test-advisory-pass.sentinel',
        status: 'PASS',
        description: 'Sample description for this thing.',
      },
      {
        id: 12,
        name: 'test-hard-mandatory-pass.sentinel',
        status: 'PASS',
        description: 'Sample description for this thing.',
      },
    ],
  },
  {
    id: 2,
    name: 'Policy set 2',
    status: 'FAIL',
    description: '',
    isOpen: true,
    children: [
      {
        id: 21,
        name: 'test-advisory-pass.sentinel',
        status: 'PASS',
        description: 'Sample description for this thing.',
        children: [
          {
            id: 211,
            name: 'test-advisory-pass.sentinel.primary',
            status: 'PASS',
            description: 'Sample description for this thing.',
          },
          {
            id: 212,
            name: 'test-hard-mandatory-pass.sentinel.secondary',
            status: 'FAIL',
            description: 'Sample description for this thing.',
          },
        ],
      },
      {
        id: 22,
        name: 'test-hard-mandatory-pass.sentinel',
        status: 'FAIL',
        description: 'Sample description for this thing.',
      },
    ],
  },
];

export default policies;
