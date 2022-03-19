import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/alert/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('Alert component renders with the defined `title` text', async function (assert) {
    await render(hbs`<Hds::Alert @title="Intentions are set to default allow" />`);
    assert.dom(this.element).hasText('Intentions are set to default allow');
  });

  test('Alert component renders a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Alert @title="I'm a cool alert!" id="test-alert" />`
    );
    assert.dom('#test-alert').hasClass('hds-alert');
  });

  // ICON

  test('It should not have visible icon if @icon is not declared', async function (assert) {
    await render(
      hbs`<Hds::Alert @text="I'm iconless, the horror" />`
    );
    assert.dom('.hds-alert__icon').doesNotExist();
  });

  test('If an icon is declared, the FlightIcon should render in the component', async function (assert) {
    await render(
      hbs`<Hds::Alert @title="yo" @icon="clipboard-copy" />`
    );
    assert
      .dom(
        this.element.querySelector('.flight-icon.flight-icon-clipboard-copy')
      )
      .exists();
  });

  // ASSERTIONS

  skip('Throw an assertion if @title is missing/has no value', async function (assert) {
    const errorMessage = '@title for "Hds::Alert" must have a valid value';
    // TODO: Debug
    assert.expect(2);

    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });

    await render(hbs`<Hds::Alert />`);
    
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
