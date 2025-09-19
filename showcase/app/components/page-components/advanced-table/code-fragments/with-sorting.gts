/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import MUSIC from 'showcase/mocks/folk-music-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

export interface CodeFragmentWithSortingSignature {
  Args: {
    columns: HdsAdvancedTableSignature['Args']['columns'];
    hasRightAlignedLastColumn?: boolean;
    sortBy?: HdsAdvancedTableSignature['Args']['sortBy'];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithSorting: TemplateOnlyComponent<CodeFragmentWithSortingSignature> =
  <template>
    <HdsAdvancedTable
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
          <B.Td @align={{if @hasRightAlignedLastColumn "right"}}>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.year}}
          </B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>;

export default CodeFragmentWithSorting;
