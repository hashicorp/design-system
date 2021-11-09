import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/badge/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the default badge with text', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Hds::Badge @text="text renders" />`);

    assert.dom(this.element).hasText('text renders');
  });
  test('it should render with a CSS class that is the same as the component name', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('div#test-badge').hasClass('hds-badge');
  });
  test('it should render the neutral color as the default if no color is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('div#test-badge').hasClass('hds-badge--color-neutral');
  });
  test('it should render the right CSS color class if the @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @color="highlight" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--color-highlight');
  });
  test('it should render the medium size if no size is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('div#test-badge').hasClass('hds-badge--size-medium');
  });
  test('it should render the right CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @size="small" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--size-small');
  });
  test('it should render the filled type if no type is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('div#test-badge').hasClass('hds-badge--type-filled');
  });
  test('it should render the right CSS type class if @type prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @type="filled" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--type-filled');
  });
  test('if an icon is declared the flight icon should render in the component', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @icon="activity" />`
    );
    assert.dom(this.element.querySelector('.flight-icon')).exists();
  });
  test('if an icon exists and text does not exist, srOnlyText should exist', async function (assert) {
    await render(
      hbs`<Hds::Badge @srOnlyText="meaningful text for icon only badge" id="test-badge" @icon="activity" />`
    );
    assert.equal(
      this.element.querySelector('.sr-only').textContent.trim(),
      'meaningful text for icon only badge'
    );
  });
});
