/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/key-value-inputs/generic',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Generic id="test-form-key-value-generic">
      <span id='foo'>Generic content</span>
    </Hds::Form::KeyValueInputs::Generic>`);
      assert
        .dom('#test-form-key-value-generic')
        .hasClass('hds-form-key-value-inputs__generic-container');
    });

    test('it should render the content', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Generic id="test-form-key-value-generic">
      <span id='foo'>Generic content</span>
    </Hds::Form::KeyValueInputs::Generic>`);
      assert
        .dom('#test-form-key-value-generic #foo')
        .hasText('Generic content');
    });
  },
);
