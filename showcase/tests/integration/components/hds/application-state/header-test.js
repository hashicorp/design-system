/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/application-state/header',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::ApplicationState::Header @title="An error has occurred" id="test-application-state-header" />`
      );

      assert
        .dom('#test-application-state-header')
        .hasClass('hds-application-state__header');
    });

    test('it should render an icon if @icon is defined', async function (assert) {
      await render(
        hbs`<Hds::ApplicationState::Header @title="An error has occurred" id="test-application-state-header" @icon="help" @errorCode="404" />`
      );

      assert.dom('.flight-icon').exists();
    });

    test('it should render an error code if @errorCode is defined', async function (assert) {
      await render(
        hbs`<Hds::ApplicationState::Header @title="An error has occurred" id="test-application-state-header" @icon="help" @errorCode="404" />`
      );

      assert.dom('.hds-application-state__error-code').exists();
    });
  }
);
