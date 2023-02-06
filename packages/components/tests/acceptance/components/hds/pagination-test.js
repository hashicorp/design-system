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

    await click(
      '#demo4-compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-next'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?demoExtraParam=hello&nextCursor_demo4=bmV4dF9fNg%3D%3D'
    );

    await click(
      '#demo4-compact-with-routing .hds-pagination .hds-pagination-nav__arrow--direction-prev'
    );
    assert.strictEqual(
      currentURL(),
      '/components/pagination?demoExtraParam=hello&prevCursor_demo4=cHJldl9fNg%3D%3D'
    );
  });
});
