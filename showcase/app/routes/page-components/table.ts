/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';
import type {
  HdsBadgeTypes,
  HdsBadgeColors,
} from '@hashicorp/design-system-components/components/hds/badge/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

export interface MockDataMusic {
  id: number;
  type: string;
  attributes: {
    artist: string;
    album: string;
    year: string;
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
export interface MockDataMusicItem {
  id: number;
  type: string;
  attributes: {
    artist: string;
    album: string;
    year: string;
    quote: string;
    'vinyl-cost': string;
    icon: string;
    'badge-type': HdsBadgeTypes;
    'badge-color': {
      name: HdsBadgeColors;
      key: number;
    };
    color: HdsBadgeColors;
  };
}

export interface MockDataCluster {
  id: number;
  'peer-name': string;
  'cluster-partition': string;
  status: string;
  services: {
    imported: number;
    exported: number;
  };
}

export interface MockDataManyColumns {
  first_name: string;
  last_name: string;
  age: string;
  email: string;
  phone: string;
  education: string;
  occupation: string;
  bio: string;
}

export interface MockDataSelectable {
  id: number;
  lorem: string;
  ipsum: string;
  dolor: string;
  isSelected: boolean;
}

export interface MockDataUser {
  id: number;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Contributor';
  isSelected?: boolean;
  isAnimated?: boolean;
}

export type PageComponentsTableModel = ModelFrom<PageComponentsTableRoute>;

// basic function that clones an array of objects (not deep)
export const clone = <T>(arr: T[]): T[] => {
  return arr.map((item) => ({ ...item }));
};

export default class PageComponentsTableRoute extends Route {
  async model() {
    const STATES = ['default', 'hover', 'active', 'focus'];

    const responseMusic = await fetch('/api/folk.json');
    const responseClusters = await fetch('/api/mock-clusters-with-status.json');
    const responseManyColumns = await fetch('/api/mock-many-columns.json');
    const responseSelectableData = await fetch(
      '/api/mock-selectable-data.json',
    );
    const responseUserData = await fetch('/api/mock-users.json');

    const { data: music } = (await responseMusic.json()) as Record<
      'data',
      MockDataMusic[]
    >;
    const clusters = (await responseClusters.json()) as MockDataCluster[];
    const manycolumns =
      (await responseManyColumns.json()) as MockDataManyColumns[];
    const selectableData =
      (await responseSelectableData.json()) as MockDataSelectable[];
    const userData = (await responseUserData.json()) as MockDataUser[];

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      selectableData,
      selectableDataDemo1: clone(selectableData),
      selectableDataDemo2: clone(selectableData),
      userDataDemo3: clone(userData.slice(0, 16)),
      userDataDemo4: clone(userData.slice(0, 4)),
      selectableDataDemo5: clone(selectableData),
      selectableDataDemo6: clone(selectableData),
      clusters,
      manycolumns,
      DENSITIES,
      STATES,
    };
  }
}
