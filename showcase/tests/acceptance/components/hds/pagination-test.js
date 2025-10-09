/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, select, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../../../helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/pagination', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/pagination page passes automated a11y checks', async function (assert) {
    let axeOptions = {
      rules: {
        'landmark-unique': {
          enabled: false,
        },
      },
    };
    await visit('/components/pagination');
    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });

  test('interacting with the demo of a "numbered" pagination with routing', async function (assert) {
    await visit('/components/pagination');

    assert.strictEqual(currentURL(), '/components/pagination');

    assert
      .dom('#numbered-with-routing .hds-table .hds-table__tbody .hds-table__tr')
      .exists({ count: 5 });

    await click(
      '#numbered-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next',
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageDemoNumbered=2',
    );

    await click(
      '#numbered-with-routing .hds-pagination-nav__page-item:nth-child(4) a',
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageDemoNumbered=4',
    );

    await click(
      '#numbered-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-prev',
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageDemoNumbered=3',
    );

    await select(
      '#numbered-with-routing .hds-pagination .hds-pagination-size-selector select',
      '10',
    );
    assert
      .dom('#numbered-with-routing .hds-table .hds-table__tbody .hds-table__tr')
      .exists({ count: 10 });
    assert.strictEqual(
      currentURL(),
      '/components/pagination?pageSizeDemoNumbered=10',
    );

    await click(
      '#numbered-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next',
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageDemoNumbered=2&pageSizeDemoNumbered=10',
    );
  });

  test('interacting with the demo of a "compact" pagination with routing', async function (assert) {
    await visit('/components/pagination');

    assert.strictEqual(currentURL(), '/components/pagination');
    assert
      .dom('#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr')
      .exists({ count: 5 });
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td',
      )
      .hasText('1');
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(5) .hds-table__td',
      )
      .hasText('5');

    // CLICK "NEXT"
    // ------------

    await click(
      '#compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next',
    );

    assert.strictEqual(
      currentURL(),
      '/components/pagination?nextCursorDemoCompact=bmV4dF9fNg%3D%3D',
    );
    assert
      .dom('#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr')
      .exists({ count: 5 });
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td',
      )
      .hasText('6');
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(5) .hds-table__td',
      )
      .hasText('10');

    // CHANGE PAGE SIZE
    // ----------------

    await select(
      '#compact-with-routing .hds-pagination .hds-pagination-size-selector select',
      '10',
    );
    assert
      .dom('#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr')
      .exists({ count: 10 });
    assert.strictEqual(
      currentURL(),
      '/components/pagination?nextCursorDemoCompact=bmV4dF9fNg%3D%3D&pageSizeDemoCompact=10',
    );
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td',
      )
      .hasText('6');
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(10) .hds-table__td',
      )
      .hasText('15');

    // CLICK "NEXT" + "PREV"
    // ------------

    await click(
      '#compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next',
    );
    await click(
      '#compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-prev',
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?pageSizeDemoCompact=10&prevCursorDemoCompact=cHJldl9fMTY%3D',
    );
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td',
      )
      .hasText('6');
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(10) .hds-table__td',
      )
      .hasText('15');

    // CLICK "PREV"
    // ------------
    // this is a special test to make sure that when the prev cursor is less than the page size the demo code still works (there was a bug before)

    await click(
      '#compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-prev',
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?pageSizeDemoCompact=10&prevCursorDemoCompact=cHJldl9fNg%3D%3D',
    );
    assert
      .dom('#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr')
      // notice: even if the "page size" is 10, we see only 5 records because we are counting "10 records before record #6" and so only 5 records exist
      .exists({ count: 5 });
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td',
      )
      .hasText('1');
    assert
      .dom(
        '#compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(5) .hds-table__td',
      )
      .hasText('5');
  });
});
