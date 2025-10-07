/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsReveal } from '@hashicorp/design-system-components/components';

const SubSectionOptions: TemplateOnlyComponent = <template>
  <ShwTextH2>Options</ShwTextH2>

  <ShwTextH3>textWhenOpen</ShwTextH3>

  <ShwFlex @gap="5rem" as |SF|>
    <SF.Item @label="Only using required @text">
      <HdsReveal @text="Same text label for open and closed">
        <ShwPlaceholder @text="generic content" @height="40" @width="200" />
      </HdsReveal>
    </SF.Item>

    <SF.Item @label="Using optional @textWhenOpen">
      <HdsReveal @text="Open me" @textWhenOpen="Close me">
        <ShwPlaceholder @text="generic content" @height="40" @width="200" />
      </HdsReveal>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>isOpen</ShwTextH3>

  <ShwFlex @gap="5rem" as |SF|>
    <SF.Item @label="Default, isOpen=false">
      <HdsReveal @text="More options">
        <ShwPlaceholder @text="generic content" @height="40" @width="200" />
      </HdsReveal>
    </SF.Item>

    <SF.Item @label="isOpen=true">
      <HdsReveal @text="More options" @isOpen={{true}}>
        <ShwPlaceholder @text="generic content" @height="40" @width="200" />
      </HdsReveal>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>ariaDescribedBy</ShwTextH3>

  <ShwFlex @gap="5rem" as |SF|>
    <SF.Item @label="Adding aria-describedby">
      <span id="reveal-description" class="sr-only">GitHub Apps</span>
      <HdsReveal @text="Show More" @ariaDescribedBy="reveal-description">
        <ShwPlaceholder @text="generic content" @height="40" @width="200" />
      </HdsReveal>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionOptions;
