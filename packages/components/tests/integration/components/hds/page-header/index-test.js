/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/page-header/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::PageHeader id="test-page-header" @title="Page title" />`
    );
    assert.dom('#test-page-header').hasClass('hds-page-header');
  });

  // CONTEXTUAL COMPONENTS

  test('it should render contextual components', async function (assert) {
    await render(
      hbs`<Hds::PageHeader id="test-page-geader" @title="Page title" as |PH|>
            <PH.Breadcrumb>
              <Hds::Breadcrumb>
                <Hds::Breadcrumb::Item @text="HCP Sandbox" @icon="org" />
                <Hds::Breadcrumb::Item @text="Boundary clusters" />
                <Hds::Breadcrumb::Item @text="boundary-cluster overview" />
              </Hds::Breadcrumb>
            </PH.Breadcrumb>
            <PH.IconTile @icon="server-cluster" @color="boundary" />
            <PH.Actions>
              <Hds::Dropdown as |DD|>
                <DD.ToggleButton @text="Manage" @color="secondary" />
                <DD.Interactive @href="#" @text="Manage clusters" />
                <DD.Interactive @href="#" @text="Lauch Boundary locally" />
                <DD.Interactive @href="#" @text="API keys" />
                <DD.Separator />
                <DD.Interactive @href="#" @text="Delete" @color="critical" @icon="trash" />
              </Hds::Dropdown>
              <Hds::Button @text="Open Admin UI" @color="primary" @icon="external-link" @iconPosition="trailing" />
            </PH.Actions>
            <PH.Subtitle>This is the subtitle, which is very meta.</PH.Subtitle>
            <PH.Description>
              This is a description, or some type of metadata object. Lorem ipsum dolar sit amet.
              <Hds::Link::Inline @href="#" @icon="external-link">More details</Hds::Link::Inline>
            </PH.Description>
            <PH.Generic>
              <p class="custom">This is custom content</p>
            </PH.Generic>
          </Hds::PageHeader>`
    );
    assert.dom('.hds-page-header').exists();
    assert.dom('.hds-breadcrumb').exists();
    assert.dom('.hds-icon-tile').exists();
    assert.dom('.hds-page-header__actions').exists();
    assert.dom('.hds-page-header__subtitle').exists();
    assert.dom('.hds-page-header__description').exists();
    assert.dom('.custom').exists();
  });
  test('it should not render the contextual components if not provided', async function (assert) {
    await render(hbs`<Hds::PageHeader @title="Page title" />`);
    assert.dom('.hds-breadcrumb').doesNotExist();
    assert.dom('.hds-page-header__actions').doesNotExist();
    assert.dom('.hds-page-header__subtitle').doesNotExist();
    assert.dom('.hds-page-header__description').doesNotExist();
    assert.dom('.hds-icon-tile').doesNotExist();
  });

  // ASSERTIONS

  test('it should throw an assertion if a @title is missing/has no value', async function (assert) {
    const errorMessage = '@title for "Hds::PageHeader" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::PageHeader/>`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
