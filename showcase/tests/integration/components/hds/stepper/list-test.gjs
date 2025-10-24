/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import List from "@hashicorp/design-system-components/components/hds/stepper/list/index";

module('Integration | Component | hds/stepper/list', function (hooks) {
  setupRenderingTest(hooks);

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><List @ariaLabel="Label" id="test-stepper-list" /></template>,
    );
    assert.dom('#test-stepper-list').hasClass('hds-stepper-list');
  });

  // TITLE TAG

  test('it renders a div when the @titleTag argument is not provided', async function (assert) {
    await render(
      <template>
          <List @ariaLabel="Label" as |S|>
            <S.Step>
              <:title>Test</:title>
            </S.Step>
          </List>
        </template>,
    );
    assert.dom('.hds-stepper-list__step-title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await render(
      <template>
          <List @titleTag="h2" @ariaLabel="Label" as |S|>
            <S.Step>
              <:title>Test</:title>
            </S.Step>
          </List>
        </template>,
    );
    assert.dom('.hds-stepper-list__step-title').hasTagName('h2');
  });

  // ARIA LABEL

  test('it sets the aria-label of the ol to the value provided to the @ariaLabel argument', async function (assert) {
    await render(
      <template><List id="test-stepper-list" @ariaLabel="test" /></template>,
    );
    assert.dom('.hds-stepper-list').hasAttribute('aria-label', 'test');
  });
});
