/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-footer/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::AppFooter id="test-app-footer" />`);
    assert.dom('#test-app-footer').hasClass('hds-app-footer');
  });

  // CONTENT
  test('it should render the passed in content', async function (assert) {
    await render(hbs`
      <Hds::AppFooter id="test-app-footer">
        <:listItems>
          <Hds::AppFooter::StatusLink @status="operational" id="test-status-link" />
          <Hds::AppFooter::Link @href="https://cloud.hashicorp.com/docs/changelog" id="test-custom-link">
            Changelog
          </Hds::AppFooter::Link>
          <Hds::AppFooter::Item id="test-custom-item">Item</Hds::AppFooter::Item>
          <Hds::AppFooter::LegalLinks />
          <Hds::AppFooter::Copyright id="test-copyright" />
        </:listItems>
      </Hds::AppFooter>
    `);
    assert.dom('#test-status-link').exists();
    assert.dom('#test-custom-link').exists();
    assert.dom('#test-custom-item').exists();
    assert.dom('#test-copyright').exists();

    // LegalLinks:
    assert.dom('.hds-app-footer__link--support').exists();
    assert.dom('.hds-app-footer__link--terms').exists();
    assert.dom('.hds-app-footer__link--privacy').exists();
    assert.dom('.hds-app-footer__link--security').exists();
    assert.dom('.hds-app-footer__link--accessibility').exists();
  });
});
