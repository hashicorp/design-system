/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsAppFooter,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import { array, concat } from '@ember/helper';

export interface SubSectionLayoutSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionLayout: TemplateOnlyComponent<SubSectionLayoutSignature> =
  <template>
    <ShwTextH2>Layout</ShwTextH2>

    <button type="button" {{on "click" @toggleHighlight}}>
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="column" {{style marginTop="32px"}} as |SF|>
      {{#let
        (array "desktop" "tablet" "mobile-large" "mobile-small")
        as |layouts|
      }}
        {{#each layouts as |layout|}}
          <SF.Item @label={{layout}}>
            <div class={{concat "shw-component-app-footer-" layout "-view"}}>
              <HdsAppFooter as |AF|>
                <AF.ExtraBefore>
                  <ShwPlaceholder
                    class="shw-app-footer-extra"
                    @height="2em"
                    {{style width="fit-content"}}
                    @text="Before"
                  />
                </AF.ExtraBefore>
                <AF.StatusLink @status="operational" />
                <AF.LegalLinks />
                <AF.Item>
                  <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
                </AF.Item>
                <AF.Item>
                  <HdsTextBody @tag="span" @size="100">Name</HdsTextBody>
                </AF.Item>
                <AF.Item>
                  <HdsTextBody @tag="span" @size="100">API: 1.0</HdsTextBody>
                </AF.Item>
                <AF.ExtraAfter>
                  <ShwPlaceholder
                    class="shw-app-footer-extra"
                    @height="2em"
                    {{style width="fit-content"}}
                    @text="After"
                  />
                </AF.ExtraAfter>
              </HdsAppFooter>
            </div>
          </SF.Item>
        {{/each}}
      {{/let}}
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionLayout;
