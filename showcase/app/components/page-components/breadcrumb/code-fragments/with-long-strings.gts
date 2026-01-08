/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
} from '@hashicorp/design-system-components/components';
import type { HdsBreadcrumbSignature } from '@hashicorp/design-system-components/components/hds/breadcrumb/index';

export interface CodeFragmentWithLongStringSignature {
  Args: {
    itemsCanWrap?: HdsBreadcrumbSignature['Args']['itemsCanWrap'];
  };
}

const CodeFragmentWithLongString: TemplateOnlyComponent<CodeFragmentWithLongStringSignature> =
  <template>
    <HdsBreadcrumb
      @itemsCanWrap={{@itemsCanWrap}}
      aria-label="breadcrumb with long strings {{if
        (eq @itemsCanWrap false)
        'and no text wrapping'
      }} example"
    >
      <HdsBreadcrumbItem
        @href="index"
        @text="Level one with a very long string"
        @icon="org"
      />
      <HdsBreadcrumbItem
        @href="index"
        @text="Level two with a very long string"
        @icon="folder"
      />
      <HdsBreadcrumbItem
        @href="index"
        @text="Level three with a very long string"
      />
      <HdsBreadcrumbItem
        @href="index"
        @text="Level four with a very long string"
      />
      <HdsBreadcrumbItem
        @href="index"
        @text="Level five with a very long string"
      />
      <HdsBreadcrumbItem
        @href="index"
        @text="Current with a very long string"
        @current={{true}}
      />
    </HdsBreadcrumb>
  </template>;

export default CodeFragmentWithLongString;
