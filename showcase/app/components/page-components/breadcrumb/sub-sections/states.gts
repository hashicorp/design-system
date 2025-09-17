import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  {{#each STATES as |state|}}
    <ShwFlex @label={{capitalize state}} as |SF|>
      <SF.Item>
        <HdsBreadcrumb aria-label="breadcrumb in {{state}} state example">
          <HdsBreadcrumbItem
            @text="Level one"
            @icon="org"
            mock-state-value={{unless (eq state "default") state}}
            mock-state-selector="a"
          />
          <HdsBreadcrumbItem
            @text="Level two"
            @icon="folder"
            mock-state-value={{unless (eq state "default") state}}
            mock-state-selector="a"
          />
          <HdsBreadcrumbTruncation
            mock-state-value={{unless (eq state "default") state}}
            mock-state-selector="button"
          >
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
          <HdsBreadcrumbItem
            @text="Level four"
            mock-state-value={{unless (eq state "default") state}}
            mock-state-selector="a"
          />
          <HdsBreadcrumbItem
            @text="Level five"
            mock-state-value={{unless (eq state "default") state}}
            mock-state-selector="a"
          />
          <HdsBreadcrumbItem
            @text="Current"
            @current={{true}}
            mock-state-value={{unless (eq state "default") state}}
            mock-state-selector="a"
          />
        </HdsBreadcrumb>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionStates;
