/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/layout/flex/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex"><pre>test</pre></Hds::Layout::Flex>`
    );
    assert.dom('#test-layout-flex > pre').exists().hasText('test');
  });
  test('it should render the `Item` yielded contextual component', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" as |LF|><LF.Item><pre>test</pre></LF.Item></Hds::Layout::Flex>`
    );
    assert
      .dom('#test-layout-flex > .hds-layout-flex-item > pre')
      .exists()
      .hasText('test');
  });

  // TAG

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert.dom('#test-layout-flex').hasTagName('div');
  });
  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @tag="section" />`
    );
    assert.dom('#test-layout-flex').hasTagName('section');
  });

  // DIRECTION

  test('it should render the element with `row` direction if no @direction is declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex--direction-row');
  });
  test('it should render the correct CSS class if the @direction prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @direction="column" />`
    );
    assert
      .dom('#test-layout-flex')
      .hasClass('hds-layout-flex--direction-column');
  });

  // JUSTIFY / ALIGN / WRAP / IS-INLINE

  test('it should render the element without specific classes if no @justify/@align/@wrap/@isInline are declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass(/hds-layout-flex--justify-content-/);
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass(/hds-layout-flex--align-items-/);
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass('.hds-layout-flex--has-wrapping');
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass('.hds-layout-flex--is-inline');
  });
  test('it should render the correct CSS classes if the @justify/@align/@wrap/@isInline props are declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @justify="space-between" @align="stretch" @wrap={{true}} @isInline={{true}} />`
    );
    assert
      .dom('#test-layout-flex')
      .hasClass('hds-layout-flex--justify-content-space-between');
    assert
      .dom('#test-layout-flex')
      .hasClass('hds-layout-flex--align-items-stretch');
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex--has-wrapping');
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex--is-inline');
  });

  // GAP

  test('it should render the element without `gap` class if no @gap is declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert.dom('#test-layout-flex').doesNotHaveClass(/hds-layout-flex--gap-/);
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass(/hds-layout-flex--row-gap-/);
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass(/hds-layout-flex--column-gap-/);
  });
  test('it should render the correct CSS class if the @gap prop is declared as single value', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" @gap="24" />`);
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex--gap-24');
  });
  test('it should render the correct CSS class if the @gap prop is declared as a couple of values', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @gap={{array "4" "48"}} />`
    );
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex--row-gap-4');
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex--column-gap-48');
  });
});
