import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import waitFor from '@ember/test-helpers/dom/wait-for';

module('Acceptance | icon index', function (hooks) {
  setupApplicationTest(hooks);

  // sanity checking that the docs are doing something vaguely resembling what we expect
  test('visiting / renders a list of icons', async function (assert) {
    await visit('/');
    // added this because the icons are not rendering as quickly
    await waitFor('.flight-icon', { timeout: 1000 });
    assert.dom('[data-test-target="icon-grid"] [data-test-icon]').exists();
  });
});
