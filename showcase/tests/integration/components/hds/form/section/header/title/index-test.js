/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/section/header/title/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::Header::Title id="test-form-section-header-title" />`,
      );
      assert
        .dom('#test-form-section-header-title')
        .hasClass('hds-form__section-header-title');
    });

    // OPTIONS

    // Tag
    test('it should render the component using the default div tag', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::Header::Title id="test-form-section-header-title" />`,
      );
      assert.dom('#test-form-section-header-title').hasTagName('div');
    });

    test('it should render the component using the specified tag', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::Header::Title id="test-form-section-header-title" @tag="h2" />`,
      );
      assert.dom('#test-form-section-header-title').hasTagName('h2');
    });

    // Size
    test('it should render the component with the default size', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::Header::Title id="test-form-section-header-title" />`,
      );
      assert
        .dom('#test-form-section-header-title')
        .hasClass('hds-typography-display-300');
    });

    test('it should render the component with a specified size', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::Header::Title id="test-form-section-header-title" @size="200" />`,
      );
      assert
        .dom('#test-form-section-header-title')
        .hasClass('hds-typography-display-200');
    });

    // ASSERTIONS

    test('it should throw an assertion if an incorrect value for @tag is provided', async function (assert) {
      const errorMessage =
        '@tag for "Hds::Form::Header::Title" must be one of the following: div, h1, h2, h3, h4, h5, h6; received: section';
      assert.expect(2);

      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await render(hbs`<Hds::Form::Section::Header::Title @tag="section" />`);

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  },
);
