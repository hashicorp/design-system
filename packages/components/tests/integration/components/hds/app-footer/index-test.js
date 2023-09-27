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

  test('it renders the default content', async function (assert) {
    await render(hbs`<Hds::AppFooter id="test-app-footer" />`);
    assert.dom('.hds-app-footer__copyright').exists();
  });

  test('it renders the passed in content', async function (assert) {
    await render(hbs`
      <Hds::AppFooter as |AF|>
        <AF.ExtraContentBefore id="test-extra-content-before">Before</AF.ExtraContentBefore>
        <AF.Item id="test-custom-item">Custom item</AF.Item>
        <AF.Link @href="https://cloud.hashicorp.com" id="test-custom-link">
        Custom link
        </AF.Link>
        <AF.StatusLink @status="operational" id="test-status-link" />
        <AF.LegalLinks id="test-legal-links" />
        <AF.ExtraContentAfter id="test-extra-content-after">After</AF.ExtraContentAfter>
      </Hds::AppFooter>
    `);
    assert.dom('#test-extra-content-before').hasText('Before');
    assert.dom('#test-custom-item').hasText('Custom item');
    assert
      .dom('#test-custom-link')
      .hasText('Custom link')
      .hasAttribute('href', 'https://cloud.hashicorp.com');
    assert.dom('#test-status-link').exists();
    assert.dom('#test-legal-links').exists();
    assert.dom('#test-extra-content-after').hasText('After');
  });
});
