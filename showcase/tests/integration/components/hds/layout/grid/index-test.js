/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/layout/grid/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid"><pre>test</pre></Hds::Layout::Grid>`
    );
    assert.dom('#test-layout-grid > pre').exists().hasText('test');
  });

  test('it should render the `Item` yielded contextual component', async function (assert) {
    await render(
      hbs`
        <Hds::Layout::Grid id="test-layout-grid" as |LG|>
          <LG.Item><pre>test</pre></LG.Item>
        </Hds::Layout::Grid>`
    );
    assert
      .dom('#test-layout-grid > .hds-layout-grid-item > pre')
      .exists()
      .hasText('test');
  });

  // COLUMN MIN WIDTH

  test('it should render a default min-width of 0px if @columnMinWidth is not declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-min-width': '0px' });
  });

  test('it should render the correct min-width if the @columnMinWidth prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @columnMinWidth="200px" />`
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-min-width': '200px' });
  });

  // TAG

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert.dom('#test-layout-grid').hasTagName('div');
  });

  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @tag="section" />`
    );
    assert.dom('#test-layout-grid').hasTagName('section');
  });

  // JUSTIFY / ALIGN / IS-INLINE

  test('it should render the element without specific classes if no @justify/@align/@isInline are declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--justify-content-/);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--align-items-/);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass('.hds-layout-grid--is-inline');
  });

  test('it should render the correct CSS classes if the @justify/@align/@isInline props are declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @justify="space-between" @align="stretch" @wrap={{true}} @isInline={{true}} />`
    );
    assert
      .dom('#test-layout-grid')
      .hasClass('hds-layout-grid--justify-content-space-between');
    assert
      .dom('#test-layout-grid')
      .hasClass('hds-layout-grid--align-items-stretch');
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--is-inline');
  });

  // GAP

  test('it should render the element without `gap` class if no @gap is declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert.dom('#test-layout-grid').doesNotHaveClass(/hds-layout-grid--gap-/);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--row-gap-/);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--column-gap-/);
  });

  test('it should render the correct CSS class if the @gap prop is declared as a single value', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" @gap="24" />`);
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--gap-24');
  });

  test('it should render the correct CSS class if the @gap prop is declared as two values', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @gap={{array "4" "48"}} />`
    );
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--row-gap-4');
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--column-gap-48');
  });
});
