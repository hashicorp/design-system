/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table';

const STATES = ['default', 'hover', 'active', 'focus'];

// basic function that clones an array of objects (not deep)
const clone = (arr) => {
  return arr.map((item) => ({ ...item }));
};

export default class ComponentsAdvancedTableRoute extends Route {
  async model() {
    const responseMusic = await fetch('/api/folk.json');
    const responseUserData = await fetch('/api/mock-users.json');
    const responseSpanning = await fetch('/api/mock-spanning-cells.json');
    const responseNested = await fetch('/api/mock-nested-rows.json');
    const responseNestedCustom = await fetch(
      '/api/mock-nested-rows-custom.json'
    );
    const responseClusters = await fetch('/api/mock-clusters-with-status.json');
    const responseSelectableData = await fetch(
      '/api/mock-selectable-data.json'
    );

    const { data: music } = await responseMusic.json();
    const userData = await responseUserData.json();
    const spanningData = await responseSpanning.json();
    const nestedData = await responseNested.json();
    const nestedDataCustom = await responseNestedCustom.json();
    const clusters = await responseClusters.json();
    const selectableData = await responseSelectableData.json();

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      spanningData,
      nestedData,
      nestedDataCustom,
      userData,
      clusters,
      selectableData,
      selectableDataDemo1: clone(selectableData),
      selectableDataDemo2: clone(selectableData),
      userDataDemo3: clone(userData.slice(0, 16)),
      DENSITIES,
      STATES,
    };
  }
}
