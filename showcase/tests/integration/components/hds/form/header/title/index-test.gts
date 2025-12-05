/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, setupOnerror } from '@ember/test-helpers';

import { HdsFormHeaderTitle } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/header/title/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><HdsFormHeaderTitle id="test-form-header-title" /></template>,
      );
      assert.dom('#test-form-header-title').hasClass('hds-form__header-title');
    });

    // CONTENT
    test('it should render the yielded content', async function (assert) {
      await render(
        <template>
          <HdsFormHeaderTitle id="test-form-header-title"><pre
            >test</pre></HdsFormHeaderTitle>
        </template>,
      );
      assert.dom('#test-form-header-title > pre').exists().hasText('test');
    });

    // OPTIONS

    // Tag
    test('it should render the component using the default div tag', async function (assert) {
      await render(
        <template><HdsFormHeaderTitle id="test-form-header-title" /></template>,
      );
      assert.dom('#test-form-header-title').hasTagName('div');
    });

    test('it should render the component using the specified tag', async function (assert) {
      await render(
        <template>
          <HdsFormHeaderTitle id="test-form-header-title" @tag="h2" />
        </template>,
      );
      assert.dom('#test-form-header-title').hasTagName('h2');
    });

    // Size
    test('it should render the component with the default size', async function (assert) {
      await render(
        <template><HdsFormHeaderTitle id="test-form-header-title" /></template>,
      );
      assert
        .dom('#test-form-header-title')
        .hasClass('hds-typography-display-400');
    });

    test('it should render the component with a specified size', async function (assert) {
      await render(
        <template>
          <HdsFormHeaderTitle id="test-form-header-title" @size="300" />
        </template>,
      );
      assert
        .dom('#test-form-header-title')
        .hasClass('hds-typography-display-300');
    });

    // ASSERTIONS

    test('it should throw an assertion if an incorrect value for @tag is provided', async function (assert) {
      const errorMessage =
        '@tag for "Hds::Form::Header::Title" must be one of the following: div, h1, h2, h3, h4, h5, h6; received: section';
      assert.expect(2);

      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await render(
        <template>
          {{! @glint-expect-error - testing invalid component usage }}
          <HdsFormHeaderTitle @tag="section" />
        </template>,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  },
);
