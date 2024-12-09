/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    this.set('model', [
      { key: 'artist', name: 'Test 1', description: 'Test 1 description' },
      { key: 'album', name: 'Test 2', description: 'Test 2 description' },
      { key: 'year', name: 'Test 3', description: 'Test 3 description' },
    ]);

    await render(
      hbs`<Hds::AdvancedTable id="data-test-advanced-table" @model={{this.model}} @columns={{array
        (hash key='artist' label='components.table.headers.artist')
        (hash key='album' label='components.table.headers.album')
        (hash key='year' label='components.table.headers.year')
      }}/>`
    );
    assert.dom('#data-test-advanced-table').hasClass('hds-advanced-table');
  });
});
