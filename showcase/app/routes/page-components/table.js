/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table/index';

import clusterData from 'showcase/mocks/cluster-data';
import folkMusic from 'showcase/mocks/folk-data';
import manyColumnsData from 'showcase/mocks/many-columns-data';
import selectableData from 'showcase/mocks/selectable-data';
import userData from 'showcase/mocks/user-data';

// basic function that clones an array of objects (not deep)
const clone = (arr) => {
  return arr.map((item) => ({ ...item }));
};

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsTableRoute extends Route {
  model() {
    return {
      music: folkMusic.map((record) => ({
        id: record.id,
        ...record.attributes,
      })),
      selectableData,
      selectableDataDemo1: clone(selectableData),
      selectableDataDemo2: clone(selectableData),
      selectableDataDemo5: clone(selectableData),
      selectableDataDemo6: clone(selectableData),
      userDataDemo3: clone(userData.slice(0, 16)),
      userDataDemo4: clone(userData.slice(0, 4)),
      clusters: clusterData,
      manycolumns: manyColumnsData,
      DENSITIES,
      STATES,
    };
  }
}
