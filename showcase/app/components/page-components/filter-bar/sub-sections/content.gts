/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import CodeFragmentWithGenericContent from 'showcase/components/page-components/filter-bar/code-fragments/with-generic-content';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Base (default)</SFI.Label>
      <CodeFragmentWithGenericContent />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With search</SFI.Label>
      <CodeFragmentWithGenericContent @hasSearch={{true}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With search, custom placeholder</SFI.Label>
      <CodeFragmentWithGenericContent
        @hasSearch={{true}}
        @searchPlaceholder="Search workspaces"
      />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With ActionsDropdown</SFI.Label>
      <CodeFragmentWithGenericContent @hasActionsDropdown={{true}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With ActionsGeneric</SFI.Label>
      <CodeFragmentWithGenericContent @hasActionsGeneric={{true}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With search, ActionsDropdown, ActionsGeneric</SFI.Label>
      <CodeFragmentWithGenericContent
        @hasSearch={{true}}
        @hasActionsDropdown={{true}}
        @hasActionsGeneric={{true}}
      />
    </SF.Item>
  </ShwFlex>
  <ShwDivider />
</template>;

export default SubSectionContent;
