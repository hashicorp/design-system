import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/empty-state/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    // Template block usage:
    await render(hbs`
      <Hds::EmptyState>template block text</Hds::EmptyState>
    `);

    assert.dom(this.element).hasText('template block text');
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::EmptyState id="test-empty-state"><p>template block text</p></Hds::EmptyState>
    `);

    assert.dom('#test-empty-state').hasClass('hds-empty-state');
  });
});
