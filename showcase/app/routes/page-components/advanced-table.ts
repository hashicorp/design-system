/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

import clusters from 'showcase/mocks/cluster-data';
import folkMusic from 'showcase/mocks/folk-music-data';
import policies from 'showcase/mocks/policy-data';
import selectableItems from 'showcase/mocks/selectable-item-data';
import spanningCells from 'showcase/mocks/spanning-cell-data';
import users from 'showcase/mocks/user-data';
import infrastructureResources from 'showcase/mocks/infrastructure-data';

export type PageComponentsAdvancedTableModel =
  ModelFrom<PageComponentsAdvancedTableRoute>;

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsAdvancedTableRoute extends Route {
  model() {
    return {
      music: folkMusic,
      userDataShort: structuredClone(users.slice(0, 5)),
      clusters,
      spanningManualData: spanningCells,
      infrastructureResources,
      selectableData: selectableItems,
      selectableDataDemo1: structuredClone(selectableItems),
      selectableDataDemo2: structuredClone(selectableItems),
      userData: users,
      userDataDemo3: structuredClone(users.slice(0, 16)),
      userDataDemo4: structuredClone(
        users.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
      ),
      nestedData: policies,
      nestedDataCustom: policies.map((policy) => {
        const { children, ...rest } = policy;
        return {
          ...rest,
          isOpen: false,
          data: children,
        };
      }),
      DENSITIES,
      STATES,
    };
  }
}
