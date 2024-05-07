import { module, test } from 'qunit';
import { setupTest } from 'website/tests/helpers';

module('Unit | Service | fathom-event', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:fathom-event');
    assert.ok(service);
  });
});
