/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsAppFooterCopyright } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/app-footer/copyright', function (hooks) {
  setupRenderingTest(hooks);

  const currentYear = new Date().getFullYear();

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsAppFooterCopyright id="test-copyright" /></template>,
    );
    assert.dom('#test-copyright').hasClass('hds-app-footer__copyright');
  });

  // OPTIONS

  test('it renders the copyright with the current year by default', async function (assert) {
    await render(
      <template><HdsAppFooterCopyright id="test-copyright" /></template>,
    );
    assert.dom('#test-copyright').includesText(`${currentYear}`);
  });

  test('it renders the copyright with the passed in year value', async function (assert) {
    await render(
      <template>
        <HdsAppFooterCopyright id="test-copyright" @year="1984" />
      </template>,
    );
    assert.dom('#test-copyright').includesText('1984');
  });
});
