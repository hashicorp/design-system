/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/super-select/single/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      this.set('NOOP', () => {});
      await render(
        hbs`<Hds::Form::SuperSelect::Single @onChange={{this.NOOP}} id="test-super-select-single" />`
      );
      assert.dom('.hds-form-super-select-single #test-super-select-single').exists();
    });
  }
);
