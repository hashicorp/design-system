/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click, focus } from '@ember/test-helpers';
import ThSort from "@hashicorp/design-system-components/components/hds/table/th-sort";

module('Integration | Component | hds/table/th-sort', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th-sort">Artist</ThSort></template>,
    );

    assert.dom('#data-test-table-th-sort').hasClass('hds-table__th--sort');
    assert.dom('#data-test-table-th-sort .hds-table__th-button--sort').exists();
  });

  // CONTENT

  test('it renders text content yielded within the cell', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th-sort">Artist</ThSort></template>,
    );
    assert
      .dom('#data-test-table-th-sort .hds-table__th-content > span')
      .hasText('Artist');
  });

  // ALIGNMENT

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th-sort" @align="right">Year</ThSort></template>,
    );
    assert
      .dom('#data-test-table-th-sort')
      .hasClass('hds-table__th--align-right');
  });

  // WIDTH

  test('it should add inline styles if `@width` is declared', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th-sort" @width="10%" /></template>,
    );
    assert
      .dom('#data-test-table-th-sort')
      .hasAttribute('style', 'width: 10%; min-width: 10%;');
  });

  // SORT ICON

  test('if @sortOrder is not defined, the swap-vertical icon should be displayed', async function (assert) {
    await render(
      <template><ThSort @sortBy="artist">Artist</ThSort></template>,
    );

    assert.dom('[data-test-icon="swap-vertical"]').exists();
  });

  test('if sorted, and `@sortOrder` is set, the correct icon should be displayed', async function (assert) {
    await render(
      <template><ThSort @sortOrder="asc">Artist</ThSort></template>,
    );

    assert.dom('[data-test-icon="arrow-up"]').exists();

    await render(
      <template><ThSort @sortOrder="desc">Artist</ThSort></template>,
    );

    assert.dom('[data-test-icon="arrow-down"]').exists();
  });

  // ATTRIBUTES

  test('it should support splattributes', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th" lang="es">Artist</ThSort></template>,
    );
    assert.dom('#data-test-table-th').hasAttribute('lang', 'es');
  });

  test('it has the `scope` attribute, and it is set to column by default', async function (assert) {
    await render(<template><ThSort>Artist</ThSort></template>);

    assert.dom('.hds-table__th--sort').hasAttribute('scope', 'col');
  });
  test('the default `scope` attribute can not be overwritten', async function (assert) {
    await render(
      <template><ThSort scope="row">Artist</ThSort></template>,
    );

    assert.dom('.hds-table__th--sort').hasAttribute('scope', 'col');
  });

  test('if unsorted, the aria-sort attribute value should be set to none', async function (assert) {
    await render(
      <template><ThSort @sortBy="artist" id="data-test-table-th-sort">Artist</ThSort></template>,
    );

    assert.dom('#data-test-table-th-sort').hasAttribute('aria-sort', 'none');
  });
  test('if sorted, the aria-sort attribute value should reflect the direction', async function (assert) {
    await render(
      <template><ThSort @sortBy="artist" @sortOrder="desc" id="data-test-table-th-sort">Artist</ThSort></template>,
    );

    assert
      .dom('#data-test-table-th-sort')
      .hasAttribute('aria-sort', 'descending');
  });
  test('it renders the `aria-labelledby` attribute for the sort button with the correct IDs', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th-sort" @sortBy="artist" @sortOrder="desc">Artist</ThSort></template>,
    );
    const prefixLabel = this.element.querySelector(
      '#data-test-table-th-sort .hds-table__th-button-aria-label-hidden-segment:nth-of-type(1)',
    );
    const buttonLabel = this.element.querySelector(
      '#data-test-table-th-sort .hds-table__th-content > span',
    );
    const suffixLabel = this.element.querySelector(
      '#data-test-table-th-sort .hds-table__th-button-aria-label-hidden-segment:nth-of-type(2)',
    );
    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--sort')
      .hasAria(
        'labelledby',
        `${prefixLabel.id} ${buttonLabel.id} ${suffixLabel.id}`,
      );
    assert.dom(suffixLabel).hasText('Ascending');
  });

  // ONCLICKSORT

  test('it should call the `@onClickSort` function if provided', async function (assert) {
    let isClicked = false;
    this.set('onClickSort', () => (isClicked = true));
    await render(
      <template><ThSort id="data-test-table-th-sort" @onClickSort={{this.onClickSort}}>Artist</ThSort></template>,
    );
    await click('#data-test-table-th-sort .hds-table__th-button--sort');
    assert.ok(isClicked);
  });

  // TOOLTIP

  test('if @tooltip is undefined a tooltip button toggle should not be present', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th-sort">Artist</ThSort></template>,
    );

    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--tooltip')
      .doesNotExist();
  });
  test('if @tooltip is defined a tooltip should be added to the table cell header', async function (assert) {
    await render(
      <template><ThSort @tooltip="More info." id="data-test-table-th-sort">Artist</ThSort></template>,
    );

    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--tooltip')
      .exists();
    // activate the tooltip:
    await focus('#data-test-table-th-sort .hds-table__th-button--tooltip');
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');
  });
  test('it renders the `aria-labelledby` attribute for the tooltip button with the correct IDs', async function (assert) {
    await render(
      <template><ThSort id="data-test-table-th-sort" @tooltip="More info.">Artist</ThSort></template>,
    );
    let prefixLabel = this.element.querySelector(
      '#data-test-table-th-sort .hds-table__th-button-aria-label-hidden-segment',
    );
    let buttonLabel = this.element.querySelector(
      '#data-test-table-th-sort .hds-table__th-content > span',
    );
    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--tooltip')
      .hasAria('labelledby', `${prefixLabel.id} ${buttonLabel.id}`);
  });
});
