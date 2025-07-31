/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import { fetchJson } from 'showcase/utils/fetchJson';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';
import type {
  MusicEntity,
  User,
  Cluster,
  SelectableItem,
  UserWithMoreColumns,
  SpanningEntity,
  Policy,
  PolicyCustom,
} from 'showcase/utils/fetchJson/types';

export type PageComponentsAdvancedTableModel =
  ModelFrom<PageComponentsAdvancedTableRoute>;

// basic function that clones an array of objects (not deep)
export const clone = <T>(arr: T[]): T[] => {
  return arr.map((item) => ({ ...item }));
};

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsAdvancedTableRoute extends Route {
  async model() {
    const { data: music } =
      await fetchJson<Record<'data', MusicEntity[]>>('/api/folk.json');
    const userData = await fetchJson<User[]>('/api/mock-users.json');
    const clusters = await fetchJson<Cluster[]>(
      '/api/mock-clusters-with-status.json',
    );
    const selectableData = await fetchJson<SelectableItem[]>(
      '/api/mock-selectable-data.json',
    );
    const manyColumns = await fetchJson<UserWithMoreColumns[]>(
      '/api/mock-many-columns.json',
    );
    const spanningManualData = await fetchJson<SpanningEntity[]>(
      '/api/mock-spanning-cells-manual.json',
    );
    const nestedData = await fetchJson<Policy[]>('/api/mock-nested-rows.json');
    const nestedDataCustom = await fetchJson<PolicyCustom[]>(
      '/api/mock-nested-rows-custom.json',
    );

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
