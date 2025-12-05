/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import MUSIC from 'showcase/mocks/folk-music-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsIcon,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const BASIC_MUSIC_COLUMNS = [
  {
    key: 'artist',
    label: 'Artist',
    tooltip: 'More information.',
    isSortable: true,
  },
  {
    key: 'album',
    label: 'Album',
    tooltip: 'More information.',
    isSortable: true,
  },
  {
    key: 'year',
    label: 'Release Year',
    tooltip: 'More information.',
    isSortable: true,
  },
  {
    key: 'other',
    label: 'Additional Actions',
  },
];

const SubSectionBasic: TemplateOnlyComponent = <template>
  <ShwTextBody>
    <a
      class="shw-component-advanced-table__open-link"
      href="/layouts/app-frame/frameless/demo-full-app-frame-with-advanced-table"
      target="_blank"
      rel="noopener noreferrer"
    >
      See an Advanced Table in the context of a full App Frame
      <span class="sr-only">open the frame in a new window</span>
    </a>
  </ShwTextBody>
  <ShwTextH2>Basic AdvancedTable</ShwTextH2>
  <ShwTextH3>Keyboard interaction</ShwTextH3>

  <ShwTextBody>To navigate the AdvancedTable with a keyboard</ShwTextBody>
  <ul class="shw-component-advanced-table-instruction-list">
    <li><strong>Arrow Keys</strong>: Move between the cells</li>
    <li><strong>Enter</strong>: Focuses the first interactive element in the
      cell. After press enter, you can tab to all focusable elements in the
      cell. Focus is trapped within the cell.</li>
    <li><strong>Escape</strong>: If focused on an interactive element within a
      cell, it moves the focus back to the cell. After press escape, you can
      arrow key between the cells again.</li>
    <li><strong>Home (fn + left)</strong>: Move to first cell in the row</li>
    <li><strong>End (fn + right)</strong>: Move to last cell in the row</li>
    <li><strong>PageUp (fn + up)</strong>: Move to first cell in the column</li>
    <li><strong>PageDown (fn + down)</strong>: Move to last cell in the column</li>
  </ul>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{BASIC_MUSIC_COLUMNS}}
  >
    <:body as |B|>
      <B.Tr>
        <B.Th @scope="row"><HdsLinkInline @href="#showcase">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.artist}}
          </HdsLinkInline></B.Th>
        <B.Td>
          <div class="shw-component-advanced-table-cell-content-div">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.album}}
          </div>
        </B.Td>
        <B.Td>
          <HdsBadge
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @text={{B.data.year}}
            @type="outlined"
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @color={{B.data.badge-color}}
          />
        </B.Td>
        <B.Td>
          <HdsButtonSet>
            <HdsButton
              @text="Add"
              @isIconOnly={{true}}
              @icon="plus"
              @size="small"
            />
            <HdsButton
              @text="Edit"
              @isIconOnly={{true}}
              @icon="edit"
              @size="small"
              @color="secondary"
            />
            <HdsButton
              @text="Delete"
              @isIconOnly={{true}}
              @icon="trash"
              @size="small"
              @color="critical"
            />
          </HdsButtonSet>
        </B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwDivider />
</template>;

export default SubSectionBasic;
