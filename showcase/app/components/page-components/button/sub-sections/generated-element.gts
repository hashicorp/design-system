/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsButton } from '@hashicorp/design-system-components/components';

const SubSectionGeneratedElement: TemplateOnlyComponent = <template>
  <ShwTextH2>Generated element</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Default ⇒ <code>&lt;button&gt;</code></SFI.Label>
      <ShwFlex @direction="column" as |SF2|>
        <SF2.Item>
          <HdsButton @icon="plus" @text="Lorem ipsum" @color="primary" />
        </SF2.Item>
        <SF2.Item>
          <HdsButton
            @icon="plus"
            @text="Lorem ipsum"
            @color="primary"
            disabled
          />
        </SF2.Item>
      </ShwFlex>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>@href</code> ⇒ <code>&lt;a&gt;</code></SFI.Label>
      <HdsButton @icon="plus" @text="Lorem ipsum" @color="primary" @href="#" />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With<code>@route</code>
        ⇒
        <code>&lt;LinkTo&gt;</code>
        ⇒
        <code>&lt;a&gt;</code></SFI.Label>
      <HdsButton
        @icon="plus"
        @text="Lorem ipsum"
        @color="primary"
        @route="index"
      />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionGeneratedElement;
