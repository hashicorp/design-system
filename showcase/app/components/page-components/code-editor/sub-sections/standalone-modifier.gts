/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsFormCheckboxField } from '@hashicorp/design-system-components/components';

import hdsCodeEditor from '@hashicorp/design-system-components/modifiers/hds-code-editor';

const DEMO_CODE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default class SubSectionStandaloneModifier extends Component {
  @tracked hasLineWrapping = true;
  @tracked lineWrappingDemoValue = DEMO_CODE;

  toggleLineWrapping = (event: Event) => {
    this.hasLineWrapping = (event.target as HTMLInputElement).checked;
  };

  setLineWrappingDemoValue = (value: string) => {
    this.lineWrappingDemoValue = value;
  };

  <template>
    <ShwTextH2>Standalone modifier usage</ShwTextH2>
    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="div element with hds-code-editor modifier">
        <div
          {{hdsCodeEditor
            ariaLabel="Standalone modifier usage"
            value=DEMO_CODE
          }}
        />
      </SF.Item>
    </ShwFlex>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="toggle line wrapping">
        <HdsFormCheckboxField
          name="enable-line-wrapping"
          checked={{this.hasLineWrapping}}
          class="hds-code-editor-line-wrapper-controls"
          {{on "change" this.toggleLineWrapping}}
          as |F|
        >
          <F.Label>Line wrapping:
            {{if this.hasLineWrapping "Enabled" "Disabled"}}</F.Label>
        </HdsFormCheckboxField>
        <div
          {{hdsCodeEditor
            ariaLabel="Standalone modifier usage"
            value=this.lineWrappingDemoValue
            hasLineWrapping=this.hasLineWrapping
            onInput=this.setLineWrappingDemoValue
          }}
        />
      </SF.Item>
    </ShwFlex>
  </template>
}
