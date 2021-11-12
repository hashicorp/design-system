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
  test('it should render the neutral color as the default if no color is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert
      .dom('div#test-badge-count')
      .hasClass('hds-badge-count--color-neutral');
  });
  test('it should render the right CSS color class if the @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @color="neutral-dark-mode" />`
    );
    assert
      .dom('div#test-badge-count')
      .hasClass('hds-badge-count--color-neutral-dark-mode');
  });
  test('it should render the medium size if no size is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('div#test-badge-count').hasClass('hds-badge-count--size-medium');
  });
  test('it should render the right CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @size="small" />`
    );
    assert.dom('div#test-badge-count').hasClass('hds-badge-count--size-small');
  });
  test('it should render the filled type if no type is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('div#test-badge-count').hasClass('hds-badge-count--type-filled');
  });
  test('it should render the right CSS type class if @type prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @type="inverted" />`
    );
    assert
      .dom('div#test-badge-count')
      .hasClass('hds-badge-count--type-inverted');
  });
});
