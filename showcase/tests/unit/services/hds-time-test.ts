/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import HdsTimeService, {
  HdsDisplayKeyValues,
  DEFAULT_DISPLAY_MAPPING,
  MINUTE_IN_MS,
  WEEK_IN_MS,
  HdsTimeRelativeUnitValues,
} from '@hashicorp/design-system-components/services/hds-time';

const table = [
  {
    case: 'triggers relative display',
    date: Date.now() - 1000 * 60,
    difference: -1 * MINUTE_IN_MS,
    type: HdsDisplayKeyValues.Relative,
    relative: { value: -1, unit: 'minute' },
  },
  {
    case: 'triggers friendly local display',
    date: Date.now() - 1000 * 60 * 60 * 24 * 2,
    difference: -1 * (3 * WEEK_IN_MS),
    type: HdsDisplayKeyValues.FriendlyLocal,
    relative: { value: -21, unit: 'day' },
  },
];

module('Unit | Service | time', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:hds-time') as HdsTimeService;

    assert.ok(service);
    assert.ok(service.format.bind(service));
    assert.ok(service.formatTimeRelativeUnit.bind(service));
    assert.ok(service.timeDifference.bind(service));
    assert.ok(service.register.bind(service));
    assert.ok(service.selectTimeRelativeUnit.bind(service));
    assert.ok(service.start);
    assert.ok(service.toIsoUtcString.bind(service));
    assert.ok(service.unregister.bind(service));
  });

  for (const item of table) {
    test(`it can format: ${item.case}`, function (assert) {
      const service = this.owner.lookup('service:hds-time') as HdsTimeService;

      const selectTimeRelativeUnitSpy = sinon.spy(
        service,
        'selectTimeRelativeUnit',
      );

      const difference = {
        valueInMs: item.difference,
        absValueInMs: Math.abs(item.difference),
      };
      const format = service.format(difference);
      assert.ok(format, 'format is defined');
      assert.strictEqual(
        format.options,
        DEFAULT_DISPLAY_MAPPING[item.type],
        `returns options`,
      );
      assert.strictEqual(
        format.difference.absValueInMs,
        difference.absValueInMs,
        `returns difference value in ms: ${difference.absValueInMs}`,
      );
      assert.strictEqual(
        format.difference.valueInMs,
        difference.valueInMs,
        `returns difference abs value in ms: ${difference.valueInMs}`,
      );
      assert.ok(
        selectTimeRelativeUnitSpy.calledWith(difference),
        'selects relative unit via fn',
      );
      assert.strictEqual(
        format.relative.value,
        item.relative.value,
        `returns relative value: ${item.relative.value}`,
      );
      assert.strictEqual(
        format.relative.unit,
        item.relative.unit,
        `returns relative unit: ${item.relative.unit}`,
      );
    });
  }

  test(`it can formatTimeRelativeUnit`, function (assert) {
    const service = this.owner.lookup('service:hds-time') as HdsTimeService;

    const value = -1.523423423;
    const unit = HdsTimeRelativeUnitValues.Second;
    const relativeUnit = service.formatTimeRelativeUnit(value, unit);

    assert.ok(relativeUnit, 'relativeUnit is defined');
    assert.strictEqual(
      relativeUnit.value,
      Math.trunc(value),
      `truncates value sent in`,
    );
    assert.strictEqual(
      relativeUnit.unit,
      unit,
      `passes along unit without a change`,
    );
  });

  test(`it can register and unregister listeners`, function (assert) {
    const service = this.owner.lookup('service:hds-time') as HdsTimeService;

    const id = new Date(Date.now());
    assert.strictEqual(
      service.listeners.size,
      0,
      'there no listeners right away',
    );
    assert.notOk(
      service.listeners.has(id),
      'the registered id does not exist yet',
    );
    const unregister = service.register(id);
    assert.ok(service.listeners.has(id), 'the registered id exists');
    assert.strictEqual(service.listeners.size, 1, 'register adds the listener');
    unregister();
    assert.strictEqual(
      service.listeners.size,
      0,
      'a returned unregister curried function deletes the listener',
    );
    service.register(id);
    assert.strictEqual(
      service.listeners.size,
      1,
      'register adds the listener again',
    );
    service.unregister(id);
    assert.strictEqual(
      service.listeners.size,
      0,
      'a direct unregister with an id deletes the listener',
    );
  });
});
