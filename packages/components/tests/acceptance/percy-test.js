import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';
import config from 'dummy/config/environment';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  if (config.emberTryScenario) {
    // eslint-disable-next-line no-console
    console.log('Not running percy in ember-try');
    return;
  }

  test('Take percy snapshots', async function (assert) {
    await visit('/foundations/colors');
    await percySnapshot('Colors');

    await visit('/foundations/typography');
    await percySnapshot('Typography');

    await visit('/foundations/elevation');
    await percySnapshot('Elevation');

    await visit('/foundations/focus-ring');
    await percySnapshot('FocusRing');

    await visit('/components/alert');
    await percySnapshot('Alert');

    await visit('/components/badge');
    await percySnapshot('Badge');

    await visit('/components/breadcrumb');
    await percySnapshot('Breadcrumb');

    await visit('/components/button');
    await percySnapshot('Button');

    await visit('/components/card');
    await percySnapshot('Card');

    await visit('/components/dropdown');
    await percySnapshot('Dropdown');

    await visit('/components/form/base-elements');
    await click('button#dummy-toggle-highlight');
    await percySnapshot('Form - Base elements');

    await visit('/components/icon-tile');
    await percySnapshot('IconTile');

    await visit('/components/link/inline');
    await percySnapshot('Link Inline');

    await visit('/components/link/standalone');
    await percySnapshot('Link Standalone');

    await visit('/components/toast');
    await percySnapshot('Toast');

    assert.ok(true);
  });
});
