/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithGenericContent from 'showcase/components/page-internationalization/translation/code-fragments/with-generic-content';

export interface SubSectionDemoSignature {
  Args: {
    lang?: string;
  };
}

const SubSectionDemo: TemplateOnlyComponent<SubSectionDemoSignature> =
  <template>
    <ShwTextH4 @tag="h3">Helpers / Services</ShwTextH4>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item as |SGI|>
        <SGI.Label>Using the <code>hds-t</code> helper</SGI.Label>
        <CodeFragmentWithGenericContent
          @lang={{@lang}}
          @translationType="hds-helper"
        />
      </SG.Item>
      <SG.Item as |SGI|>
        <SGI.Label>Using the
          <code>ember-intl</code>
          <code>t</code>
          helper</SGI.Label>
        {{#if (eq @lang "")}}
          <ShwTextBody>
            <code>ember-intl</code>
            does not support fallback translations.
          </ShwTextBody>
        {{else}}
          <CodeFragmentWithGenericContent
            @lang={{@lang}}
            @translationType="ember-intl-helper"
          />
        {{/if}}
      </SG.Item>
      <SG.Item as |SGI|>
        <SGI.Label>Using the <code>hds-intl</code> service</SGI.Label>
        <CodeFragmentWithGenericContent
          @lang={{@lang}}
          @translationType="hds-intl-service"
        />
      </SG.Item>
      <SG.Item as |SGI|>
        <SGI.Label>Using the
          <code>ember-intl</code>
          <code>intl</code>
          service</SGI.Label>
        {{#if (eq @lang "")}}
          <ShwTextBody>
            <code>ember-intl</code>
            does not support fallback translations.
          </ShwTextBody>
        {{else}}
          <CodeFragmentWithGenericContent
            @lang={{@lang}}
            @translationType="ember-intl-service"
          />
        {{/if}}
      </SG.Item>
    </ShwGrid>

    <ShwDivider @level={{2}} />
  </template>;

export default SubSectionDemo;
