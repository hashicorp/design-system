import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/card/container', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that is the same as the component name', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert.dom('div#test-card-container').hasClass('hds-card__container');
  });
  test('it should have the base level elevation as the default if no @level prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('div#test-card-container')
      .hasClass('hds-card__container--level-base');
  });
  test('it should have the right level class based on the @level prop', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @level="mid" />`
    );
    assert
      .dom('div#test-card-container')
      .hasClass('hds-card__container--level-mid');
  });
  test('it should have the default background if no @background prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('div#test-card-container')
      .hasClass('hds-card__container--background-neutral-0');
  });
  test('it should have the right background class based on the @background prop', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @background="neutral-50" />`
    );
    assert
      .dom('div#test-card-container')
      .hasClass('hds-card__container--background-neutral-50');
  });
  test('it should have a border if the @hasBorder prop is true', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @hasBorder={{true}} />`
    );
    assert
      .dom('div#test-card-container')
      .hasClass('hds-card__container--has-border');
  });
  test('it should have the overflow hidden if no @overflow prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('div#test-card-container')
      .hasClass('hds-card__container--overflow-hidden');
  });
  test('it should have the overflow visible if the @overflow prop is declared as "visible"', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @overflow="visible" />`
    );
    assert
      .dom('div#test-card-container')
      .hasClass('hds-card__container--overflow-visible');
  });
});
