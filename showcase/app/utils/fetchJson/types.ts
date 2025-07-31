/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type {
  HdsBadgeColors,
  HdsBadgeTypes,
} from '@hashicorp/design-system-components/components/hds/badge/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

export interface MusicEntity {
  id: string;
  type: string;
  attributes: {
    artist: string;
    album: string;
    year: number;
    quote: string;
    'vinyl-cost': string;
    icon: HdsIconSignature['Args']['name'];
    'badge-type': HdsBadgeTypes;
    'badge-color': {
      name: HdsBadgeColors;
      key: number;
    };
    color: HdsBadgeColors;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Contributor';
  isSelected?: boolean;
  isAnimated?: boolean;
}

export interface Cluster {
  id: number;
  'peer-name': string;
  'cluster-partition': string;
  status: string;
  services: {
    imported: number;
    exported: number;
  };
}

export interface SelectableItem {
  id: number;
  lorem: string;
  ipsum: string;
  dolor: string;
  isSelected: boolean;
}

export interface UserWithMoreColumns {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: string;
  education: string;
  occupation: string;
  bio: string;
}

export interface SpanningEntity {
  id: number;
  name?:
    | {
        text: string;
        rowspan?: number;
      }
    | string;
  service?:
    | {
        text: string;
        colspan?: number;
      }
    | string;
  description?: string;
  email?: string;
}

export interface Policy {
  id: number;
  name: string;
  description: string;
  status: string;
  isOpen?: boolean;
  children?: Policy[];
}

export interface PolicyCustom {
  id: number;
  name: string;
  description: string;
  status: string;
  isOpen?: boolean;
  data?: Policy[];
}
