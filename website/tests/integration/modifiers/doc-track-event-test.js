import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { click, focus } from '@ember/test-helpers';
import sinon from 'sinon';

module('Integration | Modifier | doc-track-event', function (hooks) {
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

  test('it adds click event listener by default and tracks an event', async function (assert) {
    await render(hbs`<div {{doc-track-event eventName='testEvent'}}></div>`);
    await click('div');

    assert.ok(trackEventSpy.calledOnceWith('testEvent'));
  });

  test('it adds a focus event listener and tracks an event', async function (assert) {
    await render(
      hbs`<input type="text" {{doc-track-event triggerEvent='focus' eventName='testEvent'}} />`
    );
    await focus('input');

    assert.ok(trackEventSpy.calledOnceWith('testEvent'));
  });
});
