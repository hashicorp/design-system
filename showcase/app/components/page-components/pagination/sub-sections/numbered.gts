/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';

const SubSectionNumbered: TemplateOnlyComponent = <template>
  <ShwTextH2>PaginationNumbered</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Base (default)</SFI.Label>
      <HdsPaginationNumbered @totalItems={{40}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showTotalItems=&lcub;&lcub;false&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationNumbered @totalItems={{40}} @showTotalItems={{false}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showSizeSelector=&lcub;&lcub;false&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationNumbered @totalItems={{40}} @showSizeSelector={{false}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showInfo=&lcub;&lcub;false&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationNumbered @totalItems={{40}} @showInfo={{false}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showInfo=&lcub;&lcub;false&rcub;&rcub;</code>
        +
        <code>@showSizeSelector=&lcub;&lcub;false&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationNumbered
        @totalItems={{40}}
        @showInfo={{false}}
        @showSizeSelector={{false}}
      />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@currentPageSize=&lcub;&lcub;30&rcub;&rcub;</code>
        +
        <code>@currentPage=&lcub;&lcub;2&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationNumbered
        @totalItems={{40}}
        @currentPageSize={{30}}
        @currentPage={{2}}
        @pageSizes={{array 10 30 50}}
      />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showPageNumbers=&lcub;&lcub;false&rcub;&rcub;</code>
        +
        <code>@showLabels=&lcub;&lcub;true&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationNumbered
        @totalItems={{40}}
        @showPageNumbers={{false}}
        @showLabels={{true}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>Truncation</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>With large number of pages (truncated by default)</SFI.Label>
      <HdsPaginationNumbered @totalItems={{100}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With large number of pages (truncated with
        <code>@currentPage=&lcub;&lcub;4&rcub;&rcub;</code>)</SFI.Label>
      <HdsPaginationNumbered @totalItems={{100}} @currentPage={{4}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With large number of pages (not truncated)</SFI.Label>
      <HdsPaginationNumbered @totalItems={{100}} @isTruncated={{false}} />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionNumbered;
