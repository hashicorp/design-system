/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCdsLink } from '@hashicorp/design-system-components/components';

import { CDS_LINK_SIZE_OPTIONS } from '@hashicorp/design-system-components/components/hds/cds-link/index';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each CDS_LINK_SIZE_OPTIONS as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsCdsLink @size={{size}} href="https://hashicorp.com">
          Link text
        </HdsCdsLink>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH2>Inline</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Inline link">
      <p>
        This is some text with an
        <HdsCdsLink @inline={{true}} href="https://hashicorp.com">
          inline link
        </HdsCdsLink>
        embedded within it.
      </p>
    </SF.Item>
  </ShwFlex>

  <ShwTextH2>Disabled</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Disabled link">
      <HdsCdsLink disabled={{true}} href="https://hashicorp.com">
        Disabled link
      </HdsCdsLink>
    </SF.Item>
  </ShwFlex>

  <ShwTextH2>Visited</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Visited link">
      <HdsCdsLink visited={{true}} href="https://hashicorp.com">
        Visited link
      </HdsCdsLink>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionVariants;
