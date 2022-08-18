import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/empty-state/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      <Hds::EmptyState::Header>template block text</Hds::EmptyState::Header>
    `);

    assert.dom(this.element).hasText('template block text');
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::EmptyState::Header id="test-empty-state-header"><p>template block text</p></Hds::EmptyState::Header>
    `);

    assert.dom('#test-empty-state-header').hasClass('hds-empty-state__header');
  });
});
