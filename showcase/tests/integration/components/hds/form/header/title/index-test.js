/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/header/title/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::Header::Title id="test-form-header-title" />`,
      );
      assert.dom('#test-form-header-title').hasClass('hds-form__header-title');
    });

    // Options

    /*
    tag?: HdsTextTags;
    size?: HdsTextSizes;
      export const DEFAULT_SIZE = HdsTextSizeValues.FourHundred;
    */

    // Tag
    test('it should render the component using the default div tag', async function (assert) {
      await render(
        hbs`<Hds::Form::Header::Title id="test-form-header-title" />`,
      );
      assert.dom('#test-form-header-title').hasTagName('div');
    });

    test('it should render the component using the specified tag', async function (assert) {
      await render(
        hbs`<Hds::Form::Header::Title id="test-form-header-title" @tag="h2" />`,
      );
      assert.dom('#test-form-header-title').hasTagName('h2');
    });

    // Size
    test('it should render the component with the default size', async function (assert) {
      await render(
        hbs`<Hds::Form::Header::Title id="test-form-header-title" />`,
      );
      assert.dom('#test-form-header-title').hasClass('hds-typography-display-400');
    });

    test('it should render the component with a specified size', async function (assert) {
      await render(
        hbs`<Hds::Form::Header::Title id="test-form-header-title" @size="300" />`,
      );
      assert.dom('#test-form-header-title').hasClass('hds-typography-display-300');
    });
  },
);
