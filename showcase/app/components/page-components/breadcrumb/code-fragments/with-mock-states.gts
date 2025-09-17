import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { eq } from 'ember-truth-helpers';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
} from '@hashicorp/design-system-components/components';

export type MockState = 'default' | 'hover' | 'active' | 'focus';

export interface CodeFragmentWithMockStateSignature {
  Args: {
    'mock-state': MockState;
  };
}

const CodeFragmentWithMockState: TemplateOnlyComponent<CodeFragmentWithMockStateSignature> =
  <template>
    <HdsBreadcrumb aria-label="breadcrumb in {{@mock-state}} state example">
      <HdsBreadcrumbItem
        @text="Level one"
        @icon="org"
        mock-state-value={{unless (eq @mock-state "default") @mock-state}}
        mock-state-selector="a"
      />
      <HdsBreadcrumbItem
        @text="Level two"
        @icon="folder"
        mock-state-value={{unless (eq @mock-state "default") @mock-state}}
        mock-state-selector="a"
      />
      <HdsBreadcrumbTruncation
        mock-state-value={{unless (eq @mock-state "default") @mock-state}}
        mock-state-selector="button"
      >
        <HdsBreadcrumbItem @text="Sub-level one" />
        <HdsBreadcrumbItem
          @text="Sub-level two with a very long string that we may want to trim somehow"
        />
        <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
        <HdsBreadcrumbItem @text="Another sub-level with icon" @icon="folder" />
      </HdsBreadcrumbTruncation>
      <HdsBreadcrumbItem
        @text="Level four"
        mock-state-value={{unless (eq @mock-state "default") @mock-state}}
        mock-state-selector="a"
      />
      <HdsBreadcrumbItem
        @text="Level five"
        mock-state-value={{unless (eq @mock-state "default") @mock-state}}
        mock-state-selector="a"
      />
      <HdsBreadcrumbItem
        @text="Current"
        @current={{true}}
        mock-state-value={{unless (eq @mock-state "default") @mock-state}}
        mock-state-selector="a"
      />
    </HdsBreadcrumb>
  </template>;

export default CodeFragmentWithMockState;
