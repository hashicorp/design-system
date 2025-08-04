/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';
import type {
  HdsBadgeColors,
  HdsBadgeTypes,
} from '@hashicorp/design-system-components/components/hds/badge/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsAdvancedTableModel =
  ModelFrom<PageComponentsAdvancedTableRoute>;

// basic function that clones an array of objects (not deep)
export const clone = <T>(arr: T[]): T[] => {
  return arr.map((item) => ({ ...item }));
};

const STATES = ['default', 'hover', 'active', 'focus'];

interface MusicEntity {
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

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Contributor';
  isSelected?: boolean;
  isAnimated?: boolean;
}

interface Cluster {
  id: number;
  'peer-name': string;
  'cluster-partition': string;
  status: string;
  services: {
    imported: number;
    exported: number;
  };
}

interface SelectableItem {
  id: number;
  lorem: string;
  ipsum: string;
  dolor: string;
  isSelected: boolean;
}

interface UserWithMoreColumns {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: string;
  education: string;
  occupation: string;
  bio: string;
}

interface SpanningEntity {
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

interface Policy {
  id: number;
  name: string;
  description: string;
  status: string;
  isOpen?: boolean;
  children?: Policy[];
}

interface PolicyCustom {
  id: number;
  name: string;
  description: string;
  status: string;
  isOpen?: boolean;
  data?: Policy[];
}

export default class PageComponentsAdvancedTableRoute extends Route {
  async model() {
    const responseMusic = await fetch('/api/folk.json');
    const responseUserData = await fetch('/api/mock-users.json');
    const responseClusters = await fetch('/api/mock-clusters-with-status.json');
    const responseSelectableData = await fetch(
      '/api/mock-selectable-data.json',
    );
    const responseManyColumns = await fetch('/api/mock-many-columns.json');
    const responseSpanningManual = await fetch(
      '/api/mock-spanning-cells-manual.json',
    );
    const responseNested = await fetch('/api/mock-nested-rows.json');
    const responseNestedCustom = await fetch(
      '/api/mock-nested-rows-custom.json',
    );

    const { data: music } = (await responseMusic.json()) as Record<
      'data',
      MusicEntity[]
    >;
    const userData = (await responseUserData.json()) as User[];
    const clusters = (await responseClusters.json()) as Cluster[];
    const selectableData =
      (await responseSelectableData.json()) as SelectableItem[];
    const manyColumns =
      (await responseManyColumns.json()) as UserWithMoreColumns[];
    const spanningManualData =
      (await responseSpanningManual.json()) as SpanningEntity[];
    const nestedData = (await responseNested.json()) as Policy[];
    const nestedDataCustom =
      (await responseNestedCustom.json()) as PolicyCustom[];

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      userDataShort: clone(userData.slice(0, 5)),
      clusters,
      spanningManualData,
      selectableData,
      selectableDataDemo1: clone(selectableData),
      selectableDataDemo2: clone(selectableData),
      userData,
      userDataDemo3: clone(userData.slice(0, 16)),
      userDataDemo4: clone(
        userData.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
      ),
      manyColumns,
      nestedData,
      nestedDataCustom,
      DENSITIES,
      STATES,
    };
  }
}
