/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/file-input/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::FileInput::Base id="test-form-file-input" />`);
    assert.dom('#test-form-file-input').hasClass('hds-form-file-input');
  });

  test('it should set aria-describedby and id arguments if pass @id or @ariaDescribedBy', async function (assert) {
    await render(
      hbs`<Hds::Form::FileInput::Base @id="custom-id" @ariaDescribedBy="custom-description-id" />`,
    );
    assert
      .dom('#custom-id')
      .exists()
      .hasAria('describedby', 'custom-description-id');
  });
});
