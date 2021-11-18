import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/badge-count/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the default badge-count with text', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Hds::BadgeCount @text="text renders" />`);

    assert.dom(this.element).hasText('text renders');
  });
  test('it should render with a CSS class that is the same as the component name', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('div#test-badge-count').hasClass('hds-badge-count');
  });
  test('it should have the default color if no @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert
      .dom('div#test-badge-count')
      .hasClass('hds-badge-count--color-neutral');
  });
  test('it should have the right color class based on the @color prop', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @color="neutral-dark-mode" />`
    );
    assert
      .dom('div#test-badge-count')
      .hasClass('hds-badge-count--color-neutral-dark-mode');
  });
  test('it should have the medium size if no @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('div#test-badge-count').hasClass('hds-badge-count--size-medium');
  });
  test('it should have the right size class based on the @size prop', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @size="small" />`
    );
    assert.dom('div#test-badge-count').hasClass('hds-badge-count--size-small');
  });
  test('it should have the filled type if no @type prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('div#test-badge-count').hasClass('hds-badge-count--type-filled');
  });
  test('it should have the right type class based on the @type prop', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @type="inverted" />`
    );
    assert
      .dom('div#test-badge-count')
      .hasClass('hds-badge-count--type-inverted');
  });
});
