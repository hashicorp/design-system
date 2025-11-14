/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/application-state/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsApplicationState id="test-application-state">
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert.dom('#test-application-state').hasClass('hds-application-state');
    });

    test('it should have the correct alignment class when no alignment is provided', async function (assert) {
      await render(
        <template>
          <HdsApplicationState id="test-application-state">
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--align-left');
    });

    test('it should have the correct alignment class when alignment is set to "left"', async function (assert) {
      await render(
        <template>
          <HdsApplicationState id="test-application-state" @align="left">
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--align-left');
    });

    test('it should have the correct alignment class when alignment is set to "center"', async function (assert) {
      await render(
        <template>
          <HdsApplicationState id="test-application-state" @align="center">
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--align-center');
    });

    test('it should have the correct class when isAutoCentered is not provided', async function (assert) {
      await render(
        <template>
          <HdsApplicationState id="test-application-state">
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--is-auto-centered');
    });

    test('it should have the correct class when isAutoCentered is set to true', async function (assert) {
      await render(
        <template>
          <HdsApplicationState
            id="test-application-state"
            @isAutoCentered={{true}}
          >
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert
        .dom('#test-application-state')
        .hasClass('hds-application-state--is-auto-centered');
    });

    test('it should have the correct class when isAutoCentered is set to false', async function (assert) {
      await render(
        <template>
          <HdsApplicationState
            id="test-application-state"
            @isAutoCentered={{false}}
          >
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert
        .dom('#test-application-state')
        .doesNotHaveClass('hds-application-state--is-auto-centered');
    });

    // CONTEXTUAL COMPONENTS

    test('it renders the contextual components', async function (assert) {
      await render(
        <template>
          <HdsApplicationState as |A|>
            <A.Media>ApplicationState Media</A.Media>
            <A.Header @title="ApplicationState Title" />
            <A.Body>ApplicationState Body</A.Body>
            <A.Footer>ApplicationState Footer</A.Footer>
          </HdsApplicationState>
        </template>,
      );
      assert
        .dom('.hds-application-state__media')
        .hasText('ApplicationState Media');
      assert
        .dom('.hds-application-state__header')
        .hasText('ApplicationState Title');
      assert
        .dom('.hds-application-state__body')
        .hasText('ApplicationState Body');
      assert
        .dom('.hds-application-state__footer')
        .hasText('ApplicationState Footer');
    });
    test('it does not render the contextual components if not provided', async function (assert) {
      await render(<template><HdsApplicationState /></template>);
      assert.dom('.hds-application-date__media').doesNotExist();
      assert.dom('.hds-application-date__header').doesNotExist();
      assert.dom('.hds-application-date__body').doesNotExist();
      assert.dom('.hds-application-date__footer').doesNotExist();
    });

    // ASSERTIONS

    test('it should throw an assertion if an incorrect value for @alignment provided', async function (assert) {
      const errorMessage =
        '@align for "Hds::ApplicationState" must be one of the following: left, center; received: test';

      assert.expect(2);

      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await render(
        <template>
          {{! @glint-expect-error - assertion testing invalid value }}
          <HdsApplicationState id="test-application-state" @align="test">
            template block text
          </HdsApplicationState>
        </template>,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  },
);
