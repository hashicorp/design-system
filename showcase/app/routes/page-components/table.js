/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table/index';

import { fetchJson } from 'showcase/utils/fetchJson';

// basic function that clones an array of objects (not deep)
const clone = (arr) => {
  return arr.map((item) => ({ ...item }));
};

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsTableRoute extends Route {
  async model() {
    const { data: music } = await fetchJson('/api/folk.json');
    const clusters = await fetchJson('/api/mock-clusters-with-status.json');
    const manycolumns = await fetchJson('/api/mock-many-columns.json');
    const selectableData = await fetchJson('/api/mock-selectable-data.json');
    const userData = await fetchJson('/api/mock-users.json');

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      selectableData,
      selectableDataDemo1: clone(selectableData),
      selectableDataDemo2: clone(selectableData),
      selectableDataDemo5: clone(selectableData),
      selectableDataDemo6: clone(selectableData),
      userDataDemo3: clone(userData.slice(0, 16)),
      userDataDemo4: clone(userData.slice(0, 4)),
      clusters,
      manycolumns,
      DENSITIES,
      STATES,
    };
  }
}
