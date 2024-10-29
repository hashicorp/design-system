/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-header/home-link', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  skip('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::AppHeader::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp" id="test-home-link" />`
    );
    assert.dom('#test-home-link').hasClass('hds-app-header__home-link');
  });

  // CONTENT

  skip('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::AppHeader::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp" @href="https://www.hashicorp.com/" id="test-home-link" />`
    );
    assert.dom('.hds-icon-hashicorp').exists();
    assert
      .dom('#test-home-link')
      .hasAttribute('href', 'https://www.hashicorp.com/')
      .hasAttribute('aria-label', 'HashiCorp');
  });

  skip('it renders the logo with a custom passed in color', async function (assert) {
    await render(
      hbs`<Hds::AppHeader::HomeLink @icon="boundary" @ariaLabel="Boundary" @color="var(--token-color-boundary-brand)" @href="#" />`
    );
    assert
      .dom('.hds-icon-boundary')
      .hasAttribute('fill', 'var(--token-color-boundary-brand)');
  });

  // ASSERTIONS

  skip('it should throw an assertion if @ariaLabel is missing/has no value', async function (assert) {
    const errorMessage =
      '@ariaLabel for "Hds::AppHeader::HomeLink" ("Logo") must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::AppHeader::HomeLink @icon="hashicorp" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
