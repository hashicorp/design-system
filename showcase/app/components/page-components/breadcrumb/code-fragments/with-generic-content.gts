/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
} from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithGenericContentSignature {
  Args: {
    hasIcons?: boolean;
    hasTruncation?: boolean;
  };
}

const CodeFragmentWithGenericContent: TemplateOnlyComponent<CodeFragmentWithGenericContentSignature> =
  <template>
    <HdsBreadcrumb
      aria-label="breadcrumb {{if @hasIcons 'with icons'}} {{if
        @hasTruncation
        'with truncation'
      }} example"
    >
      <HdsBreadcrumbItem
        @route="catch-all"
        @text="Level one"
        @icon={{if @hasIcons "org"}}
      />
      <HdsBreadcrumbItem
        @route="catch-all"
        @text="Level two"
        @icon={{if @hasIcons "folder"}}
      />
      {{#if @hasTruncation}}
        <HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @route="catch-all" @text="Sub-level one" />
          <HdsBreadcrumbItem
            @route="catch-all"
            @text="Sub-level two with a very long string that we may want to trim somehow"
          />
          <HdsBreadcrumbItem
            @route="catch-all"
            @text="Sub-level with icon"
            @icon="org"
          />
          <HdsBreadcrumbItem
            @route="catch-all"
            @text="Another sub-level with icon"
            @icon="folder"
          />
        </HdsBreadcrumbTruncation>
      {{else}}
        <HdsBreadcrumbItem @route="catch-all" @text="Level three" />
      {{/if}}
      <HdsBreadcrumbItem @route="catch-all" @text="Level four" />
      <HdsBreadcrumbItem @route="catch-all" @text="Level five" />
      <HdsBreadcrumbItem @route="catch-all" @text="Current" @current={{true}} />
    </HdsBreadcrumb>
  </template>;

export default CodeFragmentWithGenericContent;
