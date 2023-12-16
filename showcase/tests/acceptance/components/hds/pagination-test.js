/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, select, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../../../helpers';

module('Acceptance | Component | hds/pagination', function (hooks) {
  setupApplicationTest(hooks);

  test('interacting with the demo of a "numbered" pagination with routing', async function (assert) {
    await visit('/components/pagination');

    assert.strictEqual(currentURL(), '/components/pagination');

    assert
      .dom(
        '#demo2-numbered-with-routing .hds-table .hds-table__tbody .hds-table__tr'
      )
      .exists({ count: 5 });

    await click(
      '#demo2-numbered-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPage_demo2=2&demoExtraParam=hello'
    );

    await click(
      '#demo2-numbered-with-routing .hds-pagination-nav__page-item:nth-child(4) a'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPage_demo2=4&demoExtraParam=hello'
    );

    await click(
      '#demo2-numbered-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-prev'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPage_demo2=3&demoExtraParam=hello'
    );

    await select(
      '#demo2-numbered-with-routing .hds-pagination .hds-pagination-size-selector select',
      '10'
    );
    assert
      .dom(
        '#demo2-numbered-with-routing .hds-table .hds-table__tbody .hds-table__tr'
      )
      .exists({ count: 10 });
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageSize_demo2=10&demoExtraParam=hello'
    );

    await click(
      '#demo2-numbered-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageSize_demo2=10&currentPage_demo2=2&demoExtraParam=hello'
    );
  });

  test('interacting with the demo of a "compact" pagination with routing', async function (assert) {
    await visit('/components/pagination');

    assert.strictEqual(currentURL(), '/components/pagination');
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr'
      )
      .exists({ count: 5 });
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td'
      )
      .hasText('1');
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(5) .hds-table__td'
      )
      .hasText('5');

    // CLICK "NEXT"
    // ------------

    await click(
      '#demo4-compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next'
    );

    assert.strictEqual(
      currentURL(),
      '/components/pagination?demoExtraParam=hello&nextCursor_demo4=bmV4dF9fNg%3D%3D'
    );
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr'
      )
      .exists({ count: 5 });
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td'
      )
      .hasText('6');
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(5) .hds-table__td'
      )
      .hasText('10');

    // CHANGE PAGE SIZE
    // ----------------

    await select(
      '#demo4-compact-with-routing .hds-pagination .hds-pagination-size-selector select',
      '10'
    );
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr'
      )
      .exists({ count: 10 });
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageSize_demo4=10&demoExtraParam=hello&nextCursor_demo4=bmV4dF9fNg%3D%3D'
    );
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td'
      )
      .hasText('6');
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(10) .hds-table__td'
      )
      .hasText('15');

    // CLICK "NEXT" + "PREV"
    // ------------

    await click(
      '#demo4-compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next'
    );
    await click(
      '#demo4-compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-prev'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageSize_demo4=10&demoExtraParam=hello&prevCursor_demo4=cHJldl9fMTY%3D'
    );
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td'
      )
      .hasText('6');
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(10) .hds-table__td'
      )
      .hasText('15');

    // CLICK "PREV"
    // ------------
    // this is a special test to make sure that when the prev cursor is less than the page size the demo code still works (there was a bug before)

    await click(
      '#demo4-compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-prev'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?currentPageSize_demo4=10&demoExtraParam=hello&prevCursor_demo4=cHJldl9fNg%3D%3D'
    );
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr'
      )
      // notice: even if the "page size" is 10, we see only 5 records because we are counting "10 records before record #6" and so only 5 records exist
      .exists({ count: 5 });
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr .hds-table__td'
      )
      .hasText('1');
    assert
      .dom(
        '#demo4-compact-with-routing .hds-table .hds-table__tbody .hds-table__tr:nth-child(5) .hds-table__td'
      )
      .hasText('5');
  });
});
