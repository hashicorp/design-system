/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export interface PolicyCustomData {
  id: number;
  name: string;
  description: string;
  status: string;
  isOpen?: boolean;
  data?: PolicyCustomData[];
}

const Policies: PolicyCustomData[] = [
  {
    id: 1,
    name: "Policy set 1",
    status: "PASS",
    description: "",
    data: [
      {
        id: 11,
        name: "test-advisory-pass.sentinel",
        status: "PASS",
        description: "Sample description for this thing."
      },
      {
        id: 12,
        name: "test-hard-mandatory-pass.sentinel",
        status: "PASS",
        description: "Sample description for this thing."
      }
    ]
  },
  {
    id: 2,
    name: "Policy set 2",
    status: "FAIL",
    description: "",
    isOpen: true,
    data: [
      {
        id: 21,
        name: "test-advisory-pass.sentinel",
        status: "PASS",
        description: "Sample description for this thing.",
        data: [
          {
            id: 211,
            name: "test-advisory-pass.sentinel.primary",
            status: "PASS",
            description: "Sample description for this thing."
          },
          {
            id: 212,
            name: "test-hard-mandatory-pass.sentinel.secondary",
            status: "FAIL",
            description: "Sample description for this thing."
          }
        ]
      },
      {
        id: 22,
        name: "test-hard-mandatory-pass.sentinel",
        status: "FAIL",
        description: "Sample description for this thing."
      }
    ]
  }
]

export default Policies;
