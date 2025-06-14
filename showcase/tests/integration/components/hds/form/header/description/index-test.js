/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/header/description/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::Header::Description id="test-form-description" />`,
      );
      assert
        .dom('#test-form-description')
        .hasClass('hds-form__header-description');
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        hbs`<Hds::Form::Header::Description id="test-form-description"><pre>test</pre></Hds::Form::Header::Description>`,
      );
      assert.dom('#test-form-description > pre').exists().hasText('test');
    });
  },
);
