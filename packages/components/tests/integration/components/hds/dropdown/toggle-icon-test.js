import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dropdown/toggle-icon', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  // notice: by default the "toggle-icon" has "user" icon, "chevron-down", and an aria-label

  test('it renders the "toggle-icon"', async function (assert) {
    await render(hbs`<Hds::Dropdown::ToggleIcon @text="toggle text" />`);
    assert.dom(this.element).exists();
  });

  // ICON

  test('it should render with the "user" icon by default', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" />`
    );
    assert.dom('.flight-icon.flight-icon-user').exists();
  });
  test('if an icon is declared the flight icon should render in the component', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @icon="settings" @text="settings menu" id="test-toggleIcon" />`
    );
    assert.dom('.flight-icon.flight-icon-settings').exists();
  });

  // IMAGE (AVATAR)

  test('if an @imageSrc is declared the image should render in the component', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" @imageSrc="/assets/images/avatar.png" id="test-toggleIcon" />`
    );
    assert.dom('img').exists();
  });

  // CHEVRON

  test('it should render the chevron "down" by default', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" />`
    );
    assert.dom('.flight-icon.flight-icon-chevron-down').exists();
  });
  test('it should render the chevron "up" when @isOpen is true', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" @isOpen="true" id="test-toggleIcon" />`
    );
    assert.dom('.flight-icon.flight-icon-chevron-up').exists();
  });
  test('toggle-icon renders no chevron when hasChevron is set to false', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" @hasChevron={{false}} />`
    );
    assert.dom('.flight-icon.flight-icon-chevron-down').doesNotExist();
  });

  // A11Y

  test('it should render with the correct aria attribute declared using the @text prop', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" />`
    );
    assert.dom('#test-toggleIcon').hasAria('label', 'user menu');
  });
  test('it should render the user "avatar" image with the correct role', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" @imageSrc="/assets/images/avatar.png" id="test-toggleIcon" />`
    );
    assert.dom('#test-toggleIcon img').hasAttribute('role', 'presentation');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is not defined', async function (assert) {
    const errorMessage = `@text for "Hds::Dropdown::ToggleIcon" must have a valid value`;
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Dropdown::ToggleIcon id="test-toggleIcon" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
