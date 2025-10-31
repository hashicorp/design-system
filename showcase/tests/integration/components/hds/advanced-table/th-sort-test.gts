/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, click, focus, setupOnerror, find } from '@ember/test-helpers';

import { HdsAdvancedTableThSort } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/advanced-table/th-sort',
  function (hooks) {
    setupRenderingTest(hooks);
    test('it renders with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort id="data-test-advanced-table-th-sort">
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );

      assert
        .dom('#data-test-advanced-table-th-sort')
        .hasClass('hds-advanced-table__th--sort');
      assert
        .dom(
          '#data-test-advanced-table-th-sort .hds-advanced-table__th-button--sort',
        )
        .exists();
    });

    // CONTENT

    test('it renders text content yielded within the cell', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort id="data-test-advanced-table-th-sort">
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );
      assert
        .dom(
          '#data-test-advanced-table-th-sort .hds-advanced-table__th-content > span',
        )
        .hasText('Artist');
    });

    // ALIGNMENT

    test('it should render with the appropriate `@align` CSS class', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort
            id="data-test-advanced-table-th-sort"
            @align="right"
          >
            Year
          </HdsAdvancedTableThSort>
        </template>,
      );
      assert
        .dom('#data-test-advanced-table-th-sort')
        .hasClass('hds-advanced-table__th--align-right');
    });

    // SORT ICON

    test('if @sortOrder is not defined, the swap-vertical icon should be displayed', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort>Artist</HdsAdvancedTableThSort>
        </template>,
      );

      assert.dom('[data-test-icon="swap-vertical"]').exists();
    });

    test('if sorted, and `@sortOrder` is set, the correct icon should be displayed', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort @sortOrder="asc">
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );

      assert.dom('[data-test-icon="arrow-up"]').exists();

      await render(
        <template>
          <HdsAdvancedTableThSort @sortOrder="desc">
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );

      assert.dom('[data-test-icon="arrow-down"]').exists();
    });

    // ATTRIBUTES

    test('it should support splattributes', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort id="data-test-advanced-table-th" lang="es">
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );
      assert.dom('#data-test-advanced-table-th').hasAttribute('lang', 'es');
    });

    test('it has a role and it is set to columnheader by default', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort>Artist</HdsAdvancedTableThSort>
        </template>,
      );

      assert
        .dom('.hds-advanced-table__th--sort')
        .hasAttribute('role', 'columnheader');
    });
    test('the default `scope` attribute can not be overwritten', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort scope="row">Artist</HdsAdvancedTableThSort>
        </template>,
      );

      assert
        .dom('.hds-advanced-table__th--sort')
        .hasAttribute('role', 'columnheader');
    });

    test('if unsorted, the aria-sort attribute value should be set to none', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort id="data-test-advanced-table-th-sort">
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );

      assert
        .dom('#data-test-advanced-table-th-sort')
        .hasAttribute('aria-sort', 'none');
    });
    test('if sorted, the aria-sort attribute value should reflect the direction', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort
            @sortOrder="desc"
            id="data-test-advanced-table-th-sort"
          >
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );

      assert
        .dom('#data-test-advanced-table-th-sort')
        .hasAttribute('aria-sort', 'descending');
    });
    test('it renders the `aria-labelledby` attribute for the sort button with the correct IDs', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort
            id="data-test-advanced-table-th-sort"
            @sortOrder="desc"
          >
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );
      const prefixLabel = find(
        '#data-test-advanced-table-th-sort .hds-advanced-table__th-button-aria-label-hidden-segment:nth-of-type(1)',
      );
      const buttonLabel = find(
        '#data-test-advanced-table-th-sort .hds-advanced-table__th-content > span',
      );
      const suffixLabel = find(
        '#data-test-advanced-table-th-sort .hds-advanced-table__th-button-aria-label-hidden-segment:nth-of-type(2)',
      );
      assert
        .dom(
          '#data-test-advanced-table-th-sort .hds-advanced-table__th-button--sort',
        )
        .hasAria(
          'labelledby',
          `${prefixLabel?.id} ${buttonLabel?.id} ${suffixLabel?.id}`,
        );
      assert.dom(suffixLabel).hasText('ascending');
    });

    test('it should throw an assertion if it is a sticky cell with rowspan', async function (assert) {
      const errorMessage =
        'Cannot have custom rowspan or colspan if there are nested rows.';
      assert.expect(1);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await render(
        <template>
          <HdsAdvancedTableThSort
            id="data-test-advanced-table-th-sort"
            @rowspan={{3}}
            @isStickyColumn={{true}}
          />
        </template>,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it should throw an assertion if it is a sticky cell with colspan', async function (assert) {
      const errorMessage =
        'Cannot have custom rowspan or colspan if there are nested rows.';

      assert.expect(1);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await render(
        <template>
          <HdsAdvancedTableThSort
            id="data-test-advanced-table-th-sort"
            @colspan={{3}}
            @isStickyColumn={{true}}
          />
        </template>,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    // ONCLICKSORT

    test('it should call the `@onClickSort` function if provided', async function (assert) {
      let isClicked = false;
      const onClickSort = () => {
        isClicked = true;
      };

      await render(
        <template>
          <HdsAdvancedTableThSort
            id="data-test-advanced-table-th-sort"
            @onClickSort={{onClickSort}}
          >
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );
      await click(
        '#data-test-advanced-table-th-sort .hds-advanced-table__th-button--sort',
      );
      assert.ok(isClicked);
    });

    // TOOLTIP

    test('if @tooltip is undefined a tooltip button toggle should not be present', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort id="data-test-advanced-table-th-sort">
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );

      assert
        .dom(
          '#data-test-advanced-table-th-sort .hds-advanced-table__th-button--tooltip',
        )
        .doesNotExist();
    });
    test('if @tooltip is defined a tooltip should be added to the table cell header', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort
            @tooltip="More info."
            id="data-test-advanced-table-th-sort"
          >
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );

      assert
        .dom(
          '#data-test-advanced-table-th-sort .hds-advanced-table__th-button--tooltip',
        )
        .exists();
      // activate the tooltip:
      await focus(
        '#data-test-advanced-table-th-sort .hds-advanced-table__th-button--tooltip',
      );
      // test that the tooltip exists and has the passed in content:
      assert.dom('.tippy-content').hasText('More info.');
    });
    test('it renders the `aria-labelledby` attribute for the tooltip button with the correct IDs', async function (assert) {
      await render(
        <template>
          <HdsAdvancedTableThSort
            id="data-test-advanced-table-th-sort"
            @tooltip="More info."
          >
            Artist
          </HdsAdvancedTableThSort>
        </template>,
      );
      const prefixLabel = find(
        '#data-test-advanced-table-th-sort .hds-advanced-table__th-button-aria-label-hidden-segment',
      );
      const buttonLabel = find(
        '#data-test-advanced-table-th-sort .hds-advanced-table__th-content > span',
      );
      assert
        .dom(
          '#data-test-advanced-table-th-sort .hds-advanced-table__th-button--tooltip',
        )
        .hasAria('labelledby', `${prefixLabel?.id} ${buttonLabel?.id}`);
    });
  },
);
