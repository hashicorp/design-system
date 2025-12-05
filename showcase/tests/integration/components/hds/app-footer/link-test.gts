/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsAppFooterLink } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/app-footer/link', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <ul>
          <HdsAppFooterLink @href="https://cloud.hashicorp.com" id="test-link">
            Custom link
          </HdsAppFooterLink>
        </ul>
      </template>,
    );
    assert.dom('#test-link').hasClass('hds-app-footer__link');
  });

  // CONTENT

  test('it renders text content yielded within the Link', async function (assert) {
    await render(
      <template>
        <ul>
          <HdsAppFooterLink @href="https://cloud.hashicorp.com" id="test-link">
            Custom link
          </HdsAppFooterLink>
        </ul>
      </template>,
    );
    assert
      .dom('#test-link')
      .hasText('Custom link')
      .hasAttribute('href', 'https://cloud.hashicorp.com');
  });
});
