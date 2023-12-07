/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table';

const STATES = ['default', 'hover', 'active', 'focus'];

export default class ComponentsTableRoute extends Route {
  async model() {
    let responseMusic = await fetch('/api/folk.json');
    let responseClusters = await fetch('/api/mock-clusters-with-status.json');
    let responseManyColumns = await fetch('/api/mock-many-columns.json');
    let { data: music } = await responseMusic.json();
    let clusters = await responseClusters.json();
    let manycolumns = await responseManyColumns.json();

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      clusters,
      manycolumns,
      DENSITIES,
      STATES,
    };
  }
}
