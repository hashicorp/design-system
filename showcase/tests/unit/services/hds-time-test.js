/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import {
  HdsDisplayKeyValues,
  DEFAULT_DISPLAY_MAPPING,
  MINUTE_IN_MS,
  WEEK_IN_MS,
  RELATIVE_UNIT_SECOND,
} from '@hashicorp/design-system-components/services/hds-time';

let table = [
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

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:hdsTime');
    this.selectTimeRelativeUnitSpy = sinon.spy(
      this.service,
      'selectTimeRelativeUnit'
    );
  });

  test('it exists', function (assert) {
    assert.ok(this.service);
    assert.ok(this.service.format);
    assert.ok(this.service.formatTimeRelativeUnit);
    assert.ok(this.service.timeDifference);
    assert.ok(this.service.register);
    assert.ok(this.service.selectTimeRelativeUnit);
    assert.ok(this.service.start);
    assert.ok(this.service.toIsoUtcString);
    assert.ok(this.service.unregister);
  });

  for (const item of table) {
    test(`it can format: ${item.case}`, function (assert) {
      let difference = {
        valueInMs: item.difference,
        absValueInMs: Math.abs(item.difference),
      };
      let format = this.service.format(difference);
      assert.ok(format, 'format is defined');
      assert.strictEqual(
        format.options,
        DEFAULT_DISPLAY_MAPPING[item.type],
        `returns options`
      );
      assert.strictEqual(
        format.difference.absValueInMs,
        difference.absValueInMs,
        `returns difference value in ms: ${difference.absValueInMs}`
      );
      assert.strictEqual(
        format.difference.valueInMs,
        difference.valueInMs,
        `returns difference abs value in ms: ${difference.valueInMs}`
      );
      assert.ok(
        this.selectTimeRelativeUnitSpy.calledWith(difference),
        'selects relative unit via fn'
      );
      assert.strictEqual(
        format.relative.value,
        item.relative.value,
        `returns relative value: ${item.relative.value}`
      );
      assert.strictEqual(
        format.relative.unit,
        item.relative.unit,
        `returns relative unit: ${item.relative.unit}`
      );
    });
  }

  test(`it can formatTimeRelativeUnit`, function (assert) {
    let value = -1.523423423;
    let unit = RELATIVE_UNIT_SECOND;
    let relativeUnit = this.service.formatTimeRelativeUnit(value, unit);

    assert.ok(relativeUnit, 'relativeUnit is defined');
    assert.strictEqual(
      relativeUnit.value,
      Math.trunc(value),
      `truncates value sent in`
    );
    assert.strictEqual(
      relativeUnit.unit,
      unit,
      `passes along unit without a change`
    );
  });

  test(`it can register and unregister listeners`, function (assert) {
    let id = Date.now();
    assert.strictEqual(
      this.service.listeners.size,
      0,
      'there no listeners right away'
    );
    assert.notOk(
      this.service.listeners.has(id),
      'the registered id does not exist yet'
    );
    let unregister = this.service.register(id);
    assert.ok(this.service.listeners.has(id), 'the registered id exists');
    assert.strictEqual(
      this.service.listeners.size,
      1,
      'register adds the listener'
    );
    unregister();
    assert.strictEqual(
      this.service.listeners.size,
      0,
      'a returned unregister curried function deletes the listener'
    );
    this.service.register(id);
    assert.strictEqual(
      this.service.listeners.size,
      1,
      'register adds the listener again'
    );
    this.service.unregister(id);
    assert.strictEqual(
      this.service.listeners.size,
      0,
      'a direct unregister with an id deletes the listener'
    );
  });
});
