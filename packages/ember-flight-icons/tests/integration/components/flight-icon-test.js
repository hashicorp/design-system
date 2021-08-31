import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | flight-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the icon', async function (assert) {
    await render(hbs`<FlightIcon @name="activity" />`);
    assert
      .dom('svg.flight-icon.icon-activity.display-inline')
      .matchesSelector('svg');
  });
  test('it should have a class name that is the same as the component name', async function (assert) {
    await render(hbs`<FlightIcon @name="activity" />`);
    assert.dom('svg').hasClass('flight-icon');
  });
  test('it has aria-hidden set to true', async function (assert) {
    await render(hbs`<FlightIcon @name="activity" />`);
    assert
      .dom('svg.flight-icon.icon-activity.display-inline')
      .hasAttribute('aria-hidden');
  });
  test('it renders the 16x16 icon by default', async function (assert) {
    await render(hbs`<FlightIcon @name="activity" />`);
    assert.dom('svg.flight-icon.icon-activity.display-inline').hasStyle({
      height: '16px',
      width: '16px',
    });
  });
  test('it renders the 24x24 icon when option is set', async function (assert) {
    await render(hbs`<FlightIcon @name="activity" @size="24" />`);
    assert.dom('svg.flight-icon.icon-activity.display-inline').hasStyle({
      height: '24px',
      width: '24px',
    });
  });
  test('it does not have the display-inline class if the option is set to false', async function (assert) {
    await render(hbs`<FlightIcon @name="activity" @isInlineBlock={{false}} />`);
    assert.dom('svg.flight-icon').doesNotHaveClass('display-inline');
  });
  test('additional classes can be added when component is invoked', async function (assert) {
    await render(hbs`<FlightIcon @name="meh" class="demo" />`);
    assert.dom(`svg.flight-icon`).hasClass('demo');
  });
  test('the color property should accept :root variable values', async function (assert) {
    await render(
      hbs`<FlightIcon @name="alert-circle" @color="var(--danger-d1)" />`
    );
    assert.dom(`svg.flight-icon`).hasStyle({
      fill: 'rgb(186, 34, 38)',
    });
  });
  test('the fill color should be set to black by default', async function (assert) {
    await render(hbs`<FlightIcon @name="meh" />`);
    assert.dom(`svg.flight-icon`).hasStyle({
      fill: 'rgb(0, 0, 0)',
    });
  });
  test('The fill color should be able to be inherited from parent', async function (assert) {
    await render(
      hbs`<div style="color:blue;"><FlightIcon @name="meh" /></div>`
    );
    assert.dom(`svg.flight-icon`).hasStyle({
      fill: 'rgb(0, 0, 255)',
    });
  });
  // TODO: there should be an error if an icon name is not provided
});
