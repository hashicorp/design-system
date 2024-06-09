import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { click } from '@ember/test-helpers';
import sinon from 'sinon';

module('Integration | Modifier | doc-track-event-on', function (hooks) {
  setupRenderingTest(hooks);

  let originalFathom;
  let trackEventSpy;

  hooks.beforeEach(function () {
    originalFathom = window.fathom;
    trackEventSpy = sinon.spy();
    window.fathom = {
      trackEvent: trackEventSpy,
    };
  });

  hooks.afterEach(function () {
    window.fathom = originalFathom;
  });

  test('it adds click event listener and calls handleClick', async function (assert) {
    await render(hbs`<div {{doc-track-event-on 'click' 'testEvent'}}></div>`);
    await click('div');

    assert.ok(trackEventSpy.calledOnceWith('testEvent'));
  });
});
