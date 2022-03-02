import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/card/container', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert.dom('#test-card-container').hasClass('hds-card__container');
  });

  // LEVEL + BORDER

  test('it should have the base level elevation as the default if no @level prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert.dom('#test-card-container').hasClass('hds-elevation-base');
  });
  test('it should have the correct level class based on the @level prop', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @level="mid" />`
    );
    assert.dom('#test-card-container').hasClass('hds-elevation-mid');
  });
  test('it should have a "surface" elavation the @hasBorder prop is true', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @hasBorder={{true}} />`
    );
    assert.dom('#test-card-container').hasClass('hds-surface-base');
  });

  // BACKGROUND

  test('it should have the default background if no @background prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--background-neutral-primary');
  });
  test('it should have the correct background class based on the @background prop', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @background="neutral-secondary" />`
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--background-neutral-secondary');
  });

  // OVERFLOW

  test('it should have the overflow hidden if no @overflow prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--overflow-hidden');
  });
  test('it should have the overflow visible if the @overflow prop is declared as "visible"', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @overflow="visible" />`
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--overflow-visible');
  });
});
