/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsLinkInline } from '@hashicorp/design-system-components/components';

const SubSectionGeneratedElement: TemplateOnlyComponent = <template>
  <ShwTextH2>Generated element</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@href</code>
        ⇒
        <code>&lt;a&gt;</code></SFI.Label>
      <div class="hds-typography-body-300">
        <HdsLinkInline @color="primary" @href="#">Lorem ipsum dolor</HdsLinkInline>
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@route</code>
        ⇒
        <code>&lt;LinkTo&gt;</code>
        ⇒
        <code>&lt;a&gt;</code></SFI.Label>
      <div class="hds-typography-body-300">
        <HdsLinkInline @color="primary" @route="index">Lorem ipsum dolor</HdsLinkInline>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionGeneratedElement;
