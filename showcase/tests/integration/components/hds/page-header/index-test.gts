/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import PageHeader from "@hashicorp/design-system-components/components/hds/page-header/index";
import Breadcrumb from "@hashicorp/design-system-components/components/hds/breadcrumb/index";
import Item from "@hashicorp/design-system-components/components/hds/breadcrumb/item";

module('Integration | Component | hds/page-header/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><PageHeader id="test-page-header" as |PH|>
            <PH.Title>Page title</PH.Title>
          </PageHeader></template>,
    );
    assert.dom('#test-page-header').hasClass('hds-page-header');
  });

  // CONTEXTUAL COMPONENTS

  test('it should render contextual components', async function (assert) {
    await render(
      <template><PageHeader id="test-page-header" as |PH|>
            <PH.Title>Page title</PH.Title>
            <PH.Breadcrumb>
              <Breadcrumb>
                <Item @text="Breadcrumb" />
              </Breadcrumb>
            </PH.Breadcrumb>
            <PH.IconTile @icon="server-cluster" />
            <PH.Actions>Actions</PH.Actions>
            <PH.Subtitle>Subtitle</PH.Subtitle>
            <PH.Description>Description</PH.Description>
            <PH.Generic><p class="custom">Generic</p></PH.Generic>
          </PageHeader></template>,
    );
    assert.dom('.hds-page-header').exists();
    assert.dom('.hds-page-header__title').exists();
    assert.dom('.hds-page-header__title').hasText('Page title');
    assert.dom('.hds-breadcrumb').exists();
    assert.dom('.hds-icon-tile').exists();
    assert.dom('.hds-page-header__actions').exists();
    assert.dom('.hds-page-header__actions').hasText('Actions');
    assert.dom('.hds-page-header__subtitle').exists();
    assert.dom('.hds-page-header__subtitle').hasText('Subtitle');
    assert.dom('.hds-page-header__description').exists();
    assert.dom('.hds-page-header__description').hasText('Description');
    assert.dom('.custom').exists();
    assert.dom('.custom').hasText('Generic');
  });
  test('it should not render the contextual components if not provided', async function (assert) {
    await render(<template><PageHeader /></template>);
    assert.dom('.hds-breadcrumb').doesNotExist();
    assert.dom('.hds-page-header__title').doesNotExist();
    assert.dom('.hds-page-header__actions').doesNotExist();
    assert.dom('.hds-page-header__subtitle').doesNotExist();
    assert.dom('.hds-page-header__description').doesNotExist();
    assert.dom('.hds-icon-tile').doesNotExist();
  });
});
