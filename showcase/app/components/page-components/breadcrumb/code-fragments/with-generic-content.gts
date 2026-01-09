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
      <HdsBreadcrumbItem @text="Level one" @icon={{if @hasIcons "org"}} />
      <HdsBreadcrumbItem @text="Level two" @icon={{if @hasIcons "folder"}} />
      {{#if @hasTruncation}}
        <HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @text="Sub-level one" />
          <HdsBreadcrumbItem
            @text="Sub-level two with a very long string that we may want to trim somehow"
          />
          <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
          <HdsBreadcrumbItem
            @text="Another sub-level with icon"
            @icon="folder"
          />
        </HdsBreadcrumbTruncation>
      {{else}}
        <HdsBreadcrumbItem @text="Level three" />
      {{/if}}
      <HdsBreadcrumbItem @text="Level four" />
      <HdsBreadcrumbItem @text="Level five" />
      <HdsBreadcrumbItem @text="Current" @current={{true}} />
    </HdsBreadcrumb>
  </template>;

export default CodeFragmentWithGenericContent;
