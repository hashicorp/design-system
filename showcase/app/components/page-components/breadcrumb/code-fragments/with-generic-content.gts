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
        @href="index"
        @text="Level one"
        @icon={{if @hasIcons "org"}}
      />
      <HdsBreadcrumbItem
        @href="index"
        @text="Level two"
        @icon={{if @hasIcons "folder"}}
      />
      {{#if @hasTruncation}}
        <HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @href="index" @text="Sub-level one" />
          <HdsBreadcrumbItem
            @href="index"
            @text="Sub-level two with a very long string that we may want to trim somehow"
          />
          <HdsBreadcrumbItem
            @href="index"
            @text="Sub-level with icon"
            @icon="org"
          />
          <HdsBreadcrumbItem
            @href="index"
            @text="Another sub-level with icon"
            @icon="folder"
          />
        </HdsBreadcrumbTruncation>
      {{else}}
        <HdsBreadcrumbItem @href="index" @text="Level three" />
      {{/if}}
      <HdsBreadcrumbItem @href="index" @text="Level four" />
      <HdsBreadcrumbItem @href="index" @text="Level five" />
      <HdsBreadcrumbItem @href="index" @text="Current" @current={{true}} />
    </HdsBreadcrumb>
  </template>;

export default CodeFragmentWithGenericContent;
