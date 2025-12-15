/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

import {
  HdsFilterBarFilterGroupGeneric,
  type HdsFilterBarGenericFilter,
} from '@hashicorp/design-system-components/components';

const SAMPLE_FILTER = {
  type: 'generic',
  dismissTagText: 'test',
  data: {
    value: 'test-value',
  },
} as HdsFilterBarGenericFilter;

module(
  'Integration | Component | hds/filter-bar/filter-group/generic',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupGeneric id="test-generic" />
        </template>,
      );
      assert
        .dom('#test-generic.hds-filter-bar__filter-group__generic')
        .exists();
    });

    // UPDATEFILTER

    test('it should trigger the @onChange callback through the provided UpdateFilter function', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        filter: HdsFilterBarGenericFilter | undefined;
      }>({
        isChanged: false,
        filter: undefined,
      });

      const onChange = (filter?: HdsFilterBarGenericFilter) => {
        context.isChanged = true;
        if (filter) {
          context.filter = filter;
        }
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupGeneric
            id="test-generic"
            @onChange={{onChange}}
            as |G|
          >
            <button
              id="update-filter-button"
              {{on "click" (fn G.updateFilter SAMPLE_FILTER)}}
            >
              Update Filter
            </button>
          </HdsFilterBarFilterGroupGeneric>
        </template>,
      );

      await click('#update-filter-button');
      assert.ok(context.isChanged);
      assert.deepEqual(context.filter, SAMPLE_FILTER);
    });

    // CLEAR

    test('it should trigger the @onChange callback with cleared filters if the clear button is clicked', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        filter: HdsFilterBarGenericFilter | undefined;
      }>({
        isChanged: false,
        filter: SAMPLE_FILTER,
      });

      const onChange = (filter?: HdsFilterBarGenericFilter) => {
        context.isChanged = true;
        context.filter = filter ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupGeneric
            id="test-generic"
            @onChange={{onChange}}
          />
        </template>,
      );

      await click(
        '.hds-filter-bar__filter-group__generic .hds-filter-bar__filter-group__clear .hds-button',
      );
      assert.ok(context.isChanged);
      assert.deepEqual(context.filter, undefined);
    });
  },
);
