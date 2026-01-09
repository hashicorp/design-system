/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'active', 'hover', 'focus'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>BreadcrumbItem</ShwTextH3>

  <ShwTextH4>Generated element</ShwTextH4>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Default ⇒ <code>&lt;button&gt;</code></SFI.Label>
      <ol class="hds-breadcrumb__list">
        <HdsBreadcrumbItem @text="Level with icon" @icon="folder" />
      </ol>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>@href</code> ⇒ <code>&lt;a&gt;</code></SFI.Label>
      <ol class="hds-breadcrumb__list">
        <HdsBreadcrumbItem @href="#" @text="Level with icon" @icon="folder" />
      </ol>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With<code>@route</code>
        ⇒
        <code>&lt;LinkTo&gt;</code>
        ⇒
        <code>&lt;a&gt;</code></SFI.Label>
      <ol class="hds-breadcrumb__list">
        <HdsBreadcrumbItem
          @route="index"
          @text="Level with icon"
          @icon="folder"
        />
      </ol>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label><code>@current</code>
        ⇒
        <code>&lt;div&gt;</code></SFI.Label>
      <ol class="hds-breadcrumb__list">
        <HdsBreadcrumbItem @current={{true}} @text="Current" @icon="folder" />
      </ol>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        <ShwFlex @direction="column" @gap="1rem" as |SF2|>
          <SF2.Item>
            <ol class="hds-breadcrumb__list">
              <HdsBreadcrumbItem
                @text="Default (button)"
                @icon="folder"
                mock-state-value={{unless (eq state "default") state}}
                mock-state-selector="button"
              />
            </ol>
          </SF2.Item>
          <SF2.Item>
            <ol class="hds-breadcrumb__list">
              <HdsBreadcrumbItem
                @text="With @href (a)"
                @icon="folder"
                @href="#"
                mock-state-value={{unless (eq state "default") state}}
                mock-state-selector="a"
              />
            </ol>
          </SF2.Item>
          <SF2.Item>
            <ol class="hds-breadcrumb__list">
              <HdsBreadcrumbItem
                @text="With @route (a)"
                @icon="folder"
                @route="index"
                mock-state-value={{unless (eq state "default") state}}
                mock-state-selector="a"
              />
            </ol>
          </SF2.Item>
        </ShwFlex>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>BreadcrumbTruncation</ShwTextH3>

  <ol class="hds-breadcrumb__list">
    <HdsBreadcrumbTruncation />
  </ol>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        <ol class="hds-breadcrumb__list">
          <HdsBreadcrumbTruncation
            mock-state-value={{unless (eq state "default") state}}
            mock-state-selector="button"
          />
        </ol>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionBaseElements;
