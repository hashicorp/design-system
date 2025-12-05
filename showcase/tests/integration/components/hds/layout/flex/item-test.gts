/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import {
  HdsLayoutFlex,
  HdsLayoutFlexItem,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/layout/flex/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsLayoutFlexItem id="test-layout-flex-item" /></template>,
    );
    assert.dom('#test-layout-flex-item').hasClass('hds-layout-flex-item');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlexItem id="test-layout-flex-item"><pre
          >test</pre></HdsLayoutFlexItem>
      </template>,
    );
    assert.dom('#test-layout-flex-item > pre').exists().hasText('test');
  });
  test('it should render as yielded contextual component', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|><LF.Item id="test-layout-flex-item"><pre
            >test</pre></LF.Item></HdsLayoutFlex>
      </template>,
    );
    assert.dom('#test-layout-flex-item > pre').exists().hasText('test');
  });

  // TAG

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|><LF.Item
            id="test-layout-flex-item"
          /></HdsLayoutFlex>
      </template>,
    );
    assert.dom('#test-layout-flex-item').hasTagName('div');
  });
  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|><LF.Item
            id="test-layout-flex-item"
            @tag="span"
          /></HdsLayoutFlex>
      </template>,
    );
    assert.dom('#test-layout-flex-item').hasTagName('span');
  });

  // BASIS / GROW / SHRINK

  test('it should render the element without specific classes or inline styles if no @basis/@grow/@shrink are declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|><LF.Item
            id="test-layout-flex-item"
          /></HdsLayoutFlex>
      </template>,
    );
    assert
      .dom('#test-layout-flex-item')
      .doesNotHaveAttribute('style')
      .doesNotHaveClass(/hds-layout-flex-item--grow-/)
      .doesNotHaveClass(/hds-layout-flex-item--shrink-/);
    assert.dom('#test-layout-flex-item').doesNotHaveAttribute('style');
  });
  test('it should render the correct CSS class if the @basis prop is declared as 0', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|>
          <LF.Item id="test-layout-flex-item-1" @basis={{0}} />
        </HdsLayoutFlex>
      </template>,
    );
    assert
      .dom('#test-layout-flex-item-1')
      .doesNotHaveAttribute('style')
      .hasClass('hds-layout-flex-item--basis-0');
  });
  test('it should render the correct inline styles if the @basis prop is declared as string', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|>
          <LF.Item id="test-layout-flex-item-1" @basis="5%" />
          <LF.Item id="test-layout-flex-item-2" @basis="100px" />
          <LF.Item id="test-layout-flex-item-3" @basis="auto" />
          <LF.Item id="test-layout-flex-item-4" @basis="max-content" />
        </HdsLayoutFlex>
      </template>,
    );
    assert
      .dom('#test-layout-flex-item-1')
      .hasAttribute('style', 'flex-basis: 5%;')
      .hasStyle({ flexBasis: '5%' });
    assert
      .dom('#test-layout-flex-item-2')
      .hasAttribute('style', 'flex-basis: 100px;')
      .hasStyle({ flexBasis: '100px' });
    assert
      .dom('#test-layout-flex-item-3')
      .hasAttribute('style', 'flex-basis: auto;')
      .hasStyle({ flexBasis: 'auto' });
    assert
      .dom('#test-layout-flex-item-4')
      .hasAttribute('style', 'flex-basis: max-content;')
      .hasStyle({ flexBasis: 'max-content' });
  });
  test('it should render the correct CSS class if the @grow/@shrink props are declared as boolean or 0/1', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|>
          <LF.Item
            id="test-layout-flex-item-1"
            @grow={{false}}
            @shrink={{false}}
          />
          <LF.Item id="test-layout-flex-item-2" @grow={{0}} @shrink={{0}} />
          <LF.Item
            id="test-layout-flex-item-3"
            @grow={{true}}
            @shrink={{true}}
          />
          <LF.Item id="test-layout-flex-item-4" @grow={{1}} @shrink={{1}} />
        </HdsLayoutFlex>
      </template>,
    );
    assert
      .dom('#test-layout-flex-item-1')
      .doesNotHaveAttribute('style')
      .hasClass('hds-layout-flex-item--grow-0')
      .hasClass('hds-layout-flex-item--shrink-0');
    assert
      .dom('#test-layout-flex-item-2')
      .doesNotHaveAttribute('style')
      .hasClass('hds-layout-flex-item--grow-0')
      .hasClass('hds-layout-flex-item--shrink-0');
    assert
      .dom('#test-layout-flex-item-3')
      .doesNotHaveAttribute('style')
      .hasClass('hds-layout-flex-item--grow-1')
      .hasClass('hds-layout-flex-item--shrink-1');
    assert
      .dom('#test-layout-flex-item-4')
      .doesNotHaveAttribute('style')
      .hasClass('hds-layout-flex-item--grow-1')
      .hasClass('hds-layout-flex-item--shrink-1');
  });
  test('it should render the correct inline styles if the @grow/@shrink props are declared as strings/numbers', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|>
          <LF.Item id="test-layout-flex-item-1" @grow="0" @shrink="0" />
          <LF.Item id="test-layout-flex-item-2" @grow="1" @shrink="1" />
          <LF.Item id="test-layout-flex-item-3" @grow={{2}} @shrink={{2}} />
          <LF.Item
            id="test-layout-flex-item-4"
            @grow="initial"
            @shrink="initial"
          />
        </HdsLayoutFlex>
      </template>,
    );
    assert
      .dom('#test-layout-flex-item-1')
      .hasAttribute('style', 'flex-grow: 0; flex-shrink: 0;')
      .hasStyle({ flexGrow: '0', flexShrink: '0' });
    assert
      .dom('#test-layout-flex-item-2')
      .hasAttribute('style', 'flex-grow: 1; flex-shrink: 1;')
      .hasStyle({ flexGrow: '1', flexShrink: '1' });
    assert
      .dom('#test-layout-flex-item-3')
      .hasAttribute('style', 'flex-grow: 2; flex-shrink: 2;')
      .hasStyle({ flexGrow: '2', flexShrink: '2' });
    assert
      .dom('#test-layout-flex-item-4')
      .hasAttribute('style', 'flex-grow: initial; flex-shrink: initial;')
      // grow=0 and shrink=1 are the CSS defaults (initial)
      .hasStyle({ flexGrow: '0', flexShrink: '1' });
  });

  // ENABLE COLLAPSE BELOW CONTENT SIZE

  test('it should render the element without specific classes if no @enableCollapseBelowContentSize is declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|><LF.Item
            id="test-layout-flex-item"
          /></HdsLayoutFlex>
      </template>,
    );
    assert
      .dom('#test-layout-flex-item')
      .doesNotHaveClass(
        'hds-layout-flex-item--enable-collapse-below-content-size',
      );
  });
  test('it should render the correct CSS class if the @enableCollapseBelowContentSize prop is declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutFlex as |LF|><LF.Item
            id="test-layout-flex-item"
            @enableCollapseBelowContentSize={{true}}
          /></HdsLayoutFlex>
      </template>,
    );
    assert
      .dom('#test-layout-flex-item')
      .hasClass('hds-layout-flex-item--enable-collapse-below-content-size');
  });
});
