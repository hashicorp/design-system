import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | icon index and Percy tests', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /percy-test', async function (assert) {
    await visit('/percy-test');

    // we explicitly set the scope to make sure @percy/ember considers all the relevant DOM
    // and includes the SVG sprite injected via `content-for "ember-testing-sprite-embed"`
    // see thread: https://hashicorp.slack.com/archives/C11JCBJTW/p1633978558343000
    // see: https://github.com/percy/percy-ember/blob/6e263861a6f58eb3cf44cccfbb0abcd5e95b2ad7/addon-test-support/%40percy/ember/index.js#L37-L38
    // see: http://thatsabug.com/blog/intro_to_percy/
    await percySnapshot('Percy test page', {
      scope: '#ember-testing',
    });

    assert.ok(true);
  });
});
