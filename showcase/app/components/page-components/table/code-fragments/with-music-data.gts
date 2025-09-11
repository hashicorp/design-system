/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import MUSIC from 'showcase/mocks/folk-music-data';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableSignature } from '@hashicorp/design-system-components/components/hds/table/index';

export interface CodeFragmentWithMusicDataSignature {
  Args: {
    showVinylCost?: boolean;
    rightAlignYear?: boolean;
    columns: HdsTableSignature['Args']['columns'];
    sortBy?: HdsTableSignature['Args']['sortBy'];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithMusicData: TemplateOnlyComponent<CodeFragmentWithMusicDataSignature> =
  <template>
    <HdsTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{MUSIC}}
      @columns={{@columns}}
      @sortBy={{@sortBy}}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.artist}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.album}}</B.Td>
          {{#if @showVinylCost}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.vinyl-cost}}</B.Td>
          {{/if}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td @align={{if @rightAlignYear "right"}}>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>;

export default CodeFragmentWithMusicData;
