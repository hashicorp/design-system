/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import HdsAppFooter from '@hashicorp/design-system-components/components/hds/app-footer/index';
import HdsTextBody from '@hashicorp/design-system-components/components/hds/text/body';

import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionThemeSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionTheme: TemplateOnlyComponent<SubSectionThemeSignature> =
  <template>
    <ShwTextH2>Theme</ShwTextH2>

    <button type="button" {{on "click" @toggleHighlight}}>
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="column" {{style marginTop="32px"}} as |SF|>
      <SF.Item @label="theme=light">
        <HdsAppFooter as |AF|>
          <AF.StatusLink @status="operational" />
          <AF.LegalLinks />
          <AF.Item>
            <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
          </AF.Item>
          <AF.Item>
            <HdsTextBody @tag="span" @size="100">Product Name</HdsTextBody>
          </AF.Item>
        </HdsAppFooter>
      </SF.Item>

      <SF.Item @label="theme=dark">
        <HdsAppFooter @theme="dark" as |AF|>
          <AF.StatusLink @status="operational" />
          <AF.LegalLinks />
          <AF.Item>
            <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
          </AF.Item>
          <AF.Item>
            <HdsTextBody @tag="span" @size="100">Product Name</HdsTextBody>
          </AF.Item>
        </HdsAppFooter>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionTheme;
