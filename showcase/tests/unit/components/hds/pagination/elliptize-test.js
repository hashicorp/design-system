/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// prettier-ignore
import { module, test } from 'qunit';
import { elliptize } from '@hashicorp/design-system-components/components/hds/pagination/numbered';

const A10 = Array.from(Array(10), (x, i) => i + 1);
const A11 = Array.from(Array(11), (x, i) => i + 1);
const A100 = Array.from(Array(100), (x, i) => i + 1);
const A101 = Array.from(Array(101), (x, i) => i + 1);

module('Unit | Component | hds/pagination/numbered', function () {
  test('the "elliptize" function returns the correct list of pages (10 total pages / limit of 7 pages)', async function (assert) {
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 1, limit: 7 }), [1, 2, 3, 4, "…", 9, 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 2, limit: 7 }), [1, 2, 3, 4, "…", 9, 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 3, limit: 7 }), [1, 2, 3, 4, "…", 9, 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 4, limit: 7 }), [1, "…", 3, 4, 5, "…", 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 5, limit: 7 }), [1, "…", 4, 5, 6, "…", 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 6, limit: 7 }), [1, "…", 5, 6, 7, "…", 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 7, limit: 7 }), [1, "…", 6, 7, 8, "…", 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 8, limit: 7 }), [1, 2, "…", 7, 8, 9, 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 9, limit: 7 }), [1, 2, "…", 7, 8, 9, 10]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A10, current: 10, limit: 7 }), [1, 2, "…", 7, 8, 9, 10]);
  });
  test('the "elliptize" function returns the correct list of pages (11 total pages / limit of 7 pages)', async function (assert) {
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A11, current: 1, limit: 7 }), [1, 2, 3, 4, "…", 10, 11]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A11, current: 7, limit: 7 }), [1, "…", 6, 7, 8, "…", 11]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A11, current: 11, limit: 7 }), [1, 2, "…", 8, 9, 10, 11]);
  });
  test('the "elliptize" function returns the correct list of pages (100 total pages / limit of 9 pages)', async function (assert) {
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A100, current: 1, limit: 9 }), [1, 2, 3, 4, 5, "…", 98, 99, 100]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A100, current: 7, limit: 9 }), [1, "…", 5, 6, 7, 8, 9, "…", 100]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A100, current: 11, limit: 9 }), [1, "…", 9, 10, 11, 12, 13, "…", 100]);
  });
  test('the "elliptize" function returns the correct list of pages (101 total pages / limit of 11 pages)', async function (assert) {
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A101, current: 1, limit: 11 }), [1, 2, 3, 4, 5, 6, "…", 98, 99, 100, 101]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A101, current: 7, limit: 11 }), [1, "…", 4, 5, 6, 7, 8, 9, 10, "…", 101]);
    // prettier-ignore
    assert.deepEqual(elliptize({ pages: A101, current: 11, limit: 11 }), [1, "…", 8, 9, 10, 11, 12, 13, 14, "…", 101]);
  });
});
