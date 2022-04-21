import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dropdown/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the dropdown container', async function (assert) {
    await render(hbs`<Hds::Dropdown @text="dropdown toggle" />`);
    assert.dom(this.element).exists();
  });

  // TODO once everything is finalized
  // - test @toggle prop or yielded toggles?
  // - test yielded list items? (use single render with multiple assertions)
  // - test @listPosition

  // SPLATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Dropdown @text="dropdown toggle" id="test-dropdown" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-dropdown').hasClass('my-class');
    assert.dom('#test-dropdown').hasAttribute('data-test1');
    assert.dom('#test-dropdown').hasAttribute('data-test2', 'test');
  });
});
