/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';

import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsTabs } from '@hashicorp/design-system-components/components';

export default class CodeFragmentWithDynamicTabSelectionLoop extends Component {
  @tracked selectedTab = 'two';

  get tabs() {
    return [
      {
        label: 'One',
        content: 'Content one',
        isSelected: this.selectedTab === 'one',
      },
      {
        label: 'Two',
        content: 'Content two',
        isSelected: this.selectedTab === 'two',
      },
      {
        label: 'Three',
        content: 'Content three',
        isSelected: this.selectedTab === 'three',
      },
    ];
  }

  setSelectedTab = (tab: string) => {
    this.selectedTab = tab;
  };

  <template>
    <div class="shw-component-tabs-example-heading">
      <ShwTextBody>Dynamic
        <code>@isSelected</code>
        argument within a loop</ShwTextBody>
      <div class="shw-component-tabs-example-heading-button-set">
        <span>@isSelected = </span>
        <button
          type="button"
          {{on "click" (fn this.setSelectedTab "one")}}
        >"one"</button>
        <button
          type="button"
          {{on "click" (fn this.setSelectedTab "two")}}
        >"two"</button>
        <button
          type="button"
          {{on "click" (fn this.setSelectedTab "three")}}
        >"three"</button>
      </div>
    </div>
    <HdsTabs as |T|>
      {{#each this.tabs as |tab|}}
        <T.Tab @isSelected={{tab.isSelected}}>{{tab.label}}</T.Tab>
        <T.Panel><ShwPlaceholder @text={{tab.content}} @height="50" /></T.Panel>
      {{/each}}
    </HdsTabs>
  </template>
}
