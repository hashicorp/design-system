/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

const STATES = ['default', 'active', 'hover', 'focus'];

export default class ComponentsTableRoute extends Route {
  async model() {
    let responseMusic = await fetch('/api/folk.json');
    let responseClusters = await fetch('/api/mock-clusters-with-status.json');
    let { data: music } = await responseMusic.json();
    let clusters = await responseClusters.json();

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      clusters,
      STATES,
    };
  }
}
