/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table';

import { copy } from 'ember-copy';

const STATES = ['default', 'hover', 'active', 'focus'];

export default class ComponentsTableRoute extends Route {
  async model() {
    let responseMusic = await fetch('/api/folk.json');
    let responseClusters = await fetch('/api/mock-clusters-with-status.json');
    let responseManyColumns = await fetch('/api/mock-many-columns.json');
    let { data: music } = await responseMusic.json();
    let clusters = await responseClusters.json();
    let manycolumns = await responseManyColumns.json();

    let responseSelectableData = await fetch('/api/mock-selectable-data.json');
    let selectableData = await responseSelectableData.json();

    let responseUserData = await fetch('/api/mock-users.json');
    let userData = await responseUserData.json();

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      selectableData,
      selectableDataDemo1: copy(selectableData, true),
      selectableDataDemo2: copy(selectableData, true),
      userDataDemo3: copy(userData.slice(0, 16), true),
      userDataDemo4: copy(userData.slice(0, 4), true),
      clusters,
      manycolumns,
      DENSITIES,
      STATES,
    };
  }
}
