/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/stepper/list', function (hooks) {
  setupRenderingTest(hooks);

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Stepper::List @ariaLabel="Label" id="test-stepper-list" />`
    );
    assert.dom('#test-stepper-list').hasClass('hds-stepper-list');
  });

  // TITLE TAG

  test('it renders a div when the @titleTag argument is not provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List @ariaLabel="Label" as |S|>
            <S.Step>
              <:title>Test</:title>
            </S.Step>
          </Hds::Stepper::List>
        `
    );
    assert.dom('.hds-stepper-list__step-title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List @titleTag="h2" @ariaLabel="Label" as |S|>
            <S.Step>
              <:title>Test</:title>
            </S.Step>
          </Hds::Stepper::List>
        `
    );
    assert.dom('.hds-stepper-list__step-title').hasTagName('h2');
  });

  // ARIA LABEL

  test('it sets the aria-label of the ol to the value provided to the @ariaLabel argument', async function (assert) {
    await render(
      hbs`<Hds::Stepper::List id="test-stepper-list" @ariaLabel="test"/>`
    );
    assert.dom('.hds-stepper-list').hasAttribute('aria-label', 'test');
  });
});
