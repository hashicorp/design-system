/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-frame/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::AppFrame id="test-app-frame" />`);
    assert.dom('#test-app-frame').hasClass('hds-app-frame');
  });

  // CONTENT

  test('it should yield the different content areas (and spreads attributes on them)', async function (assert) {
    await render(hbs`
        <Hds::AppFrame id="test-app-frame" data-test-app-frame as |Frame|>
          <Frame.Header id="test-app-frame-header" data-test-app-frame-header>
            header container
          </Frame.Header>
          <Frame.Sidebar id="test-app-frame-sidebar" data-test-app-frame-sidebar>
            sidebar container
          </Frame.Sidebar>
          <Frame.Main id="test-app-frame-main" data-test-app-frame-main>
            main container
          </Frame.Main>
          <Frame.Footer id="test-app-frame-footer" data-test-app-frame-footer>
            footer container
          </Frame.Footer>
          <Frame.Modals id="test-app-frame-modals" data-test-app-frame-modals>
            modals container
          </Frame.Modals>
        </Hds::AppFrame>
    `);

    assert.dom('#test-app-frame[data-test-app-frame]').exists();

    // Header

    assert.dom('#test-app-frame-header[data-test-app-frame-header]').exists();
    assert.dom('header.hds-app-frame__header').exists();
    assert.dom('header.hds-app-frame__header').includesText('header container');

    // Sidebar

    assert.dom('#test-app-frame-sidebar[data-test-app-frame-sidebar]').exists();
    assert.dom('aside.hds-app-frame__sidebar').exists();
    assert
      .dom('aside.hds-app-frame__sidebar')
      .includesText('sidebar container');

    // Main

    assert.dom('#test-app-frame-main[data-test-app-frame-main]').exists();
    assert.dom('main.hds-app-frame__main').exists();
    assert.dom('main.hds-app-frame__main').includesText('main container');

    // Footer

    assert.dom('#test-app-frame-footer[data-test-app-frame-footer]').exists();
    assert.dom('footer.hds-app-frame__footer').exists();
    assert.dom('footer.hds-app-frame__footer').includesText('footer container');

    // Modals

    assert.dom('#test-app-frame-modals[data-test-app-frame-modals]').exists();
    assert.dom('div.hds-app-frame__modals').exists();
    assert.dom('div.hds-app-frame__modals').includesText('modals container');
  });

  // OPTIONS

  // hasHeader

  test('it should hide the header when @hasHeader is false', async function (assert) {
    await render(hbs`
        <Hds::AppFrame @hasHeader={{false}} as |Frame|>
          <Frame.Header id="test-app-frame-header" />
        </Hds::AppFrame>
    `);
    assert.dom('#test-app-frame-header').doesNotExist();
  });

  // hasSidebar

  test('it should hide the sidebar when @hasSidebar is false', async function (assert) {
    await render(hbs`
        <Hds::AppFrame @hasSidebar={{false}} as |Frame|>
          <Frame.Sidebar id="test-app-frame-sidebar" />
        </Hds::AppFrame>
    `);
    assert.dom('#test-app-frame-sidebar').doesNotExist();
  });

  // hasFooter

  test('it should hide the sidebar when @hasFooter is false', async function (assert) {
    await render(hbs`
        <Hds::AppFrame @hasFooter={{false}} as |Frame|>
          <Frame.Footer id="test-app-frame-footer" />
        </Hds::AppFrame>
    `);
    assert.dom('#test-app-frame-sidebar').doesNotExist();
  });

  // hasModals

  test('it should hide the modals when @hasModals is false', async function (assert) {
    await render(hbs`
        <Hds::AppFrame @hasModals={{false}} as |Frame|>
          <Frame.Modals id="test-app-frame-modals" />
        </Hds::AppFrame>
    `);
    assert.dom('#test-app-frame-modals').doesNotExist();
  });

  // Main id
  test('it should have a default id of "hds-main" on the main container', async function (assert) {
    await render(hbs`
        <Hds::AppFrame as |Frame|>
          <Frame.Main />
        </Hds::AppFrame>
    `);
    assert.dom('main#hds-main').exists();
  });

  test('it should allow a custom id for the main container to be passed in', async function (assert) {
    await render(hbs`
        <Hds::AppFrame as |Frame|>
          <Frame.Main id="test-main" />
        </Hds::AppFrame>
    `);
    assert.dom('main#test-main').exists();
  });
});
