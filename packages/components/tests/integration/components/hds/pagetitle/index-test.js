/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/pagetitle/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Pagetitle id="test-pagetitle" @title="Page title" />`
    );
    assert.dom('#test-pagetitle').hasClass('hds-pagetitle');
  });

  test('it should render contextual components', async function (assert) {
    await render(
      hbs`<Hds::Pagetitle id="test-pagetitle" @title="Page title" as |PT|>
            <PT.Breadcrumb>
              <Hds::Breadcrumb::Item @text="HCP Sandbox" @icon="org" />
              <Hds::Breadcrumb::Item @text="Boundary clusters" />
              <Hds::Breadcrumb::Item @text="boundary-cluster overview" />
            </PT.Breadcrumb>
            <PT.Actions>
              <Hds::Dropdown as |DD|>
                <DD.ToggleButton @text="Manage" @color="secondary" />
                <DD.Interactive @href="#" @text="Manage clusters" />
                <DD.Interactive @href="#" @text="Lauch Boundary locally" />
                <DD.Interactive @href="#" @text="API keys" />
                <DD.Separator />
                <DD.Interactive @href="#" @text="Delete" @color="critical" @icon="trash" />
              </Hds::Dropdown>
              <Hds::Button @text="Open Admin UI" @color="primary" @icon="external-link" @iconPosition="trailing" />
            </PT.Actions>
            <PT.Metadata as |M|>
              <M.Subtitle>This is the subtitle, which is very meta.</M.Subtitle>
              <Shw::Placeholder @text="yield this content" @height="50" @background="#eee" />
              <M.Description>
                This is a description, or some type of metadata object. Lorem ipsum dolar sit amet.
                <Hds::Link::Inline @href="#" @icon="external-link">More details</Hds::Link::Inline>
              </M.Description>
            </PT.Metadata>
          </Hds::Pagetitle>`
    );
    assert.dom('.hds-pagetitle').exists();
    assert.dom('.hds-breadcrumb').exists();
    assert.dom('.hds-button-set').exists();
    assert.dom('.hds-dropdown').exists();
    assert.dom('.hds-button').exists();
    assert.dom('.hds-pagetitle-metadata').exists();
    assert.dom('.hds-pagetitle-subtitle').exists();
    assert.dom('.hds-pagetitle-description').exists();
    assert.dom('.hds-link-inline').exists();
  });
});
