import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBreadcrumb, HdsBreadcrumbItem, HdsBreadcrumbTruncation } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithGenericContentSignature {
  Args: {
    hasIcons?: boolean;
    hasTruncation?: boolean;
  };
}

const CodeFragmentWithGenericContent: TemplateOnlyComponent<CodeFragmentWithGenericContentSignature> =
  <template>
    <HdsBreadcrumb aria-label="breadcrumb with icons example">
      <HdsBreadcrumbItem @text="Level one" @icon={{if @hasIcons "org"}} />
      <HdsBreadcrumbItem @text="Level two" @icon={{if @hasIcons "folder"}} />
      {{#if @hasTruncation}}
        <HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @text="Sub-level one" />
          <HdsBreadcrumbItem @text="Sub-level two with a very long string that we may want to trim somehow" />
          <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
          <HdsBreadcrumbItem @text="Another sub-level with icon" @icon="folder" />
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
