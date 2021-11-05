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
  test('it should render the highlight color if the highlight color is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @color="highlight" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--color-highlight');
  });
  test('it should render the success color if the success color is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @color="success" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--color-success');
  });
  test('it should render the warning color if the warning color is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @color="warning" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--color-warning');
  });
  test('it should render the critical color if the critical color is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @color="critical" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--color-critical');
  });
  test('it should render the medium size if no size is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('div#test-badge').hasClass('hds-badge--size-medium');
  });
  test('it should render the small size if the small size is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @size="small" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--size-small');
  });
  test('it should render the medium size if the medium size is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @size="medium" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--size-medium');
  });
  test('it should render the large size if the large size is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @size="large" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--size-large');
  });
  test('it should render the filled type if no type is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('div#test-badge').hasClass('hds-badge--type-filled');
  });
  test('it should render the filled type if filled is explicitly declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @type="filled" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--type-filled');
  });
  test('it should render the inverted type if inverted is explicitly declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @type="inverted" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--type-inverted');
  });
  test('it should render the outlined type if outlined is explicitly declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @type="outlined" />`
    );
    assert.dom('div#test-badge').hasClass('hds-badge--type-outlined');
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
