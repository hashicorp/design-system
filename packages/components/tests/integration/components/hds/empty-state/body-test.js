import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/empty-state/body', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      <Hds::EmptyState::Body>template block text</Hds::EmptyState::Body>
    `);

    assert.dom(this.element).hasText('template block text');
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::EmptyState::Body id="test-empty-state-body"><p>template block text</p></Hds::EmptyState::Body>
    `);

    assert.dom('#test-empty-state-body').hasClass('hds-empty-state__body');
  });
});
