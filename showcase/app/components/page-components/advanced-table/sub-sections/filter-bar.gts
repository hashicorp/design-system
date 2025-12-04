/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { get } from '@ember/object';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import MUSIC from 'showcase/mocks/folk-music-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsIcon,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

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
];

const MUSIC_VALUES = {
  artist: Array.from(new Set(MUSIC.map((item) => item['artist']))).map(
    (value) => ({ value, label: value }),
  ),
  album: Array.from(new Set(MUSIC.map((item) => item['album']))).map(
    (value) => ({ value, label: value }),
  ),
};

const EMPTY_FILTERS = {} as HdsFilterBarSignature['Args']['filters'];

const APPLIED_FILTERS = {
  artist: {
    type: 'multi-select',
    text: 'Artist',
    data: [
      { value: 'Bob Dylan', label: 'Bob Dylan' },
      { value: 'Melanie', label: 'Melanie' },
    ],
  },
  album: {
    type: 'single-select',
    text: 'Album',
    data: {
      value: "The Freewheelin' Bob Dylan",
      label: "The Freewheelin' Bob Dylan",
    },
  },
} as HdsFilterBarSignature['Args']['filters'];

const SubSectionFilterBar: TemplateOnlyComponent = <template>
  <ShwTextH2>FilterBar</ShwTextH2>

  <ShwTextH4 @tag="h3">Default</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{BASIC_MUSIC_COLUMNS}}
  >
    <:actions as |A|>
      <A.FilterBar @filters={{EMPTY_FILTERS}} as |F|>
        <F.Dropdown as |D|>
          <D.FilterGroup
            @key="artist"
            @text="Artist"
            @type="multi-select"
            @searchEnabled={{true}}
            as |F|
          >
            {{#each (get MUSIC_VALUES "artist") as |option|}}
              <F.Checkbox @value={{option.value}} @label={{option.label}} />
            {{/each}}
          </D.FilterGroup>
          <D.FilterGroup
            @key="album"
            @text="Album"
            @type="single-select"
            @searchEnabled={{true}}
            as |F|
          >
            {{#each (get MUSIC_VALUES "album") as |option|}}
              <F.Radio @value={{option.value}} @label={{option.label}} />
            {{/each}}
          </D.FilterGroup>
        </F.Dropdown>
      </A.FilterBar>
    </:actions>
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
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwTextH4 @tag="h3">With applied filters</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{BASIC_MUSIC_COLUMNS}}
  >
    <:actions as |A|>
      <A.FilterBar @filters={{APPLIED_FILTERS}} as |F|>
        <F.Dropdown as |D|>
          <D.FilterGroup
            @key="artist"
            @text="Artist"
            @type="multi-select"
            @searchEnabled={{true}}
            as |F|
          >
            {{#each (get MUSIC_VALUES "artist") as |option|}}
              <F.Checkbox @value={{option.value}} @label={{option.label}} />
            {{/each}}
          </D.FilterGroup>
          <D.FilterGroup
            @key="album"
            @text="Album"
            @type="single-select"
            @searchEnabled={{true}}
            as |F|
          >
            {{#each (get MUSIC_VALUES "album") as |option|}}
              <F.Radio @value={{option.value}} @label={{option.label}} />
            {{/each}}
          </D.FilterGroup>
        </F.Dropdown>
      </A.FilterBar>
    </:actions>
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
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwDivider />
</template>;

export default SubSectionFilterBar;
