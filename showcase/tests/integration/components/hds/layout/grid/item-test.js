/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/layout/grid/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Layout::Grid::Item id="test-layout-grid-item" />`);
    assert.dom('#test-layout-grid-item').hasClass('hds-layout-grid-item');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid::Item id="test-layout-grid-item"><pre>test</pre></Hds::Layout::Grid::Item>`
    );
    assert.dom('#test-layout-grid-item > pre').exists().hasText('test');
  });

  test('it should render as yielded contextual component', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid as |LG|><LG.Item id="test-layout-grid-item"><pre>test</pre></LG.Item></Hds::Layout::Grid>`
    );
    assert.dom('#test-layout-grid-item > pre').exists().hasText('test');
  });

  // TAG

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid as |LG|><LG.Item id="test-layout-grid-item" /></Hds::Layout::Grid>`
    );
    assert.dom('#test-layout-grid-item').hasTagName('div');
  });

  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid as |LG|><LG.Item id="test-layout-grid-item" @tag="span" /></Hds::Layout::Grid>`
    );
    assert.dom('#test-layout-grid-item').hasTagName('span');
  });

  // COL SPAN

  // Note: A fallback value of 1 is set in the CSS for the `--hds-layout-grid-column-span` custom property
  test('if the @colspan prop is not declared, --hds-layout-grid-column-span should be unset', async function (assert) {
    await render(hbs`<Hds::Layout::Grid::Item id="test-layout-grid-item" />`);
    assert
      .dom('#test-layout-grid-item')
      .doesNotHaveStyle('--hds-layout-grid-column-span');
  });

  test('it should render the correct column span if the @colspan prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid::Item id="test-layout-grid" @colspan={{2}} />`
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-span': '2' });
  });

  // ROW SPAN

  // Note: A fallback value of 1 is set in the CSS for the `--hds-layout-grid-row-span` custom property
  test('if the @rowspan prop is not declared, --hds-layout-grid-row-span should be unset', async function (assert) {
    await render(hbs`<Hds::Layout::Grid::Item id="test-layout-grid" />`);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveStyle('--hds-layout-grid-row-span');
  });

  test('it should render the correct row span if the @rowspan prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid::Item id="test-layout-grid" @rowspan={{2}} />`
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-row-span': '2' });
  });
});
