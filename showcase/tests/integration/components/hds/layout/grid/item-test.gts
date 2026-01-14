/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { hash } from '@ember/helper';
import { render } from '@ember/test-helpers';

import {
  HdsLayoutGrid,
  HdsLayoutGridItem,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/layout/grid/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsLayoutGridItem id="test-layout-grid-item" /></template>,
    );
    assert.dom('#test-layout-grid-item').hasClass('hds-layout-grid-item');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      <template>
        <HdsLayoutGridItem id="test-layout-grid-item"><pre
          >test</pre></HdsLayoutGridItem>
      </template>,
    );
    assert.dom('#test-layout-grid-item > pre').exists().hasText('test');
  });

  test('it should render as yielded contextual component', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid as |LG|><LG.Item id="test-layout-grid-item"><pre
            >test</pre></LG.Item></HdsLayoutGrid>
      </template>,
    );
    assert.dom('#test-layout-grid-item > pre').exists().hasText('test');
  });

  // TAG

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid as |LG|><LG.Item
            id="test-layout-grid-item"
          /></HdsLayoutGrid>
      </template>,
    );
    assert.dom('#test-layout-grid-item').hasTagName('div');
  });

  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid as |LG|><LG.Item
            id="test-layout-grid-item"
            @tag="span"
          /></HdsLayoutGrid>
      </template>,
    );
    assert.dom('#test-layout-grid-item').hasTagName('span');
  });

  // COL SPAN

  // Note: A fallback value of 1 is set in the CSS for the `--hds-layout-grid-column-span` custom property
  test('if the @colspan prop is not declared, --hds-layout-grid-column-span should be unset', async function (assert) {
    await render(
      <template><HdsLayoutGridItem id="test-layout-grid-item" /></template>,
    );
    assert
      .dom('#test-layout-grid-item')
      .doesNotHaveStyle({ '--hds-layout-grid-column-span': '' });
  });

  test('it should render the correct column span if the @colspan prop is declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGridItem id="test-layout-grid" @colspan={{2}} />
      </template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-span': '2' });
  });

  test('it should set responsive colspan values if passed in', async function (assert) {
    await render(
      <template>
        <HdsLayoutGridItem
          id="test-layout-grid"
          @colspan={{hash sm=1 md=2 lg=3 xl=4 xxl=5}}
        />
      </template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-span-sm': '1' })
      .hasStyle({ '--hds-layout-grid-column-span-md': '2' })
      .hasStyle({ '--hds-layout-grid-column-span-lg': '3' })
      .hasStyle({ '--hds-layout-grid-column-span-xl': '4' })
      .hasStyle({ '--hds-layout-grid-column-span-xxl': '5' })
      .hasClass('hds-layout-grid--col-span-view-sm')
      .hasClass('hds-layout-grid--col-span-view-md')
      .hasClass('hds-layout-grid--col-span-view-lg')
      .hasClass('hds-layout-grid--col-span-view-xl')
      .hasClass('hds-layout-grid--col-span-view-xxl');
  });

  // ROW SPAN

  // Note: A fallback value of 1 is set in the CSS for the `--hds-layout-grid-row-span` custom property
  test('if the @rowspan prop is not declared, --hds-layout-grid-row-span should be unset', async function (assert) {
    await render(
      <template><HdsLayoutGridItem id="test-layout-grid" /></template>,
    );
    assert
      .dom('#test-layout-grid')
      .doesNotHaveStyle({ '--hds-layout-grid-row-span': '' });
  });

  test('it should render the correct row span if the @rowspan prop is declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGridItem id="test-layout-grid" @rowspan={{2}} />
      </template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-row-span': '2' });
  });

  test('it should set responsive rowspan values if passed in', async function (assert) {
    await render(
      <template>
        <HdsLayoutGridItem
          id="test-layout-grid"
          @rowspan={{hash sm=1 md=2 lg=3 xl=4 xxl=5}}
        />
      </template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-row-span-sm': '1' })
      .hasStyle({ '--hds-layout-grid-row-span-md': '2' })
      .hasStyle({ '--hds-layout-grid-row-span-lg': '3' })
      .hasStyle({ '--hds-layout-grid-row-span-xl': '4' })
      .hasStyle({ '--hds-layout-grid-row-span-xxl': '5' })
      .hasClass('hds-layout-grid--row-span-view-sm')
      .hasClass('hds-layout-grid--row-span-view-md')
      .hasClass('hds-layout-grid--row-span-view-lg')
      .hasClass('hds-layout-grid--row-span-view-xl')
      .hasClass('hds-layout-grid--row-span-view-xxl');
  });
});
