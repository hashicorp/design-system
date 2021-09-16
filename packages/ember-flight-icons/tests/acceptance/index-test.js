import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import waitFor from '@ember/test-helpers/dom/wait-for';
import percySnapshot from '@percy/ember';

module('Acceptance | icon index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / renders a list of icons', async function (assert) {
    await visit('/');

    // added timeout because the icons are not rendering as quickly
    await waitFor('.ds-icon-frame > .flight-icon', { timeout: 1000 });
    assert.dom('[data-test-target="icon-grid"] [data-test-icon]').exists();

    await percySnapshot('Icons page');
  });
});
