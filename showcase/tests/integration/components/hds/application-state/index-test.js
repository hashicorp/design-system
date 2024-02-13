/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/application-state/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState id="test-application-state">
        template block text
      </Hds::ApplicationState>
    `);

      assert.dom('#test-application-state').hasClass('hds-application-state');
    });
  }
);
