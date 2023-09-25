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
      <Hds::AppFooter id="test-app-footer" as |AF|>
        <AF.StatusLink @status="operational" id="test-status-link" />
        <AF.Link @href="https://cloud.hashicorp.com/docs/changelog" id="test-custom-link">
          Changelog
        </AF.Link>
        <AF.Item id="test-custom-item">Item</AF.Item>
        <AF.LegalLinks />
      </Hds::AppFooter>
    `);
    assert.dom('#test-status-link').exists();
    assert.dom('#test-custom-link').exists();
    assert.dom('#test-custom-item').exists();

    // TODO: Not sure how to test for these as I deleted the class names from feedback, should I add data-attributes instead?
    // LegalLinks:
    // assert.dom('.hds-app-footer__link--support').exists();
    // assert.dom('.hds-app-footer__link--terms').exists();
    // assert.dom('.hds-app-footer__link--privacy').exists();
    // assert.dom('.hds-app-footer__link--security').exists();
    // assert.dom('.hds-app-footer__link--accessibility').exists();
  });
});
