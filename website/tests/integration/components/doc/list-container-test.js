/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'website/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setRunOptions } from 'ember-a11y-testing/test-support';

module('Integration | Component | doc/list-container', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    setRunOptions({
      rules: {
        list: { enabled: false },
      },
    });
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Doc::ListContainer />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Doc::ListContainer>
        template block text
      </Doc::ListContainer>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
