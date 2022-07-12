import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/tag/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the default tag with text', async function (assert) {
    await render(hbs`<Hds::Tag @text="My tag" />`);
    assert.dom(this.element).hasText('My tag');
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Tag @text="My tag" id="test-tag" />`);
    assert.dom('#test-tag').hasClass('hds-tag');
  });

  // DISMISS

  test('it should not render the "dismiss" button by default', async function (assert) {
    await render(hbs`<Hds::Tag @text="My tag" />`);
    assert.dom('button.hds-tag__dismiss').doesNotExist();
  });
  test('it should render the "dismiss" button if a callback function is passed to the @onDismiss argument', async function (assert) {
    assert.expect(2);
    this.set('NOOP', () => {});
    await render(hbs`<Hds::Tag @text="My tag" @onDismiss={{this.NOOP}} />`);
    assert.dom('button.hds-tag__dismiss').exists();
    assert
      .dom('button.hds-tag__dismiss')
      .hasAttribute('aria-label', 'Dismiss My tag');
  });
});
