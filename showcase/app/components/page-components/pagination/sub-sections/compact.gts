/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';

const SubSectionCompact: TemplateOnlyComponent = <template>
  <ShwTextH2>PaginationCompact</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Base (default)</SFI.Label>
      <HdsPaginationCompact />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>prev</code> disabled</SFI.Label>
      <HdsPaginationCompact @isDisabledPrev={{true}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showLabels=&lcub;&lcub;false&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationCompact @showLabels={{false}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showSizeSelector=&lcub;&lcub;true&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationCompact @showSizeSelector={{true}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showSizeSelector=&lcub;&lcub;true&rcub;&rcub;</code>
        +
        <code>@currentPageSize=&lcub;&lcub;30&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationCompact
        @showSizeSelector={{true}}
        @pageSizes={{array 10 30 50}}
        @currentPageSize={{30}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionCompact;
