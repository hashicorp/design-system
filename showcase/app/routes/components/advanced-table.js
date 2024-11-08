/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table';

// basic function that clones an array of objects (not deep)
// const clone = (arr) => {
//   return arr.map((item) => ({ ...item }));
// };

const STATES = ['default', 'hover', 'active', 'focus'];

export default class ComponentsAdvancedTableRoute extends Route {
  async model() {
    const responseMusic = await fetch('/api/folk.json');
    // const responseClusters = await fetch('/api/mock-clusters-with-status.json');
    // const responseManyColumns = await fetch('/api/mock-many-columns.json');
    // const responseSelectableData = await fetch(
    //   '/api/mock-selectable-data.json'
    // );
    // const responseUserData = await fetch('/api/mock-users.json');
    const responseSpanning = await fetch('/api/mock-spanning-cells.json');
    const responseNested = await fetch('/api/mock-nested-rows.json');

    const { data: music } = await responseMusic.json();
    // const clusters = await responseClusters.json();
    // const manycolumns = await responseManyColumns.json();
    // const selectableData = await responseSelectableData.json();
    // const userData = await responseUserData.json();
    const spanningData = await responseSpanning.json();
    const nestedData = await responseNested.json();

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      spanningData,
      nestedData,
      // selectableData,
      // userData: clone(userData.slice(0, 16)),
      // clusters,
      // manycolumns,
      DENSITIES,
      STATES,
    };
  }
}
