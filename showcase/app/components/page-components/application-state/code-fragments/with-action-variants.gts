/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import Component from '@glimmer/component';
import type { HdsApplicationStateSignature } from '@hashicorp/design-system-components/components/hds/application-state/index';

export interface CodeFragmentWithActionVariantsSignature {
  Args: {
    align?: HdsApplicationStateSignature['Args']['align'];
    hasDropdown?: boolean;
    hasPrimaryAction?: boolean;
    hasSecondaryAction?: boolean;
    hasStandaloneLink?: boolean;
    dropdownText?: string;
    primaryActionText?: string;
    secondaryActionText?: string;
    standaloneLinkText?: string;
  };
  Element: HdsApplicationStateSignature['Element'];
}

export default class CodeFragmentWithActionVariants extends Component<CodeFragmentWithActionVariantsSignature> {
  get primaryActionText(): string {
    return this.args.primaryActionText ?? 'Primary action';
  }

  get secondaryActionText(): string {
    return this.args.secondaryActionText ?? 'Secondary action';
  }

  get standaloneLinkText(): string {
    return this.args.standaloneLinkText ?? 'Learn more';
  }

  get dropdownText(): string {
    return this.args.dropdownText ?? 'Choose an option';
  }

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
          <F.Button @color="primary" @text={{this.primaryActionText}} />
        {{/if}}

        {{#if @hasSecondaryAction}}
          <F.Button @color="secondary" @text={{this.secondaryActionText}} />
        {{/if}}

        {{#if @hasDropdown}}
          <F.Dropdown @listPosition="bottom-right" as |dd|>
            <dd.ToggleButton @text={{this.dropdownText}} />
            <dd.Title @text="Categories" />
            <dd.Interactive @href="#">Documentation</dd.Interactive>
            <dd.Interactive @href="#">Tutorials</dd.Interactive>
            <dd.Interactive @href="#">Changelogs</dd.Interactive>
          </F.Dropdown>
        {{/if}}

        {{#if @hasStandaloneLink}}
          <F.LinkStandalone
            @icon="docs-link"
            @text={{this.standaloneLinkText}}
            @iconPosition="trailing"
            @href="#"
          />
        {{/if}}
      </A.Footer>
    </HdsApplicationState>
  </template>
}
