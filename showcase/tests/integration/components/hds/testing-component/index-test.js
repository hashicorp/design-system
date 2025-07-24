/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/testing-component/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::TestingComponent id="test-testing-component" />`);
      assert.dom('#test-testing-component').hasClass('hds-testing-component');
    });

    // TITLE

    test('it should render the title when the "title" argument is provided', async function (assert) {
      await render(
        hbs`<Hds::TestingComponent @title="Test"></Hds::TestingComponent>`,
      );
      assert.dom('.hds-testing-component-title').hasText('Test');
    });

    // DESCRIPTION

    test('it should render the description when the "description" argument is provided', async function (assert) {
      await render(
        hbs`<Hds::TestingComponent @description="Test"></Hds::TestingComponent>`,
      );
      assert.dom('.hds-testing-component__description').hasText('Test');
    });

    // ACTIVE

    test('it should add the active class when the "isActive" argument is true', async function (assert) {
      await render(
        hbs`<Hds::TestingComponent @isActive={{true}}></Hds::TestingComponent>`,
      );
      assert
        .dom('.hds-testing-component')
        .hasClass('hds-testing-component-active');
    });

    // COLOR

    test('it should add the proper color class when the "color" argument is set', async function (assert) {
      await render(
        hbs`<Hds::TestingComponent @color="secondary"></Hds::TestingComponent>`,
      );
      assert
        .dom('.hds-testing-component')
        .hasClass('hds-testing-component--color-secondary');
    });
  },
);
