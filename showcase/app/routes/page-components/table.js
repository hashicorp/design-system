/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table/index';

import clusterData from 'showcase/mocks/cluster-data';
import folkMusicData from 'showcase/mocks/folk-music-data';
import userWithManyColumnsData from 'showcase/mocks/user-with-more-columns-data';
import selectableItemsData from 'showcase/mocks/selectable-items-data';
import userData from 'showcase/mocks/user-data';

// basic function that clones an array of objects (not deep)
const clone = (arr) => {
  return arr.map((item) => ({ ...item }));
};

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsTableRoute extends Route {
  model() {
    return {
      music: folkMusicData,
      selectableData: selectableItemsData,
      selectableDataDemo1: clone(selectableItemsData),
      selectableDataDemo2: clone(selectableItemsData),
      selectableDataDemo5: clone(selectableItemsData),
      selectableDataDemo6: clone(selectableItemsData),
      userDataDemo3: clone(userData.slice(0, 16)),
      userDataDemo4: clone(userData.slice(0, 4)),
      clusters: clusterData,
      manycolumns: userWithManyColumnsData,
      DENSITIES,
      STATES,
    };
  }
}
