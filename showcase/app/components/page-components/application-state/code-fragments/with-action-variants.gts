/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';
import type { HdsApplicationStateAligns } from '@hashicorp/design-system-components/components/hds/application-state/types';

export interface CodeFragmentWithActionVariantsSignature {
  Args: {
    align: HdsApplicationStateAligns;
    hasDropdown?: boolean;
    hasPrimaryAction?: boolean;
    hasSecondaryAction?: boolean;
    hasStandaloneLink?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithActionVariants extends Component<CodeFragmentWithActionVariantsSignature> {
  <template>
    <HdsApplicationState @align={{@align}} as |A|>
      <A.Header
        @title="An error has occurred"
        @icon="alert-circle"
        @errorCode="404"
      />
      <A.Body
        @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
      />
      <A.Footer as |F|>
        {{#if @hasPrimaryAction}}
          <F.Button @color="primary" @text="Primary action" />
        {{/if}}

        {{#if @hasDropdown}}
          <F.Dropdown @listPosition="bottom-right" as |dd|>
            <dd.ToggleButton @text="Choose an option" />
            <dd.Title @text="Categories" />
            <dd.Interactive @href="#">Documentation</dd.Interactive>
            <dd.Interactive @href="#">Tutorials</dd.Interactive>
            <dd.Interactive @href="#">Changelogs</dd.Interactive>
          </F.Dropdown>
        {{/if}}

        {{#if @hasStandaloneLink}}
          <F.LinkStandalone
            @icon="docs-link"
            @text="Learn more"
            @iconPosition="trailing"
            @href="#"
          />
        {{/if}}
      </A.Footer>
    </HdsApplicationState>
  </template>
}
