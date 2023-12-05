/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/app-footer/legal-links',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<ul><Hds::AppFooter::LegalLinks id="test-legal-links" /></ul>`
      );
      assert.dom('#test-legal-links').hasClass('hds-app-footer__legal-links');
    });

    // CONTENT

    test('it contains the default links with default href values', async function (assert) {
      await render(
        hbs`<ul><Hds::AppFooter::LegalLinks id="test-legal-links" /></ul>`
      );
      assert
        .dom('#test-legal-links li:nth-child(1) a')
        .hasText('Support')
        .hasAttribute('href', 'https://www.hashicorp.com/support');
      assert
        .dom('#test-legal-links li:nth-child(2) a')
        .hasText('Terms')
        .hasAttribute('href', 'https://www.hashicorp.com/terms-of-service');
      assert
        .dom('#test-legal-links li:nth-child(3) a')
        .hasText('Privacy')
        .hasAttribute('href', 'https://www.hashicorp.com/privacy');
      assert
        .dom('#test-legal-links li:nth-child(4) a')
        .hasText('Security')
        .hasAttribute('href', 'https://www.hashicorp.com/security');
      assert
        .dom('#test-legal-links li:nth-child(5) a')
        .hasText('Accessibility')
        .hasAttribute('href', 'https://www.hashicorp.com/accessibility');
    });

    // OPTIONS

    test('it uses the passed in custom href values', async function (assert) {
      await render(hbs`
      <ul><Hds::AppFooter::LegalLinks 
        id="test-legal-links"
        @hrefForSupport="https://www.support.com"
        @hrefForTerms="https://www.terms.com"
        @hrefForPrivacy="https://www.privacy.com"
        @hrefForSecurity="https://www.security.com"
        @hrefForAccessibility="https://www.a11y.com"
      /></ul>
    `);
      assert
        .dom('#test-legal-links li:nth-child(1) a')
        .hasText('Support')
        .hasAttribute('href', 'https://www.support.com');
      assert
        .dom('#test-legal-links li:nth-child(2) a')
        .hasText('Terms')
        .hasAttribute('href', 'https://www.terms.com');
      assert
        .dom('#test-legal-links li:nth-child(3) a')
        .hasText('Privacy')
        .hasAttribute('href', 'https://www.privacy.com');
      assert
        .dom('#test-legal-links li:nth-child(4) a')
        .hasText('Security')
        .hasAttribute('href', 'https://www.security.com');
      assert
        .dom('#test-legal-links li:nth-child(5) a')
        .hasText('Accessibility')
        .hasAttribute('href', 'https://www.a11y.com');
    });
  }
);
