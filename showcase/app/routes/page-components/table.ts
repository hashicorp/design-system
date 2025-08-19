/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

import clusters from 'showcase/mocks/cluster-data';
import folkMusic from 'showcase/mocks/folk-music-data';
import selectableItems from 'showcase/mocks/selectable-item-data';
import users from 'showcase/mocks/user-data';
import userWithMoreColumns from 'showcase/mocks/user-with-more-columns-data';

export type PageComponentsTableModel = ModelFrom<PageComponentsTableRoute>;

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsTableRoute extends Route {
  model() {
    return {
      music: folkMusic,
      selectableData: selectableItems,
      selectableDataDemo1: structuredClone(selectableItems),
      selectableDataDemo2: structuredClone(selectableItems),
      userDataDemo3: structuredClone(users.slice(0, 16)),
      userDataDemo4: structuredClone(
        users.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
      ),
      selectableDataDemo5: structuredClone(selectableItems),
      selectableDataDemo6: structuredClone(selectableItems),
      clusters,
      userMoreColumnsData: userWithMoreColumns,
      DENSITIES,
      STATES,
    };
  }
}
