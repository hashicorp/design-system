import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import waitFor from '@ember/test-helpers/dom/wait-for';
import percySnapshot from '@percy/ember';

module('Acceptance | icon index and Percy tests', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / renders a list of icons', async function (assert) {
    await visit('/');

    // added timeout because the icons are not rendering as quickly
    await waitFor('.ds-icon-frame > .flight-icon', { timeout: 1000 });
    assert.dom('[data-test-target="icon-grid"] [data-test-icon]').exists();

    // we explicitly set the scope to make sure @percy/ember considers all the relevant DOM
    // and includes the SVG sprite injected via `content-for "ember-testing-sprite-embed"`
    // see thread: https://hashicorp.slack.com/archives/C11JCBJTW/p1633978558343000
    // see: https://github.com/percy/percy-ember/blob/6e263861a6f58eb3cf44cccfbb0abcd5e95b2ad7/addon-test-support/%40percy/ember/index.js#L37-L38
    // see: http://thatsabug.com/blog/intro_to_percy/
    await percySnapshot('Icons page', { scope: '#ember-testing' });
  });

  test('query param functionality with results', async function (assert) {
    await visit('/?query=emoji');

    assert.dom('[data-test-icon="meh"]').exists();
    assert.dom('[data-test-icon="activity"]').doesNotExist();
  });

  test('query param functionality with no results', async function (assert) {
    await visit('/?query=wubalubadubdub');

    assert.dom('[data-test-target="empty-icons-search"]').exists();
    assert.dom('[data-test-icon="activity"]').doesNotExist();
  });
});
