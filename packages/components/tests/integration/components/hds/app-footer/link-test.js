/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-footer/link', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <ul>
        <Hds::AppFooter::Link @href="https://cloud.hashicorp.com" id="test-link">
          Custom link
        </Hds::AppFooter::Link>
      </ul>`);
    assert.dom('#test-link').hasClass('hds-app-footer__link');
  });

  // CONTENT

  test('it renders text content yielded within the Link', async function (assert) {
    await render(
      hbs`
        <ul>
          <Hds::AppFooter::Link @href="https://cloud.hashicorp.com" id="test-link">
            Custom link
          </Hds::AppFooter::Link>
        </ul>`
    );
    assert
      .dom('#test-link')
      .hasText('Custom link')
      .hasAttribute('href', 'https://cloud.hashicorp.com');
  });
});
