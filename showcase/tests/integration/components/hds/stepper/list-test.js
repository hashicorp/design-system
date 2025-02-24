/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/list',
  function (hooks) {
    setupRenderingTest(hooks);

    // CLASSES

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Stepper::List id="test-stepper-list" />`
      );
      assert
        .dom('#test-stepper-list')
        .hasClass('hds-stepper-list');
    });

    // TITLE TAG

    test('it renders a div when the @titleTag argument is not provided', async function (assert) {
      await render(
        hbs`
          <Hds::Stepper::List as |S|>
            <S.Step>
              <:title>Test</:title>
            </S.Step>
          </Hds::Stepper::List>
        `
      );
      assert.dom('.hds-stepper-list__step__title').hasTagName('div');
    });

    test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
      await render(
        hbs`
          <Hds::Stepper::List @titleTag="h2" as |S|>
            <S.Step>
              <:title>Test</:title>
            </S.Step>
          </Hds::Stepper::List>
        `
      );
      assert.dom('.hds-stepper-list__step__title').hasTagName('h2');
    });
  }
);