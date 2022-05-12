import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  triggerKeyEvent,
  // waitFor,
  render,
  resetOnerror,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/disclosure/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Disclosure id="test-disclosure" />`);
    assert.dom('div#test-disclosure').hasClass('hds-disclosure');
  });

  // TOGGLE + CONTENT

  test('it should render the "toggle" block but not the "content', async function (assert) {
    assert.expect(3);
    await render(hbs`
      <Hds::Disclosure>
        <:toggle>
          <button type="button" id="test-disclosure-button" />
        </:toggle>
      </Hds::Disclosure>
    `);
    assert.dom('.hds-disclosure__toggle').exists();
    assert.dom('button#test-disclosure-button').exists();
    assert.dom('.hds-disclosure__content').doesNotExist();
  });
  test('it should render the "content" when the "toggle" is clicked', async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Hds::Disclosure>
        <:toggle as |t|>
          <button type="button" id="test-disclosure-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-link" href="#">test</a>
        </:content>
      </Hds::Disclosure>
    `);
    await click('button#test-disclosure-button');
    assert.dom('.hds-disclosure__content').exists();
    assert.dom('a#test-disclosure-link').exists();
  });
  // TODO this doesn't work
  skip('it should render the "content" when the "toggle" is activated via "enter"', async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Hds::Disclosure>
        <:toggle as |t|>
          <button type="button" id="test-disclosure-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-link" href="#">test</a>
        </:content>
      </Hds::Disclosure>
    `);
    await triggerKeyEvent('button#test-disclosure-button', 'keydown', 'Enter');
    // await waitFor('.hds-disclosure__content', { timeout: 2000 });
    assert.dom('.hds-disclosure__content').exists();
    assert.dom('a#test-disclosure-link').exists();
  });

  // FOCUS

  // TODO this doesn't work
  // see https://github.com/emberjs/ember-test-helpers/issues/738
  // https://discord.com/channels/480462759797063690/480523424121356298/842578755633545276
  // https://github.com/emberjs/ember-test-helpers/issues/626
  // https://discord.com/channels/480462759797063690/483601670685720591/831546103266148403
  skip('it should trap the focus inside the "content" block', async function (assert) {
    assert.expect(3);
    await render(hbs`
      <Hds::Disclosure>
        <:toggle as |t|>
          <button type="button" id="test-disclosure-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-link-1" href="#">test1</a>
          <a id="test-disclosure-link-2" href="#">test2</a>
        </:content>
      </Hds::Disclosure>
    `);
    await click('button#test-disclosure-button');
    // console.log('BBB', document.activeElement);
    assert.dom('a#test-disclosure-link-1').isFocused();
    await triggerKeyEvent('a#test-disclosure-link-1', 'keydown', 'Tab');
    // console.log('CCC', document.activeElement);
    assert.dom('a#test-disclosure-link-2').isFocused();
    await triggerKeyEvent('a#test-disclosure-link-2', 'keydown', 'Tab');
    // console.log('DDD', document.activeElement);
    assert.dom('a#test-disclosure-link-1').isFocused();
  });
});
