/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/<%= dasherizedModuleName %>/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::<%= columnizedModuleName %> id="test-<%= kebabizedModuleName %>" />`
      );
      assert
        .dom('#test-<%= kebabizedModuleName %>')
        .hasClass('hds-<%= kebabizedModuleName %>');
    });
  }
);
