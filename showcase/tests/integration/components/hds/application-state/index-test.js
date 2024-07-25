/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/application-state/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState id="test-application-state">
        template block text
      </Hds::ApplicationState>
    `);

      assert.dom('#test-application-state').hasClass('hds-application-state');
    });

    test('it should have the correct alignment class when no alignment is provided', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState id="test-application-state">
        template block text
      </Hds::ApplicationState>
    `);

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--align-left');
    });

    test('it should have the correct alignment class when alignment is set to "left"', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState id="test-application-state" @align="left">
        template block text
      </Hds::ApplicationState>
    `);

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--align-left');
    });

    test('it should have the correct alignment class when alignment is set to "center"', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState id="test-application-state" @align="center">
        template block text
      </Hds::ApplicationState>
    `);

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--align-center');
    });

    // ASSERTIONS

    test('it should throw an assertion if an incorrect value for @alignment provided', async function (assert) {
      const errorMessage =
        '@align for "Hds::ApplicationState" must be one of the following: left, center; received: test';

      assert.expect(2);

      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await render(hbs`
      <Hds::ApplicationState id="test-application-state" @align="test">
        template block text
      </Hds::ApplicationState>
    `);

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
