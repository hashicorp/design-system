/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/application-state/footer',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState::Footer id="test-application-state-footer">
        template block text
      </Hds::ApplicationState::Footer>
    `);

      assert
        .dom('#test-application-state-footer')
        .hasClass('hds-application-state__footer');
    });

    // CONTEXTUAL COMPONENTS

    test('it should render an Hds::Link::Standalone component', async function (assert) {
      await render(hbs`
        <Hds::ApplicationState::Footer id="test-application-state-footer" as |F|>
          <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/"/>
        </Hds::ApplicationState::Footer>
      `);
      assert
        .dom('#test-application-state-footer a')
        .exists()
        .hasClass('hds-link-standalone')
        .hasText('Go back');
    });
  }
);
