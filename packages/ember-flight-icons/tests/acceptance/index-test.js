import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import waitFor from '@ember/test-helpers/dom/wait-for';
import percySnapshot from '@percy/ember';

module('Acceptance | icon index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / renders a list of icons', async function (assert) {
    await visit('/');
    // added this because the icons are not rendering as quickly
    await waitFor('.flight-icon', { timeout: 1000 });
    await percySnapshot('Icons page');
    assert.ok(true);
  });
});
