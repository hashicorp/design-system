/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/visibility-toggle/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::VisibilityToggle id="test-visibility-toggle" />`);
      assert.dom('#test-visibility-toggle').hasClass('hds-visibility-toggle');
    });

    test('it should render the default icon, `aria-label` and `sr-live` message', async function (assert) {
      await render(hbs`<Hds::VisibilityToggle id="test-visibility-toggle" />`);
      assert
        .dom('#test-visibility-toggle')
        .hasAttribute('aria-label', 'Hide masked content');
      assert
        .dom('#test-visibility-toggle .flight-icon')
        .hasClass('flight-icon-eye-off');
      assert
        .dom('#test-visibility-toggle .sr-only')
        .hasText('Input content is now visible');
    });

    test('it should render correct icon, `aria-label` and `sr-live` message when `@isMasked` is `true`', async function (assert) {
      await render(
        hbs`<Hds::VisibilityToggle @isMasked={{true}} id="test-visibility-toggle" />`
      );
      assert
        .dom('#test-visibility-toggle')
        .hasAttribute('aria-label', 'Show masked content');
      assert
        .dom('#test-visibility-toggle .flight-icon')
        .hasClass('flight-icon-eye');
      assert
        .dom('#test-visibility-toggle .sr-only')
        .hasText('Input content is now hidden');
    });
  }
);
