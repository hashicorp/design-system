/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import HdsAppFooter from '@hashicorp/design-system-components/components/hds/app-footer/index';
import HdsDropdown from '@hashicorp/design-system-components/components/hds/dropdown/index';
import HdsTextBody from '@hashicorp/design-system-components/components/hds/text/body';

import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionContentSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionContent: TemplateOnlyComponent<SubSectionContentSignature> =
  <template>
    <ShwTextH2>Content</ShwTextH2>

    <button type="button" {{on "click" @toggleHighlight}}>
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="column" {{style marginTop="32px"}} as |SF|>
      <SF.Item @label="With only generic content">
        <HdsAppFooter as |AF|>
          <AF.ExtraBefore>
            <ShwPlaceholder
              @height="2em"
              {{style width="fit-content"}}
              @text="Extra Content Before"
            />
          </AF.ExtraBefore>
          <AF.Item>
            <ShwPlaceholder @height="2em" @text="Item" />
          </AF.Item>
          <AF.Item>
            <ShwPlaceholder @height="2em" @text="Item" />
          </AF.Item>
          <AF.Item>
            <ShwPlaceholder @height="2em" @text="Item" />
          </AF.Item>
          <AF.ExtraAfter>
            <ShwPlaceholder
              @height="2em"
              {{style width="fit-content"}}
              @text="Extra Content After"
            />
          </AF.ExtraAfter>
        </HdsAppFooter>
      </SF.Item>

      <SF.Item @label="With only the default content">
        <HdsAppFooter />
      </SF.Item>

      <SF.Item @label="With minimal recommended content">
        <HdsAppFooter as |AF|>
          <AF.LegalLinks />
        </HdsAppFooter>
      </SF.Item>

      <SF.Item
        @label="With StatusLink & custom Link content (with leading icon)"
      >
        <HdsAppFooter as |AF|>
          <AF.StatusLink @status="operational" />
          <AF.Link
            @href="https://cloud.hashicorp.com/docs/changelog"
            @icon="logs"
            @iconPosition="leading"
          >Changelog</AF.Link>
          <AF.LegalLinks />
        </HdsAppFooter>
      </SF.Item>

      <SF.Item @label="With custom “meta” items (non-link) content">
        <HdsAppFooter as |AF|>
          <AF.StatusLink @status="operational" />
          <AF.LegalLinks />
          <AF.Item>
            <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
          </AF.Item>
          <AF.Item>
            <HdsTextBody @tag="span" @size="100">Product Name</HdsTextBody>
          </AF.Item>
          <AF.Item>
            <HdsTextBody @tag="span" @size="100">API: 1.0</HdsTextBody>
          </AF.Item>
        </HdsAppFooter>
      </SF.Item>

      <SF.Item @label="With theme selector as Extra Content Before">
        <HdsAppFooter as |AF|>
          <AF.ExtraBefore>
            <HdsDropdown as |D|>
              <D.ToggleButton @text="Theme" @color="secondary" @size="small" />
              <D.Interactive
                @icon="monitor"
                {{on "click" D.close}}
              >System</D.Interactive>
              <D.Interactive
                @icon="moon"
                {{on "click" D.close}}
              >Dark</D.Interactive>
              <D.Interactive
                @icon="sun"
                {{on "click" D.close}}
              >Light</D.Interactive>
            </HdsDropdown>
          </AF.ExtraBefore>
          <AF.StatusLink @status="operational" />
          <AF.Link
            @href="https://cloud.hashicorp.com/docs/changelog"
          >Changelog</AF.Link>
          <AF.LegalLinks />
        </HdsAppFooter>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionContent;
