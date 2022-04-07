import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dropdown/toggle-icon', function (hooks) {
  setupRenderingTest(hooks);

  // TOGGLE-ICON

  test('default toggle-icon renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    // default toggle icon has user icon, chevron-down, and an aria-label
    await render(hbs`<Hds::Dropdown::ToggleIcon @text="toggle text" />`);

    assert.dom(this.element).exists();
  });
  test('default toggle-icon renders with aria-label', async function (assert) {
    // default toggle icon has user icon, chevron-down, and an aria-label
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" />`
    );

    assert.dom('#test-toggleIcon').hasAria('label', 'user menu');
  });
  test('default toggle-icon renders with the user icon', async function (assert) {
    // default toggle icon has user icon, chevron-down, and an aria-label
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" />`
    );

    assert
      .dom(this.element.querySelector('.flight-icon.flight-icon-user'))
      .exists();
  });
  test('default toggle-icon renders with the the chevron-down icon', async function (assert) {
    // default toggle icon has user icon, chevron-down, and an aria-label
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" />`
    );

    assert
      .dom(this.element.querySelector('.flight-icon.flight-icon-chevron-down'))
      .exists();
  });
  test('default toggle-icon renders with the the chevron-up icon when isOpen is true', async function (assert) {
    // default toggle icon has user icon, chevron-down, and an aria-label
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" @isOpen="true" />`
    );

    assert
      .dom(this.element.querySelector('.flight-icon.flight-icon-chevron-up'))
      .exists();
  });
  test('toggle-icon renders no chevron when hasChevron is set to false', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @text="user menu" id="test-toggleIcon" @hasChevron={{false}} />`
    );

    assert
      .dom(this.element.querySelector('.flight-icon.flight-icon-chevron-down'))
      .doesNotExist();
  });
  test('toggle-icon renders other valid flight icons', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ToggleIcon @icon="settings" @text="settings menu" id="test-toggleIcon" />`
    );

    assert
      .dom(this.element.querySelector('.flight-icon.flight-icon-settings'))
      .exists();
  });
});
