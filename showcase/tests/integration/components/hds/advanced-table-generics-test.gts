/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, findAll } from '@ember/test-helpers';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

// a strongly-typed row interface — B.data should be inferred as this type
interface MusicRow {
  id: string;
  artist: string;
  album: string;
  year: string;
}

const TYPED_MODEL: MusicRow[] = [
  { id: '1', artist: 'Nick Drake', album: 'Pink Moon', year: '1972' },
  { id: '2', artist: 'The Beatles', album: 'Abbey Road', year: '1969' },
  { id: '3', artist: 'Melanie', album: 'Candles in the Rain', year: '1971' },
];

const COLUMNS = [
  { key: 'artist', label: 'Artist' },
  { key: 'album', label: 'Album' },
  { key: 'year', label: 'Year' },
];

module(
  'Integration | Component | hds/advanced-table | generics',
  function (hooks) {
    setupRenderingTest(hooks);

    test('B.data is typed as the model row type — no @glint-expect-error needed', async function (assert) {
      // if the generic typing is broken, accessing B.data.artist / B.data.album /
      // B.data.year as typed properties would produce Glint errors and this file
      // would fail lint:types. no @glint-expect-error comments are used here.
      await render(
        <template>
          <HdsAdvancedTable
            @model={{TYPED_MODEL}}
            @columns={{COLUMNS}}
          >
            <:body as |B|>
              <B.Tr @selectionKey={{B.data.id}}>
                <B.Td>{{B.data.artist}}</B.Td>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </template>,
      );

      const rows = findAll('.hds-advanced-table__tr');
      // header row + 3 data rows
      assert.strictEqual(rows.length, 4);

      const cells = findAll('.hds-advanced-table__td');
      assert.strictEqual(cells.length, 9);
      assert.dom(cells[0]).hasText('Nick Drake');
      assert.dom(cells[1]).hasText('Pink Moon');
      assert.dom(cells[2]).hasText('1972');
    });
  },
);
