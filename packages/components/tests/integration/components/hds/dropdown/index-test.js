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

  // TODO once everything is finalized in https://github.com/hashicorp/design-system/pull/66
  // - test @toggle prop or yielded toggles?
  // - test yielded list items? (use single render with multiple assertions)
  // - test @listPosition
});
