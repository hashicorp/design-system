/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/copy-button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::CopyButton id="test-copy-button" @text="Copy" />`);
    assert.dom('#test-copy-button').hasClass('hds-copy-button');
  });
  test('it should have an aria-label attribute if isIconOnly is set to true', async function (assert) {
    await render(
      hbs`<Hds::CopyButton id="test-copy-button" @text="Copy" @isIconOnly={{true}} />`
    );
    assert.dom('#test-copy-button').hasAria('label', 'Copy');
  });
});
